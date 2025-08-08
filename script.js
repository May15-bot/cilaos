// Configuration du slideshow
const SLIDESHOW_CONFIG = {
    autoPlayDelay: 5000,        // Délai entre chaque slide en millisecondes
    transitionDuration: 2000,   // Durée de la transition entre slides
    pauseOnHover: false,        // Ne pas mettre en pause au survol (arrière-plan)
    loop: true                  // Recommencer après la dernière slide
};

// Configuration des stories
const STORIES_CONFIG = {
    autoPlayDelay: 5000,        // Délai pour l'autoplay des stories
    enableSwipe: true,          // Activer le swipe sur mobile
    keyboardNavigation: true    // Navigation au clavier
};


/**
 * Initialise le menu hamburger pour les appareils mobiles et tablettes
 * Cette fonction gère l'ouverture/fermeture du menu et l'accessibilité
 */
function initHamburgerMenu() {
    const toggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-menu a');
    
    if (!toggle || !navMenu) {
        console.warn('Éléments de navigation non trouvés');
        return;
    }
    
    // Gestion du clic sur le bouton hamburger
    toggle.addEventListener('click', () => {
        const isOpen = toggle.classList.contains('open');
        
        // Toggle des classes pour l'animation
        toggle.classList.toggle('open');
        navMenu.classList.toggle('open');
        
        // Mise à jour de l'accessibilité ARIA
        toggle.setAttribute('aria-expanded', !isOpen);
        toggle.setAttribute('aria-label', isOpen ? 'Ouvrir le menu' : 'Fermer le menu');
        
        // Empêcher le scroll du body quand le menu est ouvert (mobile)
        if (!isOpen && window.innerWidth <= 1146) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    });
    
    // Fermer le menu quand on clique sur un lien
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            toggle.classList.remove('open');
            navMenu.classList.remove('open');
            toggle.setAttribute('aria-expanded', 'false');
            document.body.style.overflow = '';
        });
    });
    
    // Fermer le menu avec la touche Escape
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && toggle.classList.contains('open')) {
            toggle.classList.remove('open');
            navMenu.classList.remove('open');
            toggle.setAttribute('aria-expanded', 'false');
            document.body.style.overflow = '';
        }
    });
    
    // Gérer le redimensionnement de la fenêtre
    let resizeTimer;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            // Si on passe en mode desktop, réinitialiser le menu
            if (window.innerWidth > 1146) {
                toggle.classList.remove('open');
                navMenu.classList.remove('open');
                document.body.style.overflow = '';
            }
        }, 250);
    });
}


/**
 * Classe pour gérer le slideshow en arrière-plan
 * Utilise le pattern Module pour encapsuler la logique
 */
class BackgroundSlideshow {
    constructor(config) {
        this.config = config;
        this.currentSlide = 0;
        this.slides = [];
        this.indicators = [];
        this.intervalId = null;
        this.isPaused = false;
        this.isTransitioning = false;
    }
    
    /**
     * Initialise le slideshow
     */
    init() {
        // Récupérer tous les éléments nécessaires
        this.slides = document.querySelectorAll('.slideshow-slide');
        this.indicators = document.querySelectorAll('.slideshow-indicators .indicator');
        
        if (this.slides.length === 0) {
            console.warn('Aucune slide trouvée pour le slideshow');
            return;
        }
        
        // Configurer les événements des indicateurs
        this.setupIndicators();
        
        // Démarrer le slideshow automatique
        this.startAutoPlay();
        
        // Gérer la visibilité de la page (optimisation performance)
        this.handlePageVisibility();
        
        // Précharger les images pour des transitions fluides
        this.preloadImages();
        
        // Support du swipe sur mobile pour le slideshow
        if ('ontouchstart' in window) {
            this.setupTouchSupport();
        }
    }
    
