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
            map = L.map('restaurant-map').setView([-21.1339, 55.4708], 14);
            
            L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
                attribution: '© OpenStreetMap © CARTO',
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

        