# Documentation du Projet API Next.js

## C'est quoi ?

Ce projet est une application **Next.js** qui fournit une API REST pour la gestion des films et des commentaires.  
Il comprend notamment :

- Des endpoints pour récupérer, ajouter, modifier et supprimer des films via leur ID.
- Des endpoints pour récupérer et gérer les commentaires associés aux films.
- Un système d'authentification complet avec des routes dédiées pour le login, le signup et le refresh de token, basé sur JWT.
- Un middleware de protection pour sécuriser les routes nécessitant une authentification.

## Comment le lancer ?

1. **Cloner le dépôt :**

   ```bash
   git clone <URL_DU_DEPOT>
   cd <NOM_DU_REPO>
   ```

2. **Installer les dépendances :**

   ```bash
   npm install
   ```

3. **Configurer les variables d'environnement :**

   Créez un fichier `.env.local` à la racine du projet et ajoutez-y les variables nécessaires, par exemple :

   ```env
   MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/sample_mflix?retryWrites=true&w=majority
   JWT_SECRET=une_clé_secrète
   ```

4. **Lancer le projet en mode développement :**

   ```bash
   npm run dev
   ```

5. **Accéder à l'API et à la documentation :**

   - L'API est accessible via `http://localhost:3000/api`
   - La documentation Swagger (si configurée) est accessible via `http://localhost:3000/api-doc`

## Avec quoi il communique ?

Le projet communique avec une base de données **MongoDB**.  
Il utilise le package `mongodb` pour se connecter à la base de données et gérer les opérations CRUD.

### Exemple de configuration MongoDB

Dans le fichier `lib/mongodb.ts` (ou un équivalent), la connexion à MongoDB est établie de la manière suivante :

   ```ts
   import { MongoClient } from 'mongodb';

   const uri = process.env.MONGODB_URI;
   if (!uri) {
     throw new Error('MONGODB_URI is not défini dans les variables d’environnement');
   }

   let client = new MongoClient(uri);
   let clientPromise = client.connect();

   export default clientPromise;
   ```

## Sur quoi est-il déployé ?

L'application est déployée sur **Vercel**, la plateforme officielle de déploiement pour Next.js.  
Elle est accessible en production à l'adresse : [https://dev-service-cloud.vercel.app/](https://dev-service-cloud.vercel.app/)

### Stack et Architecture Cloud

- **Stack Technique :**
  - **Front-end / API :** Next.js, qui gère à la fois le rendu côté serveur et la création d’API via le dossier `app/api`.
  - **Base de données :** MongoDB, utilisée pour stocker et récupérer les données (films, commentaires, utilisateurs).
  - **Authentification :** JWT pour la gestion sécurisée des sessions et `bcrypt` pour le hachage des mots de passe.
  - **Connexion à MongoDB :** Utilisation d'un pool de connexions via le package `mongodb`.

- **Architecture Cloud :**
  - **Déploiement continu :** Vercel offre une intégration Git, permettant des déploiements automatiques à chaque push sur la branche principale.
  - **CDN et Optimisation :** Vercel optimise les performances avec un CDN global, réduisant la latence et améliorant l’expérience utilisateur.
  - **Sécurité et Configuration :** Les variables d'environnement sont gérées de manière sécurisée via l’interface Vercel.
  - **Scalabilité :** Grâce à l'architecture serverless de Vercel, l'application peut évoluer en fonction du trafic sans gestion manuelle de serveurs.
