# ◈ VOID SECTOR — Game Documentation

> A top-down space combat RPG. Capture enemy bases, build your fleet, find weapons and upgrades scattered across the sector, and defeat the Void Leviathan boss to win.

---

## Controls

| Key | Action |
|-----|--------|
| `WASD` | Fly your ship |
| `SPACE` or `CLICK` | Fire laser |
| `Q` | Nova blast (AoE explosion) |
| `F` | Interact with nearby base |
| `R` | Recharge energy |
| `B` | Open shop |
| `M` | Fire seeker missile (if unlocked) |
| `E` | EMP blast (if unlocked) |
| `1` | Use equipped item — Railgun |
| `2` | Use equipped item — EMP Bomb |
| `3` | Use equipped item — Shotgun |
| `4` | Use equipped item — RPG |
| `5` | Use equipped item — Repair Kit |

**Walk over any glowing item on the map to automatically pick it up.**

---

## How to Play

1. **Choose your ship and starting ally** in the Hangar Bay before launching.
2. **Fly around the map** and capture enemy bases by flying close and pressing `F` to assault them, or shooting them with lasers.
3. **Earn credits** by capturing bases and killing enemies. Spend credits in the shop (`B`).
4. **Pick up glowing field items** scattered across the map — weapons, upgrades, and repair kits.
5. **Build your fleet** by recruiting allies from ally outposts or buying them in the shop.
6. **Find and destroy the Leviathan Lair** — the final enemy base guarded by the Void Leviathan boss.
7. **Capture all enemy bases** to win the sector.

### Base Types

| Icon | Type | Description |
|------|------|-------------|
| 🚀 | Home Base | Your starting point. Press `F` to repair hull and shields. |
| 👾 🤖 👻 | Enemy Base | Attack with lasers or `F` assault to capture. Guarded by enemy ships. |
| 🛸 | Ally Outpost | Press `F` to recruit a free scout drone. |
| 🏛 | Space Station | Press `F` to claim for credits and score. |
| 💀 | Leviathan Lair | Final boss base. Destroy it to spawn the Void Leviathan. |

---

## Player Ships

Choose your ship in the **Hangar Bay** before launching.

### ◈ Void Ranger — BALANCED
- **HP:** 100 · **Shield:** 60 · **Energy:** 80 · **Speed:** 1.6 · **Laser Dmg:** 20
- The all-rounder. Good at everything, master of nothing. Best for new commanders.

### ◈ Iron Titan — TANK
- **HP:** 200 · **Shield:** 120 · **Energy:** 60 · **Speed:** 1.0 · **Laser Dmg:** 15
- Massive HP and shield. Extremely slow but nearly unkillable. Takes punishment so your fleet doesn't have to.

### ◈ Phantom Lance — SNIPER
- **HP:** 80 · **Shield:** 0 · **Energy:** 120 · **Speed:** 1.8 · **Laser Dmg:** 80
- Extreme damage and laser range. No shields at all.
- **Last Stand system:** The first hit from a regular enemy drops you to 1 HP instead of killing you — a warning before death.
- **Boss shots are always lethal** — one hit from the Void Leviathan kills instantly, no Last Stand protection.

### ◈ Nova Dart — SPEED
- **HP:** 70 · **Shield:** 40 · **Energy:** 90 · **Speed:** 3.0 · **Laser Dmg:** 12
- Fastest ship in the fleet. Low firepower but nearly impossible to hit at full speed.

### ◈ Siege Breaker — BOMBER
- **HP:** 90 · **Shield:** 50 · **Energy:** 100 · **Speed:** 1.4 · **Laser Dmg:** 18
- Nova blast costs only **15 energy** instead of 30. Built for clearing enemy bases with constant nova spam.

---

## Ally Ships

Choose your starting ally in the **Hangar Bay**. Buy more in the shop.

| Ship | Role | HP | Dmg | Speed | Notes |
|------|------|----|-----|-------|-------|
| 🛸 Scout Drone | Scout | 35 | 10 | Fast | Cheap swarm unit |
| 🚀 Void Fighter | Fighter | 60 | 16 | Normal | Balanced all-rounder |
| 🛡 Heavy Gunship | Tank | 120 | 25 | Slow | Frontline damage absorber |
| 👻 Ghost Raider | Assassin | 40 | 30 | Fast | High damage, targets bases |

Allies automatically attack nearby enemies, shoot at enemy bases, and follow you when idle.

---

## Shop — Upgrades & Weapons

Open with `B`. Earn credits by capturing bases and killing enemies (30 CR per kill).

### Recruit Allies
| Unit | Cost | Max Fleet |
|------|------|-----------|
| Scout Drone | 200 CR | 8 |
| Void Fighter | 350 CR | 6 |
| Heavy Gunship | 600 CR | 4 |
| Ghost Raider | 500 CR | 4 |

