 // Base de données des hébergements (gardée identique)
        const hebergements = [
            // Hôtels
            {
                id: 1,
                name: "La Villa Kazuera",
                type: "hotel",
                price: 120,
                capacity: 4,
                lat: -21.13775,
                lon: 55.47200,
                rating: 4.8,
                features: ["WiFi", "Piscine", "Vue montagne", "Parking"],
                description: "Villa de charme avec vue exceptionnelle sur le cirque"
            },
            {
                id: 2,
                name: "Otroiza Hotel",
                type: "hotel",
                price: 85,
                capacity: 2,
                lat: -21.137924,
                lon: 55.469052,
                rating: 4.5,
                features: ["WiFi", "Restaurant", "Jardin"],
                description: "Hôtel au cœur du village, proche de tous commerces"
            },
            {
                id: 3,
                name: "Hotel Des Neiges",
                type: "hotel",
                price: 95,
                capacity: 2,
                lat: -21.13383,
                lon: 55.47475,
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
                lat: -21.13612,
                lon: 55.47278,
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
                lat: -21.13612,
                lon: 55.46958,
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
                lat: -21.13608,
                lon: 55.47967,
                rating: 4.4,
                features: ["WiFi", "Parking", "Restaurant"],
                description: "Situation centrale, accès facile aux sentiers"
            },
            // Gîtes
            {
                id: 7,
                name: "Gîte le Fouquet",
                type: "gite",
                price: 65,
                capacity: 6,
                lat: -21.1360,
                lon: 55.4680,
                rating: 4.5,
                features: ["WiFi", "Jardin", "Barbecue", "Parking"],
                description: "Gîte familial avec grand jardin, proche centre"
            },
            {
                id: 8,
                name: "Gîte du Pas de Bellecombe",
                type: "gite",
                price: 55,
                capacity: 4,
                lat: -21.1380,
                lon: 55.4750,
                rating: 4.3,
                features: ["Cuisine équipée", "Terrasse", "Vue"],
                description: "Gîte de montagne, départ de randonnées"
            },
            {
                id: 9,
                name: "Gîte Le Relais des Cimes",
                type: "gite",
                price: 70,
                capacity: 8,
                lat: -21.1320,
                lon: 55.4690,
                rating: 4.6,
                features: ["WiFi", "Cheminée", "Parking"],
                description: "Grand gîte pour groupes, ambiance montagne"
            },
            {
                id: 10,
                name: "Gîte Le Figuier",
                type: "gite",
                price: 60,
                capacity: 5,
                lat: -21.1370,
                lon: 55.4760,
                rating: 4.4,
                features: ["Jardin", "Barbecue", "Parking gratuit"],
                description: "Gîte calme avec jardin tropical"
            },
            // Campings
            {
                id: 17,
                name: "Camping Le Saint François",
                type: "camping",
                price: 25,
                capacity: 4,
                lat: -21.1390,
                lon: 55.4770,
                rating: 4.1,
                features: ["Sanitaires", "Eau chaude", "Électricité"],
                description: "Camping familial, emplacements ombragés"
            },
            {
                id: 18,
                name: "Camping Les Lataniers",
                type: "camping",
                price: 20,
                capacity: 4,
                lat: -21.1400,
                lon: 55.4780,
                rating: 4.0,
                features: ["Sanitaires", "Barbecue commun"],
                description: "Camping nature, proche sentiers de randonnée"
            },
            {
                id: 19,
                name: "Camping du Grand Bénare",
                type: "camping",
                price: 30,
                capacity: 6,
                lat: -21.1380,
                lon: 55.4760,
                rating: 4.3,
                features: ["Bungalows", "Électricité", "WiFi"],
                description: "Camping avec option bungalows"
            }
        ];

        // Images pour les slideshows par catégorie
        const categoryImages = {
    
        };

        
        // Variables globales
        let currentSlideIndex = 0;
        let currentCategoryImages = [];


// Variables globales
// (slideshow supprimé, donc rien à déclarer ici)

// Initialisation
document.addEventListener('DOMContentLoaded', function() {
    console.log('✅ Hébergements Cilaos initialisé sans slideshow !');
});

