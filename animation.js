// Add item numbers to .number-absolute and .number-default in .work-list items
document.querySelectorAll('.work-list').forEach((item, idx) => {
  const number = idx + 1;
  const abs = item.querySelector('.number-absolute');
  const def = item.querySelector('.number-default');
  if (abs) abs.textContent = '0' + number + '.';
  if (def) def.textContent = '0' + number + '.';
});


const matterContainer = document.querySelector("#matter-container");
const THICCNESS = 60;

// module aliases
var Engine = Matter.Engine,
  Render = Matter.Render,
  Runner = Matter.Runner,
  Bodies = Matter.Bodies,
  Composite = Matter.Composite;

// create an engine
var engine = Engine.create();

// create a renderer
var render = Render.create({
  element: matterContainer,
  engine: engine,
  options: {
    width: matterContainer.clientWidth,
    height: matterContainer.clientHeight,
    background: "transparent",
    wireframes: false,
    showAngleIndicator: false
  }
});

  var containerWidth = matterContainer.clientWidth + 2;
  var radius

// create two boxes and a ground
// var boxA = Bodies.rectangle(400, 200, 80, 80);
// var boxB = Bodies.rectangle(450, 50, 80, 80);

// for (let i = 0; i < 100; i++) {
//   let circle = Bodies.circle(i, 10, 30, {
//     friction: 0.3,
//     frictionAir: 0.00001,
//     restitution: 0.8
//   });
//   Composite.add(engine.world, circle);
// }

// const texture = [
//     "https://cdn.prod.website-files.com/63947b43ea7b3a1c7101252e/685d2c91dadf6d4eb565ab73_VISUAL%20DESIGN.svg",
//     "https://cdn.prod.website-files.com/63947b43ea7b3a1c7101252e/685d2c91fbfc48d4594f2bd0_WEB%20DESIGN.svg",
//     "https://cdn.prod.website-files.com/63947b43ea7b3a1c7101252e/685d2c912b788a10502304d1_LOW%20CODE%20DEVELOPMENT.svg", 
//     "https://cdn.prod.website-files.com/63947b43ea7b3a1c7101252e/685d2c91fd5641db478be058_USER%20EXPERIENCE.svg",
//     "https://cdn.prod.website-files.com/63947b43ea7b3a1c7101252e/685d2c91cc333ffd16b1f3f5_INTERACTION.svg",
//     "https://cdn.prod.website-files.com/63947b43ea7b3a1c7101252e/685d2c9124fa70f5ffce7293_PROTOTYPING.svg",
//     "https://cdn.prod.website-files.com/63947b43ea7b3a1c7101252e/685d2c915362147bb899b658_USER%20INTERFACE.svg",
//     "https://cdn.prod.website-files.com/63947b43ea7b3a1c7101252e/685d2c91e3d184c0bde76946_RESEARCH.svg",
//     "https://cdn.prod.website-files.com/63947b43ea7b3a1c7101252e/685d2c914cea4f95fc4a4dff_BRAND%20DESIGN.svg"
// ];

const texture = [
    "https://cdn.prod.website-files.com/63947b43ea7b3a1c7101252e/686f98d251b0f8e5ec9d117e_Frame%2038.svg",
    "https://cdn.prod.website-files.com/63947b43ea7b3a1c7101252e/686f98d20dc53f8ca893709a_Frame%2035.svg",
    "https://cdn.prod.website-files.com/63947b43ea7b3a1c7101252e/686f98d2aa8ea650a2e54c67_Frame%2037.svg", 
    "https://cdn.prod.website-files.com/63947b43ea7b3a1c7101252e/686f98d29e8636e3d1c2cd14_Frame%2034.svg",
    "https://cdn.prod.website-files.com/63947b43ea7b3a1c7101252e/686f98d25cbed41827b9ea7a_Frame%2040.svg",
    "https://cdn.prod.website-files.com/63947b43ea7b3a1c7101252e/686f98d290e455fee38ea6af_Frame%2039.svg",
    "https://cdn.prod.website-files.com/63947b43ea7b3a1c7101252e/686f98d264e3e45d617781da_Frame%2036.svg",
];



