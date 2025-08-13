// ================================================
// INITIALISATION AU CHARGEMENT DE LA PAGE
// ================================================
document.addEventListener('DOMContentLoaded', function() {
    console.log('✅ Site Cilaos initialisé avec succès !');
    
    // Initialiser tous les composants
    initNavMenu();
    initSlideshow();
    initAccessTabs();
    initParallaxMap();
    initStories();
});

// ================================================
// MENU HAMBURGER (Navigation mobile)
// ================================================
function initNavMenu() {
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (navToggle) {
        navToggle.addEventListener('click', function() {
            navToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
        
        // Fermer le menu quand on clique sur un lien
        const navLinks = document.querySelectorAll('.nav-menu a');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navToggle.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }
}

// ================================================
// SLIDESHOW (Section Hero)
// ================================================
function initSlideshow() {
    let currentSlide = 0;
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.dot');
    
    if (slides.length === 0) return;
    
    function showSlide(index) {
        if (index >= slides.length) currentSlide = 0;
        else if (index < 0) currentSlide = slides.length - 1;
        else currentSlide = index;
        
        // Retirer la classe active de toutes les slides et dots
        slides.forEach(slide => slide.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));
        
        // Ajouter la classe active à la slide et dot actuelle
        slides[currentSlide].classList.add('active');
        if (dots[currentSlide]) {
            dots[currentSlide].classList.add('active');
        }
    }
    
    // Changer automatiquement de slide toutes les 5 secondes
    setInterval(() => {
        showSlide(currentSlide + 1);
    }, 5000);
    
    // Permettre de cliquer sur les dots pour changer de slide
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            showSlide(index);
        });
    });
}

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
// EFFET PARALLAX POUR LA CARTE
// ================================================
function initParallaxMap() {
    const etapeSections = document.querySelectorAll('.etape-section');
    
    if (etapeSections.length === 0) return;
    
    const observerOptions = {
        root: null,
        rootMargin: '-40% 0px -40% 0px',
        threshold: 0
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Retirer la classe active de toutes les sections
                etapeSections.forEach(section => section.classList.remove('active'));
                // Ajouter la classe active à la section visible
                entry.target.classList.add('active');
                
                // Optionnel : vous pouvez déclencher des animations sur la carte ici
                const segmentId = entry.target.getAttribute('data-segment');
                console.log('Section active :', segmentId);
            }
        });
    }, observerOptions);
    
    etapeSections.forEach(section => {
        observer.observe(section);
    });
}

// ================================================
// STORIES AVEC SWIPER (4 stories en créole)
// ================================================
let currentSwiper = null;

