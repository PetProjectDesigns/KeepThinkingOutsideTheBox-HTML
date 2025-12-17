// script.js

const projects = [
  {
    id: "p-1",
    title: "Brand Website Redesign",
    // Use a local path: images/ followed by the file name
    thumb: "images/brand-website.png", 
    desc: "A clean responsive redesign focusing on conversion and accessibility.",
    tags: ["Web", "Design", "Accessibility"],
    year: 2024,
    url: "https://example.com/project/brand"
  },
  {
    id: "p-2",
    title: "Mobile App Prototype",
    thumb: "images/mobile-app.png",
    desc: "Interactive prototype and user flow for a fintech app.",
    tags: ["Mobile", "Prototype"],
    year: 2023,
    url: "https://example.com/project/mobile"
  },
  {
    id: "p-3",
    title: "E‑commerce Platform",
    thumb: "images/ecommerce-platform.png",
    desc: "Scalable e‑commerce front-end optimized for conversions.",
    tags: ["Web", "E-commerce", "Performance"],
    year: 2022,
    url: "https://example.com/project/ecommerce"
  },
  // Add more projects here
];

const gallery = document.getElementById('gallery');
const modal = document.getElementById('modal');
const modalContent = document.getElementById('modalContent');
const modalClose = document.getElementById('modalClose');

// --- Helper Functions ---

function createProjectCard(project) {
  const card = document.createElement('article');
  card.className = 'card';
  card.setAttribute('data-id', project.id);

  card.innerHTML = `
    <div class="card-media">
      <img 
        class="card-img loaded" 
        src="${project.thumb}" 
        alt="Thumbnail for ${project.title}" 
        loading="lazy"
      >
    </div>
    <div class="card-info">
      <h2 class="card-title">${project.title}</h2>
      <p class="card-desc">${project.desc}</p>
      <div class="card-meta">
        <span class="card-year">${project.year}</span>
        <div class="card-tags">
          ${project.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
        </div>
      </div>
    </div>
  `;

  card.addEventListener('click', () => openModal(project));
  return card;
}

function renderGallery() {
  projects.forEach(project => {
    gallery.appendChild(createProjectCard(project));
  });
}

// Initial render
document.addEventListener('DOMContentLoaded', renderGallery);


// --- Modal Functions (Simplified) ---

function openModal(project) {
  const tagsHtml = project.tags.map(tag => `<span class="tag">${tag}</span>`).join('');
  
  modalContent.innerHTML = `
    <div class="modal-media">
      <img class="modal-img" src="${project.thumb}" alt="Image for ${project.title}">
    </div>
    <div class="modal-info">
      <h2>${project.title}</h2>
      <div class="modal-tags">${tagsHtml}</div>
      <p class="modal-year">${project.year}</p>
      <p class="modal-desc">${project.desc}</p>
      <a href="${project.url}" target="_blank" class="modal-link">View Project &rarr;</a>
    </div>
  `;
  
  modal.setAttribute('aria-hidden', 'false');
  // Accessibility: Trap focus within the modal
  trapFocus(modal);
}

function trapFocus(modal){
  const focusableEls = modal.querySelectorAll('a[href]:not([disabled]), button:not([disabled]), textarea:not([disabled]), input[type="text"]:not([disabled]), input[type="radio"]:not([disabled]), input[type="checkbox"]:not([disabled]), select:not([disabled])');
  const firstFocusable = focusableEls[0];
  const lastFocusable = focusableEls[focusableEls.length - 1];

  function handleKey(e){
    if(e.key === 'Tab'){
      if(e.shiftKey && document.activeElement === firstFocusable){ e.preventDefault(); lastFocusable.focus(); }
      else if(!e.shiftKey && document.activeElement === lastFocusable){ e.preventDefault(); firstFocusable.focus(); }
    }
    // Accessibility: allow ESC to close modal
    if(e.key === 'Escape') closeModal();
  }
  
  // Store the key handler on the modal for easy removal
  modal.__handleKey = handleKey;
  document.addEventListener('keydown', handleKey);
  firstFocusable.focus(); // Focus the first element on open
}

function closeModal(){
  modal.setAttribute('aria-hidden','true');
  modalContent.innerHTML = '';
  if(modal.__handleKey) document.removeEventListener('keydown', modal.__handleKey);
}

// close handlers
modalClose.addEventListener('click', closeModal);
modal.querySelector('[data-close]').addEventListener('click', closeModal);