// Randomize initial angle and position for more natural stacking
for (let i = 0; i <20; i++) {
  let texIdx = Math.floor(Math.random() * texture.length);
  // Random position, but with a little vertical offset to avoid perfect alignment
  let x = Math.random() * matterContainer.clientWidth;
  let y = Math.random() * matterContainer.clientHeight * 0.7 + Math.random() * 40;
  // Random rotation between -30 and 30 degrees
  let angle = (Math.random() - 0.5) * (Math.PI / 3);
  let tag = Bodies.rectangle(
    x,
    y,
    164,
    56,
    {
      angle: angle,
      friction: 0.3,
      frictionAir: 0.00001,
      restitution: 0.8,
      render: {
        sprite: {
          texture: texture[texIdx],
          xScale: 0.4,
          yScale: 0.4
        }
      }
    }
  );
  Composite.add(engine.world, tag);
}



var ground = Bodies.rectangle(
  matterContainer.clientWidth / 2,
  matterContainer.clientHeight + THICCNESS / 2,
  27184,
  THICCNESS,
  { isStatic: true ,
    render: {
        strokeStyle: 'transparent',     // Border color
        lineWidth: 0            // Border width
    }
  }
);

let leftWall = Bodies.rectangle(
  0 - THICCNESS / 2,
  matterContainer.clientHeight / 2,
  THICCNESS,
  matterContainer.clientHeight * 5,
  { isStatic: true ,
    render: {
        strokeStyle: 'transparent',     // Border color
        lineWidth: 0            // Border width
    }
  }
);

let rightWall = Bodies.rectangle(
  matterContainer.clientWidth + THICCNESS / 2,
  matterContainer.clientHeight / 2,
  THICCNESS,
  matterContainer.clientHeight * 5,
  { isStatic: true ,
    render: {
        strokeStyle: 'transparent',     // Border color
        lineWidth: 0            // Border width
    }
  }
);

let topWall = Bodies.rectangle(
  matterContainer.clientWidth / 2, // center X
  0 - THICCNESS / 2,               // just above the top edge
  matterContainer.clientWidth,      // full width
  THICCNESS,                       // thickness
  { isStatic: true ,
    render: {
        strokeStyle: 'transparent',     // Border color
        lineWidth: 0            // Border width
    }
  }
);

// add all of the bodies to the world
Composite.add(engine.world, [ground, leftWall, rightWall, topWall]);

let mouse = Matter.Mouse.create(render.canvas);
let mouseConstraint = Matter.MouseConstraint.create(engine, {
  mouse: mouse,
  constraint: {
    stiffness: 0.2,
    render: {
      visible: false
    }
  }
});

Composite.add(engine.world, mouseConstraint);

// allow scroll through the canvas
mouseConstraint.mouse.element.removeEventListener(
  "wheel",
  mouseConstraint.mouse.mousewheel
);
mouseConstraint.mouse.element.removeEventListener(
  "DOMMouseScroll",
  mouseConstraint.mouse.mousewheel
);

// run the renderer
Render.run(render);

// create runner
var runner = Runner.create();

// run the engine
Runner.run(runner, engine);

function handleResize(matterContainer) {
  // set canvas size to new values
  render.canvas.width = matterContainer.clientWidth;
  render.canvas.height = matterContainer.clientHeight;

  // reposition ground
  Matter.Body.setPosition(
    ground,
    Matter.Vector.create(
      matterContainer.clientWidth / 2,
      matterContainer.clientHeight + THICCNESS / 2
    )
  );

  // reposition right wall
  Matter.Body.setPosition(
    rightWall,
    Matter.Vector.create(
      matterContainer.clientWidth + THICCNESS / 2,
      matterContainer.clientHeight / 2
    )
  );

// reposition top wall
    Matter.Body.setPosition(
        topWall,
        Matter.Vector.create(
        matterContainer.clientWidth / 2,
        0 - THICCNESS / 2
        )
    );
}

window.addEventListener("resize", () => handleResize(matterContainer));

