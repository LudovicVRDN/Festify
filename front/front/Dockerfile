# --- Étape 1 : build ---
FROM node:20-alpine AS build
WORKDIR /app

# On copie d'abord seulement les fichiers de dépendances
# pour profiter du cache Docker (rebuild plus rapide si le code change mais pas les deps)
COPY package*.json ./
RUN npm install

# On copie le reste du code
COPY . .

# Variable d'env injectée au build (Vite en a besoin AVANT le build, pas à l'exécution)
ARG VITE_API_URL
ENV VITE_API_URL=$VITE_API_URL

RUN npm run build

# --- Étape 2 : serveur de prod (nginx) ---
FROM nginx:alpine

# On supprime la config par défaut de nginx et on met la nôtre
COPY nginx.conf /etc/nginx/conf.d/default.conf

# On copie uniquement le résultat du build (dossier dist) depuis l'étape précédente
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]