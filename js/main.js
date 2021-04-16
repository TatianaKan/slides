let slides = document.querySelectorAll('.slide');
const indicatorsContainer = document.querySelector('#indicators-container');
const indicators = document.querySelectorAll('.indicator')
// console.log(indeficatorsContainer);
const pauseBtn = document.querySelector('#pause-btn');
const prevBtn = document.querySelector('#prev-btn');
const nextBtn = document.querySelector('#next-btn');
let timerID;
let slideCount = slides.length;
let currentSlide = 0;
let isPlaying = true;

function gotoSlide(n) {

    slides[currentSlide].classList.toggle('active');
    indicators[currentSlide].classList.toggle('active');
    currentSlide = (n + slideCount) % slideCount;
    slides[currentSlide].classList.toggle('active');
    indicators[currentSlide].classList.toggle('active');
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
    nextSlide();
}

function indicate(e) {
    let target = e.target;

    const index = target.getAttribute(`data-slide-to`);
    if (target && target.classList.contains(`indicator`)) {

        // console.log(index);
        pause();
        gotoSlide(+index);
    }
}

function pressKey(e) {
    console.log(e.key)
    if (e.key === 'ArrowLeft') prev();
    if (e.key === 'ArrowRight') next();
    if (e.key === ' ') pausePlay();
}
timerID = setInterval(nextSlide, 2000);

pauseBtn.addEventListener('click', pausePlay);
prevBtn.addEventListener('click', prev);
nextBtn.addEventListener('click', next);

indicatorsContainer.addEventListener('click', indicate);
document.addEventListener('keydown', pressKey);




