let slides = document.querySelectorAll('.slide');
const pauseBtn = document.querySelector('#pause-btn');
const prevBtn = document.querySelector('#prev-btn');
const nextBtn = document.querySelector('#next-btn');
let timerID;
let slideCount = slides.length;
let currentSlide = 0;
let isPlaying = true;


function gotoSlide(n) {

    slides[currentSlide].classList.toggle('active');

    currentSlide = (n + slideCount) % slideCount;
    slides[currentSlide].classList.toggle('active');
}

const prevSlide = () => gotoSlide(currentSlide - 1)

const nextSlide = () => gotoSlide(currentSlide + 1)


function pause() {
    if (isPlaying) {
        clearInterval(timerID);
        isPlaying = !isPlaying;
        pauseBtn.innerHTML = 'Play';
    }
}
function play() {
    timerID = setInterval(nextSlide, 1000);
    isPlaying = !isPlaying;
    pauseBtn.innerHTML = 'Pause';
}
const pausePlay = () => isPlaying ? pause() : play();
   
function prev() {
    pause();
    prevSlide();
}
function next() {
    play();
    nextSlide;
}
timerID = setInterval(nextSlide, 2000);

pauseBtn.addEventListener('click', pausePlay);

prevBtn.addEventListener ('click', prev);
nextBtn.addEventListener ('click', next);




