class Caurusel {
    constructor(p) {
        // let settings = this._initConfig(p);
        let settings = (() => ({...{containerID: '#caurusel', slide: '.slide', isPlaying: true, interval: 3000 },...p}))()
        // console.log(settings);
        // containerID = '#caurusel', slide = '.slide', interval = 3000
        this.container = document.querySelector(settings.containerID);
        this.slides = this.container.querySelectorAll(settings.slide);
        this.interval = settings.interval;
        this.isPlaying = settings.isPlaying;
    }
    // _initConfig(o) {
    //     let p = {containerID: '#caurusel', slide: '.slide', isPlaying: false, interval: 3000 };
    //     return {...p,...o};
    // }

    _initProps() {
        this.slideCount = this.slides.length;

        this.currentSlide = 0;

        this.SPACE = ' ';
        this.LEFT_ARROW = 'ArrowLeft';
        this.RIGHT_ARROW = 'ArrowRight';
        this.FA_PAUSE = `<i class="fa fa-pause"></i>`;
        this.FA_PLAY = `<i class="fa fa-play"></i>`;
        this.FA_PREV = `<i class="fa fa-arrow-left"></i>`;
        this.FA_NEXT = `<i class="fa fa-arrow-right"></i>`
    }
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

    }
    _initIndicators() {
        const indicators = document.createElement('ol');

        indicators.setAttribute('class', 'indicators');
        for (let i = 0, n = this.slideCount; i < n; i++) {
            const indicator = document.createElement('li');
            indicator.setAttribute('class', 'indicator');
            // indicator.setAttribute('data-slide-to', `${i}`);
            indicator.dataset.slideTo = `${i}`;
            i === 0 && indicator.classList.add('active');

            indicators.appendChild(indicator);
        }

        this.container.appendChild(indicators);

        this.indContainer = this.container.querySelector('.indicators');
        this.indItem = this.container.querySelectorAll('.indicator');

    }
    _initListeners() {
        this.pauseBtn.addEventListener('click', this.pausePlay.bind(this));
        this.prevBtn.addEventListener('click', this.prev.bind(this));
        this.nextBtn.addEventListener('click', this.next.bind(this));
        this.indContainer.addEventListener('click', this._indicate.bind(this));
        document.addEventListener('keydown', this._pressKey.bind(this));
    }
    gotoSlide(n) {
        this.slides[this.currentSlide].classList.toggle('active');
        this.indItem[this.currentSlide].classList.toggle('active');
        this.currentSlide = (n + this.slideCount) % this.slideCount;
        this.slides[this.currentSlide].classList.toggle('active');
        this.indItem[this.currentSlide].classList.toggle('active');
    }
    prevSlide() {
        this.gotoSlide(this.currentSlide - 1);
    }
    nextSlide() {
        this.gotoSlide(this.currentSlide + 1);
    }
    pause() {
        if (this.isPlaying) {
            this.isPlaying = !this.isPlaying;
            this.pauseBtn.innerHTML = this.FA_PLAY;
            clearInterval(this.timerID);
        }
    }
    play() {
        this.timerID = setInterval(() => this.nextSlide(), this.interval);
        this.isPlaying = !this.isPlaying;
        this.pauseBtn.innerHTML = this.FA_PAUSE;
    }
    pausePlay() {
        this.isPlaying ? this.pause() : this.play();
    }
    prev() {
        this.pause();
        this.prevSlide();
    }
    next() {
        this.pause();
        this.nextSlide();
    }
    _indicate(e) {
        let target = e.target;
        // const index = this.target.getAttribute(`data-slide-to`);
        if (target && target.classList.contains(`indicator`)) {
            // console.log(index);
            this.pause();
            this.gotoSlide(+target.dataset.slideTo);
        }
    }
    _pressKey(e) {
        // console.log(e.key);
        if (e.key === this.LEFT_ARROW) this.prev();
        if (e.key === this.RIGHT_ARROW) this.next();
        if (e.key === this.SPACE) this.pausePlay();
    }

    init() {
        this._initProps();
        this._initIndicators();
        this._initControls();
        this._initListeners();
        if (this.isPlaying)
            this.timerID = setInterval(() => this.nextSlide(), this.interval);
    }
}

class SwipeCaurusel extends Caurusel {
    _swipeStart(e) {
        this.swipeStartX = e.changedTouches[0].pageX;
    }
    _swipeEnd(e) {
        this.swipeEndX = e.changedTouches[0].pageX;

        if (this.swipeStartX - this.swipeEndX < 100) this.prev();
        if (this.swipeStartX - this.swipeEndX > -100) this.next();
    }
    _initListeners() {
        super._initListeners();
        this.container.addEventListener('touchstart', this._swipeStart.bind(this));
        this.container.addEventListener('touchend', this._swipeEnd.bind(this));
    }
}