// Custom cursor for .work-list using .view-more with lag effect
const assetWrappers = document.querySelectorAll('.work-list');
assetWrappers.forEach(wrapper => {
  const viewMore = wrapper.querySelector('.view-more');
  if (!viewMore) return;
  wrapper.style.cursor = 'fixed';
  viewMore.style.position = 'absolute';
  viewMore.style.pointerEvents = 'none';
  viewMore.style.zIndex = 10;
  viewMore.style.opacity = 0;

  let mouseX = 0, mouseY = 0;
  let lagX = 0, lagY = 0;
  let animating = false;

  function animateLagCursor() {
    lagX += (mouseX - lagX) * 0.08;
    lagY += (mouseY - lagY) * 0.08;
    viewMore.style.transform = `translate3d(${lagX}px, ${lagY}px, 0)`;
    if (animating) requestAnimationFrame(animateLagCursor);
  }

  let moveHandler;

  wrapper.addEventListener('mouseenter', (e) => {
    gsap.to(viewMore, { opacity: 1, scale: 1, duration: 0.3, ease: 'power2.out' });
    const rect = wrapper.getBoundingClientRect();
    // Start at mouse position
    mouseX = (e.clientX || rect.left) - rect.left - viewMore.offsetWidth / 2;
    mouseY = (e.clientY || rect.top) - rect.top - viewMore.offsetHeight / 2;
    lagX = mouseX;
    lagY = mouseY;
    animating = true;
    animateLagCursor();
    moveHandler = function(e) {
      const rect = wrapper.getBoundingClientRect();
      let x = e.clientX - rect.left;
      let y = e.clientY - rect.top;
      // Clamp to wrapper boundaries (center .view-more on cursor)
      const vw = viewMore.offsetWidth;
      const vh = viewMore.offsetHeight;
      x = Math.max(0, Math.min(x, rect.width));
      y = Math.max(0, Math.min(y, rect.height));
      mouseX = x - vw / 2;
      mouseY = y - vh / 2;
    };
    wrapper.addEventListener('mousemove', moveHandler);
  });

  wrapper.addEventListener('mouseleave', () => {
    gsap.to(viewMore, { opacity: 0, scale: 0.8, duration: 0.3, ease: 'power2.out' });
    if (moveHandler) wrapper.removeEventListener('mousemove', moveHandler);
    animating = false;
  });
});

// Custom cursor for .article-list using .read-more with lag effect
const articleWrappers = document.querySelectorAll('.article-list');
articleWrappers.forEach(wrapper => {
  const readMore = wrapper.querySelector('.read-more');
  if (!readMore) return;
  wrapper.style.cursor = 'fixed';
  readMore.style.position = 'absolute';
  readMore.style.pointerEvents = 'none';
  readMore.style.zIndex = 10;
  readMore.style.opacity = 0;

  let mouseX = 0, mouseY = 0;
  let lagX = 0, lagY = 0;
  let animating = false;

  function animateLagCursor() {
    lagX += (mouseX - lagX) * 0.08;
    lagY += (mouseY - lagY) * 0.08;
    readMore.style.transform = `translate3d(${lagX}px, ${lagY}px, 0)`;
    if (animating) requestAnimationFrame(animateLagCursor);
  }

  let moveHandler;

  wrapper.addEventListener('mouseenter', (e) => {
    gsap.to(readMore, { opacity: 1, scale: 1, duration: 0.3, ease: 'power2.out' });
    const rect = wrapper.getBoundingClientRect();
    mouseX = (e.clientX || rect.left) - rect.left - readMore.offsetWidth / 2;
    mouseY = (e.clientY || rect.top) - rect.top - readMore.offsetHeight / 2;
    lagX = mouseX;
    lagY = mouseY;
    animating = true;
    animateLagCursor();
    moveHandler = function(e) {
      const rect = wrapper.getBoundingClientRect();
      let x = e.clientX - rect.left;
      let y = e.clientY - rect.top;
      const rw = readMore.offsetWidth;
      const rh = readMore.offsetHeight;
      x = Math.max(0, Math.min(x, rect.width));
      y = Math.max(0, Math.min(y, rect.height));
      mouseX = x - rw / 2;
      mouseY = y - rh / 2;
    };
    wrapper.addEventListener('mousemove', moveHandler);
  });

  wrapper.addEventListener('mouseleave', () => {
    gsap.to(readMore, { opacity: 0, scale: 0.8, duration: 0.3, ease: 'power2.out' });
    if (moveHandler) wrapper.removeEventListener('mousemove', moveHandler);
    animating = false;
  });
});
  
gsap.registerPlugin(ScrollTrigger);
gsap.registerPlugin(SplitText); 
let statementTl = gsap.timeline({
    scrollTrigger: {
      trigger: '.section.statement-section-wrap',
      start: "top 50%", // Pin the container when its top hits the top of the viewport
      end: "+=600", // Extend the end point to allow for scrolling
      scrub: true, // Link timeline progress directly to scroll position
      //pin: true,   // Pin the container element to the viewport
      //pinSpacing: true, // Disable spacing to avoid extra space after pinning
    }
});

// Animate .text-h3.line-1 using SplitText in the statementTl timeline
let splitStatement = SplitText.create('.text-h3.line-1', { type: 'chars,words,lines' });
statementTl.from(splitStatement.lines, {
  rotationX: -100,
  transformOrigin: "50% 50% -160px",
  opacity: 0,
  duration: 0.8,
  ease: "power3",
  stagger: 0.25
});


