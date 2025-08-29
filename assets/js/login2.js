        
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