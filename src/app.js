import Carousel from './carousel';

var container = document.getElementById("carousel");

var carouselOptions = {
    id: "carousel",
    isPaging: true,
    slidesPerPage: 3,
    isCycled: true,
    isAutoplayble: true,
    slideMargin: 21,
    interval: 3000
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
        if(carousel.getCurrentPage() != 0){
            leftArrow.style.cursor = 'pointer';
        }

        if(carousel.getCurrentPage() == 0){
            leftArrow.style.cursor = 'not-allowed';
        }

        if(carousel.getCurrentPage() == carousel.getPageAmount() - 1){
            rightArrow.style.cursor = 'not-allowed';
        }

        if(carousel.getCurrentPage() != carousel.getPageAmount() - 1){
            rightArrow.style.cursor = 'pointer';
        }
    });
}