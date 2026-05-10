# Mon Tableau de Bord Financier — App Android (PWA)

Ce dossier contient une **Progressive Web App (PWA)** : ton dashboard, mais installable comme une vraie app sur ton téléphone Android (et iPhone, et ordinateur).

## ✨ Ce que tu obtiens

- Une icône sur ton écran d'accueil Android
- Un lancement plein écran (sans la barre du navigateur)
- **Fonctionne hors-ligne** après le premier chargement
- Tes données sont **mémorisées** entre les sessions (`localStorage` du navigateur)
- Bouton « Reset » pour repartir des données de démo si besoin

## 📦 Contenu du dossier

```
finances-pwa/
├── index.html              ← le dashboard (ton tableau de bord)
├── manifest.webmanifest    ← métadonnées de l'app
├── sw.js                   ← service worker (pour le mode hors-ligne)
├── icons/                  ← icônes (192/512 + maskable + Apple)
└── README.md               ← ce fichier
```

## 🚀 Déploiement en 5 minutes — GitHub Pages (gratuit)

> **Pourquoi GitHub Pages ?** Gratuit, fiable, HTTPS par défaut (indispensable pour qu'une PWA fonctionne), et tu gardes le contrôle.

### Étape 1 — Créer un compte GitHub
Si tu n'en as pas : https://github.com/signup. Pseudo court, c'est plus joli dans l'URL finale.

### Étape 2 — Créer un nouveau dépôt
1. Une fois connecté, clique sur **+ New repository** (bouton vert en haut à droite).
2. Repository name : `finances` (par exemple — peu importe).
3. Coche **Public** (obligatoire pour la version gratuite de Pages).
4. Coche **Add a README file** (juste pour pouvoir cloner ensuite).
5. Clique **Create repository**.

### Étape 3 — Uploader les fichiers
1. Sur la page de ton dépôt fraîchement créé, clique **Add file → Upload files**.
2. **Glisse-dépose** tous les fichiers et dossiers de ce dossier (`index.html`, `manifest.webmanifest`, `sw.js`, et le dossier `icons/`).
3. En bas, clique **Commit changes**.

> Astuce : si le dossier `icons/` ne s'upload pas en glisser-déposer, crée-le à la main via **Add file → Create new file** en tapant `icons/icon-192.png` dans le nom (cela crée le dossier), annule, puis upload le fichier dedans. Plus simple : utilise **GitHub Desktop** ou la commande `git push` si tu connais.

### Étape 4 — Activer GitHub Pages
1. Dans ton dépôt, va dans **Settings** (onglet en haut).
2. Dans le menu de gauche, clique **Pages**.
3. Sous **Source**, sélectionne **Deploy from a branch**.
4. Sous **Branch**, choisis `main` et `/ (root)`. Clique **Save**.
5. Patiente 1 à 2 minutes. La page va se rafraîchir automatiquement.
6. Tu verras apparaître une URL du type :
   ```
   https://TON_PSEUDO.github.io/finances/
   ```

### Étape 5 — Installer sur ton Android
1. Ouvre cette URL dans **Chrome** sur ton téléphone Android.
2. Attends que la page charge complètement (les graphiques s'affichent).
3. Menu (⋮ en haut à droite) → **Installer l'application** (ou « Ajouter à l'écran d'accueil »).
4. Confirme. **Une icône € dorée apparaît sur ton écran d'accueil.**
5. Tape dessus : ça s'ouvre en plein écran, comme une vraie app.

### Étape 6 — (iPhone) Installer aussi sur iOS
1. Ouvre l'URL dans **Safari** (pas Chrome — important sur iOS).
2. Bouton **Partager** (carré avec flèche vers le haut).
3. **Sur l'écran d'accueil**.
4. Tape **Ajouter**.

## 🔁 Mettre à jour l'app plus tard

Si tu modifies un fichier (par exemple pour personnaliser le design) :
1. Va sur ton dépôt GitHub.
2. Clique sur le fichier à modifier → icône crayon ✏️ → modifie → **Commit changes**.
3. Patiente 1-2 min. L'app installée sur ton téléphone se mettra à jour automatiquement au prochain lancement (le service worker s'occupe de tout).

## 🔒 Sécurité et confidentialité

- **Aucune donnée n'est envoyée nulle part.** Tout reste dans le `localStorage` de ton navigateur.
- Si tu déploies sur GitHub Pages **avec un dépôt public**, le **code** est public, mais **pas tes données** (qui restent sur ton téléphone).
- Si tu veux aller plus loin et garder même le code privé, il faut un compte GitHub Pro (4 $/mois) ou utiliser **Cloudflare Pages** (gratuit + dépôts privés).

## 🧪 Tester en local avant de déployer

Si tu veux tester localement avant de pusher (optionnel) :

```bash
# Avec Python
cd finances-pwa/
python3 -m http.server 8000
# puis ouvre http://localhost:8000
```

> Le service worker ne fonctionne que via http(s), pas en file://. C'est pour ça qu'il faut un serveur (même local).

## ❓ Problèmes fréquents

**« L'option Installer n'apparaît pas dans Chrome »**
→ C'est probablement que la page n'est pas encore complètement chargée, ou tu es en HTTP (et non HTTPS). Vérifie l'URL — elle doit commencer par `https://`. Recharge la page, attends 5 secondes, ré-essaie.

**« Mes données ont disparu »**
→ Le `localStorage` est lié au navigateur. Si tu vides le cache de Chrome ou utilises un autre navigateur, tes données importées ne suivent pas. Réimporte ton dernier export bancaire (.xlsx ou .csv), et c'est reparti.

**« Je veux changer l'icône »**
→ Remplace les fichiers dans `icons/` par tes propres images aux mêmes dimensions (192×192, 512×512, etc.) et même nom. Attends ~5 minutes après push pour que ça se propage.

**« Le service worker ne marche pas »**
→ Vérifie qu'il y a bien `sw.js` à la racine du dépôt (pas dans un sous-dossier). Et que l'URL est en HTTPS.

---

Bon usage ! Quand tu auras ajouté plusieurs mois de données, le tableau deviendra de plus en plus parlant.
