function Caurusel() {
    this.container = document.querySelector('#caurusel');
    // let timerID;
    this.slides = this.container.querySelectorAll('.slide');
    this.indicatorsContainer = this.container.querySelector('#indicators-container');
    this.indicators = this.indicatorsContainer.querySelectorAll('.indicator')
    // console.log(indeficatorsContainer);
    this.pauseBtn = this.container.querySelector('#pause-btn');
    this.prevBtn = this.container.querySelector('#prev-btn');
    this.nextBtn = this.container.querySelector('#next-btn');
    this.slideCount = this.slides.length;

    this.interval = 1000;
    this.currentSlide = 0;
    this.isPlaying = true;

    this.SPACE = ' ';
    this.LEFT_ARROW = 'ArrowLeft';
    this.RIGHT_ARROW = 'ArrowRight';
    this.FA_PAUSE = `<i class="fa fa-pause"></i>`;
    this.FA_PLAY = `<i class="fa fa-play"></i>`;

}

Caurusel.prototype = {
    gotoSlide(n) {
        this.slides[this.currentSlide].classList.toggle('active');
        this.indicators[this.currentSlide].classList.toggle('active');
        this.currentSlide = (n + this.slideCount) % this.slideCount;
        this.slides[this.currentSlide].classList.toggle('active');
        this.indicators[this.currentSlide].classList.toggle('active');
    },
    prevSlide() {
        this.gotoSlide(this.currentSlide - 1);
    },
    nextSlide() {
        this.gotoSlide(this.currentSlide + 1);
    },
    pause() {
        if (this.isPlaying) {
            this.isPlaying = !this.isPlaying;
            this.pauseBtn.innerHTML = this.FA_PLAY;
            clearInterval(this.timerID);
        }
    },
    play() {
        this.timerID = setInterval(() => this.nextSlide(), this.interval);
        this.isPlaying = !this.isPlaying;
        this.pauseBtn.innerHTML = this.FA_PAUSE;
    },
    pausePlay() {
        this.isPlaying ? this.pause() : this.play();
    },
    prev() {
        this.pause();
        this.prevSlide();
    },
    next() {
        this.pause();
        this.nextSlide();
    },
    indicate(e) {
        let target = this.e.target;
        const index = this.target.getAttribute(`data-slide-to`);
        if (target && target.classList.contains(`indicator`)) {
            // console.log(index);
            this.pause();
            this.gotoSlide(+index);
        }
    },
    pressKey(e) {
        // console.log(e.key);
        if (e.key === this.LEFT_ARROW) this.prev();
        if (e.key === this.RIGHT_ARROW) this.next();
        if (e.key === this.SPACE) this.pausePlay();
    },
    initListeners() {
        this.pauseBtn.addEventListener('click', this.pausePlay.bind(this));
        this.prevBtn.addEventListener('click', this.prev.bind(this));
        this.nextBtn.addEventListener('click', this.next.bind(this));
        this.indicatorsContainer.addEventListener('click', this.indicate.bind(this));
        document.addEventListener('keydown', this.pressKey.bind(this));
    },
    init() {
        this.initListeners()
        this.timerID = setInterval(() => this.nextSlide(), this.interval);
    }
};

function SwipeCaurusel() {
    Caurusel.apply(this, arguments);
}

SwipeCaurusel.prototype = Object.create(Caurusel.prototype);
SwipeCaurusel.prototype.constructor = SwipeCaurusel;

SwipeCaurusel.prototype.swipeStart = function (e) {
    this.swipeStartX = e.changedTouches[0].pageX;

};
SwipeCaurusel.prototype.swipeEnd = function (e) {
    this.swipeEndX = e.changedTouches[0].pageX;

    if (this.swipeStartX - this.swipeEndX < 100) this.prev();
    if (this.swipeStartX - this.swipeEndX > 100) this.next();
};

SwipeCaurusel.prototype.initListeners = function () {
    Caurusel.prototype.initListeners.apply(this);
    this.container.addEventListener('touchstart', this.swipeStart.bind(this));
    this.container.addEventListener('touchend', this.swipeEnd.bind(this));
}
