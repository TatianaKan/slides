function Caurusel(containerID = '#caurusel', slide = '.slide', inretval = 3000) {
    this.container = document.querySelector(containerID);
    // let timerID;
    this.slides = this.container.querySelectorAll(slide);

    // console.log(indeficatorsContainer);

    this.interval = inretval;
}

Caurusel.prototype = {
    _initProps() {
        this.slideCount = this.slides.length;

        this.currentSlide = 0;
        this.isPlaying = true;

        this.SPACE = ' ';
        this.LEFT_ARROW = 'ArrowLeft';
        this.RIGHT_ARROW = 'ArrowRight';
        this.FA_PAUSE = `<i class="fa fa-pause"></i>`;
        this.FA_PLAY = `<i class="fa fa-play"></i>`;
        this.FA_PREV = `<i class="fa fa-arrow-left"></i>`;
        this.FA_NEXT = `<i class="fa fa-arrow-right"></i>`
    },
    _initControls() {
        const controls = document.createElement('div');
        const pause = `<span id="pause-btn" class="control control-pause">${this.FA_PAUSE}</span>`;
        const prev = `<span id="prev-btn" class="control control-prev">${this.FA_PREV}</span>`;
        const next = `<span id="next-btn" class="control control-next">${this.FA_NEXT}</span>`

        controls.setAttribute('class', 'controls');
        controls.innerHTML = pause + prev + next;
        this.container.appendChild(controls);

        this.pauseBtn = this.container.querySelector('#pause-btn');
        this.prevBtn = this.container.querySelector('#prev-btn');
        this.nextBtn = this.container.querySelector('#next-btn');

    },
    _initIndicators() {
        const indicators = document.createElement('ol');

        indicators.setAttribute('class', 'indicators');
        for (let i = 0, n = this.slideCount; i < n; i++) {
            const indicator = document.createElement('li');
            indicator.setAttribute('class', 'indicator');
            // indicator.setAttribute('data-slide-to', `${i}`);
            indicator.dataset.slideTo= `${i}`;
            i=== 0 && indicator.classList.add ('active');

            indicators.appendChild(indicator);
        }

        this.container.appendChild(indicators);

        this.indContainer = this.container.querySelector('.indicators');
        this.indItem = this.container.querySelectorAll('.indicator');
        
    },
    _initListeners() {
        this.pauseBtn.addEventListener('click', this.pausePlay.bind(this));
        this.prevBtn.addEventListener('click', this.prev.bind(this));
        this.nextBtn.addEventListener('click', this.next.bind(this));
        this.indContainer.addEventListener('click', this.indicate.bind(this));
        document.addEventListener('keydown', this.pressKey.bind(this));
    },
    gotoSlide(n) {
        this.slides[this.currentSlide].classList.toggle('active');
        this.indItem[this.currentSlide].classList.toggle('active');
        this.currentSlide = (n + this.slideCount) % this.slideCount;
        this.slides[this.currentSlide].classList.toggle('active');
        this.indItem[this.currentSlide].classList.toggle('active');
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
        // const index = this.target.getAttribute(`data-slide-to`);
        if (target && target.classList.contains(`indicator`)) {
            // console.log(index);
            this.pause();
            this.gotoSlide(+target.dataset.slideTo);
        }
    },
    pressKey(e) {
        // console.log(e.key);
        if (e.key === this.LEFT_ARROW) this.prev();
        if (e.key === this.RIGHT_ARROW) this.next();
        if (e.key === this.SPACE) this.pausePlay();
    },

    init() {
        this._initProps();
        this._initIndicators();
        this._initControls();
        this._initListeners();
        this.timerID = setInterval(() => this.nextSlide(), this.interval);
    }
};

function SwipeCaurusel() {
    Caurusel.apply(this, arguments);
}

SwipeCaurusel.prototype = Object.create(Caurusel.prototype);
SwipeCaurusel.prototype.constructor = SwipeCaurusel;

SwipeCaurusel.prototype._swipeStart = function (e) {
    this.swipeStartX = e.changedTouches[0].pageX;

};
SwipeCaurusel.prototype._swipeEnd = function (e) {
    this.swipeEndX = e.changedTouches[0].pageX;

    if (this.swipeStartX - this.swipeEndX < 100) this.prev();
    if (this.swipeStartX - this.swipeEndX > -100) this.next();
};

SwipeCaurusel.prototype._initListeners = function () {
    Caurusel.prototype._initListeners.apply(this);
    this.container.addEventListener('touchstart', this._swipeStart.bind(this));
    this.container.addEventListener('touchend', this._swipeEnd.bind(this));
}
