/**
 * Point d'entrée principal de l'application Cilaos
 * Centralise l'initialisation de tous les modules
 */

// Import des modules centralisés
import Navigation from './modules/Navigation.js';
import Modal from './modules/Modal.js';
import DataManager from './modules/DataManager.js';
import MapManager from './modules/MapManager.js';
import Stories from './modules/Stories.js';
import ScrollEffects from './modules/ScrollEffects.js';

/**
 * Classe principale de l'application
 * Gère l'initialisation et la coordination entre modules
 */
class CilaosApp {
    constructor() {
        this.modules = {};
        this.currentPage = this.detectCurrentPage();
        this.isInitialized = false;
    }

    /**
     * Initialisation principale de l'application
     */
    async init() {
        if (this.isInitialized) {
            console.warn('Application déjà initialisée');
            return;
        }

        console.log('Initialisation de l\'application Cilaos...');
        
        try {
            // 1. Initialiser les modules globaux (présents sur toutes les pages)
            await this.initGlobalModules();
            
            // 2. Initialiser les modules spécifiques à la page courante
            await this.initPageSpecificModules();
            
            // 3. Configuration des événements globaux
            this.setupGlobalEventListeners();
            
            // 4. Initialiser les animations et effets
            this.initAnimations();
            
            this.isInitialized = true;
            console.log('Application Cilaos initialisée avec succès !');
            
            // Dispatcher un événement pour signaler que l'app est prête
            this.dispatchEvent('app:ready');
            
        } catch (error) {
            console.error('Erreur lors de l\'initialisation:', error);
            this.handleInitError(error);
        }
    }

    /**
     * Initialisation des modules globaux
     */
    async initGlobalModules() {
        // Navigation (menu hamburger, etc.)
        this.modules.navigation = new Navigation({
            breakpoint: 900,
            scrollHideThreshold: 200
        });

        // Modals (login, etc.)
        this.modules.modal = new Modal({
            animationDuration: 300
        });

        // Gestionnaire de données
        this.modules.dataManager = new DataManager({
            apiUrl: '/api',
            cacheEnabled: true,
            cacheTimeout: 3600000 // 1 heure
        });

        // Effets de scroll (si nécessaire sur toutes les pages)
        if (this.shouldInitScrollEffects()) {
            this.modules.scrollEffects = new ScrollEffects({
                snapEnabled: this.currentPage === 'index'
            });
        }

        console.log('Modules globaux initialisés');
    }

    /**
     * Initialisation des modules spécifiques à la page
     */
    async initPageSpecificModules() {
        console.log(`Page détectée: ${this.currentPage}`);
        
        switch (this.currentPage) {
            case 'index':
                await this.initHomePage();
                break;
                
            case 'sejour':
                await this.initSejourPage();
                break;
                
            case 'tourisme':
                await this.initTourismePage();
                break;
                
            case 'pratique':
                await this.initPratiquePage();
                break;
                
            default:
                console.log('Page non reconnue, chargement des modules par défaut');
        }
    }

    /**
     * Initialisation spécifique de la page d'accueil
     */
    async initHomePage() {
        console.log('Initialisation de la page d\'accueil');
        
        // Tabs pour la section accès
        this.initAccessTabs();
        
        // Carte avec effet parallax
        if (document.getElementById('map')) {
            this.modules.mapManager = new MapManager({
                mapId: 'map',
                center: [-21.0300, 55.3800],
                zoom: 10,
                enableParallax: true
            });
            await this.modules.mapManager.initVoyageMap();
        }
        
        // Stories
        if (document.querySelector('.section-stories')) {
            this.modules.stories = new Stories({
                autoplay: true,
                autoplayDelay: 4000
            });
        }
    }

