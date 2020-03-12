var __widthMobile = 1280;
var __widthMobileDesktopSmall = 1280;
var __widthMobileTablet = 1024;
var __widthMobileTabletMiddle = 768;
var __widthMobileTabletSmall = 600;
var __widthMobileSmall = 540;
var __isMobile = ($(window).width() <= __widthMobile);
var __isMobileDesktopSmall = ($(window).width() <= __widthMobileDesktopSmall);
var __isMobileTablet = ($(window).width() <= __widthMobileTablet);
var __isMobileTabletMiddle = ($(window).width() <= __widthMobileTabletMiddle);
var __isMobileTabletSmall = ($(window).width() <= __widthMobileTabletSmall);
var __isMobileSmall = ($(window).width() <= __widthMobileSmall);
var __animationSpeed = 350;	



$(document).ready(function(){

	initElements();

    // BURGER
	$('#menu-holder').click(function() {
		if ((__isMobileDesktopSmall) && !$('body').hasClass('mobile-opened')) {
			if (!$('header').children('.close').data('inited')) {
				if (!$('header>.close').length) {
					$('header').append('<div class="close"></div>');
				}
				$('header').children('.close').click(function(e) {
					e.stopPropagation();

					$('body').removeClass('mobile-opened');
					$('html').removeClass('html-mobile-long');
					$('#layout').height('auto').removeClass('js-modal-overflow');
					$('.modal-fadeout').stop().fadeOut(300);
				}).data('inited', true);
			}

			$('body').addClass('mobile-opened');

			if ($('#menu-holder').outerHeight() > $(window).height()) {
				$('html').addClass('html-mobile-long');
			} else {
				$('html').removeClass('html-mobile-long');
			}

			$('#layout').addClass('js-modal-overflow').height($('header').outerHeight());

			$('.modal-fadeout').stop().fadeIn(300);
		}
	});


	// SLICKS
	$('.js-slider').each(function(i, slider) {
		var mobile = $(slider).attr('data-mobile');
		var adaptive = $(slider).attr('data-adaptive');
		var dots = $(slider).attr('data-dots') === 'false' ? false : true;
		var arrows = $(slider).attr('data-arrows') === 'true' ? true : false;
		var autoplay = $(slider).attr('data-autoplay') ? $(slider).attr('data-autoplay') : false;
		var slidesToShow = adaptive ? Math.floor($(slider).outerWidth() / $(slider).children('li, .li').outerWidth()) : 1; 
	
		if (mobile) {
			if ((mobile === 'true' && __isMobile) ||
				(mobile === 'middle' && __isMobileTabletMiddle) ||
				(mobile === 'small' && __isMobileTabletSmall) ||
				(mobile === 'mobile' && __isMobileSmall)) {					
	
				$(slider).slick({
					slidesToShow: slidesToShow,
					slidesToScroll: slidesToShow,
					dots: dots,
					arrows: arrows,
					autoplay: autoplay
				});
			}
		} else {
			$(slider).slick({
				slidesToShow: slidesToShow,
				slidesToScroll: slidesToShow,
				dots: dots,
				arrows: arrows,
				autoplay: autoplay
			});
		}
	});

	// LIGHTBOXES
	var galleries = new Array();
	$('.js-lightbox').each(function(i, a) {
		if (!$(a).is('[data-gallery]')) {
			$(a).magnificPopup({
				type: 'image',
				removalDelay: 300,
				callbacks: {
			        beforeOpen: function() {
			            $(this.contentContainer).removeClass('fadeOut').addClass('animated fadeIn');
			        },
			        beforeClose: function() {
			        	$(this.contentContainer).removeClass('fadeIn').addClass('fadeOut');
			        }
			    },
				midClick: true
			});
		} else {
			if (typeof(galleries[$(a).attr('data-gallery')]) == 'undefined') galleries.push($(a).attr('data-gallery'));
		}
	});
	$.each(galleries, function(i, gallery) {
		$('.js-lightbox[data-gallery="' + gallery + '"]').magnificPopup({
			type: 'image',
			removalDelay: 300,
			callbacks: {
		        beforeOpen: function() {
		             $(this.contentContainer).removeClass('fadeOut').addClass('animated fadeIn');
		        },
		        beforeClose: function() {
		        	$(this.contentContainer).removeClass('fadeIn').addClass('fadeOut');
		        }
		    },
			gallery: {
				enabled: true
			},
			midClick: true
		});
	});

	// SEARCH
	$('.example-search a').click(function(e) {
		e.preventDefault();

		$('#search input:text').val($(this).text()).focus();
	});

	$('#search-top-keyword').on('keydown keyup focusout click', function() {
		if ($(this).val()) {
			$('.search-form-clear').stop().fadeIn(50);
		} else {
			$('.search-form-clear').stop().fadeOut(50);
		}
	});
	$('#search-top-keyword').focusout();
	$('.search-form-clear').click(function() {
		$('#search-top-keyword').val('').focus();
		$(this).stop().fadeOut(50);
	});

	$('.filter-tablet').click(function() {
			$('html').addClass('html-filter');
			$('.col-right').stop().fadeIn(350).css('display', 'table');
		});
		$('.filter-close, .filter-btn').click(function() {
			$('html').removeClass('html-filter');
			$('.col-right').stop().fadeOut(350);
		});


});