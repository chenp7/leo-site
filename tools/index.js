const toolsGrid = document.getElementById('tools-grid');

function toTitleFromFolder(folderName) {
  return folderName
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

function colorFor(folder) {
  let hash = 0;
  for (let i = 0; i < folder.length; i += 1) {
    hash = (hash << 5) - hash + folder.charCodeAt(i);
    hash |= 0;
  }
  const hue = Math.abs(hash) % 360;
  return `hsl(${hue} 75% 52%)`;
}

function createToolSwatch(tool) {
  const title = tool.title || toTitleFromFolder(tool.folder);
  const desc = tool.description || `Tool folder: ${tool.folder}`;
  const accent = colorFor(tool.folder);

  const article = document.createElement('article');
  article.className = 'card';

  const thumb = document.createElement('div');
  thumb.className = 'card-thumb';
  thumb.textContent = title;
  thumb.style.background = `linear-gradient(145deg, ${accent}, #0f172a)`;
  thumb.style.color = '#fff';
  thumb.style.fontSize = '1rem';
  thumb.style.fontWeight = '700';
  thumb.style.padding = '1rem';
  thumb.style.textAlign = 'center';
  thumb.style.lineHeight = '1.2';

  const body = document.createElement('div');
  body.className = 'card-body';

  const tag = document.createElement('span');
  tag.className = 'card-tag';
  tag.textContent = 'TOOL';

  const heading = document.createElement('h3');
  heading.className = 'card-title';
  heading.textContent = title;

  const para = document.createElement('p');
  para.className = 'card-desc';
  para.textContent = desc;

  const actions = document.createElement('div');
  actions.className = 'card-actions';

  const link = document.createElement('a');
  link.className = 'btn btn-primary';
  link.href = `${tool.folder}/index.html`;
  link.textContent = 'Open';

  actions.appendChild(link);
  body.append(tag, heading, para, actions);
  article.append(thumb, body);

  // Keep the explicit Open button, and also make the whole swatch tappable/clickable.
  article.style.cursor = 'pointer';
  article.tabIndex = 0;
  article.setAttribute('role', 'link');
  article.setAttribute('aria-label', `Open ${title}`);
  article.addEventListener('click', event => {
    if (event.target.closest('a')) return;
    window.location.href = link.href;
  });
  article.addEventListener('keydown', event => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      window.location.href = link.href;
    }
  });

  return article;
}

function renderInfo(title, message) {
  const card = document.createElement('article');
  card.className = 'card card-placeholder';

  card.innerHTML = `
    <div class="card-thumb" style="aspect-ratio:unset; padding:2rem 0;">💡</div>
    <div class="card-body">
      <span class="card-tag">INFO</span>
      <h3 class="card-title">${title}</h3>
      <p class="card-desc">${message}</p>
    </div>
  `;

  toolsGrid.replaceChildren(card);
}

async function scanFolderListing() {
  const res = await fetch('./', { cache: 'no-store' });
  if (!res.ok) return [];

  const html = await res.text();
  const doc = new DOMParser().parseFromString(html, 'text/html');

  // If this is our page (not a server directory listing), this scan won't work.
  const isSelfPage = !!doc.querySelector('#tools-grid');
  if (isSelfPage) return [];

  return [...new Set(
    [...doc.querySelectorAll('a[href]')]
      .map(a => a.getAttribute('href') || '')
      .filter(href => href.endsWith('/'))
      .map(href => href.replace(/\/$/, ''))
      .filter(href => href && href !== '.' && href !== '..')
      .filter(href => !href.startsWith('?') && !href.startsWith('#'))
      .filter(href => !href.includes('/'))
  )];
}

async function loadFoldersFromManifest() {
  try {
    const res = await fetch('./tools.json', { cache: 'no-store' });
    if (!res.ok) return [];

    const data = await res.json();
    if (!Array.isArray(data)) return [];

    return data
      .map(item => (typeof item === 'string' ? item : item.folder))
      .filter(Boolean);
  } catch {
    return [];
  }
}

async function readToolMetadata(folder) {
  const fallbackTitle = toTitleFromFolder(folder);

  try {
    const res = await fetch(`${folder}/index.html`, { cache: 'no-store' });
    if (!res.ok) {
      return { folder, title: fallbackTitle, description: `Tool folder: ${folder}` };
    }

    const html = await res.text();
    const doc = new DOMParser().parseFromString(html, 'text/html');

    const rawTitle = (doc.querySelector('title')?.textContent || '').trim();
    const title = rawTitle.replace(/\s*[—-].*$/, '').trim() || fallbackTitle;

    const description = (
      doc.querySelector('meta[name="description"]')?.getAttribute('content') ||
      doc.querySelector('h1')?.textContent ||
      `Tool folder: ${folder}`
    ).trim();

    return { folder, title, description };
  } catch {
    return { folder, title: fallbackTitle, description: `Tool folder: ${folder}` };
  }
}

async function loadTools() {
  toolsGrid.innerHTML = '';

  const loading = document.createElement('article');
  loading.className = 'card card-placeholder';
  loading.innerHTML = `
    <div class="card-thumb" style="aspect-ratio:unset; padding:2rem 0;">🛠️</div>
    <div class="card-body">
      <span class="card-tag">LOADING</span>
      <h3 class="card-title">Scanning Tool Folders</h3>
      <p class="card-desc">Looking for sub-folders that contain tools.</p>
    </div>
  `;
  toolsGrid.appendChild(loading);

  let folders = await scanFolderListing();
  if (!folders.length) {
    folders = await loadFoldersFromManifest();
  }

  if (!folders.length) {
    renderInfo('No Tools Found', 'Create sub-folders and list them in tools.json.');
    return;
  }

  const tools = await Promise.all(folders.map(readToolMetadata));
  tools.sort((a, b) => a.title.localeCompare(b.title));

  toolsGrid.replaceChildren(...tools.map(createToolSwatch));
}

loadTools();