// Ouvrir une catégorie
function openCategory(categoryType) {
    const popup = document.getElementById('categoryPopup');
    const title = document.getElementById('popupTitle');
    const subtitle = document.getElementById('popupSubtitle');
    
    // Configuration selon la catégorie
    const categoryConfig = {
        hotel: {
            title: 'Hôtels à Cilaos',
            subtitle: '6 hôtels de charme pour votre séjour',
            icon: '🏨'
        },
        gite: {
            title: 'Gîtes à Cilaos', 
            subtitle: '3 gîtes authentiques dans le cirque',
            icon: '🏡'
        },
        camping: {
            title: 'Campings à Cilaos',
            subtitle: '3 campings nature pour les aventuriers',
            icon: '⛺'
        }
    };

    const config = categoryConfig[categoryType];
    
    // Mettre à jour le titre
    title.textContent = config.title;
    subtitle.textContent = config.subtitle;
    
    // Afficher la liste des hébergements (uniquement)
    displayCategoryHebergements(categoryType);
    
    // Afficher le popup
    popup.style.display = 'flex';
    setTimeout(() => {
        popup.style.opacity = '1';
    }, 10);
}

// Fermer la catégorie
function closeCategory() {
    const popup = document.getElementById('categoryPopup');
    popup.style.opacity = '0';
    setTimeout(() => {
        popup.style.display = 'none';
    }, 300);
}

// Afficher les hébergements d'une catégorie
function displayCategoryHebergements(categoryType) {
    const listContainer = document.getElementById('hebergementsPopupList');
    const filtered = hebergements.filter(h => h.type === categoryType);
    
    let html = '';
    
    filtered.forEach(item => {
        const stars = generateStars(item.rating);
        html += `
            <div class="hebergement-item" style="margin-bottom: 1rem; padding: 1rem; background: var(--couleur-surface); border-radius: 10px;">
                <div class="hebergement-header-item" style="display: flex; justify-content: space-between; margin-bottom: 0.5rem;">
                    <div>
                        <div class="hebergement-name" style="font-size: 1.2rem; font-weight: 600;">${item.name}</div>
                        <span class="hebergement-type" style="background: var(--couleur-accent); color: white; padding: 2px 8px; border-radius: 12px; font-size: 0.8rem;">${getTypeLabel(item.type)}</span>
                    </div>
                    <div class="hebergement-price" style="color: var(--couleur-accent); font-weight: bold;">€${item.price}/nuit</div>
                </div>
                <div class="hebergement-details" style="color: #666; margin: 0.5rem 0;">${item.description}</div>
                <div class="hebergement-details" style="color: #666;">👥 ${item.capacity} personnes</div>
                <div class="hebergement-features" style="display: flex; gap: 0.5rem; flex-wrap: wrap; margin: 0.5rem 0;">
                    ${item.features.map(f => `<span style="background: rgba(160,200,120,0.1); color: var(--couleur-accent); padding: 2px 6px; border-radius: 5px; font-size: 0.8rem;">${f}</span>`).join('')}
                </div>
                <div class="rating" style="display: flex; align-items: center; gap: 0.3rem;">
                    ${stars} <span style="color: #999; font-size: 0.9rem;">(${item.rating})</span>
                </div>
            </div>
        `;
    });
    
    listContainer.innerHTML = html;
}

// Générer les étoiles
function generateStars(rating) {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 >= 0.5;
    let stars = '';
    
    for (let i = 0; i < fullStars; i++) {
        stars += '<span class="star" style="color: #FFD700;">★</span>';
    }
    if (halfStar) {
        stars += '<span class="star" style="color: #FFD700;">☆</span>';
    }
    
    return stars;
}

// Obtenir le label du type
function getTypeLabel(type) {
    const labels = {
        hotel: '🏨 Hôtel',
        gite: '🏡 Gîte',
        chambre: '🛏️ Chambre d\'hôtes',
        camping: '⛺ Camping'
    };
    return labels[type] || type;
}

