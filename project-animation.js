// CMS NEXT POWER-UP
window.addEventListener("DOMContentLoaded", (event) => {
  $("[tr-cmsnext-element='component']").each(function (index) {
    let componentEl = $(this),
      cmsListEl = componentEl.find(".w-dyn-items").first(),
      cmsItemEl = cmsListEl.children(),
      currentItemEl,
      noResultEl = componentEl.find("[tr-cmsnext-element='no-result']");
    cmsItemEl.each(function (index) {
      if ($(this).find(".w--current").length) currentItemEl = $(this);
    });
    let nextItemEl = currentItemEl.next(),
      prevItemEl = currentItemEl.prev();
    if (componentEl.attr("tr-cmsnext-loop") === "true") {
      if (!nextItemEl.length) nextItemEl = cmsItemEl.first();
      if (!prevItemEl.length) prevItemEl = cmsItemEl.last();
    }
    let displayEl = nextItemEl;
    if (componentEl.attr("tr-cmsnext-showprev") === "true") displayEl = prevItemEl;
    if (componentEl.attr("tr-cmsnext-showall") === "true") {
      prevItemEl.addClass("is-prev");
      currentItemEl.addClass("is-current");
      nextItemEl.addClass("is-next");
    } else {
      cmsItemEl.not(displayEl).remove();
      if (!displayEl.length) noResultEl.show();
      if (!displayEl.length && componentEl.attr("tr-cmsnext-hideempty") === "true") componentEl.hide();
    }
  });
});



// Animation for .project-name and .view-more-text hover effect
// Usage: Call setupProjectNameHoverAnimation() after DOM is ready

function setupProjectNameHoverAnimation() {
  document.querySelectorAll('.project-name').forEach(projectName => {
    const parent = projectName.parentElement;
    const viewMoreText = parent.querySelector('.view-more-text');
    if (!viewMoreText) return;

    // Ensure initial state
    gsap.set(viewMoreText, { y: 40, opacity: 0, pointerEvents: 'none' });
    gsap.set(projectName, { y: 0, opacity: 1 });

    projectName.addEventListener('mouseenter', () => {
      gsap.to(projectName, {
        y: -60,
        //opacity: 0,
        duration: 0.4,
        ease: 'power2.out',
        pointerEvents: 'none',
      });
      gsap.to(viewMoreText, {
        y: -20,
        opacity: 1,
        duration: 0.4,
        ease: 'power2.out',
        pointerEvents: 'auto',
      });
    });

    parent.addEventListener('mouseleave', () => {
      gsap.to(projectName, {
        y: 0,
        opacity: 1,
        duration: 0.4,
        ease: 'power2.out',
        pointerEvents: 'auto',
      });
      gsap.to(viewMoreText, {
        y: 40,
        opacity: 0,
        duration: 0.4,
        ease: 'power2.out',
        pointerEvents: 'none',
      });
    });
  });
}

// Optionally, call this automatically if DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', setupProjectNameHoverAnimation);
} else {
  setupProjectNameHoverAnimation();
}


let projectName = SplitText.create('.detail-hero-title', {
    type: 'lines', 
    linesClass: "line",
    autoSplit: true,
    mask: "lines",
});
gsap.from(projectName.lines, {
    duration: 0.6,
    yPercent: 100,
    opacity: 0,
    stagger: 0.1,
    ease: "expo.out",
});

gsap.fromTo(".project-hero-image",                // Target
    { yPercent: -10,},          // From (initial state)
    { 
        yPercent: 10,
        ease: "power1.inOut",
        duration: 1,
        scrollTrigger: {
        trigger: ".section.detail-hero-wrap",    // Element that triggers the animation
        start: "top center",         // When to start
        end: "+=100%",           // When to end
        scrub: true,                 // Link to scroll
        }
});

// let footer = document.querySelector(".section.footer-section"),
//     getOverlap = () => Math.min(window.innerHeight, footer.offsetHeight), // we never want it to overlap more than the height of the screen
//     adjustFooterOverlap = () => footer.style.marginTop = -getOverlap() + "px"; // adjusts the margin-top of the footer to overlap the proper amount

// adjustFooterOverlap();

// // to make it responsive, re-calculate the margin-top on the footer when the ScrollTriggers revert
// ScrollTrigger.addEventListener("revert", adjustFooterOverlap);

// // magic
// ScrollTrigger.create({
//   trigger: footer,
//   start: () => "top " + (window.innerHeight - getOverlap()),
//   end: () => "+=" + getOverlap(),
//   pin: true,
// });