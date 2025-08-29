/**
 * DataManager - Gestion centralisée de toutes les données
 * Un seul endroit pour toutes les données du site
 */

export default class DataManager {
    constructor(options = {}) {
        this.config = {
            apiUrl: '/api',
            cacheEnabled: true,
            cacheTimeout: 3600000, // 1 heure en millisecondes
            localStoragePrefix: 'cilaos_',
            ...options
        };

        // Cache mémoire pour les données
        this.cache = new Map();
        
        // État de chargement
        this.loading = new Map();
        
        // Initialisation
        this.init();
    }

    /**
     * Initialisation du gestionnaire de données
     */
    init() {
        // Nettoyer le cache expiré au démarrage
        this.cleanExpiredCache();
        
        // Précharger les données critiques si nécessaire
        if (this.config.preloadCritical) {
            this.preloadCriticalData();
        }
        
        console.log('✅ DataManager initialisé');
    }

    /**
     * ========================================
     * DONNÉES DES HÉBERGEMENTS
     * ========================================
     */
    async getHebergements(type = null) {
        const cacheKey = `hebergements${type ? `_${type}` : ''}`;
        
        // Vérifier le cache
        if (this.hasValidCache(cacheKey)) {
            return this.getFromCache(cacheKey);
        }

        // Essayer de récupérer depuis l'API
        try {
            if (this.config.apiUrl) {
                const endpoint = type ? 
                    `${this.config.apiUrl}/hebergements?type=${type}` : 
                    `${this.config.apiUrl}/hebergements`;
                    
                const response = await fetch(endpoint);
                if (response.ok) {
                    const data = await response.json();
                    this.setCache(cacheKey, data);
                    return data;
                }
            }
        } catch (error) {
            console.log('API non disponible, utilisation des données locales');
        }

        // Données locales par défaut
        const allHebergements = {
            hotels: [
                {
                    id: 1,
                    name: "La Villa Kazuera",
                    type: "hotel",
                    category: "Hôtel",
                    price: 120,
                    capacity: 4,
                    coordinates: { lat: -21.13775, lon: 55.47200 },
                    rating: 4.8,
                    features: ["WiFi", "Piscine", "Vue montagne", "Parking", "Restaurant"],
                    description: "Villa de charme avec vue exceptionnelle sur le cirque",
                    contact: {
                        phone: "+262 262 31 77 77",
                        email: "contact@villakazuera.re",
                        website: "www.villakazuera.re"
                    }
                },
                {
                    id: 2,
                    name: "Otroiza Hotel",
                    type: "hotel",
                    category: "Hôtel",
                    price: 85,
                    capacity: 2,
                    coordinates: { lat: -21.137924, lon: 55.469052 },
                    rating: 4.5,
                    features: ["WiFi", "Restaurant", "Jardin", "Parking"],
                    description: "Hôtel au cœur du village, proche de tous commerces",
                    contact: {
                        phone: "+262 262 31 71 39",
                        email: "otroiza@orange.fr"
                    }
                },
                {
                    id: 3,
                    name: "Hotel Des Neiges",
                    type: "hotel",
                    price: 95,
                    capacity: 2,
                    coordinates: { lat: -21.13383, lon: 55.47475 },
                    rating: 4.6,
                    features: ["WiFi", "Piscine", "Spa", "Restaurant"],
                    description: "Hôtel avec deux piscines et vue sur les montagnes"
                },
                {
                    id: 4,
                    name: "Le Vieux Cep",
                    type: "hotel",
                    price: 75,
                    capacity: 2,
                    coordinates: { lat: -21.13612, lon: 55.47278 },
                    rating: 4.3,
                    features: ["WiFi", "Restaurant", "Bar"],
                    description: "Charme créole authentique, cuisine traditionnelle"
                },
                {
                    id: 5,
                    name: "Tsilaosa Hôtel",
                    type: "hotel",
                    price: 110,
                    capacity: 3,
                    coordinates: { lat: -21.13612, lon: 55.46958 },
                    rating: 4.7,
                    features: ["WiFi", "Jacuzzi", "Vue panoramique"],
                    description: "Architecture créole, idéal pour les randonneurs"
                },
                {
                    id: 6,
                    name: "Hotel Le Cilaos",
                    type: "hotel",
                    price: 90,
                    capacity: 2,
                    coordinates: { lat: -21.13608, lon: 55.47967 },
                    rating: 4.4,
                    features: ["WiFi", "Parking", "Restaurant"],
                    description: "Situation centrale, accès facile aux sentiers"
                }
            ],
            gites: [
                {
                    id: 7,
                    name: "Gîte le Fouquet",
                    type: "gite",
                    category: "Gîte",
                    price: 65,
                    capacity: 6,
                    coordinates: { lat: -21.1360, lon: 55.4680 },
                    rating: 4.5,
                    features: ["WiFi", "Jardin", "Barbecue", "Parking", "Cuisine équipée"],
                    description: "Gîte familial avec grand jardin, proche centre"
                },
                {
                    id: 8,
                    name: "Gîte du Pas de Bellecombe",
                    type: "gite",
                    price: 55,
                    capacity: 4,
                    coordinates: { lat: -21.1380, lon: 55.4750 },
                    rating: 4.3,
                    features: ["Cuisine équipée", "Terrasse", "Vue montagne"],
                    description: "Gîte de montagne, départ de randonnées"
                },
                {
                    id: 9,
                    name: "Gîte Le Relais des Cimes",
                    type: "gite",
                    price: 70,
                    capacity: 8,
                    coordinates: { lat: -21.1320, lon: 55.4690 },
                    rating: 4.6,
                    features: ["WiFi", "Cheminée", "Parking", "Grand séjour"],
                    description: "Grand gîte pour groupes, ambiance montagne"
                },
                {
                    id: 10,
                    name: "Gîte Le Figuier",
                    type: "gite",
                    price: 60,
                    capacity: 5,
                    coordinates: { lat: -21.1370, lon: 55.4760 },
                    rating: 4.4,
                    features: ["Jardin", "Barbecue", "Parking gratuit"],
                    description: "Gîte calme avec jardin tropical"
                }
            ],
            chambres: [
                {
                    id: 11,
                    name: "Case Nyala",
                    type: "chambre",
                    category: "Chambre d'hôtes",
                    price: 80,
                    capacity: 2,
                    coordinates: { lat: -21.1310, lon: 55.4710 },
                    rating: 4.8,
                    features: ["Petit-déjeuner", "WiFi", "Jardin", "Piscine"],
                    description: "Chambres d'hôtes de charme, accueil chaleureux"
                },
                {
                    id: 12,
                    name: "Chambres d'hôtes DORIS",
                    type: "chambre",
                    price: 70,
                    capacity: 2,
                    coordinates: { lat: -21.1365, lon: 55.4685 },
                    rating: 4.6,
                    features: ["Petit-déjeuner", "Terrasse", "Vue"],
                    description: "Vue magnifique, petit-déjeuner généreux"
                }
            ],
            campings: [
                {
                    id: 13,
                    name: "Camping Le Saint François",
                    type: "camping",
                    category: "Camping",
                    price: 25,
                    capacity: 4,
                    coordinates: { lat: -21.1390, lon: 55.4770 },
                    rating: 4.1,
                    features: ["Sanitaires", "Eau chaude", "Électricité"],
                    description: "Camping familial, emplacements ombragés"
                },
                {
                    id: 14,
                    name: "Camping Les Lataniers",
                    type: "camping",
                    price: 20,
                    capacity: 4,
                    coordinates: { lat: -21.1400, lon: 55.4780 },
                    rating: 4.0,
                    features: ["Sanitaires", "Barbecue commun"],
                    description: "Camping nature, proche sentiers de randonnée"
                }
            ]
        };

        // Filtrer par type si spécifié
        if (type && allHebergements[type]) {
            const filtered = allHebergements[type];
            this.setCache(cacheKey, filtered);
            return filtered;
        }

        this.setCache(cacheKey, allHebergements);
        return allHebergements;
    }

