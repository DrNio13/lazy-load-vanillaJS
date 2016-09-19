var LazyVanillaJS = (function(window,document) {

    var serviceApi = {
        start: getImages
    };

    function getImages(){
        var images = document.getElementsByTagName('img');
        var lazyImages = [];
        for (var i=0; i < images.length; i++) {
            if (images[i].hasAttribute('data-lazyImg-vanilla')) {
                lazyImages.push(images[i]);
            }
        }

        printImages(lazyImages);
    }

    function printImages(lazyImg) {
        console.log(lazyImg);
    }

    return serviceApi;

})(window,document);

LazyVanillaJS.start();