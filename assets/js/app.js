// ================================================
// APP.JS - JavaScript principal du site Cilaos
// ================================================

// ================================================
// INITIALISATION AU CHARGEMENT DE LA PAGE
// ================================================
document.addEventListener('DOMContentLoaded', function() {
    console.log('✅ Site Cilaos initialisé avec succès !');
    
    // Initialiser tous les composants
    initNavMenu();
    initAccessTabs();
    initMapWithParallax();
    initStoriesFixed();
});

// ================================================
// TABS ACCÈS (Section Accès)
// ================================================
function initAccessTabs() {
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabPanes = document.querySelectorAll('.tab-pane');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const tabId = button.getAttribute('data-tab');
            
            // Retirer la classe active de tous les boutons et panneaux
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabPanes.forEach(pane => pane.classList.remove('active'));
            
            // Ajouter la classe active au bouton cliqué et au panneau correspondant
            button.classList.add('active');
            const activePane = document.getElementById(tabId);
            if (activePane) {
                activePane.classList.add('active');
            }
        });
    });
}

// ================================================
// CARTE LEAFLET AVEC EFFET PARALLAX INTERNE
// ================================================
function initMapWithParallax() {
    // Vérifier que l'élément map existe
    const mapElement = document.getElementById('map');
    if (!mapElement) return;
    
    // Coordonnées principales CORRIGÉES
    const AIRPORT = { lat: -20.8900, lon: 55.5164, name: "Aéroport" };
    const PORT = { lat: -20.9396, lon: 55.2906, name: "Le Port" };
    const ST_LEU = { lat: -21.1708, lon: 55.2885, name: "Saint-Leu" };
    const ST_LOUIS = { lat: -21.2808, lon: 55.4119, name: "Saint-Louis" };
    const CILAOS = { lat: -21.1339, lon: 55.4708, name: "Cilaos" };
    
    // Points d'intérêt à Cilaos - COORDONNÉES RÉELLES
    const POI_CILAOS = [
       // { lat: -21.0971, lon: 55.4781, name: '1', label: 'Piton des Neiges' },
        { lat: -21.1339, lon: 55.4556, name: '1', label: 'Roche Merveilleuse' },
        { lat: -21.1208, lon: 55.4878, name: '2', label: 'Col du Taïbit' },
        { lat: -21.1450, lon: 55.4750, name: '3', label: 'Cascade Bras Rouge' },
        { lat: -21.1333, lon: 55.4708, name: '4', label: 'Thermes de Cilaos' }
    ];
    
    // Office de tourisme - position légèrement décalée pour éviter le conflit
    const OFFICE = { lat: -21.1339, lon: 55.4708, name: "Office de Tourisme" };
    
    // Waypoints pour le trajet OSRM
    const WAYPOINTS = [
        [55.5164, -20.8900], // Aéroport
        [55.4481, -20.8789], // Saint-Denis
        [55.3550, -20.9660], // La Possession
        [55.2906, -20.9396], // Le Port
        [55.2692, -21.0096], // Saint-Paul
        [55.2885, -21.1708], // Saint-Leu
        [55.3300, -21.2550], // Étang-Salé
        [55.4119, -21.2808], // Saint-Louis
        [55.4250, -21.2600], // Entrée RN5
        [55.4400, -21.2300], // Premiers virages
        [55.4550, -21.2000], // Montée
        [55.4650, -21.1700], // 400 virages
        [55.4708, -21.1339]  // Cilaos
    ];
    
    // Initialiser la carte
    const map = L.map('map', {
        center: [-21.0300, 55.3800],
        zoom: 10,
        zoomControl: true,
        scrollWheelZoom: false,
        doubleClickZoom: false
    });
    
    // Tuiles de carte
    L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
        attribution: '© OpenStreetMap © Mayza',
        subdomains: 'abcd',
        maxZoom: 19
    }).addTo(map);
    
    // Variables pour les éléments de la carte
    let segments = [];
    let poiMarkers = [];
    let poiVisible = false;
    let cityMarkers = {};
    let officeMarker = null; // Marqueur Office séparé
    let cilaosVisible = true; // Contrôler la visibilité du pin Cilaos
    
    // Créer les points des villes (petits points rouges)
    function createCityDots() {
        // Aéroport
        cityMarkers.airport = L.marker([AIRPORT.lat, AIRPORT.lon], {
            icon: L.divIcon({
                className: 'city-dot',
                iconSize: [12, 12]
            })
        }).bindTooltip(AIRPORT.name, { permanent: false, direction: 'top' }).addTo(map);
        
        // Le Port
        cityMarkers.port = L.marker([PORT.lat, PORT.lon], {
            icon: L.divIcon({
                className: 'city-dot',
                iconSize: [12, 12]
            })
        }).bindTooltip(PORT.name, { permanent: false, direction: 'top' }).addTo(map);
        
        // Saint-Leu
        cityMarkers.stleu = L.marker([ST_LEU.lat, ST_LEU.lon], {
            icon: L.divIcon({
                className: 'city-dot',
                iconSize: [12, 12]
            })
        }).bindTooltip(ST_LEU.name, { permanent: false, direction: 'top' }).addTo(map);
        
        // Saint-Louis
        cityMarkers.stlouis = L.marker([ST_LOUIS.lat, ST_LOUIS.lon], {
            icon: L.divIcon({
                className: 'city-dot',
                iconSize: [12, 12]
            })
        }).bindTooltip(ST_LOUIS.name, { permanent: false, direction: 'top' }).addTo(map);
        
        // Cilaos - marqueur ville
        cityMarkers.cilaos = L.marker([CILAOS.lat, CILAOS.lon], {
            icon: L.divIcon({
                className: 'city-dot',
                iconSize: [12, 12]
            })
        }).bindTooltip(CILAOS.name, { permanent: false, direction: 'top' }).addTo(map);
    }
    
    // Créer les marqueurs POI (initialement cachés)
    function createPOIMarkers() {
        POI_CILAOS.forEach((poi) => {
            const marker = L.marker([poi.lat, poi.lon], {
                icon: L.divIcon({
                    className: 'poi-marker',
                    html: poi.name,
                    iconSize: [32, 32]
                })
            });
            marker.bindTooltip(poi.label, { permanent: false, direction: 'top' });
            poiMarkers.push(marker);
        });
        
        // Marqueur Office de Tourisme séparé
        officeMarker = L.marker([OFFICE.lat, OFFICE.lon], {
            icon: L.divIcon({
                className: 'poi-marker office-marker',
                html: '📍',
                iconSize: [40, 40]
            })
        });
        officeMarker.bindTooltip('Office de Tourisme', { permanent: false, direction: 'top' });
    }
    
    // Charger la route via OSRM
    async function loadRoute() {
        try {
            const coords = WAYPOINTS.map(([lng, lat]) => `${lng},${lat}`).join(';');
            const url = `https://router.project-osrm.org/route/v1/driving/${coords}?overview=full&geometries=geojson`;
            
            const response = await fetch(url);
            const data = await response.json();
            
            if (data.routes && data.routes[0]) {
                const route = data.routes[0];
                const coordinates = route.geometry.coordinates;
                const latlngs = coordinates.map(([lng, lat]) => [lat, lng]);
                
                // Diviser en 4 segments
                const totalPoints = latlngs.length;
                const seg1End = Math.floor(totalPoints * 0.28);
                const seg2End = Math.floor(totalPoints * 0.43);
                const seg3End = Math.floor(totalPoints * 0.52);
                
                // Segment 1: Aéroport → Le Port
                segments[1] = L.polyline(latlngs.slice(0, seg1End), {
                    color: '#D21F3C',
                    weight: 4,
                    opacity: 0.3
                }).addTo(map);
                
                // Segment 2: Le Port → Saint-Leu
                segments[2] = L.polyline(latlngs.slice(seg1End, seg2End), {
                    color: '#D21F3C',
                    weight: 4,
                    opacity: 0.3
                }).addTo(map);
                
                // Segment 3: Saint-Leu → Saint-Louis
                segments[3] = L.polyline(latlngs.slice(seg2End, seg3End), {
                    color: '#D21F3C',
                    weight: 4,
                    opacity: 0.3
                }).addTo(map);
                
                // Segment 4: Saint-Louis → Cilaos
                segments[4] = L.polyline(latlngs.slice(seg3End), {
                    color: '#D21F3C',
                    weight: 5,
                    opacity: 0.3,
                    dashArray: '10, 5'
                }).addTo(map);
                
            } else {
                // Fallback si OSRM échoue
                createFallbackRoute();
            }
        } catch (error) {
            console.error('Erreur OSRM:', error);
            createFallbackRoute();
        }
    }
    
    // Route de secours
    function createFallbackRoute() {
        const fallbackPoints = [
            [AIRPORT.lat, AIRPORT.lon],
            [PORT.lat, PORT.lon],
            [ST_LEU.lat, ST_LEU.lon],
            [ST_LOUIS.lat, ST_LOUIS.lon],
            [CILAOS.lat, CILAOS.lon]
        ];
        
        segments[1] = L.polyline(fallbackPoints.slice(0, 2), {
            color: '#D21F3C',
            weight: 4,
            opacity: 0.3
        }).addTo(map);
        
        segments[2] = L.polyline(fallbackPoints.slice(1, 3), {
            color: '#D21F3C',
            weight: 4,
            opacity: 0.3
        }).addTo(map);
        
        segments[3] = L.polyline(fallbackPoints.slice(2, 4), {
            color: '#D21F3C',
            weight: 4,
            opacity: 0.3
        }).addTo(map);
        
        segments[4] = L.polyline(fallbackPoints.slice(3, 5), {
            color: '#D21F3C',
            weight: 5,
            opacity: 0.3,
            dashArray: '5, 5'
        }).addTo(map);
    }
    
    // Fonction pour mettre en évidence un segment
    function highlightSegment(segmentNum) {
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
    
    // Fonction pour afficher/masquer les POI
    function togglePOIs(show, forStLouis = false) {
        if (show) {
            if (forStLouis) {
                // Étape 3: Afficher les POI numérotés
                document.getElementById('poiLegend').classList.add('visible');
                poiMarkers.forEach((marker, index) => {
                    setTimeout(() => {
                        marker.addTo(map);
                    }, index * 100);
                });
                poiVisible = true;
            } else {
                // Étape 4: Masquer le marqueur ville et afficher l'Office
                if (cityMarkers.cilaos && cilaosVisible) {
                    map.removeLayer(cityMarkers.cilaos);
                    cilaosVisible = false;
                }
                // Retirer les POI s'ils sont visibles
                if (poiVisible) {
                    poiMarkers.forEach(marker => {
                        if (map.hasLayer(marker)) {
                            map.removeLayer(marker);
                        }
                    });
                    document.getElementById('poiLegend').classList.remove('visible');
                    poiVisible = false;
                }
                // Afficher l'office
                setTimeout(() => {
                    if (officeMarker && !map.hasLayer(officeMarker)) {
                        officeMarker.addTo(map);
                    }
                }, 500);
            }
        } else {
            // Masquer tout
            document.getElementById('poiLegend').classList.remove('visible');
            
            // Retirer tous les POI
            if (poiVisible) {
                poiMarkers.forEach(marker => {
                    if (map.hasLayer(marker)) {
                        map.removeLayer(marker);
                    }
                });
                poiVisible = false;
            }
            
            // Retirer l'office
            if (officeMarker && map.hasLayer(officeMarker)) {
                map.removeLayer(officeMarker);
            }
            
            // Remettre le marqueur ville si nécessaire
            if (!cilaosVisible && cityMarkers.cilaos) {
                cityMarkers.cilaos.addTo(map);
                cilaosVisible = true;
            }
        }
    }
    
    // Mettre à jour l'info box
    function updateMapInfo(segment) {
        const infoTitle = document.getElementById('map-info-title');
        const infoText = document.getElementById('map-info-text');
        
        switch(segment) {
            case 1:
                infoTitle.textContent = 'Étape 1: Le littoral nord';
                infoText.textContent = 'De l\'aéroport au Port - 12 km de côte sauvage';
                break;
            case 2:
                infoTitle.textContent = 'Étape 2: La côte ouest';
                infoText.textContent = 'Du Port à Saint-Leu - Plages et lagons';
                break;
            case 3:
                infoTitle.textContent = 'Étape 3: Vers les hauts';
                infoText.textContent = 'De Saint-Leu à Saint-Louis - Les merveilles de Cilaos';
                break;
            case 4:
                infoTitle.textContent = 'Étape 4: Les 421 virages';
                infoText.textContent = 'La mythique RN5 jusqu\'à l\'Office de Tourisme';
                break;
        }
    }
    
    // Observer pour l'effet parallax interne
    const textContainer = document.querySelector('.voyage-texte-container');
    const etapeSections = document.querySelectorAll('.etape-section');
    
    if (textContainer && etapeSections.length > 0) {
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
                    
                    // Activer la section visible
                    etapeSections.forEach(section => section.classList.remove('active'));
                    entry.target.classList.add('active');
                    
                    currentActiveSegment = segmentId;
                    
                    // Mettre à jour la carte
                    highlightSegment(segmentId);
                    updateMapInfo(segmentId);
                    
                    // Ajuster la vue de la carte
                    switch(segmentId) {
                        case 1:
                            togglePOIs(false);
                            map.flyTo([-20.95, 55.40], 11, { duration: 1.5 });
                            break;
                        case 2:
                            togglePOIs(false);
                            map.flyTo([-21.05, 55.30], 11, { duration: 1.5 });
                            break;
                        case 3:
                            map.flyTo([-21.15, 55.46], 11, { duration: 1.5 });
                            setTimeout(() => {
                                togglePOIs(true, true);
                            }, 1200);
                            break;
                        case 4:
                            togglePOIs(false);
                            map.flyTo([-21.1339, 55.4708], 15, { duration: 2 });
                            setTimeout(() => {
                                togglePOIs(true, true);
                            }, 1800);
                            break;
                    }
                }
            });
        }, observerOptions);
        
        etapeSections.forEach(section => {
            observer.observe(section);
        });
    }
    
    // Initialiser la carte
    createCityDots();
    createPOIMarkers();
    loadRoute();
    
    // Initialiser avec le premier segment après un délai
    setTimeout(() => {
        highlightSegment(1);
        updateMapInfo(1);
    }, 1000);
}