    /**
     * ========================================
     * DONNÉES DES RESTAURANTS
     * ========================================
     */
    async getRestaurants() {
        const cacheKey = 'restaurants';
        
        if (this.hasValidCache(cacheKey)) {
            return this.getFromCache(cacheKey);
        }

        // Palette de couleurs pour les restaurants
        const colors = [
            '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', 
            '#FFEAA7', '#DDA0DD', '#98D8C8', '#F7B731', '#5F27CD'
        ];

        const restaurants = [
            {
                id: 1,
                name: "Le Vieux Cep",
                type: "Cuisine traditionnelle",
                cuisine: "Créole",
                price: "€€€",
                color: colors[0],
                coordinates: { lat: -21.13612, lon: 55.47278 },
                rating: 4.6,
                specialites: ["Carry de porc", "Cuisine créole", "Vins locaux"],
                description: "Restaurant emblématique de Cilaos, cuisine créole authentique.",
                contact: {
                    phone: "+262 262 31 71 89",
                    email: "levieuxcep@wanadoo.fr"
                },
                horaires: {
                    lundi: "12:00-14:00, 19:00-21:30",
                    mardi: "12:00-14:00, 19:00-21:30",
                    mercredi: "Fermé",
                    jeudi: "12:00-14:00, 19:00-21:30",
                    vendredi: "12:00-14:00, 19:00-21:30",
                    samedi: "12:00-14:00, 19:00-22:00",
                    dimanche: "12:00-14:30"
                }
            },
            {
                id: 2,
                name: "Le Grilladin",
                type: "Grillades & BBQ",
                cuisine: "Grillades",
                price: "€€",
                color: colors[1],
                coordinates: { lat: -21.1370, lon: 55.4720 },
                rating: 4.3,
                specialites: ["Grillades au feu de bois", "Côte de bœuf", "Saucisses fumées"],
                description: "Spécialiste des grillades au feu de bois.",
                contact: { phone: "+262 262 31 85 42" }
            },
            {
                id: 3,
                name: "La Table de Tatie Jeanne",
                type: "Cuisine familiale",
                cuisine: "Créole familiale",
                price: "€€",
                color: colors[2],
                coordinates: { lat: -21.1340, lon: 55.4695 },
                rating: 4.8,
                specialites: ["Rougail saucisse", "Cari légumes", "Gâteau patate douce"],
                description: "Chez Tatie Jeanne, c'est comme à la maison !",
                contact: { phone: "+262 692 45 67 89" }
            },
            {
                id: 4,
                name: "Le Bistrot Cilaos",
                type: "Bistrot moderne",
                cuisine: "Fusion",
                price: "€€€",
                color: colors[3],
                coordinates: { lat: -21.1355, lon: 55.4715 },
                rating: 4.4,
                specialites: ["Cuisine fusion", "Tartare de thon", "Cocktails créoles"],
                description: "Bistrot moderne alliant tradition créole et techniques contemporaines.",
                contact: { phone: "+262 262 31 79 55" }
            },
            {
                id: 5,
                name: "Le Relais des Cimes",
                type: "Restaurant d'altitude",
                cuisine: "Gastronomique",
                price: "€€€€",
                color: colors[4],
                coordinates: { lat: -21.1320, lon: 55.4690 },
                rating: 4.7,
                specialites: ["Lentilles de Cilaos", "Cerf aux épices", "Fromage de chèvre"],
                description: "Restaurant gastronomique perché dans les hauteurs.",
                contact: {
                    phone: "+262 262 31 85 85",
                    website: "www.relais-des-cimes.re"
                }
            },
            {
                id: 6,
                name: "Chez Loulou",
                type: "Snack créole",
                cuisine: "Snack",
                price: "€",
                color: colors[5],
                coordinates: { lat: -21.1375, lon: 55.4730 },
                rating: 4.2,
                specialites: ["Samoussas", "Bouchons", "Bonbons piment"],
                description: "Le snack incontournable de Cilaos !",
                contact: { phone: "+262 692 12 34 56" }
            },
            {
                id: 7,
                name: "L'Affût",
                type: "Restaurant de chasse",
                cuisine: "Gibier",
                price: "€€€",
                color: colors[6],
                coordinates: { lat: -21.1310, lon: 55.4750 },
                rating: 4.5,
                specialites: ["Civet de cerf", "Cabri massalé", "Charcuterie locale"],
                description: "Spécialiste du gibier et des viandes de caractère.",
                contact: { phone: "+262 262 31 88 77" }
            },
            {
                id: 8,
                name: "La Cascade",
                type: "Restaurant panoramique",
                cuisine: "Créole moderne",
                price: "€€€",
                color: colors[7],
                coordinates: { lat: -21.1340, lon: 55.4670 },
                rating: 4.6,
                specialites: ["Poisson grillé", "Salade de lentilles", "Rhum arrangé"],
                description: "Restaurant avec vue imprenable sur la cascade Bras Rouge.",
                contact: { phone: "+262 262 31 91 23" }
            },
            {
                id: 9,
                name: "Juste",
                type: "Cuisine végétarienne",
                cuisine: "Végétarienne",
                price: "€€",
                color: colors[8],
                coordinates: { lat: -21.1360, lon: 55.4680 },
                rating: 4.4,
                specialites: ["Curry de légumes", "Graines créoles", "Jus de fruits frais"],
                description: "Premier restaurant végétarien de Cilaos.",
                contact: {
                    phone: "+262 692 98 76 54",
                    website: "www.juste-cilaos.re"
                }
            }
        ];

        this.setCache(cacheKey, restaurants);
        return restaurants;
    }

