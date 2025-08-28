// ================================================
// Module d'affichage des restaurants avec couleurs
// ================================================

import dataManager from './data-module.js';

class RestaurantDisplay {
    constructor() {
        this.map = null;
        this.markers = [];
        this.selectedRestaurant = null;
    }

    // Initialisation de la carte
    async initMap() {
        // Créer la carte Leaflet
        this.map = L.map('restaurant-map').setView([-21.1339, 55.4708], 16);
        
        L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
            attribution: '© OpenStreetMap © CARTO',
            subdomains: 'abcd',
            maxZoom: 19
        }).addTo(this.map);

        // Charger et afficher les restaurants
        await this.loadRestaurants();
    }

    // Charger les restaurants depuis le gestionnaire de données
    async loadRestaurants() {
        const restaurants = await dataManager.getRestaurants();
        this.displayRestaurantsList(restaurants);
        this.addMarkersToMap(restaurants);
    }

    // Afficher la liste des restaurants
    displayRestaurantsList(restaurants) {
        const listContainer = document.getElementById('restaurantsList');
        if (!listContainer) return;

        let html = '';
        
        restaurants.forEach(restaurant => {
            const stars = this.generateStars(restaurant.rating);
            
            html += `
                <div class="restaurant-banner ${this.selectedRestaurant?.id === restaurant.id ? 'selected' : ''}" 
                     onclick="restaurantDisplay.selectRestaurant(${restaurant.id})"
                     data-restaurant-id="${restaurant.id}">
                    
                    <!-- Bandeau coloré au lieu de l'emoji -->
                    <div class="banner-image" style="background: ${restaurant.color};">
                        <div class="restaurant-icon-letter">
                            ${restaurant.name.charAt(0)}
                        </div>
                    </div>
                    
                    <div class="banner-content">
                        <div class="restaurant-header-banner">
                            <div>
                                <div class="restaurant-name">${restaurant.name}</div>
                                <span class="restaurant-type" style="background: ${restaurant.color}; color: white;">
                                    ${restaurant.type}
                                </span>
                            </div>
                            <div class="restaurant-price">${restaurant.price}</div>
                        </div>
                        
                        <div class="restaurant-description">
                            ${restaurant.description}
                        </div>
                        
                        <div class="restaurant-specialites">
                            ${restaurant.specialites.map(s => 
                                `<span class="specialite-tag" style="background: ${restaurant.color}20; color: ${restaurant.color};">
                                    ${s}
                                </span>`
                            ).join('')}
                        </div>
                        
                        <div class="rating">
                            ${stars} 
                            <span style="color: #999; font-size: 0.9rem;">(${restaurant.rating})</span>
                        </div>
                    </div>
                </div>
            `;
        });
        
        listContainer.innerHTML = html;
    }

    // Ajouter les marqueurs sur la carte avec couleurs
    addMarkersToMap(restaurants) {
        // Supprimer les anciens marqueurs
        this.markers.forEach(marker => this.map.removeLayer(marker));
        this.markers = [];
        
        // Ajouter les nouveaux marqueurs
        restaurants.forEach(restaurant => {
            // Créer un marqueur personnalisé avec la couleur du restaurant
            const icon = L.divIcon({
                className: 'restaurant-marker-custom',
                html: `
                    <div class="marker-pin" style="background: ${restaurant.color};">
                        <span>${restaurant.name.charAt(0)}</span>
                    </div>
                `,
                iconSize: [40, 40],
                iconAnchor: [20, 40],
                popupAnchor: [0, -40]
            });
            
            const marker = L.marker([restaurant.coordinates.lat, restaurant.coordinates.lon], { icon })
                .bindPopup(this.createPopupContent(restaurant))
                .addTo(this.map);
            
            marker.restaurantId = restaurant.id;
            this.markers.push(marker);
            
            // Événement au clic
            marker.on('click', () => {
                this.selectRestaurant(restaurant.id);
            });
        });
    }

    // Créer le contenu du popup
    createPopupContent(restaurant) {
        return `
            <div class="map-popup" style="border-top: 3px solid ${restaurant.color};">
                <h4 style="color: ${restaurant.color}; margin-bottom: 0.5rem;">
                    ${restaurant.name}
                </h4>
                <p style="margin: 0.25rem 0; font-size: 0.9rem;">${restaurant.type}</p>
                <p class="price" style="font-weight: 700; color: var(--couleur-texte); margin: 0.5rem 0;">
                    ${restaurant.price}
                </p>
                <p style="margin: 0.5rem 0;">${this.generateStars(restaurant.rating)}</p>
                <p style="margin-top: 0.5rem; font-size: 0.85rem;">
                    <strong>Spécialités:</strong><br>
                    ${restaurant.specialites.join(', ')}
                </p>
                ${restaurant.contact?.phone ? 
                    `<p style="margin-top: 0.5rem;">
                        📞 <a href="tel:${restaurant.contact.phone}" style="color: ${restaurant.color};">
                            ${restaurant.contact.phone}
                        </a>
                    </p>` : ''
                }
            </div>
        `;
    }

    // Sélectionner un restaurant
    async selectRestaurant(id) {
        const restaurants = await dataManager.getRestaurants();
        this.selectedRestaurant = restaurants.find(r => r.id === id);
        
        if (this.selectedRestaurant) {
            // Mettre à jour l'affichage
            this.displayRestaurantsList(restaurants);
            
            // Centrer la carte
            this.map.setView([
                this.selectedRestaurant.coordinates.lat, 
                this.selectedRestaurant.coordinates.lon
            ], 17);
            
            // Ouvrir le popup
            const marker = this.markers.find(m => m.restaurantId === id);
            if (marker) {
                marker.openPopup();
            }
            
            // Faire défiler jusqu'au restaurant dans la liste
            const element = document.querySelector(`[data-restaurant-id="${id}"]`);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        }
    }

    // Générer les étoiles
    generateStars(rating) {
        const fullStars = Math.floor(rating);
        const halfStar = rating % 1 >= 0.5;
        let stars = '';
        
        for (let i = 0; i < fullStars; i++) {
            stars += '<span class="star">★</span>';
        }
        if (halfStar) {
            stars += '<span class="star" style="opacity: 0.5;">★</span>';
        }
        
        return stars;
    }
}