    /**
     * Configure les indicateurs cliquables
     */
    setupIndicators() {
        this.indicators.forEach((indicator, index) => {
            indicator.addEventListener('click', () => {
                if (!this.isTransitioning) {
                    this.goToSlide(index);
                    this.resetAutoPlay();
                }
            });
            
            // Support clavier pour l'accessibilité
            indicator.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    this.goToSlide(index);
                    this.resetAutoPlay();
                }
            });
        });
    }
    
    /**
     * Passe à une slide spécifique
     * @param {number} index - Index de la slide cible
     */
    goToSlide(index) {
        if (this.isTransitioning || index === this.currentSlide) return;
        
        this.isTransitioning = true;
        
        // Retirer la classe active de la slide actuelle
        this.slides[this.currentSlide].classList.remove('active');
        this.indicators[this.currentSlide].classList.remove('active');
        this.indicators[this.currentSlide].setAttribute('aria-selected', 'false');
        
        // Mettre à jour l'index
        this.currentSlide = index;
        
        // Ajouter la classe active à la nouvelle slide
        this.slides[this.currentSlide].classList.add('active');
        this.indicators[this.currentSlide].classList.add('active');
        this.indicators[this.currentSlide].setAttribute('aria-selected', 'true');
        
        // Débloquer les transitions après l'animation
        setTimeout(() => {
            this.isTransitioning = false;
        }, this.config.transitionDuration);
    }
    
    /**
     * Passe à la slide suivante
     */
    nextSlide() {
        const nextIndex = (this.currentSlide + 1) % this.slides.length;
        this.goToSlide(nextIndex);
    }
    
    /**
     * Passe à la slide précédente
     */
    prevSlide() {
        const prevIndex = (this.currentSlide - 1 + this.slides.length) % this.slides.length;
        this.goToSlide(prevIndex);
    }
    
    /**
     * Démarre la lecture automatique
     */
    startAutoPlay() {
        if (this.config.autoPlayDelay && !this.intervalId) {
            this.intervalId = setInterval(() => {
                if (!this.isPaused) {
                    this.nextSlide();
                }
            }, this.config.autoPlayDelay);
        }
    }
    
    /**
     * Arrête la lecture automatique
     */
    stopAutoPlay() {
        if (this.intervalId) {
            clearInterval(this.intervalId);
            this.intervalId = null;
        }
    }
    
    /**
     * Réinitialise l'autoplay (utile après une interaction manuelle)
     */
    resetAutoPlay() {
        this.stopAutoPlay();
        this.startAutoPlay();
    }
    
    /**
     * Gère la visibilité de la page pour économiser les ressources
     */
    handlePageVisibility() {
        document.addEventListener('visibilitychange', () => {
            if (document.hidden) {
                // Page cachée : arrêter le slideshow
                this.isPaused = true;
                this.stopAutoPlay();
            } else {
                // Page visible : reprendre le slideshow
                this.isPaused = false;
                this.startAutoPlay();
            }
        });
    }
    
    /**
     * Précharge les images pour des transitions fluides
     */
    preloadImages() {
        this.slides.forEach(slide => {
            const bgImage = window.getComputedStyle(slide).backgroundImage;
            if (bgImage && bgImage !== 'none') {
                // Extraire l'URL de l'image
                const urlMatch = bgImage.match(/url\(['"]?([^'")]*)['"]?\)/);
                if (urlMatch && urlMatch[1]) {
                    const img = new Image();
                    img.src = urlMatch[1];
                }
            }
        });
    }
    
    /**
     * Ajoute le support du swipe tactile pour mobile
     */
    setupTouchSupport() {
        let touchStartX = 0;
        let touchEndX = 0;
        const container = document.querySelector('.slideshow-container');
        
        if (!container) return;
        
        container.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
        }, { passive: true });
        
        container.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            this.handleSwipe(touchStartX, touchEndX);
        }, { passive: true });
    }
    
    /**
     * Gère le swipe
     */
    handleSwipe(startX, endX) {
        const swipeThreshold = 50; // Minimum de pixels pour déclencher un swipe
        const diff = startX - endX;
        
        if (Math.abs(diff) > swipeThreshold) {
            if (diff > 0) {
                // Swipe vers la gauche : slide suivante
                this.nextSlide();
            } else {
                // Swipe vers la droite : slide précédente
                this.prevSlide();
            }
            this.resetAutoPlay();
        }
    }
    
    /**
     * Nettoie les ressources
     */
    destroy() {
        this.stopAutoPlay();
        this.slides = [];
        this.indicators = [];
    }
}


