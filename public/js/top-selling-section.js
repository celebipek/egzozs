$(document).ready(function(){
    $(".owl-carousel").owlCarousel({ 
        items: 4, 
        loop: true, 
        margin: 10, 
        autoplay: true, 
        autoplayTimeout: 2000, 
        autoplayHoverPause: true,
        nav: true,
        responsive:{
            0 :{ items:2 },
            600 :{ items:3 },
            1000 :{ items:4 }
        }
    });
});