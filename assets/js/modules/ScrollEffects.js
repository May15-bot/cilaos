/**
 * ScrollEffects - Module de gestion des effets de scroll
 * Gère le scroll snap, les animations au scroll, et les effets parallax
 */

export default class ScrollEffects {
    constructor(options = {}) {
        this.config = {
            snapEnabled: false,
            snapSelector: '.section-snap',
            snapType: 'proximity', // 'proximity' ou 'mandatory'
            parallaxSelector: '[data-parallax]',
            animateSelector: '[data-animate]',
            stickySelector: '.sticky-element',
            smoothScroll: true,
            scrollThreshold: 100,
            ...options
        };

        // État
        this.isSnapActive = false;
        this.currentSection = 0;
        this.scrollPosition = 0;
        this.observers = [];
        
        // Éléments
        this.sections = [];
        this.parallaxElements = [];
        
        // Initialisation
        this.init();
    }

    /**
     * Initialisation du module
     */
    init() {
        // Détection des capacités du navigateur
        this.detectBrowserCapabilities();
        
        // Configuration du scroll snap si activé
        if (this.config.snapEnabled) {
            this.setupScrollSnap();
        }
        
        // Configuration du smooth scroll
        if (this.config.smoothScroll) {
            this.setupSmoothScroll();
        }
        
        // Configuration des effets parallax
        this.setupParallax();
        
        // Configuration des animations au scroll
        this.setupScrollAnimations();
        
        // Configuration des événements de scroll
        this.setupScrollEvents();
        
        console.log('✅ ScrollEffects initialisé');
    }

    /**
     * Détecter les capacités du navigateur
     */
    detectBrowserCapabilities() {
        // Vérifier le support du scroll snap
        this.supportsScrollSnap = CSS.supports('scroll-snap-type', 'y mandatory');
        
        // Vérifier si on est sur mobile
        this.isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
        
        // Vérifier la préférence de mouvement réduit
        this.prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    }

    /**
     * ========================================
     * SCROLL SNAP
     * ========================================
     */
    setupScrollSnap() {
        // Ne pas activer si mouvement réduit ou mobile
        if (this.prefersReducedMotion || this.isMobile) {
            console.log('Scroll snap désactivé (mobile ou préférence utilisateur)');
            return;
        }

        // Récupérer les sections
        this.sections = document.querySelectorAll(this.config.snapSelector);
        
        if (!this.sections.length) {
            console.log('Aucune section snap trouvée');
            return;
        }

        // Appliquer le scroll snap au body ou html selon la configuration
        const scrollContainer = document.documentElement;
        
        // Classe CSS pour activer le snap
        document.body.classList.add('enable-snap');
        
        // Configuration CSS via JavaScript pour plus de contrôle
        if (this.supportsScrollSnap) {
            scrollContainer.style.scrollSnapType = `y ${this.config.snapType}`;
            
            this.sections.forEach(section => {
                section.style.scrollSnapAlign = 'start';
                section.style.scrollSnapStop = 'normal';
            });
        }

        // Gestion intelligente pour certaines sections
        this.manageSpecialSections();
        
        // Observer pour détecter la section active
        this.setupSectionObserver();
        
        this.isSnapActive = true;
        console.log('📸 Scroll snap activé');
    }

    /**
     * Gérer les sections spéciales (comme stories ou footer)
     */
    manageSpecialSections() {
        // Désactiver le snap pour la section stories et le footer
        const storiesSection = document.querySelector('.section-stories');
        const footer = document.querySelector('.footer');
        
        if (storiesSection) {
            storiesSection.style.scrollSnapAlign = 'none';
            storiesSection.style.scrollSnapStop = 'normal';
        }
        
        if (footer) {
            footer.style.scrollSnapAlign = 'none';
            footer.style.scrollSnapStop = 'normal';
        }

        // Ajouter un espace de transition si nécessaire
        const snapBreaker = document.querySelector('.snap-breaker');
        if (snapBreaker) {
            snapBreaker.style.scrollSnapAlign = 'none';
            snapBreaker.style.height = '200px';
        }
    }

