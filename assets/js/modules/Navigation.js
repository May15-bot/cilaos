/**
 * Module Navigation - Gestion centralisée de la navigation
 * Gère le menu hamburger, la navigation responsive et les interactions
 */

export default class Navigation {
    constructor(options = {}) {
        // Configuration par défaut avec possibilité de personnalisation
        this.config = {
            navToggleSelector: '.nav-toggle',
            navMenuSelector: '.nav-menu',
            navLinksSelector: '.nav-menu a',
            bodyMenuOpenClass: 'menu-open',
            activeClass: 'active',
            breakpoint: 900,
            ...options
        };

        // État interne
        this.isMenuOpen = false;
        this.elements = {};
        
        // Initialisation automatique
        this.init();
    }

    /**
     * Initialisation du module navigation
     */
    init() {
        // Récupération des éléments DOM
        this.elements.navToggle = document.querySelector(this.config.navToggleSelector);
        this.elements.navMenu = document.querySelector(this.config.navMenuSelector);
        this.elements.navLinks = document.querySelectorAll(this.config.navLinksSelector);
        this.elements.body = document.body;

        // Vérification de l'existence des éléments
        if (!this.elements.navToggle || !this.elements.navMenu) {
            console.warn('Navigation: Éléments requis non trouvés');
            return;
        }

        // Configuration des événements
        this.setupEventListeners();
        
        // Configuration de l'accessibilité
        this.setupAccessibility();
        
        // Détection de la page active
        this.detectActivePage();
        
        console.log('Module Navigation initialisé');
    }

    /**
     * Configuration de tous les événements
     */
    setupEventListeners() {
        // Click sur le bouton hamburger
        this.elements.navToggle.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            this.toggleMenu();
        });

        // Click sur les liens de navigation
        this.elements.navLinks.forEach(link => {
            link.addEventListener('click', () => {
                // Fermer le menu après un court délai pour permettre la navigation
                setTimeout(() => this.closeMenu(), 100);
            });
        });

        // Click en dehors du menu pour fermer
        document.addEventListener('click', (e) => {
            const isClickInsideNav = this.elements.navMenu.contains(e.target);
            const isClickOnToggle = this.elements.navToggle.contains(e.target);
            
            if (!isClickInsideNav && !isClickOnToggle && this.isMenuOpen) {
                this.closeMenu();
            }
        });

        // Touche Échap pour fermer
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.isMenuOpen) {
                this.closeMenu();
                this.elements.navToggle.focus(); // Remettre le focus sur le bouton
            }
        });

        // Gestion du redimensionnement de l'écran
        let resizeTimer;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(() => {
                if (window.innerWidth > this.config.breakpoint && this.isMenuOpen) {
                    this.closeMenu();
                }
            }, 250);
        });

        // Gestion du scroll pour masquer/afficher la navbar
        this.setupScrollBehavior();
    }

    /**
     * Configuration de l'accessibilité ARIA
     */
    setupAccessibility() {
        // Configuration initiale des attributs ARIA
        this.elements.navToggle.setAttribute('aria-expanded', 'false');
        this.elements.navToggle.setAttribute('aria-controls', 'nav-menu');
        this.elements.navToggle.setAttribute('aria-label', 'Ouvrir le menu');
        
        this.elements.navMenu.setAttribute('aria-hidden', 'true');
        this.elements.navMenu.id = 'nav-menu';
        
        // Support de la navigation au clavier
        this.elements.navMenu.setAttribute('role', 'navigation');
        this.elements.navMenu.setAttribute('aria-label', 'Menu principal');
    }

    /**
     * Basculer l'état du menu
     */
    toggleMenu() {
        if (this.isMenuOpen) {
            this.closeMenu();
        } else {
            this.openMenu();
        }
    }

    /**
     * Ouvrir le menu
     */
    openMenu() {
        this.isMenuOpen = true;
        
        // Classes CSS pour l'animation
        this.elements.navToggle.classList.add(this.config.activeClass);
        this.elements.navMenu.classList.add(this.config.activeClass);
        this.elements.body.classList.add(this.config.bodyMenuOpenClass);
        
        // Accessibilité
        this.elements.navToggle.setAttribute('aria-expanded', 'true');
        this.elements.navToggle.setAttribute('aria-label', 'Fermer le menu');
        this.elements.navMenu.setAttribute('aria-hidden', 'false');
        
        // Événement personnalisé pour d'autres modules
        this.dispatchEvent('menu:opened');
        
        console.log('Menu ouvert');
    }

    /**
     * Fermer le menu
     */
    closeMenu() {
        this.isMenuOpen = false;
        
        // Classes CSS pour l'animation de fermeture
        this.elements.navToggle.classList.remove(this.config.activeClass);
        this.elements.navMenu.classList.remove(this.config.activeClass);
        this.elements.body.classList.remove(this.config.bodyMenuOpenClass);
        
        // Accessibilité
        this.elements.navToggle.setAttribute('aria-expanded', 'false');
        this.elements.navToggle.setAttribute('aria-label', 'Ouvrir le menu');
        this.elements.navMenu.setAttribute('aria-hidden', 'true');
        
        // Événement personnalisé
        this.dispatchEvent('menu:closed');
        
        console.log('Menu fermé');
    }

    /**
     * Comportement de la navbar au scroll
     */
    setupScrollBehavior() {
        let lastScrollTop = 0;
        let scrollTimer;
        const navbar = document.querySelector('.navbar');
        
        if (!navbar) return;

        window.addEventListener('scroll', () => {
            clearTimeout(scrollTimer);
            scrollTimer = setTimeout(() => {
                const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
                
                // Ajouter une classe quand on scroll
                if (scrollTop > 100) {
                    navbar.classList.add('navbar-scrolled');
                } else {
                    navbar.classList.remove('navbar-scrolled');
                }
                
                // Masquer/afficher selon la direction du scroll (optionnel)
                if (scrollTop > lastScrollTop && scrollTop > 200) {
                    // Scroll vers le bas
                    navbar.classList.add('navbar-hidden');
                } else {
                    // Scroll vers le haut
                    navbar.classList.remove('navbar-hidden');
                }
                
                lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
            }, 50);
        });
    }

    /**
     * Détecter et marquer la page active dans le menu
     */
    detectActivePage() {
        const currentPath = window.location.pathname;
        
        this.elements.navLinks.forEach(link => {
            const linkPath = new URL(link.href).pathname;
            
            // Marquer le lien actif
            if (currentPath === linkPath || 
                (currentPath === '/' && linkPath.endsWith('index.html'))) {
                link.classList.add('active-page');
                link.setAttribute('aria-current', 'page');
            }
        });
    }

    /**
     * Dispatcher un événement personnalisé
     */
    dispatchEvent(eventName, detail = {}) {
        const event = new CustomEvent(eventName, {
            bubbles: true,
            detail: detail
        });
        document.dispatchEvent(event);
    }

    /**
     * Méthode publique pour vérifier l'état du menu
     */
    isOpen() {
        return this.isMenuOpen;
    }

    /**
     * Détruire le module (nettoyage)
     */
    destroy() {
        // Retirer tous les event listeners
        // Réinitialiser l'état
        this.closeMenu();
        console.log('Module Navigation détruit');
    }
}