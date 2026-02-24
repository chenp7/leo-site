# Starship Battle - Development Context

## Overview
Single-file HTML5 Canvas space shooter (`index.html`, ~2100 lines). No build tools, no dependencies — just open in a browser. All game logic, rendering, and audio are in one `<script>` tag.

## Architecture

### File Structure
- `/index.html` — the entire game

### Code Layout (approximate line ranges)
- **Lines 1-15**: HTML/CSS boilerplate, canvas setup
- **Lines 16-420**: Audio system (`SFX` object with procedural Web Audio API sounds), helpers, constants
- **Lines 420-520**: Game state variables, wave system, abilities, upgrades/shop definitions
- **Lines 520-610**: Stars, nebulae, asteroids generation
- **Lines 610-650**: Ally system (4 ally types), ally spawning
- **Lines 650-900**: Enemy creation, wave spawning, input handling, shop click logic, upgrade application, weapon firing
- **Lines 900-1060**: Main `update()` function start — game state machine, ability cooldowns, orbital strike logic, EMP ring, upgrade multipliers, player movement (cursor-relative), aiming, shield regen, shooting, engine trails
- **Lines 1060-1250**: Ally AI (fight/follow with per-type stats), enemy AI (stun, time slow, drone kamikaze, shielded, chase/strafe/shoot)
- **Lines 1250-1430**: Asteroid physics, projectile updates (homing, collisions, shielded damage reduction), dead enemy/ally cleanup, wave completion check, pickup collection
- **Lines 1430-1530**: Particles/trails/debris/notifications update, screen shake, camera
- **Lines 1530-1900**: `draw()` function — nebulae, stars, trails, asteroids, enemy rendering (7 types with unique shapes), ally rendering (4 types with unique shapes), player ship, projectiles, debris, particles, ability visuals (EMP ring, orbital beam, time slow overlay), damage vignette
- **Lines 1900-2050**: HUD (health/shield/boost bars, weapon, score, wave info, ability cooldowns), minimap, shop UI (`drawShop`), notifications
- **Lines 2050-2123**: Restart, game loop

### Key Constants
- `MAP_W = 3000`, `MAP_H = 2400` (small arena)
- `MAX_WAVES = 10`
- `INTERMISSION_FRAMES = 480` (8 seconds between waves)
- `DRAG = 0.97`, `BULLET_SPEED = 12`

## Game Systems

### Movement
- **Cursor-relative controls**: W=forward (toward cursor), S=backward, A=strafe left, D=strafe right
- Space = boost (consumes boost meter)
- Mouse aim with smooth rotation (`player.angle += angleDiff * 0.15`)

### Wave System
- `gameState`: `'playing'` | `'intermission'` | `'shopping'` | `'won'` | `'lost'`
- Waves 1-10, enemies spawn from map edges with +10% HP/damage scaling per wave
- Wave composition:
  - Wave 1+: scouts, fighters
  - Wave 2+: drone swarms (groups of 5)
  - Wave 3+: stealth, heavies
  - Wave 4+: shielded
  - Wave 5+: bosses
- All enemies killed → intermission → shop → next wave
- Full HP/shield restore between waves (allies too)
- Victory at wave 10

### Enemy Types (7 total in `ENEMY_TYPES`)
| Type | Behavior | Special |
|------|----------|---------|
| scout | Fast, flanking | Low HP |
| fighter | Balanced | Standard |
| heavy | Slow, tanky | Doesn't retreat |
| boss | Large, burst fire | 3-shot burst |
| stealth | Semi-transparent | Visible within 200px |
| drone | Kamikaze | Self-destructs on contact, no shooting |
| shielded | Front shield | 50% frontal damage reduction, shield regens |

- All enemies always aggro toward player (no patrol/idle behavior)
- Enemies have stun support (`stunTimer`), time slow support

### Ally Types (4 in `ALLY_TYPES`)
| Type | Stats | Visual |
|------|-------|--------|
| fighter | Balanced (HP:120, DMG:18, SPD:4) | Green diamond |
| sniper | Long range, high damage (HP:70, DMG:45, RNG:550) | Blue narrow |
| tank | Heavy armor (HP:220, DMG:22, SPD:2.5) | Orange bulky |
| assault | Fast fire (HP:150, DMG:10, FR:6) | Red angular |

- Each ally uses own stats for combat
- Purchased from shop, limited by Max Allies upgrade

### Abilities (keys 1/2/3)
| Ability | Key | Cooldown | Effect |
|---------|-----|----------|--------|
| EMP Blast | 1 | 15s (900f) | Stuns enemies in 300px for 2s, cyan ring visual |
| Time Slow | 2 | 20s (1200f) | Enemies at 30% speed for 4s, purple overlay |
| Orbital Strike | 3 | 25s (1500f) | 200 damage in 80px at mouse pos, 1s charge, 3s beam visual |

### Upgrade Shop (opens between waves)
8 upgrades (3 levels each), purchased with score:
- Max Health, Shield Cap, Fire Rate, Damage, Move Speed, Shield Regen, Ally Damage, Max Allies

4 ally recruit slots:
- Fighter (200), Sniper (350), Tank (400), Assault (500)

Multipliers applied in update loop: `speedMult`, `fireRateMult`, `dmgMult`, `shieldRegenMult`, `allyDmgMult`

### Weapons (5 in `WEAPON_TYPES`)
- normal (Blaster), railgun, missile (homing), shotgun, laser
- Picked up from map pickups or asteroid drops
- Limited ammo for non-normal weapons

### Audio
- All procedural via Web Audio API (`SFX` object)
- Spatial audio based on distance from player
- Sounds: shoot, enemyShoot, railgun, missile, shotgun, laser, explosion, hit, playerHit, shieldHit, pickup, allyJoin, allyDeath, boost, bossExplosion, asteroidBreak, emp, timeSlow, orbitalCharge, orbitalBlast, waveComplete, shopOpen, purchaseUpgrade, gameOver, victory

### Rendering
- Canvas 2D with camera follow and screen shake
- Parallax star layers, nebulae backgrounds
- Per-entity engine trails
- Particle system for explosions, hits, pickups
- Minimap in bottom-right corner
- HUD: top-left (HP/shield/boost/weapon/score/wave), bottom-center (ability cooldowns)

## Development Notes
- No bases or capture points (removed, replaced by wave system)
- No scattered ally rescue spots (removed, allies come from shop)
- `restartGame()` resets all state including upgrades
- Enemy `alertTimer` is set to 200 on spawn so they aggro immediately
- Drone contact damage checks both player and allies
- Shielded enemies take reduced frontal damage when front shield is up
- Orbital strike deals damage modified by player's damage upgrade
