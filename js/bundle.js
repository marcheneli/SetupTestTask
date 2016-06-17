/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(1);


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _carousel = __webpack_require__(2);

	var _carousel2 = _interopRequireDefault(_carousel);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var container = document.getElementById("carousel");
	var leftArrow = container.querySelector('.carousel-left-arrow');
	var rightArrow = container.querySelector('.carousel-right-arrow');

	var slidesPerPage = 2;

	var carousel = new _carousel2.default({ id: "carousel", isPaging: true, slidesPerPage: slidesPerPage, isCycled: true, isAutoplayble: false });

	leftArrow.style.cursor = 'not-allowed';

	leftArrow.addEventListener("click", function () {
	    carousel.prev();
	});

	rightArrow.addEventListener("click", function () {
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

/***/ },
/* 2 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	function Carousel(options) {
	    var isPaging = options.isPaging || false;
	    var slidesPerPage = options.slidesPerPage || 3;
	    var isAutoplayble = options.isAutoplayble || false;
	    var isCycled = options.isCycled || false;
	    var interval = options.interval || 10000;

	    var slidesChengedHandlers = [];

	    var container = document.getElementById(options.id);
	    var carousel = container.querySelector('.carousel-items');
	    var items = carousel.querySelectorAll('.carousel-item');
	    var pagination = null;

	    var itemAmount = items.length;
	    var pageAmount = Math.ceil(itemAmount / slidesPerPage);
	    var inTransition = false;

	    var currentPage = 0;

	    init();

	    function init() {
	        if (isCycled) {
	            addEmptySlides();
	            copySlidesForCycling();
	            carousel.style.left = pageToPosition(currentPage) + 'px';

	            carousel.addEventListener('transitionend', function () {
	                inTransition = false;

	                if (currentPage === -1) {
	                    unsetTransition();
	                    carousel.style.left = pageToPosition(pageAmount - 1) + 'px';
	                    setTransition();
	                    currentPage = pageAmount - 1;
	                    updatePagination();
	                }

	                if (currentPage === pageAmount) {
	                    unsetTransition();
	                    carousel.style.left = pageToPosition(0) + 'px';
	                    setTransition();
	                    currentPage = 0;
	                    updatePagination();
	                }
	            });
	        }

	        setWidthOfSlides();

	        if (isPaging) pagination = addPagination();

	        if (isAutoplayble) autoplay();

	        window.addEventListener("resize", function () {
	            setWidthOfSlides();
	        });
	    }

	    function pageToPosition(pageNumber) {
	        return -(pageNumber * (carousel.offsetWidth + 42) + (isCycled ? carousel.offsetWidth + 63 : 21));
	    }

	    function next() {
	        if (isCycled || currentPage != pageAmount - 1) {
	            carousel.style.left = new Number(carousel.style.left.replace('px', '')) - (carousel.offsetWidth + 42) + 'px';
	            inTransition = true;
	            currentPage++;
	            updatePagination();
	            onSlidesChanged();
	        }
	    }

	    function prev() {
	        if (isCycled || currentPage != 0) {
	            carousel.style.left = new Number(carousel.style.left.replace('px', '')) + (carousel.offsetWidth + 42) + 'px';
	            inTransition = true;
	            currentPage--;
	            updatePagination();
	            onSlidesChanged();
	        }
	    }

	    function addPagination() {
	        var pagination = document.createElement("ol");
	        pagination.className = "carousel-page-list";

	        var pageIndicator = document.createElement("li");

	        for (var i = 0; i < pageAmount; i++) {
	            var indicator = pageIndicator.cloneNode(true);

	            indicator.setAttribute('data-page', i);

	            setPageIndicatorMode(indicator);

	            indicator.addEventListener('click', function (e) {
	                var page = e.target.getAttribute('data-page');
	                carousel.style.left = pageToPosition(page) + 'px';
	                currentPage = page;
	                inTransition = true;
	                updatePagination();
	                onSlidesChanged();
	            });

	            pagination.appendChild(indicator);
	        }

	        container.appendChild(pagination);

	        return pagination;
	    }

	    function updatePagination() {
	        var indicators = pagination.childNodes;

	        for (var i = 0; i < indicators.length; i++) {
	            var indicator = indicators[i];
	            setPageIndicatorMode(indicator);
	        }
	    }

	    function setPageIndicatorMode(indicator) {
	        if (indicator.getAttribute('data-page') == currentPage) {
	            indicator.classList.add("carousel-page-indicator-active");
	        } else {
	            indicator.classList.remove("carousel-page-indicator-active");
	        }
	    }

	    function autoplay() {
	        setInterval(function () {
	            next();
	        }, interval);
	    }

	    function copySlidesForCycling() {
	        items = carousel.querySelectorAll('.carousel-item');
	        itemAmount = items.length;

	        for (var i = slidesPerPage; i > 0; i--) {
	            carousel.insertBefore(items[itemAmount - i].cloneNode(true), items[0]);
	        }

	        for (var i = 0; i < slidesPerPage; i++) {
	            carousel.appendChild(items[i].cloneNode(true));
	        }
	    }

	    function addEmptySlides() {
	        var emptyslidesPerPage = slidesPerPage - itemAmount % slidesPerPage;

	        for (var i = 0; i < emptyslidesPerPage; i++) {
	            var emptySlide = document.createElement("a");
	            emptySlide.className = "carousel-item";

	            carousel.appendChild(emptySlide);
	        }
	    }

	    function setWidthOfSlides() {
	        if (!inTransition) {
	            unsetTransition();
	        }

	        var slides = carousel.querySelectorAll('.carousel-item');
	        var slideWidth = (container.offsetWidth - (slidesPerPage - 1) * 42) / slidesPerPage;

	        for (var i = 0; i < slides.length; i++) {
	            slides.item(i).style.width = slideWidth + 'px';
	        }

	        carousel.style.left = pageToPosition(currentPage) + 'px';

	        if (!inTransition) {
	            setTransition();
	        }
	    }

	    function setTransition() {
	        carousel.offsetWidth;
	        carousel.classList.add("carousel-animated");
	    }

	    function unsetTransition() {
	        carousel.classList.remove("carousel-animated");
	    }

	    function getcurrentPage() {
	        return currentPage;
	    }

	    function getPageAmount() {
	        return pageAmount;
	    }

	    function onSlidesChanged() {
	        slidesChengedHandlers.forEach(function (handler) {
	            if (handler) {
	                handler();
	            }
	        });
	    }

	    function addOnSlidesChangedListener(handler) {
	        slidesChengedHandlers.push(handler);
	    }

	    this.next = next;
	    this.prev = prev;
	    this.getcurrentPage = getcurrentPage;
	    this.getPageAmount = getPageAmount;
	    this.addOnSlidesChangedListener = addOnSlidesChangedListener;
	}

	exports.default = Carousel;

/***/ }
/******/ ]);