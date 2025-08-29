
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