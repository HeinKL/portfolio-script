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

// On Back Button Tap
window.onpageshow = function (event) {
  if (event.persisted) window.location.reload();
};


