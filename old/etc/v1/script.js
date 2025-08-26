/* ================================================
   JAVASCRIPT SIMPLIFIÉ POUR LE SITE CILAOS
   Code clair et bien structuré avec explications
   ================================================ */

// ------------------------------------------------
// 1. MENU HAMBURGER (Navigation mobile)
// ------------------------------------------------

// On attend que la page soit complètement chargée
document.addEventListener('DOMContentLoaded', function() {
    
    // Récupération des éléments du menu
    const navToggle = document.querySelector('.nav-toggle');  // Le bouton hamburger
    const navMenu = document.querySelector('.nav-menu');      // Le menu de navigation
    const navLinks = document.querySelectorAll('.nav-menu a'); // Tous les liens du menu
    
    // Quand on clique sur le bouton hamburger
    if (navToggle) {
        navToggle.addEventListener('click', function() {
            // On ajoute/enlève la classe 'active' pour ouvrir/fermer le menu
            navToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }
    
    // Fermer le menu quand on clique sur un lien (pour mobile)
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
    
    // ------------------------------------------------
    // 2. SLIDESHOW AUTOMATIQUE (Arrière-plan hero)
    // ------------------------------------------------
    
    // Variables pour le slideshow
    let currentSlide = 0;  // Index de la slide actuelle (commence à 0)
    const slides = document.querySelectorAll('.slide');  // Toutes les slides
    const dots = document.querySelectorAll('.dot');      // Tous les points indicateurs
    
    // Fonction pour changer de slide
    function showSlide(index) {
        // Vérifier qu'il y a des slides
        if (slides.length === 0) return;
        
        // S'assurer que l'index est valide (boucle infinie)
        if (index >= slides.length) {
            currentSlide = 0;  // Retour au début
        } else if (index < 0) {
            currentSlide = slides.length - 1;  // Aller à la fin
        } else {
            currentSlide = index;
        }
        
        // Enlever la classe 'active' de toutes les slides et dots
        slides.forEach(slide => slide.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));
        
        // Ajouter la classe 'active' à la slide et au dot actuels
        slides[currentSlide].classList.add('active');
        if (dots[currentSlide]) {
            dots[currentSlide].classList.add('active');
        }
    }
    
    // Fonction pour passer à la slide suivante
    function nextSlide() {
        showSlide(currentSlide + 1);
    }
    
    // Fonction pour aller à une slide spécifique (quand on clique sur un dot)
    function goToSlide(index) {
        showSlide(index);
    }
    
    // Démarrer le slideshow automatique (change toutes les 5 secondes)
    let slideshowInterval = null;
    
    function startSlideshow() {
        // Ne démarrer que s'il y a plus d'une slide
        if (slides.length > 1) {
            slideshowInterval = setInterval(nextSlide, 5000);  // 5000ms = 5 secondes
        }
    }
    
    // Arrêter le slideshow (utile quand l'utilisateur interagit)
    function stopSlideshow() {
        if (slideshowInterval) {
            clearInterval(slideshowInterval);
        }
    }
    
    // Redémarrer le slideshow après une interaction
    function restartSlideshow() {
        stopSlideshow();
        startSlideshow();
    }
    
    // Ajouter les événements de clic sur les dots
    dots.forEach((dot, index) => {
        dot.addEventListener('click', function() {
            goToSlide(index);
            restartSlideshow();  // Redémarrer le timer après un clic
        });
    });
    
    // Démarrer le slideshow au chargement de la page
    startSlideshow();
    
    // Optionnel : Arrêter le slideshow quand la page n'est pas visible
    // (économise les ressources quand l'utilisateur change d'onglet)
    document.addEventListener('visibilitychange', function() {
        if (document.hidden) {
            stopSlideshow();
        } else {
            startSlideshow();
        }
    });
    
    // ------------------------------------------------
    // 3. STORIES INTERACTIVES (Bulles cliquables)
    // ------------------------------------------------
    
    // Données des différentes stories
    const storiesData = {
        culture: {
            title: "Culture créole",
            content: `
                <div class="story-content">
                    <h3>🎨 La culture créole de Cilaos</h3>
                    <p>Cilaos est un véritable conservatoire de la culture créole réunionnaise. 
                    L'architecture des cases créoles, avec leurs varangues et leurs toits en tôle, 
                    témoigne d'un savoir-faire ancestral.</p>
                    <img src="https://images.unsplash.com/photo-1533900298318-6b8da08a523e?w=800" alt="Architecture créole">
                    <p>La broderie de Cilaos, inscrite au patrimoine culturel, est une tradition 
                    qui se transmet de génération en génération depuis le XIXe siècle.</p>
                </div>
            `
        },
        randonnees: {
            title: "Randonnées",
            content: `
                <div class="story-content">
                    <h3>🏔️ Les sentiers de Cilaos</h3>
                    <p>Le cirque de Cilaos est le paradis des randonneurs avec plus de 100 km de sentiers balisés.</p>
                    <img src="https://images.unsplash.com/photo-1551632811-561732d1e306?w=800" alt="Sentiers de randonnée">
                    <p>Le Piton des Neiges, point culminant de l'océan Indien à 3070m d'altitude, 
                    offre une vue exceptionnelle sur toute l'île après une randonnée mythique.</p>
                </div>
            `
        },
        gastronomie: {
            title: "Gastronomie",
            content: `
                <div class="story-content">
                    <h3>🍲 Saveurs de Cilaos</h3>
                    <p>La gastronomie de Cilaos est riche et savoureuse, mélange unique de traditions créoles.</p>
                    <img src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800" alt="Gastronomie créole">
                    <p>Les fameuses lentilles de Cilaos, cultivées en terrasses depuis 1850, 
                    bénéficient d'une IGP (Indication Géographique Protégée) et sont reconnues 
                    pour leur qualité exceptionnelle.</p>
                </div>
            `
        },
        thermes: {
            title: "Thermes",
            content: `
                <div class="story-content">
                    <h3>♨️ Les thermes de Cilaos</h3>
                    <p>Depuis 1896, les thermes de Cilaos accueillent les curistes venus profiter 
                    des bienfaits des eaux thermales.</p>
                    <img src="https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=800" alt="Thermes de Cilaos">
                    <p>Les eaux, naturellement chaudes et riches en minéraux, sont particulièrement 
                    recommandées pour les affections rhumatismales et la remise en forme.</p>
                </div>
            `
        }
    };
    
    // Récupération des éléments
    const storyBubbles = document.querySelectorAll('.story-bubble');
    const storyDisplay = document.getElementById('storyDisplay');
    
    // Ajouter un événement de clic sur chaque bulle
    storyBubbles.forEach(bubble => {
        bubble.addEventListener('click', function() {
            // Récupérer le type de story depuis l'attribut data-story
            const storyType = this.getAttribute('data-story');
            
            // Vérifier que cette story existe dans nos données
            if (storiesData[storyType]) {
                // Afficher le contenu de la story
                storyDisplay.innerHTML = storiesData[storyType].content;
                
                // Faire défiler jusqu'à la zone d'affichage (pour mobile)
                storyDisplay.scrollIntoView({ 
                    behavior: 'smooth',  // Défilement fluide
                    block: 'nearest'     // Position la plus proche
                });
            }
        });
    });
    
    // ------------------------------------------------
    // 4. DÉFILEMENT FLUIDE (Smooth scroll)
    // ------------------------------------------------
    
    // Pour tous les liens qui commencent par #
    const smoothScrollLinks = document.querySelectorAll('a[href^="#"]');
    
    smoothScrollLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Empêcher le comportement par défaut (saut brusque)
            e.preventDefault();
            
            // Récupérer l'ID de la cible
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                // Calculer la position en tenant compte de la navbar fixe
                const navbarHeight = 70;  // Hauteur de la navbar
                const targetPosition = targetElement.offsetTop - navbarHeight;
                
                // Faire défiler jusqu'à la position
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // ------------------------------------------------
    // 5. ANIMATION AU SCROLL (Optionnel mais sympa)
    // ------------------------------------------------
    
    // Observer les éléments pour les animer quand ils apparaissent
    const observerOptions = {
        threshold: 0.1,      // Déclencher quand 10% de l'élément est visible
        rootMargin: '0px'    // Pas de marge supplémentaire
    };
    
    // Créer l'observer
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Ajouter une classe quand l'élément devient visible
                entry.target.classList.add('visible');
                // Optionnel : arrêter d'observer une fois animé
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observer les cartes d'information
    const infoCards = document.querySelectorAll('.info-card');
    infoCards.forEach(card => {
        observer.observe(card);
    });
    
    // ------------------------------------------------
    // 6. GESTION DES ERREURS ET DEBUG
    // ------------------------------------------------
    
    // Message de confirmation que le script est chargé
    console.log('✅ Site Cilaos initialisé avec succès !');
    
    // Vérifier que les éléments importants existent
    if (!slides.length) {
        console.warn('⚠️ Aucune slide trouvée pour le slideshow');
    }
    
    if (!storyBubbles.length) {
        console.warn('⚠️ Aucune bulle de story trouvée');
    }
    
});

// ------------------------------------------------
// FONCTIONS UTILITAIRES (Réutilisables)
// ------------------------------------------------

/**
 * Fonction pour débouncer (limiter la fréquence d'exécution)
 * Utile pour les événements qui se déclenchent souvent (scroll, resize)
 * 
 * @param {Function} func - La fonction à limiter
 * @param {number} wait - Le délai en millisecondes
 * @returns {Function} - La fonction limitée
 */
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

// ------------------------------------------------
// NOTES PÉDAGOGIQUES
// ------------------------------------------------

/*
 * Ce fichier JavaScript est organisé en sections logiques :
 * 
 * 1. Menu hamburger : Gère l'ouverture/fermeture du menu mobile
 * 2. Slideshow : Fait défiler automatiquement les images de fond
 * 3. Stories : Affiche du contenu dynamique quand on clique sur les bulles
 * 4. Smooth scroll : Défilement fluide vers les sections
 * 5. Animations : Fait apparaître les éléments progressivement
 * 
 * Concepts importants utilisés :
 * - addEventListener : Pour écouter les événements (clic, scroll, etc.)
 * - classList : Pour ajouter/enlever des classes CSS
 * - querySelector : Pour sélectionner des éléments HTML
 * - setInterval : Pour répéter une action régulièrement
 * - IntersectionObserver : Pour détecter quand un élément devient visible
 * 
 * Le code est écrit de manière simple et lisible, avec des commentaires
 * expliquant chaque étape importante.
 */