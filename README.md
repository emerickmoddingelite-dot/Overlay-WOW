# ⚔ WoW Stream Overlay — Guide Complet

Projet d'overlays de stream World of Warcraft, 100% personnalisable sans toucher au code.

---

## 📁 Structure des fichiers

```
wow_stream/
├── config.js            ← ✏️  TON SEUL FICHIER À MODIFIER
├── shared.css           ← Styles communs (couleurs, animations)
├── shared.js            ← Logique commune (lecture config + URL)
├── dashboard.html       ← Panneau de contrôle visuel
├── overlay_debut.html   ← Overlay : Début de Live
├── overlay_enjeu.html   ← Overlay : En Jeu (HUD)
├── overlay_pause.html   ← Overlay : Pause / BRB
└── overlay_fin.html     ← Overlay : Fin de Live
```

---

## 🚀 Déploiement Web (recommandé)

### Option A — GitHub Pages (gratuit)
1. Crée un repo GitHub (public ou privé avec Pages)
2. Upload tous les fichiers à la racine
3. Active GitHub Pages : **Settings → Pages → Deploy from branch `main`**
4. Ton URL sera : `https://tonpseudo.github.io/nom-du-repo/dashboard.html`

### Option B — Netlify (gratuit)
1. Va sur [netlify.com](https://netlify.com) → "Add new site" → "Deploy manually"
2. Glisse-dépose le dossier `wow_stream/`
3. URL générée automatiquement (ex: `https://xxx.netlify.app/dashboard.html`)

### Option C — Vercel (gratuit)
1. [vercel.com](https://vercel.com) → New Project → Import depuis GitHub
2. Fonctionne automatiquement avec les fichiers statiques

---

## 💻 Utilisation en local (sans hébergement)

1. Extrais le ZIP dans un dossier permanent (ex: `C:\Stream\wow_stream\`)
2. Ouvre `dashboard.html` dans ton navigateur
3. Dans OBS/StreamLabs, utilise les chemins locaux :
   ```
   file:///C:/Stream/wow_stream/overlay_debut.html?pseudo=TonPseudo&...
   ```

---

## 🎬 Intégration OBS Studio

1. **Ajoute une source** → `Navigateur`
2. **URL** : Colle l'URL depuis le dashboard
3. **Largeur** : `1920` — **Hauteur** : `1080`
4. Coche **"Actualiser le navigateur quand la scène devient active"**
5. Répète pour chaque overlay dans des scènes différentes

## 🟢 Intégration StreamLabs

1. **Add Source** → `Browser Source`
2. **URL** : Colle l'URL depuis le dashboard
3. **Width** : `1920` — **Height** : `1080`
4. Coche **"Shutdown source when not visible"** pour économiser les ressources

---

## ✏️ Personnalisation

### Méthode 1 — Dashboard (le plus simple)
Ouvre `dashboard.html`, remplis les champs, clique **Générer les URLs**.

### Méthode 2 — config.js (valeurs par défaut)
Édite directement `config.js` pour changer les valeurs affichées quand aucun paramètre URL n'est fourni.

### Méthode 3 — Paramètres URL
Tous les champs sont accessibles via l'URL :
```
overlay_debut.html?pseudo=MonPseudo&serveur=Ysondre&twitch=twitch.tv/moi
```

**Liste complète des paramètres :**
| Paramètre | Description |
|-----------|-------------|
| `pseudo` | Nom du streamer |
| `guilde` | Nom de guilde |
| `serveur` | Serveur WoW |
| `classe` | Classe du personnage |
| `faction` | `horde` ou `alliance` |
| `contenu` | Contenu du live |
| `twitch` | URL Twitch |
| `discord` | URL Discord |
| `twitter` | @ Twitter |
| `youtube` | URL YouTube |
| `debut_titre` | Titre de l'overlay Début |
| `debut_sousTitre` | Sous-titre |
| `debut_tagline` | Texte latéral |
| `debut_badge` | Texte du badge LIVE |
| `enjeu_obj1` | Objectif ligne 1 |
| `enjeu_obj2` | Objectif ligne 2 |
| `enjeu_cmd1..4` | Commandes chat |
| `pause_sousTitre` | Texte pause |
| `pause_message` | Message pause |
| `pause_contenu` | Carte contenu |
| `brb_secs` | Durée timer (secondes) |
| `fin_titre` | Titre outro |
| `fin_sousTitre` | Sous-titre outro |
| `fin_message` | Quote/message |
| `fin_cta` | Call to action |

---

## 🎨 Thème & Couleurs

Modifie les variables CSS dans `shared.css` (section `:root`) :
```css
--gold:        #ffd700;   /* Couleur dorée principale */
--gold-dark:   #c8920a;   /* Or foncé */
--purple:      #9060ff;   /* Accent violet */
--horde:       #cc2200;   /* Rouge Horde */
--alliance:    #0055cc;   /* Bleu Alliance */
```

---

## ⏱ Timer de Pause

L'overlay Pause inclut un compte à rebours automatique.
Par défaut : **5 minutes (300 secondes)**

Pour changer : `overlay_pause.html?brb_secs=600` (= 10 min)

---

*WoW Stream Overlay — Fait Par EmerickModdingElite pour la communauté WoW*
