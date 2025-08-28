document.addEventListener('DOMContentLoaded', () => {
  // Éléments
  const openBtn = document.getElementById('openLogin');
  const overlay = document.getElementById('loginOverlay');
  const modal   = document.getElementById('loginModal');
  const closeX  = document.getElementById('loginClose');
  const form    = document.getElementById('loginForm');
  const email   = document.getElementById('email');     // champ "Adresse e-mail"
  const pass    = document.getElementById('password');  // champ "Mot de passe"
  const remember= document.getElementById('remember');
  const submit  = document.getElementById('submitLogin');

  // Helpers modale
  const openModal  = () => { overlay.setAttribute('aria-hidden','false'); modal.setAttribute('aria-hidden','false'); overlay.classList.add('show'); modal.classList.add('show'); };
  const closeModal = () => { overlay.setAttribute('aria-hidden','true');  modal.setAttribute('aria-hidden','true');  overlay.classList.remove('show'); modal.classList.remove('show'); };

  openBtn?.addEventListener('click', (e) => { e.preventDefault(); openModal(); });
  overlay?.addEventListener('click', closeModal);
  closeX?.addEventListener('click', closeModal);
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeModal(); });

  // Si "se souvenir de moi" a été utilisé
  const remembered = localStorage.getItem('cilaos_auth') === 'true';
  if (remembered) {
    // Va direct vers le dashboard si déjà connecté en "remember me"
    window.location.href = './dashboard/admin-dashboard.html';
    return;
  }

  // Soumission du formulaire
  submit?.addEventListener('click', (e) => {
    e.preventDefault();

    const userInput = (email.value || '').trim().toLowerCase();
    const passInput = (pass.value  || '').trim();

    // On accepte "mayza" (ou "mayza@..." si tu préfères plus tard)
    const isUserOK = (userInput === 'mayza');
    const isPassOK = (passInput === 'admin');

    // Petite zone d'erreur (créée une seule fois)
    let err = form.querySelector('.login-error');
    if (!err) {
      err = document.createElement('p');
      err.className = 'login-error';
      err.style.color = '#c62828';
      err.style.marginTop = '8px';
      form.appendChild(err);
    }

    if (!isUserOK || !isPassOK) {
      err.textContent = 'Identifiants invalides. Essayez : user "mayza" et mot de passe "admin".';
      return;
    }

    // OK : session + redirection
    sessionStorage.setItem('cilaos_session', 'true');
    if (remember.checked) {
      localStorage.setItem('cilaos_auth', 'true');
    }
    window.location.href = './dashboard/admin-dashboard.html';
  });
});



// ================================================
// MENU HAMBURGER - Version corrigée et améliorée
// ================================================

function initNavMenu() {
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const body = document.body;
    
    // Vérifier que les éléments existent
    if (!navToggle || !navMenu) {
        console.warn('Elements du menu mobile non trouvés');
        return;
    }
    
    // Toggle du menu principal
    navToggle.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        
        // Toggle des classes actives
        navToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
        
        // Gérer le scroll du body
        if (navMenu.classList.contains('active')) {
            body.classList.add('menu-open');
        } else {
            body.classList.remove('menu-open');
        }
        
        // Accessibilité
        const isOpen = navMenu.classList.contains('active');
        navToggle.setAttribute('aria-expanded', isOpen);
        navMenu.setAttribute('aria-hidden', !isOpen);
    });
    
    // Fermer le menu quand on clique sur un lien
    const navLinks = document.querySelectorAll('.nav-menu a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            // Délai pour permettre la navigation avant fermeture
            setTimeout(() => {
                closeMenu();
            }, 100);
        });
    });
    
    // Fermer le menu quand on clique en dehors
    document.addEventListener('click', function(e) {
        const isClickInsideNav = navMenu.contains(e.target);
        const isClickOnToggle = navToggle.contains(e.target);
        
        if (!isClickInsideNav && !isClickOnToggle && navMenu.classList.contains('active')) {
            closeMenu();
        }
    });
    
    // Fermer le menu avec la touche Échap
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && navMenu.classList.contains('active')) {
            closeMenu();
            navToggle.focus(); // Remettre le focus sur le bouton
        }
    });
    
    // Fonction pour fermer le menu proprement
    function closeMenu() {
        navToggle.classList.remove('active');
        navMenu.classList.remove('active');
        body.classList.remove('menu-open');
        
        // Accessibilité
        navToggle.setAttribute('aria-expanded', 'false');
        navMenu.setAttribute('aria-hidden', 'true');
    }
    
    // Gérer le redimensionnement de l'écran
    window.addEventListener('resize', function() {
        // Si on repasse en desktop, fermer le menu mobile
        if (window.innerWidth > 900 && navMenu.classList.contains('active')) {
            closeMenu();
        }
    });
    
    // Initialisation de l'accessibilité
    navToggle.setAttribute('aria-expanded', 'false');
    navToggle.setAttribute('aria-controls', 'nav-menu');
    navMenu.setAttribute('aria-hidden', 'true');
    navMenu.id = 'nav-menu';
}