### Ship Upgrades (permanent, stackable)
| Upgrade | Effect | Base Cost |
|---------|--------|-----------|
| 🛡 Hull Plating | +20 max hull HP | 300 CR |
| 💠 Shield Matrix | +15 max shield | 250 CR |
| ⚡ Reactor Core | +15 max energy | 200 CR |
| 🔥 Engine Boost | +0.2 speed | 350 CR |
| 🔫 Laser Array | +8 laser damage | 400 CR |
| ⏩ Rapid Fire | -1 laser energy cost | 450 CR |
| ☄️ Nova Amplifier | +4 nova projectiles | 500 CR |
| 🪖 Ablative Armor | -2 incoming damage per hit | 400 CR |

Upgrade costs increase with each level purchased.

### Weapons (one-time unlock)
| Weapon | Cost | Key | Description |
|--------|------|-----|-------------|
| ⚔️ Dual Laser | 800 CR | — | Fire two parallel beams every shot |
| 🎯 Seeker Missile | 1200 CR | `M` | Homing missile, 70 damage, 30 energy |
| 🌀 EMP Cannon | 1000 CR | `E` | Stuns all enemies in 180px radius, 25 energy |

---

## Field Items (Pick Up on Map)

18 items are scattered randomly across the map each sector. **Walk over them to pick up.** You can only carry one item type at a time — picking up a duplicate adds ammo.

| Icon | Item | Key | Ammo | Effect |
|------|------|-----|------|--------|
| ⚡ | Railgun | `1` | 3 | Instant piercing beam through ALL enemies in a line |
| 🌀 | EMP Bomb | `2` | 2 | Massive 360px shockwave — stuns all enemies for 5 seconds |
| 💥 | Shotgun | `3` | 6 | 12 pellets in a wide cone, devastating at close range |
| 🚀 | RPG | `4` | 4 | Slow rocket that explodes for 160 AoE damage in a 120px radius |
| ❤️ | Repair Kit | `5` | 1 | +60 hull HP, full shields, clears Phantom Lance Last Stand |

---

## Field Upgrades (Pick Up on Map)

20 permanent upgrades are hidden across the map. **Diamond shapes** are ship upgrades, **triangle shapes** are fleet upgrades. Walk over to collect.

### Ship Upgrades (diamonds)
| Icon | Upgrade | Effect |
|------|---------|--------|
| 🛡 | +Hull | +15 max hull HP |
| 💠 | +Shield | +12 max shield |
| ⚡ | +Energy | +10 max energy |
| 🔥 | +Speed | +0.15 movement speed |
| ⚔️ | +Damage | +10 laser damage |
| ⏩ | +Rapid | -1 laser energy cost |

### Fleet Upgrades (triangles — affect all allies)
| Icon | Upgrade | Effect |
|------|---------|--------|
| 💚 | Fleet +HP | +20 HP to all current and future allies |
| 🗡 | Fleet +DMG | +8 damage to all allies |
| 💨 | Fleet +SPD | +0.3 speed to all allies |

---

## Hazards — Asteroids & Meteors

Asteroids and meteors drift and fly across the entire map. They deal damage on contact and bounce your ship away.

| Type | Damage | Speed | Notes |
|------|--------|-------|-------|
| 🪨 Asteroid | 8 HP | Slow drift | Too large to destroy with lasers. Avoid or tank. |
| ☄️ Meteor | 18 HP | Fast (3–6x) | Leaves a fire trail. **Can be shot down with lasers** for +30 score. |

Both types have a 1-second cooldown between hits so you don't get shredded instantly. Armor upgrades reduce damage from both.

---

## Boss — Void Leviathan

The Void Leviathan spawns when you destroy the **Leviathan Lair** (marked 💀 on the minimap).

**Stats:** 600 HP · Hexagonal warship · 38px hitbox

### Attacks
| Attack | Description |
|--------|-------------|
| Triple/Penta Spread | Fires 3 lasers in a spread (5 in Phase 2) |
| Charge | Dashes at the player dealing 25 contact damage |
| Minion Swarm | Spawns 2 enemy ships every 7 seconds |

### Phase 2 (below 50% HP)
- Turns red/pink
- 1.4× movement speed
- Fires 5-shot spread instead of 3
- Spawns 3 minions every 4 seconds
- Charge cooldown reduced from 5s to 3s

### Special Rules (Phantom Lance only)
- **All boss attacks instantly kill the Phantom Lance** — no Last Stand, no shield.

### Rewards
- **+2000 score · +800 credits** on defeat
- Captures the final base
- Triggers victory if all other bases are also captured

---

## Tips & Strategy

- **Home Base** repairs hull (+25 HP) and shields (+20) for free. Return often.
- **Ally outposts** give free scout drones when you press `F`. Never pass one by.
- **Shoot meteors** out of the sky for easy score and to clear hazards.
- **EMP items** from the map are stronger than the shop EMP — 5-second stun vs 3-second.
- **Railgun** pierces through everything in a line including the boss — save it for boss phases.
- **Field upgrades** stack with shop upgrades. Prioritize exploring the map early.
- **Phantom Lance** needs the Repair Kit item to reset Last Stand mid-fight.
- **Siege Breaker** can fire nova every 15 energy — spam it near enemy bases for fast captures.
- The **minimap** shows enemy bases (red), your fleet (green), boss (purple), asteroids (brown/orange), and your position (cyan).
