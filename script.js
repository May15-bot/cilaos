 // Hamburger menu
        const toggle = document.querySelector('.nav-toggle');
        const navMenu = document.querySelector('.nav-menu');

        toggle.addEventListener('click', () => {
            toggle.classList.toggle('open');
            navMenu.classList.toggle('open');
        });

        // Close menu when clicking on a link
        document.querySelectorAll('.nav-menu a').forEach(link => {
            link.addEventListener('click', () => {
                toggle.classList.remove('open');
                navMenu.classList.remove('open');
            });
        });


// Stories data complètes
const storiesData = {
    culture: [
        {
            image: 'https://images.unsplash.com/photo-1533900298318-6b8da08a523e?w=800',
            title: 'Église de Cilaos',
            description: 'Architecture créole historique'
        },
        {
            image: 'https://images.unsplash.com/photo-1569163139394-de4798aa62b6?w=800',
            title: 'Cases créoles',
            description: 'Patrimoine architectural unique'
        }
    ],
    randonnees: [
        {
            image: 'https://images.unsplash.com/photo-1551632811-561732d1e306?w=800',
            title: 'Piton des Neiges',
            description: 'Le point culminant de l\'océan Indien'
        },
        {
            image: 'https://images.unsplash.com/photo-1519904981063-b0cf448d479e?w=800',
            title: 'Cascade de Bras Rouge',
            description: 'Randonnée aquatique rafraîchissante'
        }
    ],
    gastronomie: [
        {
            image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800',
            title: 'Lentilles de Cilaos',
            description: 'Produit IGP cultivé en terrasses'
        }
    ],
    thermes: [
        {
            image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=800',
            title: 'Thermes de Cilaos',
            description: 'Sources thermales depuis 1896'
        }
    ]
};

let storySwiper = null;
let currentStory = null;

// Fonction pour ouvrir une story dans la zone d'affichage
function openStory(storyType) {
    currentStory = storyType;
    const display = document.getElementById('storyDisplay');
    
    // Active la bulle cliquée
    document.querySelectorAll('.story-circle').forEach(circle => {
        circle.classList.remove('active');
    });
    document.querySelector(`[data-story="${storyType}"] .story-circle`).classList.add('active');
    
    // Créer le slider dans la zone d'affichage
    display.innerHTML = `
        <div class="story__slider swiper">
            <button class="story-close-btn" onclick="closeStoryDisplay()">Retour</button>
            <div class="swiper-wrapper">
                ${storiesData[storyType].map(slide => `
                    <div class="swiper-slide">
                        <img src="${slide.image}" alt="${slide.title}">
                        <div class="slide-content">
                            <h3>${slide.title}</h3>
                            <p>${slide.description}</p>
                        </div>
                    </div>
                `).join('')}
            </div>
            <div class="swiper-pagination"></div>
        </div>
    `;
    
    // Initialiser Swiper
    storySwiper = new Swiper('.story__slider', {
        loop: true,
        autoplay: { delay: 5000 },
        pagination: {
            el: '.swiper-pagination',
            type: 'progressbar'
        }
    });
}

// Sauvegarde du contenu de bienvenue au démarrage
const welcomeContentHTML = `
    <div class="welcome-content" id="welcomeContent">
        <h2>Bienvenue à Cilaos</h2>
        <p>
            Nichée au coeur de l'île de La Réunion, Cilaos est un cirque naturel d'une beauté à couper le souffle. 
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

// Fonction pour fermer et revenir au texte d'accueil
function closeStoryDisplay() {
    const display = document.getElementById('storyDisplay');
    
    // Retirer la classe active
    document.querySelectorAll('.story-circle').forEach(circle => {
        circle.classList.remove('active');
    });
    
    // Détruire Swiper
    if (storySwiper) {
        storySwiper.destroy();
        storySwiper = null;
    }
    
    // Restaurer le contenu de bienvenue
    display.innerHTML = welcomeContentHTML;
    currentStory = null;
}

// Un seul écouteur d'événements
document.querySelectorAll('.story-item').forEach(item => {
    item.addEventListener('click', () => {
        const storyType = item.dataset.story;
        openStory(storyType);
    });
});

        // Smooth scroll enhancement
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });

        // Add subtle parallax effect
        let ticking = false;
        function updateParallax() {
            const scrolled = window.pageYOffset;
            const parallax = document.querySelectorAll('.hero-content');
            parallax.forEach(element => {
                const speed = 0.3;
                element.style.transform = `translateY(${scrolled * speed}px)`;
            });
            ticking = false;
        }

        window.addEventListener('scroll', () => {
            if (!ticking) {
                window.requestAnimationFrame(updateParallax);
                ticking = true;
            }
        });