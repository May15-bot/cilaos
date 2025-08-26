#  Site Web Office de Tourisme de Cilaos

##  Table des matières

[Vue d'ensemble](#vue-densemble)
- [Architecture du projet](#architecture-du-projet)
- [Installation](#installation)
- [Structure des fichiers](#structure-des-fichiers)


##  Vue d'ensemble

Site web moderne pour l'Office de Tourisme de Cilaos, La Réunion. Architecture modulaire et responsive.

### Technologies utilisées

- **HTML** avec sémantique optimisée
- **CSS** avec architecture modulaire et variables CSS
- **JavaScript** avec modules
- **Leaflet** pour les cartes interactives
- **Swiper.js** pour les carrousels

### Fonctionnalités principales

-  **Hébergements** : Système de filtrage et recherche avancé
-  **Restaurants** : Carte interactive avec informations détaillées
-  **Activités** : Randonnées et points d'intérêt
-  **Cartes interactives** : Navigation et localisation
-  **Responsive** : Optimisé mobile, tablette et desktop

##  Architecture du projet

```
cilaos-tourisme/
│
├── 📁 assets/
│   ├── 📁 css/
│   │   ├── base.css          # Variables, reset, typographie
│   │   ├── layout.css         # Grilles et structures
│   │   ├── components.css    # Composants réutilisables
│   │   ├── 📁 pages/         # Styles spécifiques par page
│   │   └── main.css          # Import principal
│   │
│   ├── 📁 js/
│   │   ├── 📁 modules/       # Modules JavaScript
│   │   ├── 📁 data/          # Données centralisées
│   │   ├── config.js         # Configuration
│   │   └── main.js           # Point d'entrée
│   │
│   ├── 📁 images/            # Images optimisées
│   └── 📁 videos/            # Vidéos (WebM + MP4)
│
├── index.html                # Page d'accueil
├── sejour.html              # Page hébergements
├── tourisme.html            # Page tourisme/restaurants
└── README.md                # Documentation
```

---

Développé par Mayza pour Cilaos 