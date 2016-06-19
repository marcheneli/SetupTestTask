import Carousel from './carousel';

var container = document.getElementById("carousel");

var carouselOptions = {
    id: "carousel",
    isPaging: true,
    slidesPerPage: 2,
    isCycled: true,
    isAutoplayble: false
};

var carousel = new Carousel(carouselOptions);

var leftArrow = container.querySelector('.carousel-left-arrow');
var rightArrow = container.querySelector('.carousel-right-arrow');

leftArrow.addEventListener("click", function() {
    carousel.prev();
});

rightArrow.addEventListener("click", function() {
    carousel.next();
});

var toggleMenu = document.getElementById("toggle-menu");
var navBar = document.getElementById("nav-bar");
var content = document.getElementById("content");

toggleMenu.addEventListener("click", function(e){
    
    e.preventDefault();
    e.stopPropagation();
    navBar.classList.toggle("nav-bar-show");
    content.classList.toggle("content-container-big-padding");
    toggleMenu.classList.toggle("on");
});


if(!carouselOptions.isCycled){
    leftArrow.style.cursor = 'not-allowed';

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
    });
}

var navBarContainer = document.getElementById("nav-bar-container");

window.addEventListener('orientationchange', function () {
    document.body.style.display='none';
    document.body.offsetHeight; //cause a reflow
    navBarContainer.style.width = document.body.width;
    document.body.style.display='block'; //cause a repaint
});