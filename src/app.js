import Carousel from './carousel';

var container = document.getElementById("carousel");
var leftArrow = container.querySelector('.carousel-left-arrow');
var rightArrow = container.querySelector('.carousel-right-arrow');

var slidesPerPage = 2;

var carousel = new Carousel({ id: "carousel", isPaging: true, slidesPerPage: slidesPerPage, isCycled: true, isAutoplayble: false });

leftArrow.style.cursor = 'not-allowed';

leftArrow.addEventListener("click", function() {
    carousel.prev();
});

rightArrow.addEventListener("click", function() {
    carousel.next();
});

/*
carousel.addOnSlidesChangedListener(function() {
    if(carousel.getCurrent() !== 1){
        leftArrow.style.cursor = 'pointer';
    }

    if(carousel.getCurrent() == 0){
        leftArrow.style.cursor = 'not-allowed';
    }

    if(carousel.getCurrent() == carousel.getPageAmount() - 1){
        rightArrow.style.cursor = 'not-allowed';
    }

    if(carousel.getCurrent() != carousel.getPageAmount() - 1){
        rightArrow.style.cursor = 'pointer';
    }
});*/