    /**
     * ========================================
     * DONNÉES DES ACTIVITÉS
     * ========================================
     */
    async getActivites() {
        const cacheKey = 'activites';
        
        if (this.hasValidCache(cacheKey)) {
            return this.getFromCache(cacheKey);
        }

        const activites = [
            {
                id: 1,
                name: "Piton des Neiges",
                category: "Randonnée",
                difficulty: "Difficile",
                duration: "7h aller-retour",
                description: "Le toit de l'océan Indien à 3070m d'altitude.",
                icon: "🏔️",
                coordinates: { lat: -21.0971, lon: 55.4781 },
                tips: "Départ très tôt recommandé (3h du matin) pour le lever de soleil"
            },
            {
                id: 2,
                name: "Roche Merveilleuse",
                category: "Randonnée",
                difficulty: "Facile",
                duration: "2h aller-retour",
                description: "Vue panoramique exceptionnelle sur tout le cirque.",
                icon: "👁️",
                coordinates: { lat: -21.1339, lon: 55.4556 },
                tips: "Accessible en voiture jusqu'au parking, puis 30min de marche"
            },
            {
                id: 3,
                name: "Col du Taïbit",
                category: "Randonnée",
                difficulty: "Moyen",
                duration: "4h aller-retour",
                description: "Passage historique entre Cilaos et Mafate.",
                icon: "🥾",
                coordinates: { lat: -21.1208, lon: 55.4878 }
            },
            {
                id: 4,
                name: "Cascade Bras Rouge",
                category: "Randonnée",
                difficulty: "Moyen",
                duration: "3h aller-retour",
                description: "Magnifique cascade de 300m de hauteur.",
                icon: "💧",
                coordinates: { lat: -21.1450, lon: 55.4750 }
            },
            {
                id: 5,
                name: "Escalade",
                category: "Sport",
                difficulty: "Variable",
                duration: "Demi-journée",
                description: "Sites d'escalade pour tous niveaux avec vue sur le cirque.",
                icon: "🧗",
                contact: "Guide: +262 692 XX XX XX"
            },
            {
                id: 6,
                name: "Canyoning",
                category: "Sport",
                difficulty: "Moyen",
                duration: "Journée",
                description: "Descente de rivières et cascades dans un cadre préservé.",
                icon: "🏊",
                contact: "Guide: +262 692 XX XX XX"
            },
            {
                id: 7,
                name: "Thermes de Cilaos",
                category: "Bien-être",
                difficulty: "Facile",
                duration: "2h",
                description: "Détente et bien-être aux eaux thermales.",
                icon: "💆",
                coordinates: { lat: -21.1333, lon: 55.4708 },
                contact: "+262 262 31 72 27"
            },
            {
                id: 8,
                name: "VTT",
                category: "Sport",
                difficulty: "Variable",
                duration: "2-4h",
                description: "Parcours de descente et sentiers techniques.",
                icon: "🚴"
            },
            {
                id: 9,
                name: "Parapente",
                category: "Sport",
                difficulty: "Facile (tandem)",
                duration: "30min de vol",
                description: "Survol du cirque en tandem avec des professionnels.",
                icon: "🪂",
                contact: "Guide: +262 692 XX XX XX"
            },
            {
                id: 10,
                name: "Œnotourisme",
                category: "Culture",
                difficulty: "Facile",
                duration: "1h30",
                description: "Visite du chai et dégustation du vin de Cilaos.",
                icon: "🍷",
                coordinates: { lat: -21.1345, lon: 55.4712 }
            }
        ];

        this.setCache(cacheKey, activites);
        return activites;
    }