function initStories() {
    const storyBubbles = document.querySelectorAll('.story-bubble');
    const storiesIntro = document.getElementById('storiesIntro');
    const swiperContainer = document.getElementById('storySwiper');
    
    // Données des 4 stories
    const storiesData = {
        actualites: {
            title: 'La vi lé isi - Actualités',
            slides: [
                {
                    image: 'https://images.unsplash.com/photo-1585829365295-ab7cd400c167?w=800',
                    title: 'Festival Sakifo 2025',
                    description: 'Le plu '
                },
                {
                    image: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800',
                    title: 'Marché forain du dimanche',
                    description: 'Chaque dimanche, le marché s\'anime avec les produits locaux, l\'artisanat et les saveurs créoles.'
                },
                {
                    image: 'https://images.unsplash.com/photo-1523301343968-6a6ebf63c672?w=800',
                    title: 'Fête des Lentilles',
                    description: 'Célébration annuelle de la lentille de Cilaos, produit emblématique du cirque.'
                }
            ]
        },
        randonnees: {
            title: 'Gravir Cilaos - Randonnées',
            slides: [
                {
                    image: '/images/rando1.png',
                    title: 'Piton des Neiges',
                    description: 'Le plus haut sommet de l\'océan Indien vous attend pour une ascension mythique de 3070m.'
                },
                {
                    image: '/images/rando2.png',
                    title: 'Col du Taïbit',
                    description: 'Passage historique entre Cilaos et Mafate, une randonnée au cœur de l\'histoire.'
                },
                {
                    image: '/images/rando3.png',
                    title: 'Roche Merveilleuse',
                    description: 'Un belvédère naturel offrant une vue panoramique exceptionnelle sur tout le cirque.'
                }
            ]
        },
        saveurs: {
            title: 'Manzé Cilaos - Saveurs locales',
            slides: [
                {
                    image: '/images/gastronomie1.png',
                    title: 'Lentilles de Cilaos IGP',
                    description: 'Cultivées en terrasses depuis des générations, les lentilles de Cilaos sont uniques au monde.'
                },
                {
                    image: '/images/gastronomie2.png',
                    title: 'Carry créole traditionnel',
                    description: 'Le carry poulet, carry boucané ou carry tangue, découvrez les saveurs authentiques créoles.'
                },
                {
                    image: '/images/gastronomie3.png',
                    title: 'Vin de Cilaos',
                    description: 'Le seul vignoble tropical d\'altitude de France produit des vins uniques et surprenants.'
                },
                {
                    image: '/images/gastronomie4.png',
                    title: 'Rhum arrangé',
                    description: 'Découvrez les secrets du rhum arrangé aux fruits tropicaux, tradition réunionnaise.'
                }
            ]
        },
        office: {
            title: 'Zot lakaz lé ici - Notre office',
            slides: [
                {
                    image: '/images/local1.png',
                    title: 'Accueil personnalisé',
                    description: 'Notre équipe vous accueille 7j/7 pour vous conseiller et organiser votre séjour.'
                },
                {
                    image: '/images/local2.png',
                    title: 'Services et réservations',
                    description: 'Réservation d\'hébergements, activités, guides de montagne, tout est possible à l\'office.'
                },
                {
                    image: '/images/local3.png',
                    title: 'Documentation gratuite',
                    description: 'Cartes, brochures, guides pratiques pour explorer Cilaos en toute autonomie.'
                },
                {
                    image: '/images/local4.png',
                    title: 'Boutique souvenirs',
                    description: 'Artisanat local, produits du terroir et souvenirs authentiques de Cilaos.'
                }
            ]
        }
    };
    
    // Fonction pour afficher une story
    window.showStory = function(storyType) {
        const data = storiesData[storyType];
        if (!data) return;
        
        // Cacher le texte d'intro et montrer Swiper
        if (storiesIntro) storiesIntro.style.display = 'none';
        if (swiperContainer) swiperContainer.style.display = 'block';
        
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
        currentSwiper = new Swiper('.swiper', {
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
        });
    };
    
    // Fonction pour fermer une story
    window.closeStory = function() {
        // Cacher Swiper et montrer le texte d'intro
        if (swiperContainer) swiperContainer.style.display = 'none';
        if (storiesIntro) storiesIntro.style.display = 'block';
        
        // Détruire le swiper
        if (currentSwiper) {
            currentSwiper.destroy();
            currentSwiper = null;
        }
        
        // Retirer la classe active de toutes les bulles
        storyBubbles.forEach(bubble => bubble.classList.remove('active'));
    };
    
    // Événements sur les bulles
    storyBubbles.forEach(bubble => {
        bubble.addEventListener('click', function() {
            const storyType = this.getAttribute('data-story');
            
            // Retirer la classe active de toutes les bulles
            storyBubbles.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            showStory(storyType);
        });
    });
}

// ================================================
// SMOOTH SCROLL (Défilement fluide)
// ================================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 70; // 70px pour la navbar
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// ================================================
// ANIMATIONS AU SCROLL
// ================================================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observer les éléments à animer
document.querySelectorAll('.container > *').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// ================================================
// FONCTION UTILITAIRE : DEBOUNCE
// ================================================
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Exemple d'utilisation du debounce pour le resize
window.addEventListener('resize', debounce(function() {
    console.log('Fenêtre redimensionnée');
    // Ici on pourrait ajuster des éléments selon la nouvelle taille
}, 250));

// ================================================
// GESTION DES ERREURS
// ================================================
window.addEventListener('error', function(e) {
    console.error('Erreur détectée:', e.message);
});