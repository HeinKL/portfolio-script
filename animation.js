<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/ScrollTrigger.min.js"></script>
<script>
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

const texture = [
    "https://cdn.prod.website-files.com/63947b43ea7b3a1c7101252e/685d2c91dadf6d4eb565ab73_VISUAL%20DESIGN.svg",
    "https://cdn.prod.website-files.com/63947b43ea7b3a1c7101252e/685d2c91fbfc48d4594f2bd0_WEB%20DESIGN.svg",
    "https://cdn.prod.website-files.com/63947b43ea7b3a1c7101252e/685d2c912b788a10502304d1_LOW%20CODE%20DEVELOPMENT.svg", 
    "https://cdn.prod.website-files.com/63947b43ea7b3a1c7101252e/685d2c91fd5641db478be058_USER%20EXPERIENCE.svg",
    "https://cdn.prod.website-files.com/63947b43ea7b3a1c7101252e/685d2c91cc333ffd16b1f3f5_INTERACTION.svg",
    "https://cdn.prod.website-files.com/63947b43ea7b3a1c7101252e/685d2c9124fa70f5ffce7293_PROTOTYPING.svg",
    "https://cdn.prod.website-files.com/63947b43ea7b3a1c7101252e/685d2c915362147bb899b658_USER%20INTERFACE.svg",
    "https://cdn.prod.website-files.com/63947b43ea7b3a1c7101252e/685d2c91e3d184c0bde76946_RESEARCH.svg",
    "https://cdn.prod.website-files.com/63947b43ea7b3a1c7101252e/685d2c914cea4f95fc4a4dff_BRAND%20DESIGN.svg"
];


for (let i = 0; i < 50; i++) {
  // Create a rectangle with a random SVG texture
  let texIdx = Math.floor(Math.random() * texture.length);
  let tag = Bodies.rectangle(
    Math.random() * matterContainer.clientWidth,
    Math.random() * matterContainer.clientHeight,
    164, // width (adjust to your SVG)
    56,  // height (adjust to your SVG)
    {
      friction: 0.3,
      frictionAir: 0.00001,
      restitution: 0.8,
      render: {
        sprite: {
          texture: texture[texIdx],
          xScale: 0.3, // adjust as needed
          yScale: 0.3  // adjust as needed
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
  "mousewheel",
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
</script>

<script>    
gsap.registerPlugin(ScrollTrigger);
gsap.registerPlugin(SplitText); 
let statementTl = gsap.timeline({
    scrollTrigger: {
      trigger: '.section.statement-section-wrap',
      start: "top top", // Pin the container when its top hits the top of the viewport
      end: "+=100%", // Extend the end point to allow for scrolling
      scrub: true, // Link timeline progress directly to scroll position
      pin: true,   // Pin the container element to the viewport
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
    // pin: true,
  }
});
aboutTl.from('.mind', {
    opacity: 0.3,
    xPercent: -150,
    ease: "power1.inOut"
});
aboutTl.to('.mind', {
    opacity: 1,
    xPercent: 0,
    ease: "power1.inOut",
    stagger: 1
});
aboutTl.from('.eye', {
    opacity: 0,
    yPercent: -80,
    ease: "power1.inOut"
});
aboutTl.to('.eye', {
    opacity: 1,
    yPercent: 0,
    ease: "power1.inOut",
    stagger: 1
});

let showCaseTl = gsap.timeline({
    scrollTrigger: {
    trigger: '.section.showcase-reel-section-wrap',
    scrub: true,
    start: "top 50%",
    end: "+=500",
  }
});

showCaseTl.to('.showcase-reel-wrapper',{
    duration: 1,
    clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)", // target shape
    ease: "power1.inOut",
});

showCaseTl.fromTo(".showcase-reel",                // Target
  { yPercent: -10,},          // From (initial state)
  { 
      yPercent: 10,
      ease: "power1.inOut",
      duration: 1,
},'<');


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
console.log(footer)

// to make it responsive, re-calculate the margin-top on the footer when the ScrollTriggers revert
ScrollTrigger.addEventListener("revert", adjustFooterOverlap);

// magic
ScrollTrigger.create({
  trigger: footer,
  start: () => "top " + (window.innerHeight - getOverlap()),
  end: () => "+=" + getOverlap(),
  pin: true,
});


</script>