    /**
     * ========================================
     * DONNÉES DES ÉVÉNEMENTS
     * ========================================
     */
    async getEvenements() {
        const cacheKey = 'evenements';
        
        if (this.hasValidCache(cacheKey)) {
            return this.getFromCache(cacheKey);
        }

        const evenements = [
            {
                id: 1,
                title: "Festival Sakifo",
                date: "2025-01-15",
                dateDisplay: "15 Janvier 2025",
                time: "14h00 - 23h00",
                location: "Place de l'Église",
                category: "Festival",
                description: "Le plus grand festival de musique de l'océan Indien.",
                participants: 5000,
                color: "#FF8A50",
                image: "images/events/sakifo.jpg",
                status: "upcoming"
            },
            {
                id: 2,
                title: "Trail de Cilaos",
                date: "2025-01-28",
                dateDisplay: "28 Janvier 2025",
                time: "06h00 - 18h00",
                location: "Départ Mairie",
                category: "Sport",
                description: "Course de trail de 42km à travers les sentiers mythiques.",
                participants: 800,
                color: "#A0C878",
                status: "upcoming"
            },
            {
                id: 3,
                title: "Fête des Lentilles",
                date: "2025-02-05",
                dateDisplay: "5 Février 2025",
                time: "10h00 - 20h00",
                location: "Jardin public",
                category: "Culture",
                description: "Célébration annuelle de la lentille de Cilaos IGP.",
                participants: 3000,
                color: "#FF1744",
                status: "upcoming"
            },
            {
                id: 4,
                title: "Marché Forain",
                date: "recurring",
                dateDisplay: "Tous les dimanches",
                time: "06h00 - 13h00",
                location: "Centre-ville",
                category: "Marché",
                description: "Marché hebdomadaire avec produits locaux et artisanat.",
                participants: 500,
                color: "#3b82f6",
                status: "recurring"
            }
        ];

        this.setCache(cacheKey, evenements);
        return evenements;
    }

