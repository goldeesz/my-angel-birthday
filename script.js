const slides = [...document.querySelectorAll(".slide")];
const counter = document.getElementById("counter");
const dots = document.getElementById("sliderDots");
let index = 0;

// Opening card
const intro = document.getElementById("introScreen");
const openGift = document.getElementById("openGift");
openGift.addEventListener("click", () => {
  intro.classList.add("hidden");
  document.body.classList.remove("locked");
  setTimeout(() => document.getElementById("top").scrollIntoView({behavior:"smooth"}), 120);
});
document.body.classList.add("locked");

// Gallery dots
slides.forEach((_, i) => {
  const dot = document.createElement("button");
  dot.className = "dot" + (i === 0 ? " active" : "");
  dot.setAttribute("aria-label", `Фотография ${i + 1}`);
  dot.addEventListener("click", () => showSlide(i));
  dots.appendChild(dot);
});

function showSlide(nextIndex) {
  index = (nextIndex + slides.length) % slides.length;
  slides.forEach((slide, i) => slide.classList.toggle("active", i === index));
  [...dots.children].forEach((dot, i) => dot.classList.toggle("active", i === index));
  counter.textContent = `${String(index + 1).padStart(2, "0")} / ${String(slides.length).padStart(2, "0")}`;
}
document.getElementById("next").addEventListener("click", () => showSlide(index + 1));
document.getElementById("prev").addEventListener("click", () => showSlide(index - 1));

let startX = 0, startY = 0;
const slider = document.getElementById("slider");
slider.addEventListener("touchstart", e => {
  startX = e.changedTouches[0].clientX;
  startY = e.changedTouches[0].clientY;
}, {passive:true});
slider.addEventListener("touchend", e => {
  const dx = e.changedTouches[0].clientX - startX;
  const dy = e.changedTouches[0].clientY - startY;
  if (Math.abs(dx) > 45 && Math.abs(dx) > Math.abs(dy)) showSlide(index + (dx < 0 ? 1 : -1));
}, {passive:true});
document.addEventListener("keydown", e => {
  if (e.key === "ArrowRight") showSlide(index + 1);
  if (e.key === "ArrowLeft") showSlide(index - 1);
});

// Music
const audio = document.getElementById("audio");
const playButton = document.getElementById("playButton");
const toggle = document.getElementById("musicToggle");
const label = document.getElementById("musicLabel");
const vinyl = document.getElementById("vinyl");
const equalizer = document.getElementById("equalizer");
async function toggleMusic() {
  try {
    if (audio.paused) await audio.play();
    else audio.pause();
  } catch {
    label.textContent = "добавь favorite.mp3";
    setTimeout(() => label.textContent = "включить музыку", 2500);
  }
}
playButton.addEventListener("click", toggleMusic);
toggle.addEventListener("click", toggleMusic);
audio.addEventListener("play", () => {
  playButton.textContent = "Ⅱ";
  label.textContent = "музыка играет";
  vinyl.classList.add("playing");
  equalizer.classList.add("playing");
});
audio.addEventListener("pause", () => {
  playButton.textContent = "▶";
  label.textContent = "включить музыку";
  vinyl.classList.remove("playing");
  equalizer.classList.remove("playing");
});

// Gentle ambient movement
const stars = document.querySelector(".stars");
let t = 0;
function drift() {
  t += 0.00035;
  stars.style.transform = `translate(${Math.sin(t * 2) * 3}px, ${Math.cos(t) * 3}px)`;
  requestAnimationFrame(drift);
}
drift();
