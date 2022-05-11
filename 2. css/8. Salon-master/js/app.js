/*
author: Boostraptheme
author URL: https://boostraptheme.com
License: Creative Commons Attribution 4.0 Unported
License URL: https://creativecommons.org/licenses/by/4.0/
*/

(function($) {

    "use strict"; // Start of use strict
    
    // Smooth scrolling using jQuery easing
    $('a.js-scroll-trigger[href*="#"]:not([href="#"])').click(function() {
        var target = $(this.hash);
        target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
        if (target.length) {
            $('html, body').animate({
                scrollTop: (target.offset().top - 60)
            }, 1000, "easeInOutExpo");
            return false;
        }
    });

    // Closes responsive menu when a scroll trigger link is clicked
    $('.js-scroll-trigger').click(function() {
        $('.navbar-collapse').collapse('hide');
    });

    // Activate scrollspy to add active class to navbar items on scroll
    $('body').scrollspy({
        target: '#mainNav',
        offset: 82
    });

    //fixed navbar
    var toggleAffix = function(affixElement, scrollElement, wrapper) {

        var height = affixElement.outerHeight(),
            top = wrapper.offset().top;

        if (scrollElement.scrollTop() >= top) {
            wrapper.height(height);
            affixElement.addClass("affix");
        } else {
            affixElement.removeClass("affix");
            wrapper.height('auto');
        }

    };

    $('[data-toggle="affix"]').each(function() {
        var ele = $(this),
            wrapper = $('<div></div>');

        ele.before(wrapper);
        $(window).on('scroll resize', function() {
            toggleAffix(ele, $(this), wrapper);
        });

        // init
        toggleAffix(ele, $(window), wrapper);
    });


})(jQuery);

/*====================================================
                    TESTIMONIALS
====================================================*/
$(function() {
    $("#testimonial-slider").owlCarousel({
        items: 2,
        smartSpeed: 700,
        autoplay: true,
        loop: true,
        pagination: true,
        slideSpeed: 1000,
        responsive: {
            0: {
                items: 1
            },
            480: {
                items: 1
            },
            768: {
                items: 1
            },
            992: {
                items: 2
            }
        }
    });
});

/*====================================================
                        PORTFOLIO
====================================================*/
  $(function() {

      $("#portfolio").magnificPopup({
          delegate: 'a', // child items selector, by clicking on it popup will open
          type: 'image',
          gallery: {
              enabled: true
          }

      });
  });

/* ====================================================
                       BACK TO TOP
=======================================================*/
  (function($) {

      $(window).scroll(function() {

          if ($(this).scrollTop() < 50) {
              // hide nav
              $("nav").removeClass("ss-top-nav");
              $("#back-to-top").fadeOut();

          } else {
              // show nav
              $("nav").addClass("ss-top-nav");
              $("#back-to-top").fadeIn();
          }
      });
  })(jQuery); // End of use strict