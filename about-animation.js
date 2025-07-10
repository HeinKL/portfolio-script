let boldIntro = SplitText.create('.bold-intro', {
    type: 'lines', 
    linesClass: "line",
    autoSplit: true,
    mask: "lines",
});
gsap.from(boldIntro.lines, {
    duration: 0.6,
    yPercent: 100,
    opacity: 0,
    stagger: 0.1,
    ease: "expo.out",
});

let about1 = SplitText.create('.about-1', {
    type: 'lines', 
    linesClass: "line",
    autoSplit: true,
    mask: "lines",
});
let about2 = SplitText.create('.about-2', {
    type: 'lines', 
    linesClass: "line",
    autoSplit: true,
    mask: "lines",
});

let bioSectionTl = gsap.timeline({
    scrollTrigger: {
        trigger: '.section.bio-section-wrap',
        start: "top 50%",
        toggleActions: "play none none none",
    }
});
gsap.from(about1.lines, {
    duration: 0.6,
    yPercent: 100,
    opacity: 0,
    stagger: 0.1,
    ease: "expo.out",
});
bioSectionTl.from(about2.lines, {
    duration: 0.6,
    yPercent: 100,
    opacity: 0,
    stagger: 0.1,
    ease: "expo.out",
});

let expBold = SplitText.create('.work-exp-bold', {
    type: 'lines', 
    linesClass: "line",
    autoSplit: true,
    mask: "lines",
});

gsap.from(expBold.lines, {
  scrollTrigger: {
    trigger: '.section.work-exp-wrapper',
    start: "top 50%",
  },
  duration: 0.6,
  yPercent: 100,
  opacity: 0,
  stagger: 0.1,
  ease: "expo.out",
});



// Scroll-triggered reveal for .exp-list-div (one by one) and .download-cv button after all finished
const expListDivs = gsap.utils.toArray('.exp-list-div');
const downloadCvBtn = document.querySelector('.download-cv');
if (downloadCvBtn) {
  gsap.set(downloadCvBtn, {autoAlpha: 0, y: 40});
}
expListDivs.forEach((el, i) => {
  const isLast = i === expListDivs.length - 1;
  gsap.from(el, {
    scrollTrigger: {
      trigger: el,
      start: 'top 80%',
      toggleActions: 'play none none none',
      onEnter: isLast && downloadCvBtn ? () => {
        gsap.to(downloadCvBtn, {
          autoAlpha: 1,
          y: 0,
          duration: 0.7,
          ease: 'expo.out',
        });
      } : null
    },
    duration: 0.7,
    y: 60,
    opacity: 0,
    ease: 'expo.out',
    delay: i * 0.08 // slight delay for natural stagger
  });
});

// Scroll-triggered reveal for .approach-div (one by one, slower)
const approachDivs = gsap.utils.toArray('.approach-div');
approachDivs.forEach((el, i) => {
  gsap.from(el, {
    scrollTrigger: {
      trigger: el,
      start: 'top 80%',
      toggleActions: 'play none none none',
    },
    duration: 1.1, // slower reveal
    y: 60,
    opacity: 0,
    ease: 'expo.out',
    delay: i * 0.22 // slower stagger
  });
});

document.querySelectorAll('.exp-list-div').forEach((item, idx) => {
  const number = idx + 1;
  const wNumber = item.querySelector('.exp-index');
  if (wNumber) wNumber.textContent = '0' + number + '.';

});

let footer = document.querySelector(".section.footer-section"),
    getOverlap = () => Math.min(window.innerHeight, footer.offsetHeight), // we never want it to overlap more than the height of the screen
    adjustFooterOverlap = () => footer.style.marginTop = -getOverlap() + "px"; // adjusts the margin-top of the footer to overlap the proper amount

adjustFooterOverlap();

// to make it responsive, re-calculate the margin-top on the footer when the ScrollTriggers revert
ScrollTrigger.addEventListener("revert", adjustFooterOverlap);

// magic
ScrollTrigger.create({
  trigger: footer,
  start: () => "top " + (window.innerHeight - getOverlap()),
  end: () => "+=" + getOverlap(),
  pin: true,
});