    /**
     * ========================================
     * MÉTHODES DE CACHE
     * ========================================
     */
    
    /**
     * Vérifier si le cache est valide
     */
    hasValidCache(key) {
        if (!this.config.cacheEnabled) return false;
        
        const cached = this.cache.get(key);
        if (!cached) return false;
        
        const now = Date.now();
        return (now - cached.timestamp) < this.config.cacheTimeout;
    }

    /**
     * Récupérer depuis le cache
     */
    getFromCache(key) {
        const cached = this.cache.get(key);
        return cached ? cached.data : null;
    }

    /**
     * Mettre en cache
     */
    setCache(key, data) {
        if (!this.config.cacheEnabled) return;
        
        this.cache.set(key, {
            data: data,
            timestamp: Date.now()
        });
        
        // Optionnel : sauvegarder dans localStorage pour persistance
        if (this.config.persistCache) {
            this.saveToLocalStorage(key, data);
        }
    }

    /**
     * Nettoyer le cache expiré
     */
    cleanExpiredCache() {
        const now = Date.now();
        
        this.cache.forEach((value, key) => {
            if ((now - value.timestamp) > this.config.cacheTimeout) {
                this.cache.delete(key);
            }
        });
    }

    /**
     * Vider tout le cache
     */
    clearCache() {
        this.cache.clear();
        
        // Nettoyer aussi localStorage si utilisé
        if (this.config.persistCache) {
            this.clearLocalStorage();
        }
    }

    /**
     * ========================================
     * MÉTHODES DE RECHERCHE ET FILTRAGE
     * ========================================
     */
    
