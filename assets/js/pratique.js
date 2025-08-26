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


(function() {
  // Gestion du modal de connexion
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
          console.log('Login attempt:', { email: email.value, password: password.value });
          closeModal();
      });
  }

  // Animation pour les cartes au scroll
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
          }
      });
  }, observerOptions);

  // Appliquer l'animation aux cartes
  document.querySelectorAll('.tc-mini').forEach(el => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(20px)';
      el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
      observer.observe(el);
  });

  // Smooth scroll pour les details
  document.querySelectorAll('details.tc-mini__more').forEach(detail => {
      detail.addEventListener('toggle', function() {
          if (this.open) {
              // Attendre que le contenu soit visible
              setTimeout(() => {
                  const rect = this.getBoundingClientRect();
                  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
                  
                  // Si le bas du detail est en dehors de la vue
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
})();