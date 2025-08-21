
// =====================================================
// pages/sejour.js — ES module pour la page Séjours
// - Aucun global leak ; export d'une fonction initSejour()
// - Compatible avec app.js via `import { initSejour } from './pages/sejour.js'`
// - Repose sur la même structure HTML existante (#categoryPopup, etc.)
// =====================================================

export function initSejour() {
  // Sécurité : on ne s'initialise que si les éléments de la page existent
  const popup = document.getElementById('categoryPopup');
  const categoriesRoot = document.querySelector('.hebergement-categories');
  if (!popup || !categoriesRoot) return;

  // ---------- Données (exemple) ----------
  // Déplacez ça en JSON si nécessaire, puis fetch() ici.
  const hebergements = [
    // Hôtels
    { id:1, name:"La Villa Kazuera", type:"hotel", price:120, capacity:4, lat:-21.13775, lon:55.47200, rating:4.8, features:["WiFi","Piscine","Vue montagne","Parking"], description:"Villa de charme avec vue exceptionnelle sur le cirque" },
    { id:2, name:"Otroiza Hotel", type:"hotel", price:85, capacity:2, lat:-21.137924, lon:55.469052, rating:4.5, features:["WiFi","Restaurant","Jardin"], description:"Hôtel au cœur du village, proche de tous commerces" },
    { id:3, name:"Hotel Des Neiges", type:"hotel", price:95, capacity:2, lat:-21.13383, lon:55.47475, rating:4.6, features:["WiFi","Piscine","Spa","Restaurant"], description:"Hôtel avec deux piscines et vue sur les montagnes" },
    { id:4, name:"Le Vieux Cep", type:"hotel", price:75, capacity:2, lat:-21.13612, lon:55.47278, rating:4.3, features:["WiFi","Restaurant","Bar"], description:"Charme créole authentique, cuisine traditionnelle" },
    { id:5, name:"Tsilaosa Hôtel", type:"hotel", price:110, capacity:3, lat:-21.13612, lon:55.46958, rating:4.7, features:["WiFi","Jacuzzi","Vue panoramique"], description:"Architecture créole, idéal pour les randonneurs" },
    { id:6, name:"Hotel Le Cilaos", type:"hotel", price:90, capacity:2, lat:-21.13608, lon:55.47967, rating:4.4, features:["WiFi","Parking","Restaurant"], description:"Situation centrale, accès facile aux sentiers" },
    // Gîtes
    { id:7, name:"Gîte le Fouquet", type:"gite", price:65, capacity:6, lat:-21.1360, lon:55.4680, rating:4.5, features:["WiFi","Jardin","Barbecue","Parking"], description:"Gîte familial avec grand jardin, proche centre" },
    { id:8, name:"Gîte du Pas de Bellecombe", type:"gite", price:55, capacity:4, lat:-21.1380, lon:55.4750, rating:4.3, features:["Cuisine équipée","Terrasse","Vue"], description:"Gîte de montagne, départ de randonnées" },
    { id:9, name:"Gîte Le Relais des Cimes", type:"gite", price:70, capacity:8, lat:-21.1320, lon:55.4690, rating:4.6, features:["WiFi","Cheminée","Parking"], description:"Grand gîte pour groupes, ambiance montagne" },
    { id:10, name:"Gîte Le Figuier", type:"gite", price:60, capacity:5, lat:-21.1370, lon:55.4760, rating:4.4, features:["Jardin","Barbecue","Parking gratuit"], description:"Gîte calme avec jardin tropical" },
    { id:11, name:"Gîte la Cascade", type:"gite", price:75, capacity:6, lat:-21.1340, lon:55.4670, rating:4.7, features:["WiFi","Jacuzzi","Vue cascade"], description:"Vue exceptionnelle sur la cascade Bras Rouge" },
    { id:12, name:"Gîte Les Avirons", type:"gite", price:50, capacity:4, lat:-21.1385, lon:55.4740, rating:4.2, features:["Cuisine","Terrasse","Calme"], description:"Gîte économique, ambiance familiale" },
    // Chambres d'hôtes
    { id:13, name:"Case Nyala", type:"chambre", price:80, capacity:2, lat:-21.1310, lon:55.4710, rating:4.8, features:["Petit-déjeuner","WiFi","Jardin"], description:"Chambres d'hôtes de charme, accueil chaleureux" },
    { id:14, name:"Chambres d'hôtes DORIS", type:"chambre", price:70, capacity:2, lat:-21.1365, lon:55.4685, rating:4.6, features:["Petit-déjeuner","Terrasse","Vue"], description:"Vue magnifique, petit-déjeuner généreux" },
    { id:15, name:"Ti Fleur Aimée", type:"chambre", price:85, capacity:3, lat:-21.1335, lon:55.4705, rating:4.7, features:["Piscine","Spa","Petit-déjeuner"], description:"Chambres avec piscine chauffée et spa" },
    { id:16, name:"Chez Paul et Lydie", type:"chambre", price:65, capacity:2, lat:-21.1375, lon:55.4730, rating:4.5, features:["Table d'hôtes","Jardin","Parking"], description:"Table d'hôtes créole, produits du jardin" },
    // Campings
    { id:17, name:"Camping Le Saint François", type:"camping", price:25, capacity:4, lat:-21.1390, lon:55.4770, rating:4.1, features:["Sanitaires","Eau chaude","Électricité"], description:"Camping familial, emplacements ombragés" },
    { id:18, name:"Camping Les Lataniers", type:"camping", price:20, capacity:4, lat:-21.1400, lon:55.4780, rating:4.0, features:["Sanitaires","Barbecue commun"], description:"Camping nature, proche sentiers de randonnée" },
    { id:19, name:"Camping du Grand Bénare", type:"camping", price:30, capacity:6, lat:-21.1380, lon:55.4760, rating:4.3, features:["Bungalows","Électricité","WiFi"], description:"Camping avec option bungalows" },
    { id:20, name:"Camping Les Cimes", type:"camping", price:22, capacity:4, lat:-21.1395, lon:55.4775, rating:3.9, features:["Sanitaires","Aire de jeux"], description:"Idéal pour familles avec enfants" },
    { id:21, name:"Camping Le Bras Sec", type:"camping", price:18, capacity:2, lat:-21.1410, lon:55.4790, rating:3.8, features:["Nature","Calme"], description:"Camping sauvage, retour à la nature" },
    { id:22, name:"Camping Le Vieux Cep", type:"camping", price:28, capacity:4, lat:-21.1385, lon:55.4765, rating:4.2, features:["Restaurant","Épicerie","WiFi"], description:"Camping avec services et restaurant" },
  ];

  const categoryImages = {
    hotel:  ["images/sejours/hotel-1.jpg","images/sejours/hotel-2.jpg","images/sejours/hotel-3.jpg"],
    gite:   ["images/sejours/gite-1.jpg","images/sejours/gite-2.jpg","images/sejours/gite-3.jpg"],
    camping:["images/sejours/camping-1.jpg","images/sejours/camping-2.jpg","images/sejours/camping-3.jpg"],
    chambre:["images/sejours/chambre-1.jpg","images/sejours/chambre-2.jpg","images/sejours/chambre-3.jpg"],
    default:["images/sejours/placeholder-1.jpg","images/sejours/placeholder-2.jpg"]
  };

  const labels = {
    hotel:"🏨 Hôtel",
    gite:"🏡 Gîte",
    chambre:"🛏️ Chambre d'hôtes",
    camping:"⛺ Camping"
  };

  // ---------- Raccourcis DOM ----------
  const byId = (id) => document.getElementById(id);
  const qs = (sel, root=document) => root.querySelector(sel);
  const qsa = (sel, root=document) => Array.from(root.querySelectorAll(sel));

  // ---------- État local ----------
  let currentSlide = 0;
  let slides = [];

  // ---------- Helpers ----------
  const clamp = (n, min, max) => Math.max(min, Math.min(max, n));
  const makeStars = (rating) => {
    const full = Math.floor(rating);
    const half = (rating % 1) >= 0.5;
    let s = "★".repeat(full);
    if (half) s += "☆";
    return s;
  };
  const imageExists = (src) => new Promise((resolve) => {
    const img = new Image();
    img.onload = () => resolve(true);
    img.onerror = () => resolve(false);
    img.src = src;
  });

  // ---------- Catégorie : ouvrir/fermer ----------
  async function openCategory(category){
    const popup = byId('categoryPopup');
    popup.classList.add('open');

    // Titres
    byId('popupTitle').textContent = (labels[category] || category) + " à Cilaos";
    const count = hebergements.filter(h => h.type === category).length;
    byId('popupSubtitle').textContent = `${count} hébergement${count>1?'s':''} sélectionné${count>1?'s':''}`;

    // Slideshow
    const images = (categoryImages[category] || categoryImages.default);
    await buildSlideshow(images);

    // Liste
    renderHebergementsList(category);

    // Focus pour accessibilité
    qs('.close-popup', popup)?.focus();
  }

  function closeCategory(){
    const popup = byId('categoryPopup');
    popup.classList.remove('open');
    byId('slideshowContainer').innerHTML = '';
    byId('slideshowDots').innerHTML = '';
    byId('hebergementsPopupList').innerHTML = '';
    slides = [];
    currentSlide = 0;
  }

  // ---------- Slideshow ----------
  async function buildSlideshow(imgPaths){
    const container = byId('slideshowContainer');
    const dots = byId('slideshowDots');
    container.innerHTML = ''; dots.innerHTML = '';
    slides = [];

    const valid = [];
    for (const src of imgPaths){
      /* eslint-disable no-await-in-loop */
      const ok = await imageExists(src);
      if (ok) valid.push(src);
    }
    const finalImages = valid.length ? valid : (categoryImages.default);

    finalImages.forEach((src, i) => {
      const slide = document.createElement('div');
      slide.className = 'slide' + (i===0 ? ' active' : '');
      slide.innerHTML = `<img src="${src}" alt="">`;
      container.appendChild(slide);
      slides.push(slide);

      const dot = document.createElement('span');
      dot.className = 'dot' + (i===0 ? ' active' : '');
      dot.addEventListener('click', () => goToSlide(i));
      dots.appendChild(dot);
    });

    currentSlide = 0;
  }

  function goToSlide(index){
    if (!slides.length) return;
    index = clamp(index, 0, slides.length-1);
    slides[currentSlide]?.classList.remove('active');
    slides[index]?.classList.add('active');
    const dots = qsa('.slideshow-dots .dot');
    dots[currentSlide]?.classList.remove('active');
    dots[index]?.classList.add('active');
    currentSlide = index;
  }

  function changeSlide(delta){ goToSlide(currentSlide + delta); }

  // ---------- Liste des hébergements (dans le popup) ----------
  function renderHebergementsList(category){
    const wrap = byId('hebergementsPopupList');
    const items = hebergements.filter(h => h.type === category);

    if (!items.length){
      wrap.innerHTML = `<div class="details" style="padding:1rem;opacity:.7;">Aucun hébergement trouvé.</div>`;
      return;
    }

    const frag = document.createDocumentFragment();
    items.forEach(item => {
      const el = document.createElement('article');
      el.className = 'hebergement-card';
      el.innerHTML = `
        <div class="header">
          <div>
            <div class="name">${item.name}</div>
            <span class="badge-type">${labels[item.type] || item.type}</span>
          </div>
          <div class="price">€${item.price}/nuit</div>
        </div>
        <div class="details">${item.description}</div>
        <div class="details">👥 ${item.capacity} personnes</div>
        <div class="features">${item.features.map(f=>`<span class="tag">${f}</span>`).join('')}</div>
        <div class="rating">${makeStars(item.rating)} <span style="color:#99a;">(${item.rating})</span></div>
      `;
      frag.appendChild(el);
    });
    wrap.innerHTML = '';
    wrap.appendChild(frag);
  }

  // ---------- Mises à jour dynamiques ----------
  function updateCategoryCounts(){
    document.querySelectorAll('.category-card').forEach(card => {
      const cat = card.getAttribute('data-category');
      const n = hebergements.filter(h => h.type === cat).length;
      const badge = card.querySelector('.category-count');
      if (badge) badge.textContent = `${n} hébergement${n>1?'s':''}`;
    });
  }

  // ---------- Écouteurs globaux ----------
  document.addEventListener('click', (e) => {
    if (e.target.matches('.slideshow-prev')) changeSlide(-1);
    if (e.target.matches('.slideshow-next')) changeSlide(1);
    const card = e.target.closest('.category-card');
    if (card){
      const cat = card.dataset.category;
      openCategory(cat);
    }
    if (e.target.matches('.close-popup')) closeCategory();
  });

  // Fermer au clic sur l’arrière-plan
  document.getElementById('categoryPopup')?.addEventListener('click', (e) => {
    if (e.target.id === 'categoryPopup') closeCategory();
  });

  // Clavier : Échap pour fermer + flèches pour slider
  document.addEventListener('keydown', (e) => {
    const opened = document.querySelector('.category-popup.open');
    if (!opened) return;
    if (e.key === 'Escape') closeCategory();
    if (e.key === 'ArrowLeft') changeSlide(-1);
    if (e.key === 'ArrowRight') changeSlide(1);
  });

  // Init
  updateCategoryCounts();
}
