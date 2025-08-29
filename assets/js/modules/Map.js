/**
 * MapManager - Gestion centralisée de toutes les cartes Leaflet
 * Un seul module pour toutes les cartes du site
 */

export default class MapManager {
    constructor(options = {}) {
        this.config = {
            mapId: 'map',
            center: [-21.1339, 55.4708], // Cilaos par défaut
            zoom: 13,
            tileLayerUrl: 'https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png',
            attribution: '© OpenStreetMap © CARTO',
            enableParallax: false,
            ...options
        };

        this.map = null;
        this.markers = [];
        this.layers = {};
        this.currentRoute = null;
        this.isInitialized = false;
    }

    /**
     * Initialisation de base de la carte
     */
    async init() {
        if (this.isInitialized) {
            console.warn('MapManager déjà initialisé');
            return;
        }

        const mapElement = document.getElementById(this.config.mapId);
        if (!mapElement) {
            console.warn(`Élément de carte #${this.config.mapId} non trouvé`);
            return;
        }

        // Créer la carte Leaflet
        this.map = L.map(this.config.mapId, {
            center: this.config.center,
            zoom: this.config.zoom,
            zoomControl: true,
            scrollWheelZoom: false, // Désactivé par défaut pour éviter les conflits avec le scroll
            doubleClickZoom: true
        });

        // Ajouter le layer de tuiles
        L.tileLayer(this.config.tileLayerUrl, {
            attribution: this.config.attribution,
            subdomains: 'abcd',
            maxZoom: 19
        }).addTo(this.map);

        this.isInitialized = true;
        console.log('✅ MapManager initialisé');
    }

    /**
     * ========================================
     * CARTE DU VOYAGE (Page d'accueil)
     * ========================================
     */
    async initVoyageMap() {
        await this.init();
        if (!this.map) return;

        // Points clés du voyage
        const POINTS = {
            AIRPORT: { lat: -20.8900, lon: 55.5164, name: "Aéroport Roland Garros" },
            PORT: { lat: -20.9396, lon: 55.2906, name: "Le Port" },
            ST_LEU: { lat: -21.1708, lon: 55.2885, name: "Saint-Leu" },
            ST_LOUIS: { lat: -21.2808, lon: 55.4119, name: "Saint-Louis" },
            CILAOS: { lat: -21.1339, lon: 55.4708, name: "Cilaos" }
        };

        // Points d'intérêt à Cilaos
        const POI_CILAOS = [
            { lat: -21.1339, lon: 55.4556, name: '1', label: 'Roche Merveilleuse' },
            { lat: -21.1208, lon: 55.4878, name: '2', label: 'Col du Taïbit' },
            { lat: -21.1450, lon: 55.4750, name: '3', label: 'Cascade Bras Rouge' },
            { lat: -21.1333, lon: 55.4708, name: '4', label: 'Thermes de Cilaos' }
        ];

        // Ajuster la vue
        this.map.setView([-21.0300, 55.3800], 10);

        // Variables pour les éléments
        this.voyageElements = {
            segments: [],
            poiMarkers: [],
            cityMarkers: {},
            officeMarker: null,
            poiVisible: false
        };

        // Créer les marqueurs des villes
        this.createCityMarkers(POINTS);

        // Créer les marqueurs POI (cachés initialement)
        this.createPOIMarkers(POI_CILAOS);

        // Charger la route
        await this.loadVoyageRoute(POINTS);

        // Si parallax activé, configurer l'observation du scroll
        if (this.config.enableParallax) {
            this.setupVoyageParallax();
        }
    }

    /**
     * Créer les marqueurs des villes
     */
    createCityMarkers(points) {
        Object.entries(points).forEach(([key, point]) => {
            const marker = L.marker([point.lat, point.lon], {
                icon: L.divIcon({
                    className: 'city-dot',
                    html: '',
                    iconSize: [12, 12]
                })
            });
            
            marker.bindTooltip(point.name, { 
                permanent: false, 
                direction: 'top' 
            });
            
            marker.addTo(this.map);
            this.voyageElements.cityMarkers[key.toLowerCase()] = marker;
        });
    }

    /**
     * Créer les marqueurs POI
     */
    createPOIMarkers(pois) {
        pois.forEach((poi) => {
            const marker = L.marker([poi.lat, poi.lon], {
                icon: L.divIcon({
                    className: 'poi-marker',
                    html: poi.name,
                    iconSize: [32, 32]
                })
            });
            
            marker.bindTooltip(poi.label, { 
                permanent: false, 
                direction: 'top' 
            });
            
            this.voyageElements.poiMarkers.push(marker);
        });

        // Marqueur Office de Tourisme
        this.voyageElements.officeMarker = L.marker([-21.1339, 55.4708], {
            icon: L.divIcon({
                className: 'poi-marker office-marker',
                html: '📍',
                iconSize: [40, 40]
            })
        });
        
        this.voyageElements.officeMarker.bindTooltip('Office de Tourisme', { 
            permanent: false, 
            direction: 'top' 
        });
    }

