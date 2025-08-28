// ================================================
// Module de gestion des données centralisées
// Avec support API pour l'administration
// ================================================

class DataManager {
    constructor() {
        this.apiUrl = '/api'; // URL de base de l'API
        this.cache = {
            hebergements: null,
            restaurants: null,
            activites: null,
            evenements: null
        };
    }

    // ================================================
    // RESTAURANTS avec couleurs personnalisées
    // ================================================
    
    // Palette de couleurs pour les restaurants
    getRestaurantColors() {
        return [
            '#FF6B6B', // Rouge corail
            '#4ECDC4', // Turquoise
            '#45B7D1', // Bleu ciel
            '#96CEB4', // Vert menthe
            '#FFEAA7', // Jaune pastel
            '#DDA0DD', // Prune
            '#98D8C8', // Vert d'eau
            '#F7B731', // Orange doré
            '#5F27CD'  // Violet profond
        ];
    }

    async getRestaurants() {
        try {
            // Tenter de récupérer depuis l'API
            const response = await fetch(`${this.apiUrl}/restaurants`);
            if (response.ok) {
                const data = await response.json();
                this.cache.restaurants = data;
                return data;
            }
        } catch (error) {
            console.log('API non disponible, utilisation des données locales');
        }

        // Données locales avec couleurs
        const colors = this.getRestaurantColors();
        const restaurants = [
            {
                id: 1,
                name: "Le Vieux Cep",
                type: "Cuisine traditionnelle",
                cuisine: "Créole",
                price: "€€€",
                color: colors[0], // Rouge corail
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
                color: colors[1], // Turquoise
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
                color: colors[2], // Bleu ciel
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
                color: colors[3], // Vert menthe
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
                color: colors[4], // Jaune pastel
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
                color: colors[5], // Prune
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
                color: colors[6], // Vert d'eau
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
                color: colors[7], // Orange doré
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
                color: colors[8], // Violet profond
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

        this.cache.restaurants = restaurants;
        return restaurants;
    }

    // ================================================
    // ÉVÉNEMENTS pour la section Agenda
    // ================================================
    
    async getEvenements() {
        try {
            const response = await fetch(`${this.apiUrl}/evenements`);
            if (response.ok) {
                const data = await response.json();
                this.cache.evenements = data;
                return data;
            }
        } catch (error) {
            console.log('API non disponible, utilisation des données locales');
        }

        // Données locales des événements
        const evenements = [
            {
                id: 1,
                title: "Festival Sakifo",
                date: "2025-01-15",
                dateDisplay: "15 Janvier 2025",
                time: "14h00 - 23h00",
                location: "Place de l'Église",
                category: "Festival",
                description: "Le plus grand festival de musique de l'océan Indien avec des artistes locaux et internationaux.",
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
                description: "Course de trail de 42km à travers les sentiers mythiques du cirque.",
                participants: 800,
                color: "#A0C878",
                image: "images/events/trail.jpg",
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
                description: "Célébration annuelle de la lentille de Cilaos IGP avec dégustations et animations.",
                participants: 3000,
                color: "#FF1744",
                image: "images/events/lentilles.jpg",
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
                description: "Marché hebdomadaire avec produits locaux, artisanat et saveurs créoles.",
                participants: 500,
                color: "#3b82f6",
                image: "images/events/marche.jpg",
                status: "recurring"
            }
        ];

        this.cache.evenements = evenements;
        return evenements;
    }

    // ================================================
    // HÉBERGEMENTS
    // ================================================
    
    async getHebergements() {
        try {
            const response = await fetch(`${this.apiUrl}/hebergements`);
            if (response.ok) {
                const data = await response.json();
                this.cache.hebergements = data;
                return data;
            }
        } catch (error) {
            console.log('API non disponible, utilisation des données locales');
        }

        // Retourner les données locales existantes
        return this.getLocalHebergements();
    }

    getLocalHebergements() {
        // Reprendre vos données existantes d'hébergements
        return {
            hotels: [
                // ... vos données existantes
            ],
            gites: [
                // ... vos données existantes
            ],
            campings: [
                // ... vos données existantes
            ]
        };
    }

    // ================================================
    // ACTIVITÉS
    // ================================================
    
    async getActivites() {
        try {
            const response = await fetch(`${this.apiUrl}/activites`);
            if (response.ok) {
                const data = await response.json();
                this.cache.activites = data;
                return data;
            }
        } catch (error) {
            console.log('API non disponible, utilisation des données locales');
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
                status: "active"
            },
            {
                id: 2,
                name: "Roche Merveilleuse",
                category: "Randonnée",
                difficulty: "Facile",
                duration: "2h aller-retour",
                description: "Vue panoramique exceptionnelle sur tout le cirque.",
                icon: "👁️",
                status: "active"
            },
            {
                id: 3,
                name: "Escalade",
                category: "Sport",
                difficulty: "Variable",
                duration: "Demi-journée",
                description: "Sites d'escalade pour tous niveaux avec vue sur le cirque.",
                icon: "🧗",
                status: "active"
            },
            {
                id: 4,
                name: "Canyoning",
                category: "Sport",
                difficulty: "Moyen",
                duration: "Journée",
                description: "Descente de rivières et cascades dans un cadre préservé.",
                icon: "🏊",
                status: "active"
            },
            {
                id: 5,
                name: "Thermes de Cilaos",
                category: "Bien-être",
                difficulty: "Facile",
                duration: "2h",
                description: "Détente et bien-être aux eaux thermales.",
                icon: "💆",
                status: "active"
            }
        ];

        this.cache.activites = activites;
        return activites;
    }

    // ================================================
    // MÉTHODES DE SAUVEGARDE (pour l'admin)
    // ================================================
    
    async saveRestaurant(restaurant) {
        try {
            const response = await fetch(`${this.apiUrl}/restaurants/${restaurant.id || ''}`, {
                method: restaurant.id ? 'PUT' : 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(restaurant)
            });
            
            if (response.ok) {
                // Rafraîchir le cache
                this.cache.restaurants = null;
                return await response.json();
            }
        } catch (error) {
            console.error('Erreur lors de la sauvegarde:', error);
            // En mode local, sauvegarder dans localStorage
            this.saveToLocalStorage('restaurants', restaurant);
        }
    }

    async saveEvenement(evenement) {
        try {
            const response = await fetch(`${this.apiUrl}/evenements/${evenement.id || ''}`, {
                method: evenement.id ? 'PUT' : 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(evenement)
            });
            
            if (response.ok) {
                this.cache.evenements = null;
                return await response.json();
            }
        } catch (error) {
            console.error('Erreur lors de la sauvegarde:', error);
            this.saveToLocalStorage('evenements', evenement);
        }
    }

    // Sauvegarde locale (fallback)
    saveToLocalStorage(type, data) {
        const key = `cilaos_${type}`;
        let items = JSON.parse(localStorage.getItem(key) || '[]');
        
        if (data.id) {
            // Mise à jour
            const index = items.findIndex(item => item.id === data.id);
            if (index !== -1) {
                items[index] = data;
            } else {
                items.push(data);
            }
        } else {
            // Création
            data.id = Date.now(); // ID temporaire
            items.push(data);
        }
        
        localStorage.setItem(key, JSON.stringify(items));
        return data;
    }

    // Récupération depuis localStorage
    getFromLocalStorage(type) {
        const key = `cilaos_${type}`;
        return JSON.parse(localStorage.getItem(key) || '[]');
    }

    // ================================================
    // MÉTHODES DE SUPPRESSION
    // ================================================
    
    async deleteItem(type, id) {
        try {
            const response = await fetch(`${this.apiUrl}/${type}/${id}`, {
                method: 'DELETE'
            });
            
            if (response.ok) {
                this.cache[type] = null;
                return true;
            }
        } catch (error) {
            console.error('Erreur lors de la suppression:', error);
            // Suppression locale
            this.deleteFromLocalStorage(type, id);
        }
    }

    deleteFromLocalStorage(type, id) {
        const key = `cilaos_${type}`;
        let items = JSON.parse(localStorage.getItem(key) || '[]');
        items = items.filter(item => item.id !== id);
        localStorage.setItem(key, JSON.stringify(items));
    }
}

// Exporter l'instance du gestionnaire de données
const dataManager = new DataManager();
export default dataManager;