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
            hotel: [
                'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800',
                'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800',
                'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800',
                'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800'
            ],
            gite: [
                'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=800',
                'https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=800',
                'https://images.unsplash.com/photo-1505142468610-359e7d316be0?w=800',
                'https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=800'
            ],
            camping: [
                'https://images.unsplash.com/photo-1504851149312-7a075b496cc7?w=800',
                'https://images.unsplash.com/photo-1478131143081-80f7f84ca84d?w=800',
                'https://images.unsplash.com/photo-1537905569824-f89f14cceb68?w=800',
                'https://images.unsplash.com/photo-1441716844725-09cedc13a4e7?w=800'
            ]
        };

        // Variables globales
        let currentSlideIndex = 0;
        let currentCategoryImages = [];

        // Initialisation
        document.addEventListener('DOMContentLoaded', function() {
            console.log('✅ Hébergements Cilaos initialisé !');
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
                    subtitle: '20 gîtes authentiques dans le cirque',
                    icon: '🏡'
                },
                camping: {
                    title: 'Campings à Cilaos',
                    subtitle: '6 campings nature pour les aventuriers',
                    icon: '⛺'
                }
            };

            const config = categoryConfig[categoryType];
            
            // Mettre à jour le titre
            title.textContent = config.title;
            subtitle.textContent = config.subtitle;
            
            // Préparer les images du slideshow
            currentCategoryImages = categoryImages[categoryType];
            setupSlideshow();
            
            // Afficher la liste des hébergements
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

        // Configurer le slideshow
        function setupSlideshow() {
            const container = document.getElementById('slideshowContainer');
            const dotsContainer = document.getElementById('slideshowDots');
            
            // Vider le container
            container.innerHTML = '';
            dotsContainer.innerHTML = '';
            
            // Créer les slides
            currentCategoryImages.forEach((imageUrl, index) => {
                const slide = document.createElement('div');
                slide.className = `slide ${index === 0 ? 'active' : ''}`;
                slide.innerHTML = `<img src="${imageUrl}" alt="Image ${index + 1}">`;
                container.appendChild(slide);
                
                // Créer les dots
                const dot = document.createElement('span');
                dot.className = `dot ${index === 0 ? 'active' : ''}`;
                dot.onclick = () => goToSlide(index);
                dotsContainer.appendChild(dot);
            });
            
            currentSlideIndex = 0;
        }

        // Changer de slide
        function changeSlide(direction) {
            const slides = document.querySelectorAll('.slide');
            const dots = document.querySelectorAll('.dot');
            
            // Cacher le slide actuel
            slides[currentSlideIndex].classList.remove('active');
            dots[currentSlideIndex].classList.remove('active');
            
            // Calculer le nouvel index
            currentSlideIndex += direction;
            if (currentSlideIndex >= slides.length) currentSlideIndex = 0;
            if (currentSlideIndex < 0) currentSlideIndex = slides.length - 1;
            
            // Afficher le nouveau slide
            slides[currentSlideIndex].classList.add('active');
            dots[currentSlideIndex].classList.add('active');
        }

        // Aller à un slide spécifique
        function goToSlide(index) {
            const slides = document.querySelectorAll('.slide');
            const dots = document.querySelectorAll('.dot');
            
            slides[currentSlideIndex].classList.remove('active');
            dots[currentSlideIndex].classList.remove('active');
            
            currentSlideIndex = index;
            
            slides[currentSlideIndex].classList.add('active');
            dots[currentSlideIndex].classList.add('active');
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

        // Auto-slideshow
        setInterval(() => {
            if (document.getElementById('categoryPopup').style.display === 'flex') {
                changeSlide(1);
            }
        }, 4000);

        // Fermer avec Escape
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') {
                closeCategory();
            }
        });