// ================================================
// STORIES RÉPARÉES AVEC SWIPER
// ================================================
let currentSwiper = null;

function initStoriesFixed() {
    const storyBubbles = document.querySelectorAll('.story-bubble');
    const storiesIntro = document.getElementById('storiesIntro');
    const swiperContainer = document.getElementById('storySwiper');
    
    if (!storyBubbles.length || !storiesIntro || !swiperContainer) {
        console.warn('Éléments stories manquants');
        return;
    }
    
    // Données des 4 stories
    const storiesData = {
        actualites: {
            title: 'Actualités',
            slides: [
                {
                    image: './assets/images/local1.png',
                    title: 'Festival Sakifo 2025',
                    description: 'Le plus grand festival de musique de l\'océan Indien revient à Cilaos.'
                },
                {
                    image: './assets/images/local2.png',
                    title: 'Marché forain du dimanche',
                    description: 'Chaque dimanche, le marché s\'anime avec les produits locaux.'
                },
                {
                    image: './assets/images/local3.png',
                    title: 'Fête des Lentilles',
                    description: 'Célébration annuelle de la lentille de Cilaos.'
                }
            ]
        },
        randonnees: {
            title: 'Gravir Cilaos - Randonnées',
            slides: [
                {
                    image: './assets/images/rando1.png',
                    title: 'Piton des Neiges',
                    description: 'Le plus haut sommet de l\'océan Indien (3070m).'
                },
                {
                    image: './assets/images/rando2.png',
                    title: 'Col du Taïbit',
                    description: 'Passage historique entre Cilaos et Mafate.'
                },
                {
                    image: './assets/images/rando3.png',
                    title: 'Roche Merveilleuse',
                    description: 'Vue panoramique exceptionnelle sur tout le cirque.'
                }
            ]
        },
        saveurs: {
            title: 'Saveurs locales',
            slides: [
                {
                    image: './assets/images/gastronomie1.png',
                    title: 'Lentilles de Cilaos IGP',
                    description: 'Cultivées en terrasses depuis des générations.'
                },
                {
                    image: './assets/images/gastronomie2.png',
                    title: 'Carry créole traditionnel',
                    description: 'Découvrez les saveurs authentiques créoles.'
                },
                {
                    image: './assets/images/gastronomie3.png',
                    title: 'Vin de Cilaos',
                    description: 'Le seul vignoble tropical d\'altitude de France.'
                }
            ]
        },
        office: {
            title: 'Notre office',
            slides: [
                {
                    image: './assets/images/officedetourisme.png',
                    title: 'Accueil personnalisé',
                    description: 'Notre équipe vous accueille 7j/7.'
                },
                {
                    image: './assets/images/officedetourisme2.png',
                    title: 'Services et réservations',
                    description: 'Hébergements, activités, guides de montagne.'
                }
            ]
        }
    };
    
    // Fonction pour afficher une story
    window.showStory = function(storyType) {
        const data = storiesData[storyType];
        if (!data) return;
        
        // Cacher le texte d'intro et montrer Swiper
        storiesIntro.classList.remove('active');
        setTimeout(() => {
            storiesIntro.style.display = 'none';
            swiperContainer.style.display = 'block';
            
            // Créer les slides
            const swiperWrapper = document.getElementById('swiperWrapper');
            swiperWrapper.innerHTML = '';
            
            data.slides.forEach(slide => {
                const slideElement = document.createElement('div');
                slideElement.className = 'swiper-slide';
                slideElement.innerHTML = `
                    <img src="${slide.image}" alt="${slide.title}">
                    <div class="slide-content">
                        <h3>${slide.title}</h3>
                        <p>${slide.description}</p>
                    </div>
                `;
                swiperWrapper.appendChild(slideElement);
            });
            
            // Détruire l'ancien swiper s'il existe
            if (currentSwiper) {
                currentSwiper.destroy();
            }
            
            // Créer le nouveau swiper
            currentSwiper = new Swiper('.story-swiper', {
                effect: 'coverflow',
                grabCursor: true,
                centeredSlides: true,
                slidesPerView: 'auto',
                coverflowEffect: {
                    rotate: 50,
                    stretch: 0,
                    depth: 100,
                    modifier: 1,
                    slideShadows: true,
                },
                pagination: {
                    el: '.swiper-pagination',
                    clickable: true,
                },
                navigation: {
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev',
                },
                autoplay: {
                    delay: 4000,
                    disableOnInteraction: false,
                },
                observer: true,
                observeParents: true,
            });
        }, 300);
    };
    
    // Fonction pour fermer une story
    window.closeStory = function() {
        swiperContainer.style.display = 'none';
        storiesIntro.style.display = 'block';
        setTimeout(() => {
            storiesIntro.classList.add('active');
        }, 10);
        
        if (currentSwiper) {
            currentSwiper.destroy();
            currentSwiper = null;
        }
        
        storyBubbles.forEach(bubble => bubble.classList.remove('active'));
    };
    
    // Événements sur les bulles
    storyBubbles.forEach(bubble => {
        bubble.addEventListener('click', function() {
            const storyType = this.getAttribute('data-story');
            
            storyBubbles.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            showStory(storyType);
        });
    });
    
    // Afficher l'intro par défaut
    storiesIntro.classList.add('active');
}

