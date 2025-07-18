
document.querySelectorAll('.nav-logo-block').forEach(block => {
  const navLogo1 = block.querySelector('.logo-nav');
  const navLogo2 = block.querySelector('.logo-nav-2');
  if (!navLogo1 || !navLogo2) return;

  // Initial state: .social-link-2 is below and hidden
  gsap.set(navLogo2, { yPercent: 100, opacity: 1, pointerEvents: 'none' });
  gsap.set(navLogo1, { yPercent: 0, opacity: 1, pointerEvents: 'auto' });

  block.addEventListener('mouseenter', () => {
    // Move .social-link up and fade out
    gsap.to(navLogo1, { yPercent: -100, opacity: 0, duration: 0.35, ease: 'power2.out', pointerEvents: 'none' });
    // Move .social-link-2 up into place and fade in
    gsap.to(navLogo2, { yPercent: 0, opacity: 1, duration: 0.35, ease: 'power2.out', pointerEvents: 'auto' });
  });
  block.addEventListener('mouseleave', () => {
    // Move .social-link-2 down and fade out
    gsap.to(navLogo2, { yPercent: 100, opacity: 0, duration: 0.35, ease: 'power2.in', pointerEvents: 'none' });
    // Move .social-link back into place and fade in
    gsap.to(navLogo1, { yPercent: 0, opacity: 1, duration: 0.35, ease: 'power2.in', pointerEvents: 'auto' });
  });
});
// Social link hover effect: swap .social-link and .social-link-2 with animation
document.querySelectorAll('.nav-link-block').forEach(block => {
  const navLink1 = block.querySelector('.u-nav-link');
  const navLink2 = block.querySelector('.u-nav-link-2');
  if (!navLink1 || !navLink2) return;

  // Initial state: .social-link-2 is below and hidden
  gsap.set(navLink2, { yPercent: 100, opacity: 1, pointerEvents: 'none' });
  gsap.set(navLink1, { yPercent: 0, opacity: 1, pointerEvents: 'auto' });

  block.addEventListener('mouseenter', () => {
    // Move .social-link up and fade out
    gsap.to(navLink1, { yPercent: -100, opacity: 0, duration: 0.35, ease: 'power2.out', pointerEvents: 'none' });
    // Move .social-link-2 up into place and fade in
    gsap.to(navLink2, { yPercent: 0, opacity: 1, duration: 0.35, ease: 'power2.out', pointerEvents: 'auto' });
  });
  block.addEventListener('mouseleave', () => {
    // Move .social-link-2 down and fade out
    gsap.to(navLink2, { yPercent: 100, opacity: 0, duration: 0.35, ease: 'power2.in', pointerEvents: 'none' });
    // Move .social-link back into place and fade in
    gsap.to(navLink1, { yPercent: 0, opacity: 1, duration: 0.35, ease: 'power2.in', pointerEvents: 'auto' });
  });
});