    /**
     * Initialisation de la page séjour
     */
    async initSejourPage() {
        console.log('🛏️ Initialisation de la page séjour');
        
        // Charger les données d'hébergement
        const hebergements = await this.modules.dataManager.getHebergements();
        const restaurants = await this.modules.dataManager.getRestaurants();
        
        // Module d'affichage des hébergements
        if (document.getElementById('categoriesContainer')) {
            const { default: HebergementDisplay } = await import('./modules/HebergementDisplay.js');
            this.modules.hebergementDisplay = new HebergementDisplay(hebergements);
        }
        
        // Module d'affichage des restaurants
        if (document.getElementById('restaurant-map')) {
            const { default: RestaurantDisplay } = await import('./modules/RestaurantDisplay.js');
            this.modules.restaurantDisplay = new RestaurantDisplay(restaurants);
            await this.modules.restaurantDisplay.init();
        }
    }

    /**
     * Initialisation de la page tourisme
     */
    async initTourismePage() {
        console.log('Initialisation de la page tourisme');
        
        // Charger les données des activités et événements
        const activites = await this.modules.dataManager.getActivites();
        const evenements = await this.modules.dataManager.getEvenements();
        
        // Affichage des activités
        this.displayActivites(activites);
        
        // Affichage des événements (tickets)
        this.displayEvenements(evenements);
    }

    /**
     * Initialisation de la page pratique
     */
    async initPratiquePage() {
        console.log('ℹInitialisation de la page pratique');
        
        // Animation des cartes de transport
        this.animateTransportCards();
        
        // Gestion des details/summary
        this.setupDetailsToggle();
    }

    /**
     * Gestion des tabs de la section accès
     */
    initAccessTabs() {
        const tabButtons = document.querySelectorAll('.tab-btn');
        const tabPanes = document.querySelectorAll('.tab-pane');
        
        if (!tabButtons.length || !tabPanes.length) return;
        
        tabButtons.forEach(button => {
            button.addEventListener('click', () => {
                const tabId = button.getAttribute('data-tab');
                
                // Retirer la classe active de tous les éléments
                tabButtons.forEach(btn => btn.classList.remove('active'));
                tabPanes.forEach(pane => pane.classList.remove('active'));
                
                // Ajouter la classe active aux éléments sélectionnés
                button.classList.add('active');
                const activePane = document.getElementById(tabId);
                if (activePane) {
                    activePane.classList.add('active');
                    
                    // Animation d'entrée
                    activePane.style.animation = 'fadeIn 0.5s ease';
                }
            });
        });
        
        console.log('Tabs accès initialisés');
    }