// Données des stories (contenu des slides)
const storiesData = {
    culture: [
        {
            image: 'https://images.unsplash.com/photo-1533900298318-6b8da08a523e?w=800',
            title: 'Église de Cilaos',
            description: 'Architecture créole historique préservée depuis le XIXe siècle'
        },
        {
            image: 'https://images.unsplash.com/photo-1569163139394-de4798aa62b6?w=800',
            title: 'Cases créoles',
            description: 'Patrimoine architectural unique aux couleurs vives'
        },
        {
            image: 'https://images.unsplash.com/photo-1590736969955-71cc94901144?w=800',
            title: 'Artisanat local',
            description: 'Broderie de Cilaos, tradition inscrite au patrimoine'
        }
    ],
    randonnees: [
        {
            image: 'https://images.unsplash.com/photo-1551632811-561732d1e306?w=800',
            title: 'Piton des Neiges',
            description: 'Le point culminant de l\'océan Indien à 3070m'
        },
        {
            image: 'https://images.unsplash.com/photo-1519904981063-b0cf448d479e?w=800',
            title: 'Cascade de Bras Rouge',
            description: 'Randonnée aquatique rafraîchissante'
        },
        {
            image: 'https://images.unsplash.com/photo-1464207687429-7505649dae38?w=800',
            title: 'Sentier du Col du Taïbit',
            description: 'Vue panoramique sur tout le cirque'
        }
    ],
    gastronomie: [
        {
            image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800',
            title: 'Lentilles de Cilaos',
            description: 'Produit IGP cultivé en terrasses depuis 1850'
        },
        {
            image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800',
            title: 'Cari créole',
            description: 'Saveurs authentiques de la cuisine réunionnaise'
        }
    ],
    thermes: [
        {
            image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=800',
            title: 'Thermes de Cilaos',
            description: 'Sources thermales bienfaisantes depuis 1896'
        },
        {
            image: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=800',
            title: 'Soins thermaux',
            description: 'Rhumatologie et remise en forme naturelle'
        }
    ]
};

// Variables globales pour les stories
let storySwiper = null;
let currentStory = null;

// Contenu HTML de bienvenue (sauvegardé pour pouvoir le restaurer)
const welcomeContentHTML = `
    <div class="welcome-content" id="welcomeContent">
        <h2>Bienvenue à Cilaos</h2>
        <p>
            Nichée au cœur de l'île de La Réunion, Cilaos est un cirque naturel d'une beauté à couper le souffle. 
            Entre ses sommets vertigineux et ses sources thermales, découvrez un lieu où la nature et la culture créole 
            se rencontrent en parfaite harmonie.
        </p>
        <p>
            Des randonnées mythiques du Piton des Neiges aux saveurs authentiques de la cuisine créole, 
            en passant par les thermes centenaires et les traditions artisanales, Cilaos vous invite à explorer 
            ses multiples facettes.
        </p>
        <p>
            <strong>Cliquez sur une bulle pour découvrir nos histoires...</strong>
        </p>
    </div>
`;

/**
 * Ouvre une story dans la zone d'affichage
 * @param {string} storyType - Type de story à afficher
 */
function openStory(storyType) {
    // Vérifier que le type de story existe
    if (!storiesData[storyType]) {
        console.error(`Story type "${storyType}" n'existe pas`);
        return;
    }
    
    currentStory = storyType;
    const display = document.getElementById('storyDisplay');
    
    if (!display) {
        console.error('Zone d\'affichage des stories non trouvée');
        return;
    }
    
    // Activer visuellement la bulle cliquée
    document.querySelectorAll('.story-circle').forEach(circle => {
        circle.classList.remove('active');
    });
    
    const activeCircle = document.querySelector(`[data-story="${storyType}"] .story-circle`);
    if (activeCircle) {
        activeCircle.classList.add('active');
    }
    
    // Créer le HTML du slider Swiper
    const slidesHTML = storiesData[storyType].map(slide => `
        <div class="swiper-slide">
            <img src="${slide.image}" 
                 alt="${slide.title}" 
                 loading="lazy">
            <div class="slide-content">
                <h3>${slide.title}</h3>
                <p>${slide.description}</p>
            </div>
        </div>
    `).join('');
    
    // Injecter le slider dans la zone d'affichage
    display.innerHTML = `
        <div class="story__slider swiper">
            <button class="story-close-btn" onclick="closeStoryDisplay()">
                Retour
            </button>
            <div class="swiper-wrapper">
                ${slidesHTML}
            </div>
            <div class="swiper-pagination"></div>
        </div>
    `;
    
    // Initialiser Swiper avec configuration responsive
    storySwiper = new Swiper('.story__slider', {
        loop: true,
        autoplay: {
            delay: STORIES_CONFIG.autoPlayDelay,
            disableOnInteraction: false,
            pauseOnMouseEnter: true
        },
        pagination: {
            el: '.swiper-pagination',
            type: 'progressbar'
        },
        keyboard: {
            enabled: STORIES_CONFIG.keyboardNavigation,
            onlyInViewport: true
        },
        // Configuration responsive
        breakpoints: {
            // Quand la largeur de la fenêtre est >= 320px
            320: {
                slidesPerView: 1,
                spaceBetween: 10
            },
            // Quand la largeur de la fenêtre est >= 768px
            768: {
                slidesPerView: 1,
                spaceBetween: 20
            },
            // Quand la largeur de la fenêtre est >= 1024px
            1024: {
                slidesPerView: 1,
                spaceBetween: 30
            }
        },
        // Accessibilité
        a11y: {
            prevSlideMessage: 'Slide précédente',
            nextSlideMessage: 'Slide suivante',
            firstSlideMessage: 'Première slide',
            lastSlideMessage: 'Dernière slide'
        }
    });
    
    // Animation d'entrée
    requestAnimationFrame(() => {
        const slider = display.querySelector('.story__slider');
        if (slider) {
            slider.style.animation = 'slideIn 0.5s cubic-bezier(0.4, 0, 0.2, 1)';
        }
    });
}