(function() {
  const btnPro = document.querySelector('.btn-pro');
  const modal = document.getElementById('loginModal');
  const overlay = document.getElementById('loginOverlay');
  const closeBtn = document.getElementById('loginClose');
  const form = document.getElementById('loginForm');
  const email = document.getElementById('email');
  const password = document.getElementById('password');

  function openModal() {
    modal.classList.add('active');
    overlay.classList.add('active');
    document.body.classList.add('no-scroll');
    modal.setAttribute('aria-hidden','false');
    overlay.setAttribute('aria-hidden','false');
    setTimeout(() => email && email.focus(), 10);
  }
  function closeModal() {
    modal.classList.remove('active');
    overlay.classList.remove('active');
    document.body.classList.remove('no-scroll');
    modal.setAttribute('aria-hidden','true');
    overlay.setAttribute('aria-hidden','true');
  }

  if (btnPro) {
    btnPro.addEventListener('click', (e) => {
      e.preventDefault();
      openModal();
    });
  }
  [closeBtn, overlay].forEach(el => el && el.addEventListener('click', closeModal));
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) closeModal();
  });

  // Demo submit (prevent navigation)
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      // Here you can hook your real auth flow
      // For now, just close and log
      console.log('Login attempt:', { email: email.value, password: password.value });
      closeModal();
    });
  }
})();