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

