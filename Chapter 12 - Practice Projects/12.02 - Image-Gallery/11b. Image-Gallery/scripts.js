/* Image data - replace or extend as needed. Using Unsplash source images (no base64). */
const IMAGES = [
  { id:1, src:"https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d?w=1600&q=80&auto=format&fit=crop", title:"Mountain Lake", tags:["nature","lake"], date:"2024-09-01" },
  { id:2, src:"https://images.unsplash.com/photo-1491553895911-0055eca6402d?w=1600&q=80&auto=format&fit=crop", title:"City Rooftops", tags:["city","architecture"], date:"2025-01-12" },
  { id:3, src:"https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=1600&q=80&auto=format&fit=crop", title:"Desert Dunes", tags:["desert","nature"], date:"2023-11-04" },
  { id:4, src:"https://images.unsplash.com/photo-1470770903676-69b98201ea1c?w=1600&q=80&auto=format&fit=crop", title:"Forest Path", tags:["forest","nature"], date:"2025-03-03" },
  { id:5, src:"https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=1600&q=80&auto=format&fit=crop", title:"Sea Cliff", tags:["ocean","cliff"], date:"2022-06-15" },
  { id:6, src:"https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=1600&q=80&auto=format&fit=crop", title:"Night Stars", tags:["night","stars"], date:"2024-12-02" },
  { id:7, src:"https://images.unsplash.com/photo-1504198453319-5ce911bafcde?w=1600&q=80&auto=format&fit=crop", title:"Snowy Peak", tags:["snow","mountain"], date:"2025-06-30" },
  { id:8, src:"https://images.unsplash.com/photo-1519681393784-d120267933ba?w=1600&q=80&auto=format&fit=crop", title:"Calm Beach", tags:["beach","ocean"], date:"2023-08-21" }
];

const galleryEl = document.getElementById('gallery');
const searchEl = document.getElementById('search');
const sortEl = document.getElementById('sort');

let state = {
  items: IMAGES.slice(),
  filtered: IMAGES.slice(),
  index: 0
};

function createCard(item, idx){
  const a = document.createElement('a');
  a.className = 'card';
  a.href = '#';
  a.dataset.index = idx;
  a.innerHTML = `
    <img class="thumb" loading="lazy" src="${item.src}&w=800" alt="${escapeHtml(item.title)}">
    <div class="meta">
      <div class="title">${escapeHtml(item.title)}</div>
      <div class="tags">${item.tags.join(', ')}</div>
    </div>
  `;
  a.addEventListener('click', (e)=>{
    e.preventDefault();
    openLightbox(parseInt(a.dataset.index,10));
  });
  return a;
}

function renderGrid(list){
  galleryEl.innerHTML = '';
  if(!list.length){
    const empty = document.createElement('div');
    empty.className = 'empty';
    empty.textContent = 'No images found.';
    galleryEl.appendChild(empty);
    return;
  }
  const frag = document.createDocumentFragment();
  list.forEach((it, i)=>frag.appendChild(createCard(it, i)));
  galleryEl.appendChild(frag);
}

function applyFilterAndSort(){
  const q = searchEl.value.trim().toLowerCase();
  let arr = state.items.filter(it=>{
    if(!q) return true;
    return it.title.toLowerCase().includes(q) || it.tags.join(' ').toLowerCase().includes(q);
  });
  const sort = sortEl.value;
  if(sort === 'title'){
    arr.sort((a,b)=>a.title.localeCompare(b.title));
  }else if(sort === 'new'){
    arr.sort((a,b)=>new Date(b.date) - new Date(a.date));
  }
  state.filtered = arr;
  renderGrid(arr);
}

/* Lightbox logic */
const lb = document.getElementById('lightbox');
const lbImg = document.getElementById('lb-img');
const lbCaption = document.getElementById('lb-caption');
const lbClose = document.getElementById('lb-close');
const lbPrev = document.getElementById('lb-prev');
const lbNext = document.getElementById('lb-next');

function openLightbox(idx){
  state.index = idx;
  updateLightbox();
  lb.setAttribute('aria-hidden','false');
  document.body.style.overflow = 'hidden';
  lbClose.focus();
  window.addEventListener('keydown', onKey);
}

function closeLightbox(){
  lb.setAttribute('aria-hidden','true');
  document.body.style.overflow = '';
  window.removeEventListener('keydown', onKey);
}

function updateLightbox(){
  const item = state.filtered[state.index];
  if(!item) return;
  lbImg.src = item.src + '&w=2000';
  lbImg.alt = item.title;
  lbCaption.textContent = `${item.title} — ${item.tags.join(', ')}`;
}

function prevImage(){
  if(state.filtered.length === 0) return;
  state.index = (state.index - 1 + state.filtered.length) % state.filtered.length;
  updateLightbox();
}

function nextImage(){
  if(state.filtered.length === 0) return;
  state.index = (state.index + 1) % state.filtered.length;
  updateLightbox();
}

function onKey(e){
  if(e.key === 'Escape') closeLightbox();
  if(e.key === 'ArrowLeft') prevImage();
  if(e.key === 'ArrowRight') nextImage();
}

/* Event bindings */
lbClose.addEventListener('click', closeLightbox);
lbPrev.addEventListener('click', prevImage);
lbNext.addEventListener('click', nextImage);
lb.addEventListener('click', (e)=>{
  if(e.target === lb) closeLightbox();
});

/* simple debounced input */
let debounceTimer = null;
searchEl.addEventListener('input', ()=>{
  clearTimeout(debounceTimer);
  debounceTimer = setTimeout(applyFilterAndSort, 160);
});
sortEl.addEventListener('change', applyFilterAndSort);

/* initial render */
applyFilterAndSort();

/* set footer year */
document.getElementById('year').textContent = new Date().getFullYear();

/* Utilities */
function escapeHtml(str){
  return String(str).replace(/[&<>"']/g, s=>({
    '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'
  }[s]));
}