document.querySelectorAll('.social-link-block').forEach(block => {
  const social1 = block.querySelector('.social-link');
  const social2 = block.querySelector('.social-link-2');
  if (!social1 || !social2) return;

  // Initial state: .social-link-2 is below and hidden
  gsap.set(social2, { yPercent: 100, opacity: 1, pointerEvents: 'none' });
  gsap.set(social1, { yPercent: 0, opacity: 1, pointerEvents: 'auto' });

  block.addEventListener('mouseenter', () => {
    // Move .social-link up and fade out
    gsap.to(social1, { yPercent: -100, opacity: 0, duration: 0.35, ease: 'power2.out', pointerEvents: 'none' });
    // Move .social-link-2 up into place and fade in
    gsap.to(social2, { yPercent: 0, opacity: 1, duration: 0.35, ease: 'power2.out', pointerEvents: 'auto' });
  });
  block.addEventListener('mouseleave', () => {
    // Move .social-link-2 down and fade out
    gsap.to(social2, { yPercent: 100, opacity: 0, duration: 0.35, ease: 'power2.in', pointerEvents: 'none' });
    // Move .social-link back into place and fade in
    gsap.to(social1, { yPercent: 0, opacity: 1, duration: 0.35, ease: 'power2.in', pointerEvents: 'auto' });
  });
});
// Global custom cursor for the whole website
const customCursor = document.querySelector('.custom-cursor');
if (customCursor) {
  // Show default cursor and custom cursor together
  customCursor.style.position = 'fixed';
  customCursor.style.pointerEvents = 'none';
  customCursor.style.zIndex = 9999;
  customCursor.style.left = '0px';
  customCursor.style.top = '0px';
  customCursor.style.opacity = 0;

  let cursorVisible = true;
  let mouseX = 0, mouseY = 0;
  let cursorX = 0, cursorY = 0;

  function moveCursor(e) {
    mouseX = e.clientX - customCursor.offsetWidth / 2;
    mouseY = e.clientY - customCursor.offsetHeight / 2;
  }
  window.addEventListener('mousemove', moveCursor);

  // Animation loop for lag effect
  function animateCustomCursor() {
    // Lerp towards mouse position for lag
    cursorX += (mouseX - cursorX) * 0.08;
    cursorY += (mouseY - cursorY) * 0.08;
    customCursor.style.transform = `translate3d(${cursorX}px, ${cursorY}px, 0)`;
    requestAnimationFrame(animateCustomCursor);
  }
  animateCustomCursor();

  // Hide global cursor on .work-list and .project-list hover
  function hideCursor() {
    cursorVisible = false;
    gsap.to(customCursor, { opacity: 0, duration: 0.15, ease: 'power2.out' });
  }
  function showCursor() {
    cursorVisible = true;
    gsap.to(customCursor, { opacity: 1, duration: 0.15, ease: 'power2.out' });
  }
  
  // Show cursor on first mouse move
  function showCursorOnFirstMove() {
    showCursor();
    window.removeEventListener('mousemove', showCursorOnFirstMove);
  }
  window.addEventListener('mousemove', showCursorOnFirstMove);
  const workLists = document.querySelectorAll('.work-list');
  if (workLists.length) {
    workLists.forEach(el => {
      el.addEventListener('mouseenter', hideCursor);
      el.addEventListener('mouseleave', showCursor);
    });
  }

  
}

// NZDT time updater for .time in HH:MM:SS format
function updateNZTime() {
  const $time = $(".time");
  if ($time.length) {
    // Get NZDT time using toLocaleString with timeZone
    const now = new Date();
    const options = {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
      timeZone: 'Pacific/Auckland'
    };
    // Format: HH:MM:SS
    const nzTime = now.toLocaleTimeString('en-NZ', options) + " " + "AKL";
    $time.text(nzTime);
  }
}

// Update every second
setInterval(updateNZTime, 1000);
updateNZTime();

let tl = gsap.timeline();
tl.to(".transition_column", {yPercent: -100, stagger: 0.2})
tl.set(".transition_wrap", {display: "none"})

// link click for all internal links (except anchors, new tab, mailto, tel)
$(document).on("click", "a[href]", function (e) {
  const $link = $(this);
  const href = $link.attr("href");
  // Only handle same-origin, not anchor, not new tab, not mailto/tel
  if (
    $link.prop("hostname") === window.location.host &&
    !$link.attr("target") &&
    !href.startsWith("#") &&
    !href.startsWith("mailto:") &&
    !href.startsWith("tel:")
  ) {
    e.preventDefault();
    // lenis.stop();
    let tl = gsap.timeline({ onComplete: () => (window.location.href = href) });
    tl.set(".transition_wrap", {display: "flex"});
    tl.fromTo(".transition_column", {yPercent: 100}, {yPercent: 0, stagger: 0.2});
  }
});

