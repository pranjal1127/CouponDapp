;(function($){
    "use strict"
	
	
	var nav_offset_top = $('header').height() + 50; 
    /*-------------------------------------------------------------------------------
	  Navbar 
	-------------------------------------------------------------------------------*/

	//* Navbar Fixed  
    function navbarFixed(){
        if ( $('.header_area').length ){ 
            $(window).scroll(function() {
                var scroll = $(window).scrollTop();   
                if (scroll >= nav_offset_top ) {
                    $(".header_area").addClass("navbar_fixed");
                } else {
                    $(".header_area").removeClass("navbar_fixed");
                }
            });
        };
    };
    navbarFixed();
	
	function DropdownTabClick(){
		if( $('.dropdown-menu').length ){
			$('.dropdown-menu .nav-link').on("click.bs.dropdown", function (e) {
				$(this).tab('show');
				e.stopPropagation();
				return false;
			});
		}
	}
	DropdownTabClick();
	
	function Click_menu_hover(){
		if( $('.tab-demo').length ){
			$.fn.tab = function(options) {
				var opts = $.extend({}, $.fn.tab.defaults, options);
				return this.each(function() {
					var obj = $(this);

					$(obj).find('.tabHeader li').on(opts.trigger_event_type, function() {
						$(obj).find('.tabHeader li').removeClass('active');
						$(this).addClass('active');

						$(obj).find('.tabContent div').removeClass('active show');
						$(obj).find('.tabContent div').eq($(this).index()).addClass('active show');

					})
				});
			}
			$.fn.tab.defaults = {
				trigger_event_type: 'click', //mouseover | click 默认是click
			};
		}
	}
	Click_menu_hover();
	
	function Tab_menu_activator(){
		if( $('.tab-demo').length ){
			$('.tab-demo').tab({
			  trigger_event_type: 'mouseover'
			});
		}
	}
	Tab_menu_activator();
	
	
	
	
	/*----------------------------------------------------*/
    /*  Side Menu Activator js
    /*----------------------------------------------------*/
	function side_menu_activator(){
		if( $('.side_menu').length ){
			$('.side_menu').on('click', function(){
				$('.sidebar_menu').toggleClass('active');
				return false;
			});
			$('.close_icon').on('click', function(){
				$('.sidebar_menu').removeClass('active');
			});
		}
	}
	side_menu_activator();
	
	
	

	
	/*----------------------------------------------------*/
    /*  Main Slider js
    /*----------------------------------------------------*/
    function main_slider(){
        if ( $('#main_slider').length ){
            $("#main_slider").revolution({
                sliderType:"standard",
                sliderLayout:"auto",
                delay:4000,
                disableProgressBar:"on",
                navigation: {
                    onHoverStop: 'off',
                    touch:{
                        touchenabled:"on"
                    },
                    arrows: {
                        style:"zeus",
                        enable:true,
                        hide_onmobile:true,
                        hide_under:992,
                        hide_onleave:true,
                        hide_delay:200,
                        hide_delay_mobile:1200,
                        tmp:'<div class="tp-title-wrap">  	<div class="tp-arr-imgholder"></div> </div>',
                        left: {
                            h_align: "left",
                            v_align: "center",
                            h_offset: 50,
                            v_offset: 0
                        },
                        right: {
                            h_align: "right",
                            v_align: "center",
                            h_offset: 50,
                            v_offset: 0
                        }
                    },
                },
                responsiveLevels:[4096,1199,992,767,480],
                gridwidth:[1170,970,750,700,480],
                gridheight:[712,712,650,550,500],
                lazyType:"smart",
                fallbacks: {
                    simplifyAll:"off",
                    nextSlideOnWindowFocus:"off",
                    disableFocusListener:false,
                }
            })
        }
    }
    main_slider();
	/*----------------------------------------------------*/
    /*  Main Slider js
    /*----------------------------------------------------*/
    function main_slider2(){
        if ( $('#main_slider2').length ){
            $("#main_slider2").revolution({
                sliderType:"standard",
                sliderLayout:"auto",
                delay:4000,
                disableProgressBar:"on",
                navigation: {
                    onHoverStop: 'off',
                    touch:{
                        touchenabled:"on"
                    },
                    arrows: {
                        style:"zeus",
                        enable:true,
                        hide_onmobile:true,
                        hide_under:992,
                        hide_onleave:true,
                        hide_delay:200,
                        hide_delay_mobile:1200,
                        tmp:'<div class="tp-title-wrap">  	<div class="tp-arr-imgholder"></div> </div>',
                        left: {
                            h_align: "left",
                            v_align: "center",
                            h_offset: 50,
                            v_offset: 0
                        },
                        right: {
                            h_align: "right",
                            v_align: "center",
                            h_offset: 50,
                            v_offset: 0
                        }
                    },
                },
                responsiveLevels:[4096,1199,992,767,480],
                gridwidth:[1170,970,690,700,480],
                gridheight:[712,712,650,550,500],
                lazyType:"smart",
                fallbacks: {
                    simplifyAll:"off",
                    nextSlideOnWindowFocus:"off",
                    disableFocusListener:false,
                }
            })
        }
    }
    main_slider2();
	
	/*----------------------------------------------------*/
    /*  Main Slider js
    /*----------------------------------------------------*/
    function main_slider3(){
        if ( $('#main_slider3').length ){
            $("#main_slider3").revolution({
                sliderType:"standard",
                sliderLayout:"auto",
                delay:4000,
                disableProgressBar:"on",
                navigation: {
                    onHoverStop: 'off',
                    touch:{
                        touchenabled:"on"
                    },
                    arrows: {
                        style:"zeus",
                        enable:true,
                        hide_onmobile:true,
                        hide_under:992,
                        hide_onleave:true,
                        hide_delay:200,
                        hide_delay_mobile:1200,
                        tmp:'<div class="tp-title-wrap">  	<div class="tp-arr-imgholder"></div> </div>',
                        left: {
                            h_align: "left",
                            v_align: "center",
                            h_offset: 50,
                            v_offset: 0
                        },
                        right: {
                            h_align: "right",
                            v_align: "center",
                            h_offset: 50,
                            v_offset: 0
                        }
                    },
                },
                responsiveLevels:[4096,1199,992,767,480],
                gridwidth:[1170,970,750,700,480],
                gridheight:[832,832,650,550,500],
                lazyType:"smart",
                fallbacks: {
                    simplifyAll:"off",
                    nextSlideOnWindowFocus:"off",
                    disableFocusListener:false,
                }
            })
        }
    }
    main_slider3();
	
	/*----------------------------------------------------*/
    /*  Main Slider js
    /*----------------------------------------------------*/
    function main_slider4(){
        if ( $('#main_slider4').length ){
            $("#main_slider4").revolution({
                sliderType:"standard",
                sliderLayout:"auto",
                delay:4000,
                disableProgressBar:"on",
                navigation: {
                    onHoverStop: 'off',
                    touch:{
                        touchenabled:"on"
                    },
                    arrows: {
                        style:"zeus",
                        enable:true,
                        hide_onmobile:true,
                        hide_under:992,
                        hide_onleave:true,
                        hide_delay:200,
                        hide_delay_mobile:1200,
                        tmp:'<div class="tp-title-wrap">  	<div class="tp-arr-imgholder"></div> </div>',
                        left: {
                            h_align: "left",
                            v_align: "center",
                            h_offset: 50,
                            v_offset: 0
                        },
                        right: {
                            h_align: "right",
                            v_align: "center",
                            h_offset: 50,
                            v_offset: 0
                        }
                    },
                },
                responsiveLevels:[4096,1199,992,767,480],
                gridwidth:[1170,970,750,700,480],
                gridheight:[765,765,650,550,500],
                lazyType:"smart",
                fallbacks: {
                    simplifyAll:"off",
                    nextSlideOnWindowFocus:"off",
                    disableFocusListener:false,
                },
				parallax: {
					type:"mouse+scroll",
					origo:"slidercenter",
					speed:2000,
					levels:[4,2,3,20,25,30,35,40,45,50,46,47,48,49,50,55],
					disable_onmobile:"on"
				},
            })
        }
    }
    main_slider4();
	
	/*----------------------------------------------------*/
    /*  Main Slider js
    /*----------------------------------------------------*/
    function main_slider_5(){
        if ( $('#main_slider_5').length ){
            $("#main_slider_5").revolution({
                sliderType:"standard",
                sliderLayout:"auto",
                delay:4000,
                disableProgressBar:"on",
                navigation: {
                    onHoverStop: 'off',
                    touch:{
                        touchenabled:"on"
                    },
                    arrows: {
                        style:"zeus",
                        enable:true,
                        hide_onmobile:true,
                        hide_under:992,
                        hide_onleave:true,
                        hide_delay:200,
                        hide_delay_mobile:1200,
                        tmp:'<div class="tp-title-wrap">  	<div class="tp-arr-imgholder"></div> </div>',
                        left: {
                            h_align: "left",
                            v_align: "center",
                            h_offset: 50,
                            v_offset: 0
                        },
                        right: {
                            h_align: "right",
                            v_align: "center",
                            h_offset: 50,
                            v_offset: 0
                        }
                    },
                },
                responsiveLevels:[4096,1199,992,767,480],
                gridwidth:[1170,970,750,700,480],
                gridheight:[770,770,650,550,500],
                lazyType:"smart",
                fallbacks: {
                    simplifyAll:"off",
                    nextSlideOnWindowFocus:"off",
                    disableFocusListener:false,
                }
            })
        }
    }
    main_slider_5();
	
	/*----------------------------------------------------*/
    /*  Main Slider js
    /*----------------------------------------------------*/
    function main_slider_6(){
        if ( $('#main_slider6').length ){
            $("#main_slider6").revolution({
                sliderType:"standard",
                sliderLayout:"auto",
                delay:4000,
                disableProgressBar:"on",
                navigation: {
                    onHoverStop: 'off',
                    touch:{
                        touchenabled:"on"
                    },
                    arrows: {
                        style:"zeus",
                        enable:true,
                        hide_onmobile:true,
                        hide_under:992,
                        hide_onleave:true,
                        hide_delay:200,
                        hide_delay_mobile:1200,
                        tmp:'<div class="tp-title-wrap">  	<div class="tp-arr-imgholder"></div> </div>',
                        left: {
                            h_align: "left",
                            v_align: "center",
                            h_offset: 50,
                            v_offset: 0
                        },
                        right: {
                            h_align: "right",
                            v_align: "center",
                            h_offset: 50,
                            v_offset: 0
                        }
                    },
                },
                responsiveLevels:[4096,1199,992,767,480],
                gridwidth:[1170,970,750,700,480],
                gridheight:[836,836,650,550,500],
                lazyType:"smart",
                fallbacks: {
                    simplifyAll:"off",
                    nextSlideOnWindowFocus:"off",
                    disableFocusListener:false,
                }
            })
        }
    }
    main_slider_6();
	
	/*----------------------------------------------------*/
    /*  Main Slider js
    /*----------------------------------------------------*/
    function main_slider_7(){
        if ( $('#main_slider7').length ){
            $("#main_slider7").revolution({
                sliderType:"standard",
                sliderLayout:"auto",
                delay:4000,
                disableProgressBar:"on",
                navigation: {
                    onHoverStop: 'off',
                    touch:{
                        touchenabled:"on"
                    },
                    arrows: {
                        style:"zeus",
                        enable:true,
                        hide_onmobile:true,
                        hide_under:992,
                        hide_onleave:true,
                        hide_delay:200,
                        hide_delay_mobile:1200,
                        tmp:'<div class="tp-title-wrap">  	<div class="tp-arr-imgholder"></div> </div>',
                        left: {
                            h_align: "left",
                            v_align: "center",
                            h_offset: 50,
                            v_offset: 0
                        },
                        right: {
                            h_align: "right",
                            v_align: "center",
                            h_offset: 50,
                            v_offset: 0
                        }
                    },
                },
                responsiveLevels:[4096,1199,992,767,480],
                gridwidth:[1170,970,750,700,480],
                gridheight:[807,807,650,550,500],
                lazyType:"smart",
                fallbacks: {
                    simplifyAll:"off",
                    nextSlideOnWindowFocus:"off",
                    disableFocusListener:false,
                }
            })
        }
    }
    main_slider_7();
	
	/*----------------------------------------------------*/
    /*  Main Slider js
    /*----------------------------------------------------*/
    function main_slider_8(){
        if ( $('#main_slider8').length ){
            $("#main_slider8").revolution({
                sliderType:"standard",
                sliderLayout:"auto",
                delay:4000,
                disableProgressBar:"on",
                navigation: {
                    onHoverStop: 'off',
                    touch:{
                        touchenabled:"on"
                    },
                    arrows: {
                        style:"zeus",
                        enable:true,
                        hide_onmobile:true,
                        hide_under:992,
                        hide_onleave:true,
                        hide_delay:200,
                        hide_delay_mobile:1200,
                        tmp:'<div class="tp-title-wrap">  	<div class="tp-arr-imgholder"></div> </div>',
                        left: {
                            h_align: "left",
                            v_align: "center",
                            h_offset: 50,
                            v_offset: 0
                        },
                        right: {
                            h_align: "right",
                            v_align: "center",
                            h_offset: 50,
                            v_offset: 0
                        }
                    },
                },
                responsiveLevels:[4096,1199,992,767,480],
                gridwidth:[1170,970,750,700,480],
                gridheight:[630,630,630,550,500],
                lazyType:"smart",
                fallbacks: {
                    simplifyAll:"off",
                    nextSlideOnWindowFocus:"off",
                    disableFocusListener:false,
                }
            })
        }
    }
    main_slider_8();

	/*----------------------------------------------------*/
    /*  Explor Room Slider
    /*----------------------------------------------------*/
    function case_slider(){
        if ( $('.case_slider').length ){
            $('.case_slider').owlCarousel({
                loop:true,
                margin: 30,
                items: 1,
                nav:true,
                autoplay: true,
                smartSpeed: 1500,
                dots:true,
                navContainerClass: 'case_slider',
                navText: ['<i class="fa fa-angle-left" aria-hidden="true"></i>','<i class="fa fa-angle-right" aria-hidden="true"></i>'],
                responsiveClass: true,
            })
        }
    }
    case_slider();
	
	/*----------------------------------------------------*/
    /*  Explor Room Slider
    /*----------------------------------------------------*/
    function service_slider(){
        if ( $('.service_slider').length ){
            $('.service_slider').owlCarousel({
                loop:true,
                margin: 30,
                items: 4,
                nav:true,
                autoplay: true,
                smartSpeed: 1500,
                dots:false,
                navContainerClass: 'service_arrow',
                navText: ['<i class="fa fa-angle-left" aria-hidden="true"></i>','<i class="fa fa-angle-right" aria-hidden="true"></i>'],
                responsiveClass: true,
                responsive: {
                    0: {
                        items: 1,
                    },
                    650: {
                        items: 2,
                    },
                    992: {
                        items: 4,
                    }
                }
            })
        }
    }
    service_slider();
	
	/*----------------------------------------------------*/
    /*  Explor Room Slider
    /*----------------------------------------------------*/
    function client_slider(){
        if ( $('.client_slider').length ){
            $('.client_slider').owlCarousel({
                loop:true,
                margin: 30,
                items: 6,
                nav:false,
                autoplay: true,
                smartSpeed: 1500,
                dots:false,
                responsiveClass: true,
                responsive: {
                    0: {
                        items: 2,
                    },
                    480: {
                        items: 3,
                    },
                    650: {
                        items: 4,
                    },
                    992: {
                        items: 6,
                    }
                }
            })
        }
    }
    client_slider();
	
	
	function magnifi(){
		if( $('.popup-youtube, .popup-vimeo, .popup-gmaps') .length ){
			$('.popup-youtube, .popup-vimeo, .popup-gmaps').magnificPopup({
				disableOn: 700,
				type: 'iframe',
				mainClass: 'mfp-fade',
				removalDelay: 160,
				preloader: false,
				fixedContentPos: false
			});
		}
	}
	magnifi();
	
	function niceSelect(){
		if( $('select').length ){
			$('select').niceSelect();
		}
	}
	niceSelect();
	
	
	/*----------------------------------------------------*/
    /*  Search Popup js
    /*----------------------------------------------------*/
	function popupAnimation(){
		if ( $('.popup-with-zoom-anim').length ){
			$(document).ready(function() {
				$('.popup-with-zoom-anim').magnificPopup({
					type: 'inline',

					fixedContentPos: false,
					fixedBgPos: true,

					overflowY: 'auto',

					closeBtnInside: true,
					preloader: false,

					midClick: true,
					removalDelay: 300,
					mainClass: 'my-mfp-zoom-in'
				});

				$('.popup-with-move-anim').magnificPopup({
					type: 'inline',

					fixedContentPos: false,
					fixedBgPos: true,

					overflowY: 'auto',

					closeBtnInside: true,
					preloader: false,

					midClick: true,
					removalDelay: 300,
					mainClass: 'my-mfp-slide-bottom'
				});
			});
		}
	}
	popupAnimation();
	
	/*----------------------------------------------------*/
    /*  Testimonials Slider
    /*----------------------------------------------------*/
    function testimonials_slider(){
        if ( $('.testi_slider').length ){
            $('.testi_slider').owlCarousel({
                loop:true,
                margin: 30,
                items: 2,
                nav: false,
                autoplay: true,
                smartSpeed: 1500,
                dots:true, 
                responsiveClass: true,
				responsive: {
                    0: {
                        items: 1,
                    },
                    768: {
                        items: 2,
                    },
                }
            })
        }
    }
    testimonials_slider();
	
	/*----------------------------------------------------*/
    /*  Testimonials Slider
    /*----------------------------------------------------*/
    function testi_two_slider(){
        if ( $('.testi_two_slider').length ){
            $('.testi_two_slider').owlCarousel({
                loop:true,
                margin: 30,
                items: 1,
                nav: true,
                autoplay: true,
                smartSpeed: 2000,
                dots:false, 
                responsiveClass: true,
				navContainerClass: 'test_arrow',
                navText: ['<i class="fa fa-angle-left" aria-hidden="true"></i>','<i class="fa fa-angle-right" aria-hidden="true"></i>'],
            })
        }
    }
    testi_two_slider();
	
	/*----------------------------------------------------*/
    /*  Testimonials Slider
    /*----------------------------------------------------*/
    function testi_three_slider(){
        if ( $('.f_testi_slider').length ){
            $('.f_testi_slider').owlCarousel({
                loop:true,
                margin: 30,
                items: 1,
                nav: false,
                autoplay: true,
                smartSpeed: 2000,
                dots:true, 
                responsiveClass: true,
            })
        }
    }
    testi_three_slider();
	
	/*----------------------------------------------------*/
    /*  Testimonials Slider
    /*----------------------------------------------------*/
    function testi_slider_three(){
        if ( $('.testi_three_slider').length ){
            $('.testi_three_slider').owlCarousel({
                loop:true,
                margin: 30,
                items: 1,
                nav: false,
                autoplay: true,
                smartSpeed: 2000,
                dots:true, 
                responsiveClass: true,
				navContainerClass: 'test_arrow',
                navText: ['<i class="fa fa-angle-left" aria-hidden="true"></i>','<i class="fa fa-angle-right" aria-hidden="true"></i>'],
            })
        }
    }
    testi_slider_three();
	
	
	function counterup(){
		if( $('.counter').length ){
			$('.counter').counterUp({
				delay: 10,
				time: 1000
			});
		}
	}
	counterup();

})(jQuery)