    /**
     * Charger la route du voyage
     */
    async loadVoyageRoute(points) {
        // Waypoints pour OSRM
        const waypoints = [
            [55.5164, -20.8900], // Aéroport
            [55.2906, -20.9396], // Le Port
            [55.2885, -21.1708], // Saint-Leu
            [55.4119, -21.2808], // Saint-Louis
            [55.4708, -21.1339]  // Cilaos
        ];

        try {
            const coords = waypoints.map(([lng, lat]) => `${lng},${lat}`).join(';');
            const url = `https://router.project-osrm.org/route/v1/driving/${coords}?overview=full&geometries=geojson`;
            
            const response = await fetch(url);
            const data = await response.json();
            
            if (data.routes && data.routes[0]) {
                const route = data.routes[0];
                const coordinates = route.geometry.coordinates;
                const latlngs = coordinates.map(([lng, lat]) => [lat, lng]);
                
                // Créer les segments de route
                this.createRouteSegments(latlngs);
            } else {
                // Fallback si OSRM échoue
                this.createFallbackRoute(points);
            }
        } catch (error) {
            console.error('Erreur OSRM:', error);
            this.createFallbackRoute(points);
        }
    }

    /**
     * Créer les segments de route
     */
    createRouteSegments(latlngs) {
        const totalPoints = latlngs.length;
        const segments = this.voyageElements.segments;
        
        // Segment 1: Aéroport → Le Port
        segments[1] = L.polyline(latlngs.slice(0, Math.floor(totalPoints * 0.28)), {
            color: '#D21F3C',
            weight: 4,
            opacity: 0.3
        }).addTo(this.map);
        
        // Segment 2: Le Port → Saint-Leu
        segments[2] = L.polyline(
            latlngs.slice(Math.floor(totalPoints * 0.28), Math.floor(totalPoints * 0.43)), {
            color: '#D21F3C',
            weight: 4,
            opacity: 0.3
        }).addTo(this.map);
        
        // Segment 3: Saint-Leu → Saint-Louis
        segments[3] = L.polyline(
            latlngs.slice(Math.floor(totalPoints * 0.43), Math.floor(totalPoints * 0.52)), {
            color: '#D21F3C',
            weight: 4,
            opacity: 0.3
        }).addTo(this.map);
        
        // Segment 4: Saint-Louis → Cilaos
        segments[4] = L.polyline(latlngs.slice(Math.floor(totalPoints * 0.52)), {
            color: '#D21F3C',
            weight: 5,
            opacity: 0.3,
            dashArray: '10, 5'
        }).addTo(this.map);
    }

    /**
     * Mettre en évidence un segment
     */
    highlightSegment(segmentNum) {
        const segments = this.voyageElements.segments;
        
        segments.forEach((seg, index) => {
            if (seg && index > 0) {
                seg.setStyle({ 
                    opacity: 0.3,
                    weight: index === 4 ? 5 : 4
                });
            }
        });
        
        if (segments[segmentNum]) {
            segments[segmentNum].setStyle({ 
                opacity: 1,
                weight: segmentNum === 4 ? 6 : 5
            });
        }
    }