/**
 * Ferme la story et restaure le contenu de bienvenue
 */
function closeStoryDisplay() {
    const display = document.getElementById('storyDisplay');
    
    if (!display) return;
    
    // Retirer la classe active de toutes les bulles
    document.querySelectorAll('.story-circle').forEach(circle => {
        circle.classList.remove('active');
    });
    
    // Détruire l'instance Swiper pour libérer la mémoire
    if (storySwiper) {
        storySwiper.destroy(true, true);
        storySwiper = null;
    }
    
    // Restaurer le contenu de bienvenue avec animation
    display.style.opacity = '0';
    setTimeout(() => {
        display.innerHTML = welcomeContentHTML;
        display.style.opacity = '1';
    }, 300);
    
    currentStory = null;
}

/**
 * Initialise les événements des stories
 */
function initStories() {
    const storyItems = document.querySelectorAll('.story-item');
    
    storyItems.forEach(item => {
        // Support du clic
        item.addEventListener('click', () => {
            const storyType = item.dataset.story;
            openStory(storyType);
        });
        
        // Support du clavier pour l'accessibilité
        item.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                const storyType = item.dataset.story;
                openStory(storyType);
            }
        });
    });
}


/**
 * Initialise le smooth scroll pour tous les liens d'ancrage
 */
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const target = document.querySelector(targetId);
            if (target) {
                // Calculer la position en tenant compte de la navbar fixe
                const navbarHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = target.offsetTop - navbarHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Mettre à jour l'URL sans déclencher le scroll
                history.pushState(null, null, targetId);
            }
        });
    });
}


/**
 * Ajoute un effet parallax subtil au hero content
 */
function initParallaxEffect() {
    let ticking = false;
    const parallaxElements = document.querySelectorAll('.hero-content');
    
    // Vérifier si l'utilisateur préfère les animations réduites
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    if (prefersReducedMotion || parallaxElements.length === 0) {
        return; // Ne pas appliquer l'effet parallax
    }
    
    function updateParallax() {
        const scrolled = window.pageYOffset;
        
        parallaxElements.forEach(element => {
            // Vérifier si l'élément est visible
            const rect = element.getBoundingClientRect();
            const isVisible = rect.bottom >= 0 && rect.top <= window.innerHeight;
            
            if (isVisible) {
                const speed = 0.3; // Vitesse de l'effet parallax
                const yPos = -(scrolled * speed);
                element.style.transform = `translateY(${yPos}px)`;
            }
        });
        
        ticking = false;
    }
    
    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(updateParallax);
            ticking = true;
        }
    }, { passive: true });
}


/**
 * Détecte le type d'appareil et applique des optimisations
 */