// Fermer avec Escape
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        closeCategory();
    }
});




        // Base de données des restaurants
        const restaurants = [
            {
                id: 1,
                name: "Le Vieux Cep",
                type: "Cuisine traditionnelle",
                price: "€€€",
                lat: -21.13612,
                lon: 55.47278,
                rating: 4.6,
                emoji: "🍷",
                specialites: ["Carry de porc", "Cuisine créole", "Vins locaux"],
                description: "Restaurant emblématique de Cilaos, le Vieux Cep vous propose une cuisine créole authentique dans un cadre traditionnel. Spécialiste des carrys et des plats mijotés, accompagnés d'une sélection de vins de Cilaos."
            },
            {
                id: 2,
                name: "Le Grilladin",
                type: "Grillades & BBQ",
                price: "€€",
                lat: -21.1370,
                lon: 55.4720,
                rating: 4.3,
                emoji: "🔥",
                specialites: ["Grillades au feu de bois", "Côte de bœuf", "Saucisses fumées"],
                description: "Spécialiste des grillades au feu de bois, Le Grilladin vous offre une expérience unique avec ses viandes fumées et ses légumes grillés. Ambiance conviviale garantie !"
            },
            {
                id: 3,
                name: "La Table de Tatie Jeanne",
                type: "Cuisine familiale",
                price: "€€",
                lat: -21.1340,
                lon: 55.4695,
                rating: 4.8,
                emoji: "👵",
                specialites: ["Rougail saucisse", "Cari légumes", "Gâteau patate douce"],
                description: "Chez Tatie Jeanne, c'est comme à la maison ! Cuisine familiale généreuse, recettes de grand-mère et produits du jardin. Le vrai goût de la tradition créole."
            },
            {
                id: 4,
                name: "Le Bistrot Cilaos",
                type: "Bistrot moderne",
                price: "€€€",
                lat: -21.1355,
                lon: 55.4715,
                rating: 4.4,
                emoji: "🍽️",
                specialites: ["Cuisine fusion", "Tartare de thon", "Cocktails créoles"],
                description: "Bistrot moderne alliant tradition créole et techniques culinaires contemporaines. Carte créative et présentation soignée dans un cadre élégant."
            },
            {
                id: 5,
                name: "Le Relais des Cimes",
                type: "Restaurant d'altitude",
                price: "€€€€",
                lat: -21.1320,
                lon: 55.4690,
                rating: 4.7,
                emoji: "🏔️",
                specialites: ["Lentilles de Cilaos", "Cerf aux épices", "Fromage de chèvre"],
                description: "Restaurant gastronomique perché dans les hauteurs, offrant une vue exceptionnelle. Cuisine raffinée mettant à l'honneur les produits locaux d'altitude."
            },
            {
                id: 6,
                name: "Chez Loulou",
                type: "Snack créole",
                price: "€",
                lat: -21.1375,
                lon: 55.4730,
                rating: 4.2,
                emoji: "🥪",
                specialites: ["Samoussas", "Bouchons", "Bonbons piment"],
                description: "Le snack incontournable de Cilaos ! Chez Loulou, vous trouverez tous les en-cas créoles : samoussas croustillants, bouchons vapeur et les fameux bonbons piment."
            },
            {
                id: 7,
                name: "L'Affût",
                type: "Restaurant de chasse",
                price: "€€€",
                lat: -21.1310,
                lon: 55.4750,
                rating: 4.5,
                emoji: "🦌",
                specialites: ["Civet de cerf", "Cabri massalé", "Charcuterie locale"],
                description: "Spécialiste du gibier et des viandes de caractère. L'Affût propose une cuisine rustique et authentique, parfaite après une journée de randonnée."
            },
            {
                id: 8,
                name: "La Cascade",
                type: "Restaurant panoramique",
                price: "€€€",
                lat: -21.1340,
                lon: 55.4670,
                rating: 4.6,
                emoji: "🌊",
                specialites: ["Poisson grillé", "Salade de lentilles", "Rhum arrangé"],
                description: "Restaurant avec vue imprenable sur la cascade Bras Rouge. Cuisine légère et fraîche, idéale pour un déjeuner en terrasse face aux paysages grandioses."
            },
            {
                id: 9,
                name: "Juste",
                type: "Cuisine végétarienne",
                price: "€€",
                lat: -21.1360,
                lon: 55.4680,
                rating: 4.4,
                emoji: "🌱",
                specialites: ["Curry de légumes", "Graines créoles", "Jus de fruits frais"],
                description: "Premier restaurant végétarien de Cilaos, Juste propose une cuisine saine et colorée. Produits bio locaux, plats créatifs et boissons détox maison."
            }
        ];

        // Variables globales
        let selectedRestaurant = null;
        let map = null;
        let markers = [];

        // Initialisation
        document.addEventListener('DOMContentLoaded', function() {
            initMap();
            displayRestaurants();
        });

        // Initialiser la carte
        function initMap() {
            map = L.map('restaurant-map').setView([-21.1339, 55.4708], 16);
            
            L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
                attribution: '© OpenStreetMap © Mayza M',
                subdomains: 'abcd',
                maxZoom: 19
            }).addTo(map);
        }

        // Afficher les restaurants
        function displayRestaurants() {
            const listContainer = document.getElementById('restaurantsList');
            
            let html = '';
            
            restaurants.forEach(restaurant => {
                const stars = generateStars(restaurant.rating);
                html += `
                    <div class="restaurant-banner ${selectedRestaurant?.id === restaurant.id ? 'selected' : ''}" 
                         onclick="selectRestaurant(${restaurant.id})">
                        <div class="banner-image">
                            ${restaurant.emoji}
                        </div>
                        <div class="banner-content">
                            <div class="restaurant-header-banner">
                                <div>
                                    <div class="restaurant-name">${restaurant.name}</div>
                                    <span class="restaurant-type">${restaurant.type}</span>
                                </div>
                                <div class="restaurant-price">${restaurant.price}</div>
                            </div>
                            <div class="restaurant-description">
                                ${restaurant.description}
                            </div>
                            <div class="restaurant-specialites">
                                ${restaurant.specialites.map(s => `<span class="specialite-tag">${s}</span>`).join('')}
                            </div>
                            <div class="rating">
                                ${stars} <span style="color: #999; font-size: 0.9rem;">(${restaurant.rating})</span>
                            </div>
                        </div>
                    </div>
                `;
            });
            
            listContainer.innerHTML = html;
            
            // Mettre à jour les marqueurs sur la carte
            updateMapMarkers();
        }

        // Générer les étoiles
        function generateStars(rating) {
            const fullStars = Math.floor(rating);
            const halfStar = rating % 1 >= 0.5;
            let stars = '';
            
            for (let i = 0; i < fullStars; i++) {
                stars += '<span class="star">★</span>';
            }
            if (halfStar) {
                stars += '<span class="star">☆</span>';
            }
            
            return stars;
        }

        // Sélectionner un restaurant
        function selectRestaurant(id) {
            selectedRestaurant = restaurants.find(r => r.id === id);
            
            // Mettre à jour l'affichage
            displayRestaurants();
            
            // Centrer la carte sur le restaurant
            if (selectedRestaurant) {
                map.setView([selectedRestaurant.lat, selectedRestaurant.lon], 16);
                
                // Ouvrir le popup du marqueur correspondant
                markers.forEach(marker => {
                    if (marker.restaurantId === id) {
                        marker.openPopup();
                    }
                });
            }
        }

        // Mettre à jour les marqueurs sur la carte
        function updateMapMarkers() {
            // Supprimer les anciens marqueurs
            markers.forEach(marker => map.removeLayer(marker));
            markers = [];
            
            // Ajouter les nouveaux marqueurs
            restaurants.forEach(restaurant => {
                const icon = L.divIcon({
                    className: 'restaurant-marker',
                    html: restaurant.emoji,
                    iconSize: [35, 35]
                });
                
                const marker = L.marker([restaurant.lat, restaurant.lon], { icon })
                    .bindPopup(`
                        <div class="map-popup">
                            <h4>${restaurant.name}</h4>
                            <p>${restaurant.type}</p>
                            <p class="price">${restaurant.price}</p>
                            <p>${generateStars(restaurant.rating)}</p>
                            <p><strong>Spécialités:</strong><br>${restaurant.specialites.join(', ')}</p>
                        </div>
                    `)
                    .addTo(map);
                
                marker.restaurantId = restaurant.id;
                markers.push(marker);
                
                // Ajouter un événement click
                marker.on('click', function() {
                    selectRestaurant(restaurant.id);
                });
            });
        }

