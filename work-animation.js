// Show .work-number and .work-list-image on hover for each .work-list-link-block using GSAP


const workBlocks = Array.from(document.querySelectorAll('.work-list-link-block'));
workBlocks.forEach((block, idx) => {
  const number = block.querySelector('.work-number');
  const image = block.querySelector('.work-list-image');
  const text = block.querySelector('.work-list-text');
  const type = block.querySelector('.work-type');
  if (!number && !image && !text && !type) return;

  // Initial state: hidden, except first block
  if (number) gsap.set(number, { opacity: idx === 0 ? 1 : 0, y: idx === 0 ? 0 : 20 });
  if (image) gsap.set(image, { opacity: idx === 0 ? 1 : 0, y: idx === 0 ? 0 : 20 });
  if (type) gsap.set(type, { opacity: idx === 0 ? 1 : 0, y: idx === 0 ? 0 : 20 });
  if (text) gsap.set(text, { color: idx === 0 ? '#0031b8' : '', overwrite: true });

  block.addEventListener('mouseenter', () => {
    // Remove hover state from all others
    workBlocks.forEach((other, i) => {
      if (other === block) return;
      const n = other.querySelector('.work-number');
      const img = other.querySelector('.work-list-image');
      const t = other.querySelector('.work-list-text');
      const ty = other.querySelector('.work-type');
      if (n) gsap.to(n, { opacity: 0, y: 20, duration: 0.4, ease: 'power2.out' });
      if (img) gsap.to(img, { opacity: 0, y: 20, duration: 0.4, ease: 'power2.out' });
      if (ty) gsap.to(ty, { opacity: 0, y: 20, duration: 0.4, ease: 'power2.out' });
      if (t) gsap.to(t, { color: '', duration: 0.3, ease: 'power2.out' });
    });
    // Animate in this block
    if (number) gsap.to(number, { opacity: 1, y: 0, duration: 0.4, ease: 'power2.out' });
    if (image) gsap.to(image, { opacity: 1, y: 0, duration: 0.4, ease: 'power2.out' });
    if (type) gsap.to(type, { opacity: 1, y: 0, duration: 0.4, ease: 'power2.out' });
    if (text) gsap.to(text, { color: '#0031b8', duration: 0.3, ease: 'power2.out' });
  });
  block.addEventListener('mouseleave', () => {
    // Only remove hover state if not the first block
    if (idx !== 0) {
      if (number) gsap.to(number, { opacity: 0, y: 20, duration: 0.4, ease: 'power2.out' });
      if (image) gsap.to(image, { opacity: 0, y: 20, duration: 0.4, ease: 'power2.out' });
      if (type) gsap.to(type, { opacity: 0, y: 20, duration: 0.4, ease: 'power2.out' });
      if (text) gsap.to(text, { color: '', duration: 0.3, ease: 'power2.out' }); // revert to original
    } else {
      // If it's the first block, restore hover state
      if (number) gsap.to(number, { opacity: 1, y: 0, duration: 0.4, ease: 'power2.out' });
      if (image) gsap.to(image, { opacity: 1, y: 0, duration: 0.4, ease: 'power2.out' });
      if (type) gsap.to(type, { opacity: 1, y: 0, duration: 0.4, ease: 'power2.out' });
      if (text) gsap.to(text, { color: '#0031b8', duration: 0.3, ease: 'power2.out' });
    }
  });
});

// Add item numbers to .number-absolute and .number-default in .work-list items
document.querySelectorAll('.work-section').forEach((item, idx) => {
  const number = idx + 1;
  const wNumber = item.querySelector('.work-number');
  if (wNumber) wNumber.textContent = '0' + number + '.';

});

// Add item numbers to .number-absolute and .number-default in .work-list items
document.querySelectorAll('.work-grid').forEach((item, idx) => {
  const number = idx + 1;
  const abs = item.querySelector('.number-absolute');
  const def = item.querySelector('.number-default');
  if (abs) abs.textContent = '0' + number + '.';
  if (def) def.textContent = '0' + number + '.';
});