function optimizeForMobile() {
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
    
    if (isMobile) {
        // Désactiver le zoom sur double tap (iOS)
        let lastTouchEnd = 0;
        document.addEventListener('touchend', (e) => {
            const now = Date.now();
            if (now - lastTouchEnd <= 300) {
                e.preventDefault();
            }
            lastTouchEnd = now;
        }, false);
        
        // Optimiser les animations pour mobile
        document.documentElement.style.setProperty('--animation-duration', '0.3s');
    }
    
    if (isIOS) {
        // Fix pour le viewport height sur iOS
        const setViewportHeight = () => {
            const vh = window.innerHeight * 0.01;
            document.documentElement.style.setProperty('--vh', `${vh}px`);
        };
        
        setViewportHeight();
        window.addEventListener('resize', setViewportHeight);
        window.addEventListener('orientationchange', setViewportHeight);
    }
}


/**
 * Implémente le lazy loading natif avec fallback
 */
function initLazyLoading() {
    // Vérifier si le navigateur supporte le lazy loading natif
    if ('loading' in HTMLImageElement.prototype) {
        // Le navigateur supporte le lazy loading natif
        const images = document.querySelectorAll('img[loading="lazy"]');
        images.forEach(img => {
            // S'assurer que l'attribut est bien défini
            if (!img.hasAttribute('loading')) {
                img.setAttribute('loading', 'lazy');
            }
        });
    } else {
        // Fallback avec Intersection Observer pour les anciens navigateurs
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    const src = img.dataset.src;
                    
                    if (src) {
                        img.src = src;
                        img.removeAttribute('data-src');
                    }
                    
                    observer.unobserve(img);
                }
            });
        }, {
            rootMargin: '50px 0px', // Commencer le chargement 50px avant
            threshold: 0.01
        });
        
        // Observer toutes les images avec data-src
        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    }
}

/**
 * Optimise les performances générales
 */
function optimizePerformance() {
    // Debounce pour le resize
    let resizeTimeout;
    window.addEventListener('resize', () => {
        // Éviter les recalculs trop fréquents
        document.body.classList.add('resize-animation-stopper');
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            document.body.classList.remove('resize-animation-stopper');
        }, 400);
    });
    
    // Optimisation du scroll
    let scrollTimeout;
    let isScrolling = false;
    
    window.addEventListener('scroll', () => {
        if (!isScrolling) {
            document.body.classList.add('is-scrolling');
            isScrolling = true;
        }
        
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(() => {
            document.body.classList.remove('is-scrolling');
            isScrolling = false;
        }, 150);
    }, { passive: true });
}


/**
 * Classe pour gérer les preview cards avec slideshows au hover
 * Chaque carte représente une section de la navigation
 */
class PreviewCards {
    constructor() {
        this.cards = [];
        this.intervals = new Map(); // Stocke les intervalles pour chaque carte
    }
    
    /**
     * Initialise toutes les preview cards
     */
    init() {
        // Récupérer toutes les cartes de preview
        const cardElements = document.querySelectorAll('.preview-card');
        
        if (cardElements.length === 0) {
            console.warn('Aucune preview card trouvée');
            return;
        }
        
        cardElements.forEach(card => {
            this.setupCard(card);
        });
        
        console.log(`✓ ${cardElements.length} preview cards initialisées`);
    }
    
