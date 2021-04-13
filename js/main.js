let slides = document.querySelectorAll('.slide');
const pauseBtn = document.querySelector('#pause');
const prevBtn = document.querySelector('#prev');
const nextBtn = document.querySelector('#next');
let timerID;

let currentSlide = 0;
let isPlaying = true;


function gotoSlide(n) {

    slides[currentSlide].classList.toggle('active');
    if (n === 5) {
        currentSlide = 0;
    } else if (n < 0) {
        currentSlide = 4;
    }
    else {
        currentSlide = n;
    }
    slides[currentSlide].classList.toggle('active');
}

function prevSlide() {
    gotoSlide(currentSlide - 1)
}

function nextSlide() {
    gotoSlide(currentSlide + 1)
}

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
function pausePlay() {
    if (isPlaying) {
        pause();
    } else {
        play();
    }
}



timerID = setInterval(nextSlide, 2000);

pauseBtn.onclick = pausePlay;
prevBtn.onclick = function() {
    pause();
    prevSlide;
};
nextBtn.onclick = function() {
    play();
    nextSlide;
}




