# Utilisez une image de base avec Node.js installé
FROM node:14

# Définir le répertoire de travail à l'intérieur du conteneur
WORKDIR /app

# Copiez le fichier package.json dans le conteneur
COPY package*.json ./

# Installer les dépendances de l'API
RUN npm install

# Copiez le code source de l'API dans le conteneur
COPY ./build ./build

# Définir la variable d'environnement pour l'API
ENV PORT=3000

# Exposez le port utilisé par l'API
EXPOSE 3000

# Démarrer l'API en utilisant le gestionnaire de processus PM2
CMD ["npm", "start"]