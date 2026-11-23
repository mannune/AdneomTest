# Déployer l'app Batch cooking

L'app est un site statique : aucun serveur ni compilation. Le dossier à publier est `batchcooking/`.

## Option A : Netlify (recommandée, relié au dépôt)

Le fichier `netlify.toml` à la racine du dépôt configure déjà tout.

1. Connectez-vous sur https://app.netlify.com avec votre compte GitHub.
2. « Add new project » puis « Import an existing project », et choisissez `mannune/AdneomTest`.
3. Branche de production : `claude/moms-app-development-qrag4v` (ou `master` après fusion de la PR).
4. Vérifiez que les réglages détectés sont :
   - Build command : vide
   - Publish directory : `batchcooking`
5. Cliquez sur « Deploy ». Netlify donne une adresse du type `https://nom-choisi.netlify.app`.

Chaque nouveau commit sur la branche met le site à jour automatiquement.

## Option B : Netlify Drop (sans GitHub, pour un test rapide)

1. Ouvrez https://app.netlify.com/drop.
2. Glissez le dossier `batchcooking/` dans la page.
3. Récupérez l'adresse publique. Pour une mise à jour, il faut glisser le dossier à nouveau.

## Option C : Cloudflare Pages

1. Créez un projet sur https://dash.cloudflare.com (Workers & Pages, puis Pages).
2. Reliez le dépôt `mannune/AdneomTest`.
3. Réglages : Framework preset « None », Build command vide, Build output directory `batchcooking`.

## Après le déploiement : vérifications

- L'adresse s'ouvre en HTTPS et l'app s'affiche.
- Le manifeste est reconnu : dans Chrome, Outils de développement, onglet Application, « Manifest » ne signale pas d'erreur.
- Le mode hors ligne fonctionne : ouvrez l'app, puis activez « Hors ligne » dans les outils de développement et rechargez la page.

## Générer l'APK Android (le lendemain)

1. Allez sur https://www.pwabuilder.com et collez l'adresse publique.
2. Cliquez sur « Package for stores », puis Android.
3. Téléchargez le package, puis installez l'APK sur le téléphone. Autorisez l'installation depuis une source inconnue si le téléphone le demande.

Note : pour que l'app s'ouvre en plein écran sans barre d'adresse, il faudra ensuite publier un fichier `assetlinks.json` sur le site. PWABuilder ou Bubblewrap le génère avec l'empreinte de signature de l'APK.