    /**
     * Configuration de l'effet parallax
     */
    setupVoyageParallax() {
        const textContainer = document.querySelector('.voyage-texte-container');
        const etapeSections = document.querySelectorAll('.etape-section');
        
        if (!textContainer || !etapeSections.length) return;
        
        let currentActiveSegment = null;
        
        const observerOptions = {
            root: textContainer,
            rootMargin: '-40% 0px -40% 0px',
            threshold: 0
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const segmentId = parseInt(entry.target.getAttribute('data-segment'));
                    
                    if (currentActiveSegment === segmentId) return;
                    currentActiveSegment = segmentId;
                    
                    // Mettre à jour la carte
                    this.handleVoyageSegmentChange(segmentId);
                }
            });
        }, observerOptions);
        
        etapeSections.forEach(section => observer.observe(section));
    }

    /**
     * Gérer le changement de segment du voyage
     */
    handleVoyageSegmentChange(segmentId) {
        this.highlightSegment(segmentId);
        
        // Animations de la carte selon le segment
        switch(segmentId) {
            case 1:
                this.togglePOIs(false);
                this.map.flyTo([-20.95, 55.40], 11, { duration: 1.5 });
                break;
            case 2:
                this.togglePOIs(false);
                this.map.flyTo([-21.05, 55.30], 11, { duration: 1.5 });
                break;
            case 3:
                this.map.flyTo([-21.15, 55.46], 11, { duration: 1.5 });
                setTimeout(() => this.togglePOIs(true, true), 1200);
                break;
            case 4:
                this.togglePOIs(false);
                this.map.flyTo([-21.1339, 55.4708], 15, { duration: 2 });
                setTimeout(() => this.togglePOIs(true, false), 1800);
                break;
        }
        
        // Mettre à jour l'info box
        this.updateVoyageInfo(segmentId);
    }

    /**
     * Afficher/masquer les POI
     */
    togglePOIs(show, showNumbers = false) {
        const { poiMarkers, officeMarker, cityMarkers } = this.voyageElements;
        
        if (show) {
            if (showNumbers) {
                // Afficher les POI numérotés
                poiMarkers.forEach((marker, index) => {
                    setTimeout(() => marker.addTo(this.map), index * 100);
                });
            } else {
                // Afficher l'Office
                if (officeMarker) {
                    officeMarker.addTo(this.map);
                }
            }
        } else {
            // Masquer tout
            poiMarkers.forEach(marker => {
                if (this.map.hasLayer(marker)) {
                    this.map.removeLayer(marker);
                }
            });
            
            if (officeMarker && this.map.hasLayer(officeMarker)) {
                this.map.removeLayer(officeMarker);
            }
        }
    }

    /**
     * ========================================
     * CARTE DES RESTAURANTS (Page séjour)
     * ========================================
     */
    async initRestaurantMap(restaurants) {
        await this.init();
        if (!this.map) return;

        this.map.setView([-21.1339, 55.4708], 16);
        
        // Nettoyer les marqueurs existants
        this.clearMarkers();
        
        // Ajouter les marqueurs des restaurants
        restaurants.forEach(restaurant => {
            const marker = this.createRestaurantMarker(restaurant);
            this.markers.push(marker);
        });
    }

    /**
     * Créer un marqueur de restaurant
     */
    createRestaurantMarker(restaurant) {
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
        
        const marker = L.marker(
            [restaurant.coordinates.lat, restaurant.coordinates.lon], 
            { icon }
        );
        
        // Créer le popup
        const popupContent = this.createRestaurantPopup(restaurant);
        marker.bindPopup(popupContent);
        
        marker.addTo(this.map);
        marker.restaurantData = restaurant;
        
        return marker;
    }

    /**
     * Créer le contenu du popup restaurant
     */
    createRestaurantPopup(restaurant) {
        return `
            <div class="map-popup restaurant-popup" style="border-top: 3px solid ${restaurant.color};">
                <h4 style="color: ${restaurant.color}; margin-bottom: 0.5rem;">
                    ${restaurant.name}
                </h4>
                <p style="margin: 0.25rem 0; font-size: 0.9rem;">${restaurant.type}</p>
                <p class="price" style="font-weight: 700; margin: 0.5rem 0;">
                    ${restaurant.price}
                </p>
                <div class="rating" style="margin: 0.5rem 0;">
                    ${this.generateStars(restaurant.rating)}
                    <span style="color: #999; font-size: 0.85rem;">(${restaurant.rating})</span>
                </div>
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

    /**
     * ========================================
     * CARTE DES HÉBERGEMENTS
     * ========================================
     */
    async initHebergementMap(hebergements) {
        await this.init();
        if (!this.map) return;

        this.map.setView([-21.1339, 55.4708], 15);
        
        // Nettoyer les marqueurs existants
        this.clearMarkers();
        
        // Groupes de marqueurs par type
        this.layers.hotels = L.layerGroup();
        this.layers.gites = L.layerGroup();
        this.layers.chambres = L.layerGroup();
        this.layers.campings = L.layerGroup();
        
        // Ajouter les marqueurs par catégorie
        const categories = {
            hotels: { color: '#4ECDC4', icon: '🏨' },
            gites: { color: '#96CEB4', icon: '🏡' },
            chambres: { color: '#DDA0DD', icon: '🛏️' },
            campings: { color: '#F7B731', icon: '⛺' }
        };
        
        Object.entries(hebergements).forEach(([type, items]) => {
            if (!items || !categories[type]) return;
            
            items.forEach(item => {
                const marker = this.createHebergementMarker(item, categories[type]);
                marker.addTo(this.layers[type]);
            });
        });
        
        // Ajouter tous les layers à la carte
        Object.values(this.layers).forEach(layer => layer.addTo(this.map));
        
        // Contrôle des layers
        const overlays = {
            "Hôtels": this.layers.hotels,
            "Gîtes": this.layers.gites,
            "Chambres d'hôtes": this.layers.chambres,
            "Campings": this.layers.campings
        };
        
        L.control.layers(null, overlays).addTo(this.map);
    }

    /**
     * Créer un marqueur d'hébergement
     */
    createHebergementMarker(hebergement, style) {
        const icon = L.divIcon({
            className: 'hebergement-marker',
            html: `
                <div class="marker-icon" style="background: ${style.color};">
                    <span>${style.icon}</span>
                </div>
            `,
            iconSize: [35, 35],
            iconAnchor: [17, 35],
            popupAnchor: [0, -35]
        });
        
        const marker = L.marker(
            [hebergement.coordinates.lat, hebergement.coordinates.lon], 
            { icon }
        );
        
        // Créer le popup
        const popupContent = `
            <div class="map-popup hebergement-popup">
                <h4>${hebergement.name}</h4>
                <p style="color: ${style.color};">${hebergement.type}</p>
                <p><strong>€${hebergement.price}</strong> / nuit</p>
                <p>Capacité: ${hebergement.capacity} pers.</p>
                <div class="rating">
                    ${this.generateStars(hebergement.rating)}
                </div>
                <p style="font-size: 0.85rem;">${hebergement.description}</p>
                ${hebergement.features ? 
                    `<div class="features">
                        ${hebergement.features.slice(0, 3).map(f => 
                            `<span class="feature-tag">${f}</span>`
                        ).join('')}
                    </div>` : ''
                }
            </div>
        `;
        
        marker.bindPopup(popupContent);
        return marker;
    }

    /**
     * ========================================
     * MÉTHODES UTILITAIRES
     * ========================================
     */
    
    /**
     * Générer les étoiles pour la notation
     */
    generateStars(rating) {
        const fullStars = Math.floor(rating);
        const halfStar = rating % 1 >= 0.5;
        let stars = '';
        
        for (let i = 0; i < fullStars; i++) {
            stars += '★';
        }
        if (halfStar) {
            stars += '☆';
        }
        
        return `<span class="stars" style="color: #FFD700;">${stars}</span>`;
    }

    /**
     * Centrer la carte sur un point
     */
    centerOn(lat, lon, zoom = 16) {
        if (!this.map) return;
        this.map.setView([lat, lon], zoom);
    }

    /**
     * Voler vers un point
     */
    flyTo(lat, lon, zoom = 16, options = {}) {
        if (!this.map) return;
        this.map.flyTo([lat, lon], zoom, {
            duration: 1.5,
            ...options
        });
    }

    /**
     * Nettoyer tous les marqueurs
     */
    clearMarkers() {
        this.markers.forEach(marker => {
            this.map.removeLayer(marker);
        });
        this.markers = [];
        
        // Nettoyer aussi les layers
        Object.values(this.layers).forEach(layer => {
            if (layer) layer.clearLayers();
        });
    }

    /**
     * Ajuster les bounds de la carte
     */
    fitBounds(markers = null) {
        const markersToFit = markers || this.markers;
        
        if (!markersToFit.length) return;
        
        const group = new L.featureGroup(markersToFit);
        this.map.fitBounds(group.getBounds().pad(0.1));
    }

    /**
     * Activer/désactiver le scroll sur la carte
     */
    toggleScrollZoom(enable) {
        if (!this.map) return;
        
        if (enable) {
            this.map.scrollWheelZoom.enable();
        } else {
            this.map.scrollWheelZoom.disable();
        }
    }

    /**
     * Mettre à jour l'info box du voyage
     */
    updateVoyageInfo(segment) {
        const infoTitle = document.getElementById('map-info-title');
        const infoText = document.getElementById('map-info-text');
        
        if (!infoTitle || !infoText) return;
        
        const infos = {
            1: {
                title: 'Étape 1: Le littoral nord',
                text: 'De l\'aéroport au Port - 12 km de côte sauvage'
            },
            2: {
                title: 'Étape 2: La côte ouest',
                text: 'Du Port à Saint-Leu - Plages et lagons'
            },
            3: {
                title: 'Étape 3: Vers les hauts',
                text: 'De Saint-Leu à Saint-Louis - Les merveilles de Cilaos'
            },
            4: {
                title: 'Étape 4: Les 421 virages',
                text: 'La mythique RN5 jusqu\'à l\'Office de Tourisme'
            }
        };
        
        if (infos[segment]) {
            infoTitle.textContent = infos[segment].title;
            infoText.textContent = infos[segment].text;
        }
    }

    /**
     * Redimensionner la carte
     */
    invalidateSize() {
        if (!this.map) return;
        setTimeout(() => {
            this.map.invalidateSize();
        }, 200);
    }

    /**
     * Détruire la carte
     */
    destroy() {
        if (this.map) {
            this.clearMarkers();
            this.map.remove();
            this.map = null;
        }
        
        this.isInitialized = false;
        console.log('MapManager détruit');
    }
}