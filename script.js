// hamburger open/close
const toggle     = document.querySelector('.nav-toggle');
const navMenu    = document.querySelector('.nav-menu');

toggle.addEventListener('click', () => {
  toggle.classList.toggle('open');
  navMenu.classList.toggle('open');
});

// hover-word animation (unchanged from original pen)
const navLinks   = document.querySelectorAll('.nav-menu a');
const navBigText = document.getElementById('nav_big_text');

navLinks.forEach(link => {
  link.addEventListener('mouseenter', () => {
    navBigText.textContent = link.textContent;
    navBigText.classList.add('big_text_active');
  });

  link.addEventListener('mouseleave', () => {
    navBigText.classList.remove('big_text_active');
  });
});
