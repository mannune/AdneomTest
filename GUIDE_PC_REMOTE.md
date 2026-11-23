# Guide : travailler à distance sur votre PC avec Claude Code

Objectif : votre PC reste allumé à la maison, et vous lancez des sessions de développement depuis l'app Claude ou claude.ai/code, depuis n'importe où.

Ce guide couvre Windows, macOS et Linux. Les commandes d'installation évoluent : en cas d'erreur, suivez la documentation officielle de Claude Code.

---

## 1. Préparer le PC (une seule fois)

### Installer Git
- **Windows** : https://git-scm.com/download/win (laissez les options par défaut).
- **macOS** : ouvrez un Terminal et tapez `git --version`. Si Git n'est pas installé, macOS propose de l'installer.
- **Linux** : `sudo apt install git` (Debian ou Ubuntu).

Configurez votre identité, une seule fois :
```
git config --global user.name "Votre nom"
git config --global user.email "votre.email@exemple.com"
```

### Installer Claude Code
Option la plus simple : l'**app Claude Desktop** (https://claude.com/download). Elle inclut Claude Code et l'option Remote Control.

Option en ligne de commande :
- **macOS et Linux** : `curl -fsSL https://claude.ai/install.sh | bash`
- **Windows (PowerShell)** : `irm https://claude.ai/install.ps1 | iex`

Vérifiez l'installation avec `claude --version`.

### Se connecter
Lancez `claude`, puis suivez la connexion avec le même compte que sur claude.ai.

### Cloner le projet
Choisissez un dossier dédié, par exemple `~/projets` (macOS, Linux) ou `C:\Users\VotreNom\projets` (Windows) :
```
git clone https://github.com/mannune/AdneomTest.git
cd AdneomTest
git checkout claude/moms-app-development-qrag4v
```

---

## 2. Démarrer Remote Control

### Avec l'app Claude Desktop (le plus simple)
1. Ouvrez Settings, puis Claude Code, puis Remote Control.
2. Ajoutez le dossier `AdneomTest` (le dossier du projet, pas votre dossier personnel).
3. Laissez l'app ouverte.

### Avec le terminal
1. Ouvrez un terminal dans le dossier du projet (`cd AdneomTest`).
2. Lancez `claude remote-control`.
3. Laissez la fenêtre ouverte. Arrêter la commande coupe l'accès.

Le dossier apparaît ensuite dans l'app Claude Code, sur claude.ai/code et sur votre téléphone. Vous pouvez y lancer une session.

---

## 3. Garder le PC disponible

- **Windows** : Paramètres, puis Système, puis Alimentation. Réglez « Mise en veille » sur « Jamais » quand la machine est branchée.
- **macOS** : Réglages Système, puis Batterie (ou Économie d'énergie), puis désactivez la mise en veille quand l'écran est éteint sur secteur.
- **Linux** : selon l'environnement de bureau, désactivez la mise en veille dans les paramètres d'alimentation.

Vérifiez que la connexion internet est stable, et que l'ordinateur ne redémarre pas la nuit (mises à jour automatiques).

---

## 4. Règles de sécurité

- Ne placez dans le dossier du projet aucun fichier personnel ou sensible (mots de passe, documents administratifs, clés privées).
- L'agent peut lancer des commandes dans ce dossier. Relisez les actions qu'il propose, surtout les suppressions et les envois vers internet.
- Ne donnez l'accès qu'à un seul dossier de projet à la fois.
- Fermez Remote Control quand vous n'en avez plus besoin.

---

## 5. Travailler avec le projet

- Chaque session travaille dans la branche `claude/moms-app-development-qrag4v`.
- Quand un changement est prêt : demandez à l'agent de committer, puis de pousser sur GitHub. Cela met à jour la PR #1.
- Pour tester l'app sur votre PC, ouvrez `batchcooking/index.html` ou lancez `python3 -m http.server 8000` dans le dossier `batchcooking` (sous Windows, `python -m http.server 8000`).

---

## 6. Dépannage

| Problème | Solution |
|---|---|
| Le dossier n'apparaît pas dans l'app | Vérifiez que Remote Control tourne et que le dossier n'est pas votre dossier personnel ni un dossier caché. |
| La commande `claude` est introuvable | Fermez et rouvrez le terminal après l'installation. |
| Le PC s'est mis en veille | Réveillez-le, puis relancez `claude remote-control`. |
| Erreur de push sur GitHub | Vérifiez que votre compte GitHub est bien connecté à Claude (claude.ai, Paramètres, Connecteurs). |

---

## À faire plus tard

- Pour la séance de demain, ce guide n'est pas nécessaire : les sessions cloud suffisent avec GitHub et Netlify.
- Si vous voulez générer l'APK localement, il faudra installer Android Studio sur ce PC. Je peux ajouter cette étape au guide.