// Mobile menu open/close animation
$(function() {
  const $menuWrapper = $(".m-menu-wrapper");
  const $menuSvg = $(".menu-svg");
  const $closeSvg = $(".close-svg");

  // Initial state: menu hidden, menu-svg visible, close-svg hidden
  gsap.set($menuWrapper, { xPercent: 100, display: 'none' });
  gsap.set($menuSvg, { autoAlpha: 1, display: 'block' });
  gsap.set($closeSvg, { autoAlpha: 0, display: 'none' });
  // Hide menu links/socials initially (so they don't show before animation)
  gsap.set($menuWrapper.find('.e-menu-link-txt'), {yPercent: 100, autoAlpha: 0});
  gsap.set($menuWrapper.find('.social-link-m-menu'), {yPercent: 100, autoAlpha: 0});



  // Helper: animate menu links/socials in, with delay after menu slides in
  function animateMenuLinksIn() {
    gsap.fromTo(
      $menuWrapper.find('.e-menu-link-txt'),
      {yPercent: 100, autoAlpha: 0},
      {yPercent: 0, autoAlpha: 1, duration: 0.6, stagger: 0.07, ease: 'expo.out', overwrite: true, delay: 0.18}
    );
    gsap.fromTo(
      $menuWrapper.find('.social-link-m-menu'),
      {yPercent: 100, autoAlpha: 0},
      {yPercent: 0, autoAlpha: 1, duration: 0.6, stagger: 0.07, ease: 'expo.out', overwrite: true, delay: 0.33}
    );
  }

  // Helper: animate menu links/socials out, then menu slides out
  function animateMenuLinksOut(onComplete) {
    const tl = gsap.timeline({onComplete});
    tl.to($menuWrapper.find('.e-menu-link-txt'), {
      yPercent: 100,
      autoAlpha: 0,
      duration: 0.4,
      stagger: 0.05,
      ease: 'expo.in',
      overwrite: true
    })
    .to($menuWrapper.find('.social-link-m-menu'), {
      yPercent: 100,
      autoAlpha: 0,
      duration: 0.4,
      stagger: 0.05,
      ease: 'expo.in',
      overwrite: true,
      delay: 0.08
    }, '-=0.3');
    return tl;
  }

  $menuSvg.on("click", function() {
    // Show menu
    gsap.set($menuWrapper, {display: "block"});
    gsap.to($menuWrapper, {
      xPercent: 0,
      duration: 0.5,
      ease: "expo.out",
      onComplete: animateMenuLinksIn
    });
    // Disable scroll on body
    $('body').addClass('no-scroll');
    // Animate icons
    gsap.to($menuSvg, {
      autoAlpha: 0,
      duration: 0.3,
      onComplete: function() {
        gsap.set($menuSvg, {display: 'none'});
        gsap.set($closeSvg, {display: 'block'});
        gsap.fromTo($closeSvg, {autoAlpha: 0}, {autoAlpha: 1, duration: 0.3});
      }
    });
  });

  $closeSvg.on("click", function() {
    // Animate menu links/socials out, then menu slides out
    animateMenuLinksOut(function() {
      gsap.to($menuWrapper, {
        xPercent: 100,
        duration: 0.5,
        ease: "expo.in",
        onComplete: function() {
          gsap.set($menuWrapper, {display: "none"});
          // Re-enable scroll on body
          $('body').removeClass('no-scroll');
        }
      });
    });
    // Animate icons
    gsap.to($closeSvg, {
      autoAlpha: 0,
      duration: 0.3,
      onComplete: function() {
        gsap.set($closeSvg, {display: 'none'});
        gsap.set($menuSvg, {display: 'block'});
        gsap.fromTo($menuSvg, {autoAlpha: 0}, {autoAlpha: 1, duration: 0.3});
      }
    });
  });
});

// On Back Button Tap or swipe back (mobile): reload page for page transition
window.onpageshow = function (event) {
  if (event.persisted || performance.navigation.type === 2) {
    window.location.reload();
  }
};