    /**
     * Rechercher dans les hébergements
     */
    async searchHebergements(query, filters = {}) {
        const hebergements = await this.getHebergements();
        let results = [];
        
        // Fusionner tous les types d'hébergements
        Object.values(hebergements).forEach(category => {
            results = results.concat(category);
        });
        
        // Recherche par texte
        if (query) {
            const searchTerm = query.toLowerCase();
            results = results.filter(item => 
                item.name.toLowerCase().includes(searchTerm) ||
                item.description.toLowerCase().includes(searchTerm) ||
                item.features.some(f => f.toLowerCase().includes(searchTerm))
            );
        }
        
        // Appliquer les filtres
        if (filters.type) {
            results = results.filter(item => item.type === filters.type);
        }
        
        if (filters.priceMin !== undefined) {
            results = results.filter(item => item.price >= filters.priceMin);
        }
        
        if (filters.priceMax !== undefined) {
            results = results.filter(item => item.price <= filters.priceMax);
        }
        
        if (filters.capacity !== undefined) {
            results = results.filter(item => item.capacity >= filters.capacity);
        }
        
        if (filters.rating !== undefined) {
            results = results.filter(item => item.rating >= filters.rating);
        }
        
        // Tri
        if (filters.sortBy) {
            results.sort((a, b) => {
                switch (filters.sortBy) {
                    case 'price_asc':
                        return a.price - b.price;
                    case 'price_desc':
                        return b.price - a.price;
                    case 'rating':
                        return b.rating - a.rating;
                    case 'name':
                        return a.name.localeCompare(b.name);
                    default:
                        return 0;
                }
            });
        }
        
        return results;
    }

    /**
     * ========================================
     * MÉTHODES UTILITAIRES
     * ========================================
     */
    
    /**
     * Obtenir un élément par ID
     */
    async getItemById(type, id) {
        let data;
        
        switch (type) {
            case 'hebergement':
                data = await this.getHebergements();
                // Parcourir toutes les catégories
                for (const category of Object.values(data)) {
                    const found = category.find(item => item.id === id);
                    if (found) return found;
                }
                break;
                
            case 'restaurant':
                data = await this.getRestaurants();
                return data.find(item => item.id === id);
                
            case 'activite':
                data = await this.getActivites();
                return data.find(item => item.id === id);
                
            case 'evenement':
                data = await this.getEvenements();
                return data.find(item => item.id === id);
                
            default:
                return null;
        }
        
        return null;
    }

    /**
     * Obtenir les statistiques
     */
    async getStatistics() {
        const [hebergements, restaurants, activites, evenements] = await Promise.all([
            this.getHebergements(),
            this.getRestaurants(),
            this.getActivites(),
            this.getEvenements()
        ]);
        
        let totalHebergements = 0;
        Object.values(hebergements).forEach(category => {
            totalHebergements += category.length;
        });
        
        return {
            hebergements: {
                total: totalHebergements,
                hotels: hebergements.hotels?.length || 0,
                gites: hebergements.gites?.length || 0,
                chambres: hebergements.chambres?.length || 0,
                campings: hebergements.campings?.length || 0
            },
            restaurants: restaurants.length,
            activites: activites.length,
            evenements: evenements.length,
            lastUpdate: new Date().toISOString()
        };
    }

    /**
     * Sauvegarder dans localStorage
     */
    saveToLocalStorage(key, data) {
        try {
            const storageKey = `${this.config.localStoragePrefix}${key}`;
            localStorage.setItem(storageKey, JSON.stringify({
                data: data,
                timestamp: Date.now()
            }));
        } catch (error) {
            console.warn('Impossible de sauvegarder dans localStorage:', error);
        }
    }

    /**
     * Charger depuis localStorage
     */
    loadFromLocalStorage(key) {
        try {
            const storageKey = `${this.config.localStoragePrefix}${key}`;
            const stored = localStorage.getItem(storageKey);
            
            if (stored) {
                const parsed = JSON.parse(stored);
                const now = Date.now();
                
                if ((now - parsed.timestamp) < this.config.cacheTimeout) {
                    return parsed.data;
                }
            }
        } catch (error) {
            console.warn('Impossible de charger depuis localStorage:', error);
        }
        
        return null;
    }

    /**
     * Nettoyer localStorage
     */
    clearLocalStorage() {
        const prefix = this.config.localStoragePrefix;
        const keys = Object.keys(localStorage);
        
        keys.forEach(key => {
            if (key.startsWith(prefix)) {
                localStorage.removeItem(key);
            }
        });
    }

    /**
     * Précharger les données critiques
     */
    async preloadCriticalData() {
        console.log('Préchargement des données critiques...');
        
        // Charger en parallèle pour optimiser
        await Promise.all([
            this.getHebergements(),
            this.getRestaurants()
        ]);
        
        console.log('Données critiques préchargées');
    }

    /**
     * Détruire le gestionnaire
     */
    destroy() {
        this.clearCache();
        console.log('DataManager détruit');
    }
}