    /**
     * Animation des cartes de transport
     */
    animateTransportCards() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                    }, index * 100);
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        document.querySelectorAll('.tc-mini').forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(20px)';
            el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(el);
        });
    }

    /**
     * Gestion des éléments details/summary
     */
    setupDetailsToggle() {
        document.querySelectorAll('details.tc-mini__more').forEach(detail => {
            detail.addEventListener('toggle', function() {
                if (this.open) {
                    // Scroll fluide si nécessaire
                    setTimeout(() => {
                        const rect = this.getBoundingClientRect();
                        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
                        
                        if (rect.bottom > window.innerHeight) {
                            window.scrollTo({
                                top: scrollTop + rect.bottom - window.innerHeight + 20,
                                behavior: 'smooth'
                            });
                        }
                    }, 100);
                }
            });
        });
    }

    /**
     * Configuration des événements globaux
     */
    setupGlobalEventListeners() {
        // Gestion des liens smooth scroll
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                const targetId = anchor.getAttribute('href');
                if (targetId === '#') return;
                
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    e.preventDefault();
                    this.smoothScrollTo(targetElement);
                }
            });
        });

        // Gestion du bouton "Retour en haut"
        this.setupBackToTop();
        
        // Lazy loading des images
        this.setupLazyLoading();
    }

    /**
     * Scroll fluide vers un élément
     */
    smoothScrollTo(element, offset = 80) {
        const targetPosition = element.getBoundingClientRect().top + window.scrollY - offset;
        
        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        });
    }

    /**
     * Configuration du bouton retour en haut
     */
    setupBackToTop() {
        // Créer le bouton s'il n'existe pas
        let backToTopBtn = document.getElementById('backToTop');
        if (!backToTopBtn) {
            backToTopBtn = document.createElement('button');
            backToTopBtn.id = 'backToTop';
            backToTopBtn.className = 'back-to-top';
            backToTopBtn.innerHTML = '↑';
            backToTopBtn.setAttribute('aria-label', 'Retour en haut');
            document.body.appendChild(backToTopBtn);
        }

        // Afficher/masquer selon le scroll
        let scrollTimer;
        window.addEventListener('scroll', () => {
            clearTimeout(scrollTimer);
            scrollTimer = setTimeout(() => {
                if (window.scrollY > 300) {
                    backToTopBtn.classList.add('visible');
                } else {
                    backToTopBtn.classList.remove('visible');
                }
            }, 50);
        });

        // Action au clic
        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    /**
     * Configuration du lazy loading
     */
    setupLazyLoading() {
        const images = document.querySelectorAll('img[data-src]');
        
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        img.src = img.dataset.src;
                        img.removeAttribute('data-src');
                        img.classList.add('loaded');
                        observer.unobserve(img);
                    }
                });
            }, {
                rootMargin: '100px 0px'
            });

            images.forEach(img => imageObserver.observe(img));
        } else {
            // Fallback pour les navigateurs qui ne supportent pas IntersectionObserver
            images.forEach(img => {
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
            });
        }
    }

    /**
     * Initialisation des animations
     */
    initAnimations() {
        // Ajouter des classes d'animation aux éléments
        const animatedElements = document.querySelectorAll('[data-animate]');
        
        if (!animatedElements.length) return;
        
        const animationObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const animationType = entry.target.dataset.animate;
                    entry.target.classList.add('animated', animationType);
                    animationObserver.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -100px 0px'
        });

        animatedElements.forEach(el => animationObserver.observe(el));
    }

    /**
     * Détection de la page courante
     */
    detectCurrentPage() {
        const path = window.location.pathname;
        const pageName = path.split('/').pop().replace('.html', '') || 'index';
        return pageName;
    }

    /**
     * Vérifier si les effets de scroll doivent être initialisés
     */
    shouldInitScrollEffects() {
        // Activer seulement sur certaines pages ou selon les besoins
        return ['index', 'sejour', 'tourisme'].includes(this.currentPage);
    }

    /**
     * Gestion des erreurs d'initialisation
     */
    handleInitError(error) {
        console.error('Erreur critique lors de l\'initialisation:', error);
        
        // Afficher un message d'erreur à l'utilisateur si nécessaire
        const errorContainer = document.createElement('div');
        errorContainer.className = 'init-error-message';
        errorContainer.innerHTML = `
            <p>Une erreur s'est produite lors du chargement de la page.</p>
            <button onclick="location.reload()">Recharger</button>
        `;
        
        // Ajouter seulement si en mode développement
        if (window.location.hostname === 'localhost') {
            document.body.prepend(errorContainer);
        }
    }

    /**
     * Dispatcher un événement personnalisé
     */
    dispatchEvent(eventName, detail = {}) {
        const event = new CustomEvent(eventName, {
            bubbles: true,
            detail: { ...detail, app: this }
        });
        document.dispatchEvent(event);
    }

    /**
     * Méthode publique pour accéder aux modules
     */
    getModule(moduleName) {
        return this.modules[moduleName];
    }

    /**
     * Détruire l'application (nettoyage)
     */
    destroy() {
        // Détruire tous les modules
        Object.values(this.modules).forEach(module => {
            if (module && typeof module.destroy === 'function') {
                module.destroy();
            }
        });
        
        this.modules = {};
        this.isInitialized = false;
        
        console.log('Application détruite');
    }
}

// Initialisation au chargement du DOM
document.addEventListener('DOMContentLoaded', () => {
    // Créer l'instance de l'application
    window.cilaosApp = new CilaosApp();
    
    // Initialiser l'application
    window.cilaosApp.init().catch(error => {
        console.error('Échec de l\'initialisation:', error);
    });
});

// Export pour utilisation dans d'autres modules si nécessaire
export default CilaosApp;