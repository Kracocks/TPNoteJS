# TPNoteJS - Utilisation de json-server

## Installation de `json-server`

Pour installer `json-server`, exécute la commande suivante dans ton terminal :

```bash
npm install json-server
```

## Lancement de `json-server`

Pour lancer le `json-server`, exécute la commande suivante dans ton terminal : 


```bash
npx json-server json/character.json
``` 

## Lancement du site

Afin d'acceder au site, exécute la commande suivante dans ton terminal : 

```bash
php -S localhost:8000
```

# Inforamtions

## Fonctionnalités
- Pagination
- Filtrage des équipements
- Barre de recherche personnages et équipements
- Gestion des favories (local storage)
- Notes (moyenne)
- Gestion des images (lazy loading)

## Modules
- AllCharacters : vue de tout les personnages
- showCharacter : vue d'un personnage
- AllItems : vue de tout les équipements
- showItem : vue d'un équipements
- allFavorites : vue de tout les personnages et équipements dans les favories
- error404 : page non trouvé

## Services
- utils : les utilitaires (parseUrl)
- provider : provider des personnages
- itemProvider : provider des équipements

## Modèles
- character : classe pour les personnages
- item : classe pour les équipements
