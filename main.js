import * as THREE from 'three';
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import gsap from "gsap";
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

// scene
const scene = new THREE.Scene();

// create our sphere
const geometry = new THREE.SphereGeometry(3, 64, 64);
const material = new THREE.MeshStandardMaterial({
  color: "magenta",
  roughness: 0.2,
  transparent: true, 
  
});
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);
mesh.position.set(0, 2, 0);

// sizes
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

// light
const light = new THREE.PointLight(0xcccccc, 1, 30);
light.position.set(0, 10, 10);
light.intensity = 5;
scene.add(light);


// camera
const camera = new THREE.PerspectiveCamera(45, sizes.width / sizes.height, 0.1, 100);
camera.position.z = 20;
scene.add(camera);

// renderer
const canvas = document.querySelector(".webgl");
canvas.width = sizes.width;
canvas.height = sizes.height;
const renderer = new THREE.WebGLRenderer({ canvas, alpha: true });

// controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;
controls.enablePan = false;
controls.enableZoom = false;
controls.autoRotate = true;
controls.autoRotateSpeed = 7;

// resize
window.addEventListener('resize', () => {
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();
  renderer.setSize(sizes.width, sizes.height);
});

const loop = () => {
  controls.update();
  renderer.render(scene, camera);
  window.requestAnimationFrame(loop);
};
loop();

// mouse animation color
let mouseDown = false;
let rgb = [];
window.addEventListener("mousedown", () => (mouseDown = true));
window.addEventListener("mouseup", () => (mouseDown = false));

window.addEventListener("mousemove", (e) => {
  if (mouseDown) {
    rgb = [
      Math.round((e.pageX / sizes.width) * 255),
      Math.round((e.pageY / sizes.height) * 255),
      150,
    ];
    let newColor = new THREE.Color(`rgb(${rgb.join(",")})`);
    gsap.to(mesh.material.color, {
      r: newColor.r,
      g: newColor.g,
      b: newColor.b,
    });
  }
});

window.addEventListener("touchmove", (e) => {
  if (true) {
    rgb = [
      Math.round((e.touches[0].pageX / sizes.width) * 255),
      Math.round((e.touches[0].pageY / sizes.height) * 255),
      150,
    ];
    let newColor = new THREE.Color(`rgb(${rgb.join(",")})`);
    gsap.to(mesh.material.color, {
      r: newColor.r,
      g: newColor.g,
      b: newColor.b,
    });
  }
});





const menuToggle = document.querySelector('.menu-toggle');
const menuWrapper = document.querySelector('.menu-wrapper');
const closeBtn = document.querySelector('.close-btn');
const listItems = document.querySelectorAll('.menu li');

let fadeInInterval;
let fadeOutInterval;

function fadeInMenu() {
  menuToggle.classList.toggle('active');
  menuWrapper.classList.toggle('show-menu');

  if (menuWrapper.classList.contains('show-menu')) {
    let delay = 0;
    listItems.forEach((item, index) => {
      setTimeout(() => {
        item.style.opacity = 1;
      }, delay);
      delay += 200;
    });
    clearInterval(fadeOutInterval); 
  }
}

function fadeOutMenu() {
  let opacityValue = 1;
  const totalSteps = 10;
  const stepDuration = 50;
  const stepOpacityChange = 1 / totalSteps;

  fadeOutInterval = setInterval(() => {
    opacityValue -= stepOpacityChange;
    listItems.forEach((item) => {
      item.style.opacity = Math.max(0, opacityValue);
    });
    closeBtn.style.opacity = Math.max(0, opacityValue);
    if (opacityValue <= 0) {
      clearInterval(fadeOutInterval);
      menuWrapper.classList.toggle('show-menu'); 
    }
  }, stepDuration);
}

menuToggle.addEventListener('click', fadeInMenu);
closeBtn.addEventListener('click', fadeOutMenu);

const words = ["fun", "beautiful", "exciting", "magical", "whimsical", "new", "daring", "creative"];
const dynamicTextElement = document.querySelector(".dynamic-text");
let wordIndex = 0;
let stopTyping = false;

function typeWord(word) {
  const typingSpeed = 100;
  const deletionSpeed = 10;
  let currentCharIndex = 0;
  let isDeleting = false;

  dynamicTextElement.className = `dynamic-text ${word}`;

  function typeCharacter() {
    if (!stopTyping) {
      if (currentCharIndex < word.length && !isDeleting) {
        dynamicTextElement.textContent = word.substring(0, currentCharIndex + 1);
        currentCharIndex++;
        setTimeout(typeCharacter, typingSpeed);
      } else {
        isDeleting = true;
        currentCharIndex = word.length;
        setTimeout(deleteCharacter, 1500);
      }
    }
  }

  function deleteCharacter() {
    if (!stopTyping) {
      if (currentCharIndex >= 0 && isDeleting) {
        dynamicTextElement.textContent = word.substring(0, currentCharIndex);
        currentCharIndex--;
        setTimeout(deleteCharacter, deletionSpeed);
      } else {
        isDeleting = false;
        stopTyping = true;
        setTimeout(typeNextWord, typingSpeed * 3);
      }
    }
  }

  typeCharacter();
}

function typeNextWord() {
  if (stopTyping) {
    wordIndex = (wordIndex + 1) % words.length;
    stopTyping = false;
    typeWord(words[wordIndex]);
  }
}

typeWord(words[words.length - 1]);


const toTop = document.querySelector(".to-top");

window.addEventListener("scroll", () => {
  if (window.pageYOffset > 100) {
    toTop.classList.add("active");
  } else {
    toTop.classList.remove("active");
  }
})

const messageTextarea = document.getElementById("message");

messageTextarea.addEventListener("focus", function () {
  if (this.classList.contains("empty")) {
    this.value = "";
    this.classList.remove("empty");
  }
});

messageTextarea.addEventListener("blur", function () {
  if (!this.value.trim()) {
    this.value = "write your message here . . .";
    this.classList.add("empty");
  }
});

messageTextarea.addEventListener("input", function () {
  if (this.classList.contains("empty")) {
    this.classList.remove("empty");
  }
});

window.addEventListener('load', function () {
  const mainCarousel = document.querySelector('.main-carousel');
  if (mainCarousel) {
    new Flickity(mainCarousel, {
      wrapAround: true,
      freeScroll: false,
      prevNextButtons: false,
      lazyLoad: 3
    });
  }
});


















