let cartCount = 0;
let qty = 1;
let currentEmoji = '🎨';

function switchImg(el, srcOrEmoji, label) {
  document.querySelectorAll('.thumb').forEach(t => t.classList.remove('active'));
  el.classList.add('active');

  const me = document.getElementById('mainEmoji');

  // Animate out
  me.style.opacity = '0';
  me.style.transform = 'scale(0.85) rotate(-3deg)';

  setTimeout(() => {
    if (srcOrEmoji.endsWith('.jpg') || srcOrEmoji.endsWith('.png')) {
      me.src = srcOrEmoji;   // update image source
    } else {
      me.textContent = srcOrEmoji; // fallback for emoji
    }
    me.style.transition = 'opacity 0.4s, transform 0.5s cubic-bezier(0.34,1.56,0.64,1)';
    me.style.opacity = '1';
    me.style.transform = 'scale(1) rotate(0deg)';
  }, 200);
}



function toggleWishlist() {
  const btn = document.getElementById('wishlistBtn');
  btn.classList.toggle('active');
  if (btn.classList.contains('active')) {
    btn.textContent = '♥';
    showToast('♥ Saved to your Wishlist!');
  } else {
    btn.textContent = '♡';
    showToast('Removed from Wishlist');
  }
}

function selectSize(el, label, price) {
  document.querySelectorAll('.size-opt').forEach(s => s.classList.remove('active'));
  el.classList.add('active');
  document.getElementById('selectedSize').textContent = label;
  document.querySelector('.price-current').innerHTML = '<span class="sym">₹</span>' + price.replace('₹','');
  showToast('Size: ' + label + ' selected');
}

function selectColor(el, label) {
  document.querySelectorAll('.color-chip').forEach(c => c.classList.remove('active'));
  el.classList.add('active');
  document.getElementById('selectedColor').textContent = label;
  showToast('Colour: ' + label + ' selected');
}

function changeQty(d) {
  qty = Math.max(1, Math.min(10, qty + d));
  document.getElementById('qtyNum').value = qty;
}

function addCart() {
  cartCount++;
  document.getElementById('cartCount').textContent = cartCount;
  document.getElementById('cartCount').style.animation = 'none';
  setTimeout(() => document.getElementById('cartCount').style.animation = 'cartPulse 0.4s', 10);
  showToast('🛍️ ' + qty + ' item(s) added to cart!');
  const btn = document.querySelector('.btn-cart');
  btn.textContent = '✓ Added!';
  btn.style.background = 'var(--green)';
  setTimeout(() => { btn.innerHTML = '🛍️ Add to Cart'; btn.style.background = ''; }, 2200);
}

function checkDelivery() {
  const val = document.getElementById('pinIn').value;
  const res = document.getElementById('deliveryResult');
  if (val.length === 6) {
    res.innerHTML = '<span class="free-delivery">🚚 FREE Delivery</span> by <strong>Thursday, April 3</strong><br><span style="color:var(--green)">✔ This pincode is serviceable</span><br><span style="font-style:italic;font-size:0.7rem">Packed & dispatched within 2 business days</span>';
    res.classList.add('show');
  } else {
    res.textContent = 'Please enter a valid 6-digit pincode.';
    res.classList.add('show');
  }
}

function toggleAcc(item) {
  const wasOpen = item.classList.contains('open');
  document.querySelectorAll('.acc-item').forEach(a => a.classList.remove('open'));
  if (!wasOpen) item.classList.add('open');
}

function openModal() {
  document.getElementById('modalEmoji').textContent = currentEmoji;
  document.getElementById('zoomModal').classList.add('open');
}
function closeModal() { document.getElementById('zoomModal').classList.remove('open'); }

function likeThis(btn) {
  const m = btn.textContent.match(/\((\d+)\)/);
  if (m) btn.textContent = '👍 Yes (' + (parseInt(m[1]) + 1) + ')';
  btn.style.borderColor = 'rgba(45,90,39,0.4)';
  btn.style.color = 'var(--green)';
}

let toastT;
function showToast(msg) {
  const t = document.getElementById('toast');
  t.textContent = msg; t.classList.add('show');
  clearTimeout(toastT);
  toastT = setTimeout(() => t.classList.remove('show'), 2600);
}

// Sticky bar on scroll
window.addEventListener('scroll', () => {
  const bar = document.getElementById('stickyBar');
  if (window.scrollY > 600) bar.classList.add('visible');
  else bar.classList.remove('visible');
});

// Rating bar observer
const ro = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.querySelectorAll('.rb-fill').forEach((b,i) => {
        b.style.animationDelay = (i * 0.12) + 's';
        b.style.animation = 'rbGrow 1.2s cubic-bezier(0.25,0.46,0.45,0.94) forwards';
      });
    }
  });
}, {threshold:0.3});
document.querySelectorAll('.reviews-summary-box').forEach(el => ro.observe(el));