let featureWork = SplitText.create('.feature-work', {
    type: 'lines', 
    linesClass: "line",
    autoSplit: true,
    mask: "lines",
});
gsap.from(featureWork.lines, {
  scrollTrigger: {
    trigger: '.section.feature-work-section-wrap',
    start: "top 50%",
  },
    duration: 0.6,
    yPercent: 100,
    opacity: 0,
    stagger: 0.1,
    ease: "expo.out",
});

const cards = document.querySelectorAll(".project-list");


cards.forEach(card => {
  const image = card.querySelector(".project-image");
  let mouseMoveHandler;

  card.addEventListener("mouseenter", () => {
    cards.forEach(other => {
      if (other !== card) {
        gsap.to(other, { opacity: 0.1, duration: 0.3, ease: "power2.out" });
      }
    });
    // Animate image: fade in and scale up
    gsap.to(image, {
      opacity: 1,
      scale: 1.05,
      duration: 0.4,
      ease: "power2.out"
    });

    // Mouse move handler to follow cursor within card
    mouseMoveHandler = function(e) {
      const rect = card.getBoundingClientRect();
      // Calculate mouse position relative to card center
      const relX = e.clientX - rect.left - rect.width / 2;
      const relY = e.clientY - rect.top - rect.height / 2;
      // Limit movement range (max 40px in any direction)
      const maxMove = 100;
      const moveX = Math.max(Math.min(relX, maxMove), -maxMove);
      const moveY = Math.max(Math.min(relY, maxMove), -maxMove);
      gsap.to(image, {
        x: moveX,
        y: moveY,
        duration: 0.3,
        ease: "power2.out"
      });
    };
    card.addEventListener("mousemove", mouseMoveHandler);
  });

  card.addEventListener("mouseleave", () => {
    cards.forEach(other => {
      gsap.to(other, { opacity: 1, duration: 0.3, ease: "power2.out" });
    });
    // Animate image: fade out and move back to original position
    gsap.to(image, {
      opacity: 0,
      y: 0,
      x: 0,
      scale: 1,
      duration: 0.4,
      ease: "power2.out"
    });
    // Remove mousemove handler
    if (mouseMoveHandler) card.removeEventListener("mousemove", mouseMoveHandler);
  });
});



let aboutTl = gsap.timeline({
  scrollTrigger: {
    trigger: '.section.about-section-wrap',
    scrub: true,
    start: "top 50%",
    end: "+=500",
    // markers: true, // Enable markers for debugging
    // pin: true,
  }
});


// Animate taglines in
// aboutTl.from('.tagline-1-div', {
//   xPercent: 50,
//   ease: 'power1.inOut',
//   duration: 2
// }, 0);
// aboutTl.from('.tagline-2-div', {
//   xPercent: -50,
//   ease: 'power1.inOut',
//   duration: 2
// }, 0);
// aboutTl.from('.tagline-3-div', {
//   xPercent: 50,
//   ease: 'power1.inOut',
//   duration: 2
// }, 0);

// // Animate taglines out (continue to each direction) near end of section
// aboutTl.to('.tagline-1-div', {
//   xPercent: 3,
//   ease: 'power1.inOut',
//   duration: 1
// });
// aboutTl.to('.tagline-2-div', {
//   xPercent: 5,
//   ease: 'power1.inOut',
//   duration: 1
// });
// aboutTl.to('.tagline-3-div', {
//   xPercent: -1,
//   ease: 'power1.inOut',
//   duration: 1
// });

// Place 'exit' label near the end of the timeline
//aboutTl.addLabel('exit', '>=90%');


// aboutTl.from('.mind', {
//     opacity: 0.3,
//     xPercent: -150,
//     ease: "power1.inOut"
// });
// aboutTl.to('.mind', {
//     opacity: 1,
//     xPercent: 0,
//     ease: "power1.inOut",
//     stagger: 1
// });
// aboutTl.from('.eye', {
//     opacity: 0,
//     yPercent: -80,
//     ease: "power1.inOut"
// });
// aboutTl.to('.eye', {
//     opacity: 1,
//     yPercent: 0,
//     ease: "power1.inOut",
//     stagger: 1
// });




// aboutTl.from('.about-me-1', {
//     opacity: 0,
//     scale: 0.8,
//     yPercent: -100,
//     ease: "power1.inOut"
// });
// aboutTl.to('.about-me-1', {
//     opacity: 1,
//     scale: 1,
//     yPercent: 0,
//     ease: "power1.inOut"
// });

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


