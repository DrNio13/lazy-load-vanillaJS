// 1. Fix when scroll from bottom to top

var LazyVanillaJS = (function(window,document) {

    var lazyAttribute = 'data-lazyImg-vanilla';
    var threshold = 0;
    var delay = 66;

    var serviceApi = {
        config: config,
        start: getImages
    };

    return serviceApi;

    function config (obj) {
        if (!obj) {
            throw new Error("Dude..Please pass the configuration object");
        }
        if (obj.threshold !== undefined ){
            threshold = obj.threshold;
        }
        if (obj.delay !== undefined ){
            delay = obj.delay;
        }
        // Load images on window events
        if (obj.resizeMode === true) {
            onResize(obj.resizeMode);
        }
        if (obj.scrollMode === true) {
            onScroll(obj.scrollMode);
        }

        // Load images immediately
        getImages();
    }

    function onResize(mode){
        if (mode === true) {
            window.addEventListener('resize', windowRzd, false);
        }
    }

    function onScroll(mode){
        if (mode === true) {
            window.addEventListener('scroll', windowRzd, false);
        }
    }

    function getImages(){
        var images = document.getElementsByTagName('img');
        var imagesLength = images.length;
        var lazyImages = [];
        var isLazy = false;

        for (var i=0; i < imagesLength; i++) {
            if (images[i].hasAttribute(lazyAttribute) && isInViewport(images[i])) {
                isLazy = true;
                lazyImages.push(images[i]);
            }
        }

        if (isLazy !== true && imagesLength === 0 ) {
            console.log("No lazy images found in the DOM.");
        }
        else {
            addRealSrc(lazyImages);
        }
    }

    function isInViewport(img){
        var box = img.getBoundingClientRect();
        // console.log(window.innerHeight, window.scrollY, box.bottom);
        return (
            box.top > 0 &&
            box.bottom > 0 &&
            (box.top - threshold) <= window.innerHeight
        );
    }

    function addRealSrc(lzImgs) {
        var src;
        lzImgs.forEach(function(img) {
            src = img.getAttribute(lazyAttribute);
            img.setAttribute('src', src);
        });

        clearLoadedImages(lzImgs);
    }

    function windowRzd() {
        window.setTimeout(function(){
            LazyVanillaJS.start();
        }, delay);
    }

    function clearLoadedImages(lzImgs) {
        lzImgs.forEach(function(img){
            img.removeAttribute(lazyAttribute);
        });
        lzImgs.splice(0, lzImgs.length);

        checksIfEmpty(lzImgs);
    }

    function checksIfEmpty(arr){
        if (arr.length !== 0 ) {
            throw new Error("The array is not empty");
        }
    }

})(window,document);