// Créer l'instance et l'initialiser
const restaurantDisplay = new RestaurantDisplay();

// Initialisation au chargement de la page
document.addEventListener('DOMContentLoaded', function() {
    if (document.getElementById('restaurant-map')) {
        restaurantDisplay.initMap();
    }
});

// CSS additionnel pour les marqueurs personnalisés
const style = document.createElement('style');
style.textContent = `
    /* Marqueur personnalisé */
    .restaurant-marker-custom {
        background: transparent !important;
        border: none !important;
    }
    
    .marker-pin {
        width: 40px;
        height: 40px;
        border-radius: 50% 50% 50% 0;
        position: absolute;
        transform: rotate(-45deg);
        left: 50%;
        top: 50%;
        margin: -20px 0 0 -20px;
        display: flex;
        align-items: center;
        justify-content: center;
        box-shadow: 0 4px 10px rgba(0,0,0,0.3);
        cursor: pointer;
        transition: all 0.3s;
    }
    
    .marker-pin span {
        transform: rotate(45deg);
        color: white;
        font-weight: bold;
        font-size: 18px;
    }
    
    .marker-pin:hover {
        transform: rotate(-45deg) scale(1.1);
        box-shadow: 0 6px 15px rgba(0,0,0,0.4);
    }
    
    /* Style pour la bannière du restaurant */
    .banner-image {
        position: relative;
        display: flex;
        align-items: center;
        justify-content: center;
        overflow: hidden;
    }
    
    .restaurant-icon-letter {
        font-size: 4rem;
        font-weight: 700;
        color: white;
        text-shadow: 2px 2px 8px rgba(0,0,0,0.3);
        position: relative;
        z-index: 2;
    }
    
    .banner-image::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: linear-gradient(135deg, rgba(255,255,255,0.2), transparent);
        z-index: 1;
    }
    
    /* Animation de sélection */
    .restaurant-banner.selected {
        border-left: 4px solid var(--couleur-accent);
        background: linear-gradient(to right, rgba(160,200,120,0.05), transparent);
    }
    
    .restaurant-banner {
        transition: all 0.3s ease;
        position: relative;
    }
    
    .restaurant-banner:hover {
        transform: translateX(5px);
        box-shadow: 0 10px 30px rgba(0,0,0,0.1);
    }
`;
document.head.appendChild(style);

// Export pour utilisation globale
window.restaurantDisplay = restaurantDisplay;
export default restaurantDisplay;