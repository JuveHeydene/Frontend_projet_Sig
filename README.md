# Guide : Installer et Lancer le Projet Next.js (Frontend de notre application)

Ce guide décrit les étapes complètes pour installer et lancer frontend sur les systèmes Windows et Ubuntu.

---

## Prérequis

1. **Node.js et npm**
   - Assurez-vous que Node.js et npm (Node Package Manager) sont installés sur votre système.
   - Vous pouvez vérifier les versions installées en exécutant :
     ```bash
     node -v
     npm -v
     ```
   - Si vous devez installer Node.js :
     - Téléchargez-le depuis [nodejs.org](https://nodejs.org/) (pour Windows).
     - Utilisez les commandes apt sur Ubuntu (voir ci-dessous).



---

## Étapes pour Windows

### 1. Installation des dépendances

- **Installer Node.js et npm** :
  1. Téléchargez l'installateur Node.js depuis [nodejs.org](https://nodejs.org/).
  2. Suivez les instructions pour installer Node.js et npm.


     ```


### 3. Installer les dépendances du projet

1. Exécutez la commande suivante pour installer les packages nécessaires :
   ```bash
   npm install
   ```

### 4. Lancer le projet

1. Démarrez le serveur de développement :
   ```bash
   npm run dev
   ```
2. Ouvrez votre navigateur et accédez à :
   ```
   http://localhost:3000
   ```

---

## Étapes pour Ubuntu

### 1. Installation des dépendances

- **Installer Node.js et npm** :
  1. Mettez à jour votre gestionnaire de paquets :
     ```bash
     sudo apt update
     ```
  2. Installez Node.js et npm :
     ```bash
     sudo apt install nodejs npm -y
     ```
  3. Vérifiez les versions :
     ```bash
     node -v
     npm -v
     ```


### 3. Installer les dépendances du projet

1. Exécutez la commande suivante pour installer les packages nécessaires depuis le repertoire racine du projet :
   ```bash
   npm install
   ```

### 4. Lancer le projet

1. Démarrez le serveur de développement :
   ```bash
   npm run dev
   ```
2. Ouvrez votre navigateur et accédez à :
   ```
   http://localhost:3000
   ```

---

## Résolution des problèmes courants

1. **Problème : Commande non trouvée**
   - Assurez-vous que Node.js, npm et Git sont correctement installés et ajoutés au PATH (sous Windows).

2. **Erreur lors de l'installation des packages**
   - Essayez de supprimer le dossier `node_modules` et le fichier `package-lock.json`, puis exécutez `npm install` à nouveau :
     ```bash
     rm -rf node_modules package-lock.json
     npm install
     ```

3. **Port déjà utilisé**
   - Si le port 3000 est déjà utilisé, spécifiez un autre port en lançant le projet :
     ```bash
     PORT=3001 npm run dev
     
Si vous rencontrez des problèmes, vérifiez chaque étape ou contactez le support.
Tel : +237 690982591 / Jamesnyemeck@gmail.com