    /**
     * Configure une carte individuelle
     * @param {HTMLElement} card - L'élément carte à configurer
     */
    setupCard(card) {
        const slides = card.querySelectorAll('.preview-slide');
        const sectionName = card.dataset.section;
        
        if (slides.length <= 1) return; // Pas besoin de slideshow s'il n'y a qu'une slide
        
        // Variables pour gérer le slideshow de cette carte
        let currentSlideIndex = 0;
        let intervalId = null;
        
        /**
         * Fonction pour changer de slide
         */
        const changeSlide = () => {
            // Masquer la slide actuelle
            slides[currentSlideIndex].classList.remove('active');
            
            // Passer à la slide suivante
            currentSlideIndex = (currentSlideIndex + 1) % slides.length;
            
            // Afficher la nouvelle slide
            slides[currentSlideIndex].classList.add('active');
        };
        
        /**
         * Démarre le slideshow au hover
         */
        const startSlideshow = () => {
            // Éviter les doublons d'intervalles
            if (intervalId) return;
            
            // Changer immédiatement pour un feedback instantané
            changeSlide();
            
            // Puis continuer à changer toutes les 2 secondes
            intervalId = setInterval(changeSlide, 2000);
            this.intervals.set(card, intervalId);
        };
        
        /**
         * Arrête le slideshow quand on quitte le hover
         */
        const stopSlideshow = () => {
            if (intervalId) {
                clearInterval(intervalId);
                intervalId = null;
                this.intervals.delete(card);
            }
            
            // Réinitialiser à la première slide
            slides.forEach(slide => slide.classList.remove('active'));
            currentSlideIndex = 0;
            slides[0].classList.add('active');
        };
        
        // Événements hover pour desktop
        card.addEventListener('mouseenter', startSlideshow);
        card.addEventListener('mouseleave', stopSlideshow);
        
        // Support tactile pour mobile (tap pour démarrer/arrêter)
        let isTouched = false;
        card.addEventListener('touchstart', (e) => {
            e.preventDefault();
            if (isTouched) {
                stopSlideshow();
                isTouched = false;
            } else {
                startSlideshow();
                isTouched = true;
            }
        }, { passive: false });
        
        // Navigation au clic vers la section correspondante
        card.addEventListener('click', (e) => {
            // Ne pas naviguer si c'est un touch event
            if (e.type === 'touchstart') return;
            
            // Naviguer vers la section correspondante
            const targetSection = document.getElementById(sectionName);
            if (targetSection) {
                const navbarHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = targetSection.offsetTop - navbarHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Mettre à jour l'URL
                history.pushState(null, null, `#${sectionName}`);
            }
        });
        
        // Accessibilité clavier
        card.setAttribute('tabindex', '0');
        card.setAttribute('role', 'button');
        card.setAttribute('aria-label', `Aperçu de la section ${sectionName}`);
        
        card.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                const targetSection = document.getElementById(sectionName);
                if (targetSection) {
                    targetSection.scrollIntoView({ behavior: 'smooth' });
                }
            }
        });
    }
    
    /**
     * Nettoie toutes les ressources
     */
    destroy() {
        // Arrêter tous les intervalles
        this.intervals.forEach(intervalId => {
            clearInterval(intervalId);
        });
        this.intervals.clear();
        this.cards = [];
    }
}

/**
 * Fonction d'initialisation principale
 * Appelée quand le DOM est complètement chargé
 */
function init() {
    console.log('🚀 Initialisation du site Cilaos...');
    
    // Initialiser les composants dans l'ordre optimal
    initHamburgerMenu();
    console.log('✓ Menu hamburger initialisé');
    
    // Initialiser le slideshow en arrière-plan
    const slideshow = new BackgroundSlideshow(SLIDESHOW_CONFIG);
    slideshow.init();
    console.log('✓ Slideshow initialisé');
    
    // Initialiser les preview cards avec mini slideshows
    const previewCards = new PreviewCards();
    previewCards.init();
    console.log('✓ Preview cards initialisées');
    
    // Initialiser les stories
    initStories();
    console.log('✓ Stories initialisées');
    
    // Initialiser le smooth scroll
    initSmoothScroll();
    console.log('✓ Smooth scroll initialisé');
    
    // Initialiser l'effet parallax (si pas de préférence pour animations réduites)
    initParallaxEffect();
    console.log('✓ Effet parallax initialisé');
    
    // Optimisations mobile
    optimizeForMobile();
    console.log('✓ Optimisations mobile appliquées');
    
    // Lazy loading des images
    initLazyLoading();
    console.log('✓ Lazy loading initialisé');
    
    // Optimisations de performance
    optimizePerformance();
    console.log('✓ Optimisations de performance appliquées');
    
    console.log('✅ Site complètement initialisé !');
}

// ================================================================
// LANCEMENT DE L'APPLICATION
// ================================================================

// Attendre que le DOM soit complètement chargé
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    // Le DOM est déjà chargé (cas rare mais possible)
    init();
}

// Rendre la fonction closeStoryDisplay globale pour le bouton de fermeture
window.closeStoryDisplay = closeStoryDisplay;

// ================================================================
// GESTION DES ERREURS GLOBALES
// ================================================================

/**
 * Capture les erreurs JavaScript pour le debugging
 */
window.addEventListener('error', (e) => {
    console.error('Erreur capturée:', e.error);
    // En production, vous pourriez envoyer ces erreurs à un service de monitoring
});

// ================================================================
// SERVICE WORKER (OPTIONNEL - POUR LE MODE HORS LIGNE)
// ================================================================

/**
 * Enregistre un service worker pour le cache et le mode hors ligne
 * Décommentez cette section si vous voulez implémenter un PWA
 */
/*
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('Service Worker enregistré:', registration);
            })
            .catch(error => {
                console.log('Erreur Service Worker:', error);
            });
    });
}
*/