    /**
     * Observer pour détecter la section active
     */
    setupSectionObserver() {
        const observerOptions = {
            root: null,
            rootMargin: '-40% 0px -40% 0px',
            threshold: 0
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const index = Array.from(this.sections).indexOf(entry.target);
                    if (index !== -1) {
                        this.currentSection = index;
                        this.onSectionChange(index, entry.target);
                    }
                }
            });
        }, observerOptions);

        this.sections.forEach(section => observer.observe(section));
        this.observers.push(observer);
    }

    /**
     * Callback quand la section change
     */
    onSectionChange(index, section) {
        // Dispatcher un événement personnalisé
        const event = new CustomEvent('section:change', {
            detail: { index, section }
        });
        document.dispatchEvent(event);
        
        // Mettre à jour la navigation si elle existe
        this.updateNavigationIndicator(index);
    }

    /**
     * Mettre à jour l'indicateur de navigation
     */
    updateNavigationIndicator(index) {
        const indicators = document.querySelectorAll('.section-indicator');
        indicators.forEach((indicator, i) => {
            if (i === index) {
                indicator.classList.add('active');
            } else {
                indicator.classList.remove('active');
            }
        });
    }

    /**
     * ========================================
     * SMOOTH SCROLL
     * ========================================
     */
    setupSmoothScroll() {
        // Gérer les liens internes
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                const targetId = anchor.getAttribute('href');
                if (targetId === '#') return;
                
                const target = document.querySelector(targetId);
                if (target) {
                    e.preventDefault();
                    this.scrollToElement(target);
                }
            });
        });
    }

    /**
     * Scroller vers un élément
     */
    scrollToElement(element, offset = 80) {
        const targetPosition = element.getBoundingClientRect().top + window.scrollY - offset;
        
        // Si le scroll snap est actif, désactiver temporairement
        if (this.isSnapActive) {
            this.temporarilyDisableSnap();
        }
        
        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        });
    }

    /**
     * Désactiver temporairement le scroll snap
     */
    temporarilyDisableSnap() {
        document.documentElement.style.scrollSnapType = 'none';
        
        setTimeout(() => {
            if (this.isSnapActive) {
                document.documentElement.style.scrollSnapType = `y ${this.config.snapType}`;
            }
        }, 1000);
    }

    /**
     * ========================================
     * EFFETS PARALLAX
     * ========================================
     */
    setupParallax() {
        this.parallaxElements = document.querySelectorAll(this.config.parallaxSelector);
        
        if (!this.parallaxElements.length) return;
        
        // Ne pas activer si mouvement réduit
        if (this.prefersReducedMotion) {
            this.parallaxElements.forEach(el => {
                el.removeAttribute('data-parallax');
            });
            return;
        }
        
        console.log('🎨 Effets parallax configurés');
    }

    /**
     * Appliquer l'effet parallax
     */
    applyParallax() {
        if (!this.parallaxElements.length || this.prefersReducedMotion) return;
        
        const scrolled = window.scrollY;
        
        this.parallaxElements.forEach(element => {
            const speed = element.dataset.parallaxSpeed || 0.5;
            const offset = element.dataset.parallaxOffset || 0;
            const rect = element.getBoundingClientRect();
            const yPos = -(scrolled * speed) + parseInt(offset);
            
            // Appliquer seulement si l'élément est visible
            if (rect.bottom >= 0 && rect.top <= window.innerHeight) {
                element.style.transform = `translateY(${yPos}px)`;
            }
        });
    }

    /**
     * ========================================
     * ANIMATIONS AU SCROLL
     * ========================================
     */
    setupScrollAnimations() {
        const animatedElements = document.querySelectorAll(this.config.animateSelector);
        
        if (!animatedElements.length) return;
        
        const observerOptions = {
            root: null,
            rootMargin: '0px 0px -100px 0px',
            threshold: 0.1
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const element = entry.target;
                    const animation = element.dataset.animate;
                    const delay = element.dataset.animateDelay || 0;
                    
                    setTimeout(() => {
                        element.classList.add('animated', animation);
                        
                        // Retirer l'observateur après l'animation
                        observer.unobserve(element);
                    }, delay);
                }
            });
        }, observerOptions);

        animatedElements.forEach(element => {
            observer.observe(element);
        });
        
        this.observers.push(observer);
        console.log('✨ Animations au scroll configurées');
    }

    /**
     * ========================================
     * ÉVÉNEMENTS DE SCROLL
     * ========================================
     */
    setupScrollEvents() {
        let scrollTimer;
        let lastScrollTop = 0;
        
        const handleScroll = () => {
            clearTimeout(scrollTimer);
            
            // Throttle pour performance
            scrollTimer = setTimeout(() => {
                const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
                const scrollDirection = scrollTop > lastScrollTop ? 'down' : 'up';
                
                this.scrollPosition = scrollTop;
                
                // Appliquer parallax
                this.applyParallax();
                
                // Détecter le début/fin du scroll
                if (scrollTop <= 0) {
                    this.onScrollTop();
                } else if ((window.innerHeight + scrollTop) >= document.documentElement.scrollHeight) {
                    this.onScrollBottom();
                }
                
                // Dispatcher un événement de scroll
                const event = new CustomEvent('scroll:update', {
                    detail: { 
                        position: scrollTop, 
                        direction: scrollDirection,
                        progress: this.getScrollProgress()
                    }
                });
                document.dispatchEvent(event);
                
                lastScrollTop = scrollTop;
            }, 10);
        };
        
        window.addEventListener('scroll', handleScroll, { passive: true });
    }

    /**
     * Obtenir la progression du scroll (0 à 1)
     */
    getScrollProgress() {
        const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
        return Math.min(this.scrollPosition / scrollHeight, 1);
    }

    /**
     * Callback quand on atteint le haut
     */
    onScrollTop() {
        document.body.classList.add('at-top');
        document.body.classList.remove('at-bottom');
    }

    /**
     * Callback quand on atteint le bas
     */
    onScrollBottom() {
        document.body.classList.add('at-bottom');
        document.body.classList.remove('at-top');
    }

    /**
     * ========================================
     * MÉTHODES PUBLIQUES
     * ========================================
     */
    
    /**
     * Activer/désactiver le scroll snap
     */
    toggleScrollSnap(enable) {
        if (enable && !this.isSnapActive) {
            this.setupScrollSnap();
        } else if (!enable && this.isSnapActive) {
            this.disableScrollSnap();
        }
    }

    /**
     * Désactiver le scroll snap
     */
    disableScrollSnap() {
        document.documentElement.style.scrollSnapType = 'none';
        document.body.classList.remove('enable-snap');
        
        this.sections.forEach(section => {
            section.style.scrollSnapAlign = '';
            section.style.scrollSnapStop = '';
        });
        
        this.isSnapActive = false;
    }

    /**
     * Aller à une section spécifique
     */
    goToSection(index) {
        if (!this.sections[index]) return;
        
        this.scrollToElement(this.sections[index]);
    }

    /**
     * Section suivante
     */
    nextSection() {
        const next = Math.min(this.currentSection + 1, this.sections.length - 1);
        this.goToSection(next);
    }

    /**
     * Section précédente
     */
    previousSection() {
        const prev = Math.max(this.currentSection - 1, 0);
        this.goToSection(prev);
    }

    /**
     * Créer des indicateurs de navigation
     */
    createSectionIndicators() {
        if (!this.sections.length) return;
        
        const container = document.createElement('div');
        container.className = 'section-indicators';
        
        this.sections.forEach((section, index) => {
            const indicator = document.createElement('button');
            indicator.className = 'section-indicator';
            indicator.setAttribute('aria-label', `Aller à la section ${index + 1}`);
            indicator.addEventListener('click', () => this.goToSection(index));
            
            if (index === 0) {
                indicator.classList.add('active');
            }
            
            container.appendChild(indicator);
        });
        
        document.body.appendChild(container);
    }

    /**
     * Obtenir la section actuelle
     */
    getCurrentSection() {
        return {
            index: this.currentSection,
            element: this.sections[this.currentSection]
        };
    }

    /**
     * Détruire le module
     */
    destroy() {
        // Nettoyer les observers
        this.observers.forEach(observer => observer.disconnect());
        this.observers = [];
        
        // Désactiver le scroll snap
        if (this.isSnapActive) {
            this.disableScrollSnap();
        }
        
        // Retirer les indicateurs
        const indicators = document.querySelector('.section-indicators');
        if (indicators) {
            indicators.remove();
        }
        
        console.log('ScrollEffects détruit');
    }
}