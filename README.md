# Theme Park Rides Microservice

Ce microservice fournit des informations sur les montagnes russes dans les parcs à thème, notamment leur état de fonctionnement, les parcs offrant le plus de manèges accessibles pour une certaine hauteur et les manèges les plus rapides ou les plus hauts.

## Prérequis

- Node.js
- npm

## Installation

Clonez le dépôt et installez les dépendances nécessaires :

```bash
git clone <votre-url-de-repo>
cd <votre-repo>
npm install
```

## Démarrage de l'API

Pour lancer l'API, utilisez la commande suivante :

```bash
npm start
```

L'API sera accessible à `http://localhost:3000`.

## Utilisation de l'API

### 1. Obtenir les manèges par nom de parc

- **Endpoint**: `/rides`
- **Méthode**: `GET`
- **Query Paramètre**: `park` (nom du parc)

#### Exemple de requête avec postman :

1. Ouvrez postman.
1. Créez une nouvelle requête.
1. Sélectionnez `GET` comme méthode HTTP.
1. Entrez l'URL `http://localhost:3000/rides` dans le champ d'URL.
1. Ajoutez un paramètre de requête avec la clé `park` et la valeur `Coney Island`.
1. Cliquez sur Send.

#### Exemple de réponse :

```json
{
  "openRides": [
    {
      "coaster_name": "Switchback Railway",
      "location": "Coney Island",
      "status": "operating",
      "speed_mph": 6,
      "height_value": 50,
      "height_restriction": "122 cm"
    }
  ],
  "closedRides": [],
  "removedRides": []
}
```

### 2. Obtenir le parc offrant le plus de manèges pour une hauteur donnée

- **Endpoint**: `/best-park-for-height`
- **Méthode**: `GET`
- **Query Paramètre**: `height` (hauteur en cm)

#### Exemple de requête avec Postman:

1. Ouvrez postman.
1. Créez une nouvelle requête.
1. Sélectionnez `GET` comme méthode HTTP.
1. Entrez l'URL `http://localhost:3000/best-park-for-height` dans le champ d'URL.
1. Ajoutez un paramètre de requête avec la clé `height` et la valeur `130`.
1. Cliquez sur Send.

#### Exemple de réponse :

```json
{
  "park": "Wonderland",
  "count": 3
}
```

### 3. Obtenir les manèges les plus rapides ou les plus hauts

- **Endpoint**: `/extreme-rides`
- **Méthode**: `GET`
- **Query Paramètres**: 
  - `type` (valeurs possibles : `fastest`, `highest`)
  - `threshold` (valeur de seuil)

#### Exemple de requête pour les manèges les plus rapides avec Postman :

1. Ouvrez Postman.
1. Créez une nouvelle requête.
1. Sélectionnez GET comme méthode HTTP.
1. Entrez l'URL http://localhost:3000/extreme-rides dans le champ d'URL.
1. Ajoutez des paramètres de requête avec la clé type et la valeur `fastest`, et la clé threshold avec la valeur `100`.
1. Cliquez sur Send.

#### Exemple de réponse :

```json
[
  {
    "coaster_name": "Thunderbolt",
    "location": "Luna Park",
    "status": "operating",
    "speed_mph": 55,
    "height_value": 115,
    "height_restriction": "127 cm"
  },
  {
    "coaster_name": "Fast Ride",
    "location": "Wonderland",
    "status": "operating",
    "speed_mph": 60,
    "height_value": 110,
    "height_restriction": "130 cm"
  }
]
```

#### Exemple de requête pour les manèges les plus hauts avec Postman :

1. Ouvrez Postman.
1. Créez une nouvelle requête.
1. Sélectionnez GET comme méthode HTTP.
1. Entrez l'URL http://localhost:3000/extreme-rides dans le champ d'URL.
1. Ajoutez des paramètres de requête avec la clé type et la valeur `highest`, et la clé threshold avec la valeur `300`.
1. Cliquez sur Send.

#### Exemple de réponse :

```json
[
  {
    "coaster_name": "Thunderbolt",
    "location": "Luna Park",
    "status": "operating",
    "speed_mph": 55,
    "height_value": 115,
    "height_restriction": "127 cm"
  },
  {
    "coaster_name": "Another Ride",
    "location": "Wonderland",
    "status": "operating",
    "speed_mph": 50,
    "height_value": 120,
    "height_restriction": "137–196 cm"
  },
  {
    "coaster_name": "High Ride",
    "location": "Wonderland",
    "status": "operating",
    "speed_mph": 45,
    "height_value": 125,
    "height_restriction": "135 cm"
  }
]
```

## Exécution des tests

Pour exécuter les tests, utilisez la commande suivante :

```bash
npm test
```

Les tests vérifient les fonctionnalités principales de l'API, y compris la récupération des manèges par parc, la détermination du meilleur parc pour une hauteur donnée et la récupération des manèges les plus extrêmes.

## Structure du projet

- **src/controllers** : Contient les contrôleurs qui traitent les requêtes et renvoient les réponses.
- **src/services** : Contient les services qui implémentent la logique métier.
- **src/utils** : Contient les utilitaires et les fonctions de récupération de données.
- **tests** : Contient les tests unitaires pour les différentes fonctionnalités de l'API.

## Remarques

- Assurez-vous que l'URL de l'API dans `src/utils/dataFetcher.ts` est correcte et accessible.
