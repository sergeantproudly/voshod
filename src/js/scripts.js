var __widthMobile = 1279;
var __widthMobileDesktopSmall = 1279;
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

	$.fn.lightTabs = function() {
		var showTab = function(tab, saveHash) {;
			if (!$(tab).hasClass('tab-act')) {
				var tabs = $(tab).closest('.tabs');

				var target_id = $(tab).attr('href');
		        var old_target_id = $(tabs).find('.tab-act').attr('href');
		        $(target_id).show();
		        $(old_target_id).hide();
		        $(tabs).find('.tab-act').removeClass('tab-act');
		        $(tab).addClass('tab-act');

		        if (typeof(saveHash) != 'undefined' && saveHash) history.pushState(null, null, target_id);
			}
		}

		var initTabs = function() {
            var tabs = this;
            
            $(tabs).find('a').each(function(i, tab){
                $(tab).click(function(e) {
                	e.preventDefault();

                	showTab(this, true);
                	fadeoutInit();

                	return false;
                });
                if (i == 0) showTab(tab);                
                else $($(tab).attr('href')).hide();
            });	

            $(tabs).swipe({
				swipeStatus: function(event, phase, direction, distance) {
					var offset = distance;

					if (phase === $.fn.swipe.phases.PHASE_START) {
						var origPos = $(this).scrollLeft();
						$(this).data('origPos', origPos);

					} else if (phase === $.fn.swipe.phases.PHASE_MOVE) {
						var origPos = $(this).data('origPos');

						if (direction == 'left') {
							var scroll_max = $(this).prop('scrollWidth') - $(this).width();
							var scroll_value_new = origPos - 0 + offset;
							$(this).scrollLeft(scroll_value_new);
							if (scroll_value_new >= scroll_max) $(this).addClass('scrolled-full');
							else $(this).removeClass('scrolled-full');

						} else if (direction == 'right') {
							var scroll_value_new = origPos - offset;
							$(this).scrollLeft(scroll_value_new);
							$(this).removeClass('scrolled-full');
						}

					} else if (phase === $.fn.swipe.phases.PHASE_CANCEL) {
						var origPos = $(this).data('origPos');
						$(this).scrollLeft(origPos);

					} else if (phase === $.fn.swipe.phases.PHASE_END) {
						$(this).data('origPos', $(this).scrollLeft());
					}
				},
				threshold: 70
			});	
        };

        return this.each(initTabs);
    };

	initElements();

    // BURGER
	$('#menu-holder').click(function() {
		//if ((__isMobileDesktopSmall) && !$('body').hasClass('mobile-opened')) {
		if (($('#menu-holder').css('backgroundImage') != 'none') && !$('body').hasClass('mobile-opened')) {
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

	// MODAL LINKS
	$('.js-modal-link').click(function(e) {
		e.preventDefault();
		showModal($(this).attr('href').substring(1));
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

	/*
	// DELETE THIS
	var authUrl = 'https://документыпобеды.рф/searchService/api/v1/search';
	var authUsername = 'proj.arch2019';
	var authPassword = 'VDo7kWEp';	
	$.ajax({
	    xhrFields: {
	        withCredentials: true
	    },
	    beforeSend: function (xhr) {
	        xhr.setRequestHeader('Authorization', 'Basic ' + window.btoa(authUsername + ':' + authPassword));
	    },
	    url: authUrl
	});
	*/

	// SEARCH
	if ($('#search-top-keyword').length) {
		var replaceWord = '%keyword%';
		var searchUrl = 'https://документыпобеды.рф/searchService/api/v1/search?query=' + replaceWord + '&limit=50';
		var checkspellingUrl = 'https://документыпобеды.рф/searchService/api/v1/checkspelling?query=' + replaceWord + '&limit=50';
		var suggestionsData = [];
		var checkspellingData = [];
		var nextWords = [];
		var currWords = '';

		$('#search-top-keyword').autocomplete({
			appendTo: $('#search-top-keyword').closest('form').parent(),
			position: {my: 'left top+8'},
			minLength: 3,
			delay: 150,
			source: function(request, response) {
				function process(request, response) {
					var words = request.term.split(' ');
					var lastWord = words[words.length - 1];

					if (!$('#search-top-keyword').data('next-word-expected')) words.pop();
					currWords = words.length ? words.join(' ') : '';
					$('#search-top-keyword').data('next-word-expected', false);

					if (!nextWords.length) {
						// FIXME
				        $.ajax({
				        	url: searchUrl.replace(replaceWord, lastWord),
				        	dataType: 'json',
				            success: function(data) {
				            	suggestionsData = data;
				            	
				            	// найдены варианты поиска
						        if (typeof(suggestionsData.suggestions) != 'undefined' 
						        	&& suggestionsData.suggestions.length) {
						        	response($.map(suggestionsData.suggestions, function(item) {
							        	return {
							        		label: item.autoComplete,
							        		value: (currWords ? (currWords + ' ') : '') + item.autoComplete
							        	};
							        }));

						        // не найдены варианты поиска, пробуем checkspelling
						        } else {
						        	// FIXME
							        $.ajax({
							        	url: checkspellingUrl.replace(replaceWord, lastWord),
							        	dataType: 'json',
							            success: function(data) {
							            	checkspellingData = data;
							            	
							            	response($.map(checkspellingData.words, function(item) {
									        	return {
									        		label: item,
									        		value: (currWords ? (currWords + ' ') : '') + item
									        	};
									        }));
							            }
							        });
						        }
				            }
				        });

					} else {
						var filtered = $.grep(nextWords, function(item) {
				        	return !lastWord || lastWord == words[words.length - 1] || item.includes(lastWord);
				       	});
				       	if (filtered.length) {
				       		response($.map(filtered, function(item) {			        	
					        	return {
						        	label: item,
						        	value: (currWords ? (currWords + ' ') : '') + item
						        };		        	
					        }));
				       	} else {
				       		nextWords = [];

				       		// запускаем запрос заново
				       		$('#search-top-keyword').data('next-word-expected', false);
				       		process(request, response);
				       	}	        
					}
				}
				process(request, response);
		    },
		    select: function(e, ui) {
		    	// если выбрали предложенный вариант
		    	var value = ui.item.label;
		    	currWords = ui.item.value;
		    	if (typeof(suggestionsData.suggestions) != 'undefined' 
			        && suggestionsData.suggestions.length 
			        && !nextWords.length) {
			    	$.each(suggestionsData.suggestions, function(index, item) {
			    		if (item.autoComplete == value) {
			    			nextWords = item.nextWords;
			    			return true;
			    		}
			    	});

			    	// сразу предлагаем варианты из nextWords
			    	$('#search-top-keyword').data('next-word-expected', true).keydown();
		    	} else {
		    		nextWords = [];
		    	}
		    }
		});
	}

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

	// SOCIALS
	$('#soc-shares>ul>li>a').click(function(e) {
		e.preventDefault();
		var $shares = $('.social-link');
		var url = $shares.attr('data-share-url');
		var title = $shares.attr('data-share-title');
		var image = $shares.attr('data-share-image');
		var description = $shares.attr('data-share-description');
		var api_url = $(this).attr('data-api-url');
			
		api_url = api_url.split('%url%').join(url).split('%title%').join(title).split('%image%').join(image).split('%description%').join(description);
		window.open(api_url, title, 'width=640,height=480,status=no,toolbar=no,menubar=no');
	});

	// CATALOGUE
	if ($('#catalogue').length) {
		$('#catalogue ul>li>ul>li').each(function(index, li) {
			if ($(li).children('ul').length) {
				$(li).addClass('has-child');
			}
		});
	}

	// MODAL PROFILE
	if ($('#modal-profile').length) {
		$('#modal-profile .tabs>ul>li>a').click(function() {
			$('#modal-profile .h1').html($(this).attr('data-header'));
		});

		$('#modal-profile .forget').click(function(e) {
			e.preventDefault();

			$('#modal-profile .h1').html($(this).attr('data-header'));
			$('#modal-profile-authorisation, #modal-profile-registration, .tabs').hide();
			$('#modal-profile-forget').show();
		});

		// FIXME DEMO
		$('#modal-profile-forget .btn').click(function(e) {
			e.preventDefault();
			e.stopPropagation();

			showModal('modal-done');

			setTimeout(function() {
				// обратно на авторизацию
				$('#modal-profile .tabs').show();
				$('#modal-profile-forget').hide();
				$('#modal-profile .tabs>ul>li:first>a').click();	
				$('#modal-profile-authorisation').show();
			}, __animationSpeed);
		});
	}

	$('#btn-login').click(function() {
		if (__isMobileDesktopSmall) {
			$('header .close').click();		
		}
	});

	// EDITABLE SELECT REINIT TEST
	var reinited = false;
	if ($('#filter-archive2').length) {
		$('#filter-archive2').next('.es').mousedown(function(e) {
			if (!reinited) {
				e.preventDefault();
				e.stopPropagation();

				// Вставляем новые опции в оригинальный селект
				$('#filter-archive2').html('<option>Новая опция 1</option><option>Новая опция 2</option><option>Новая опция 3</option>');
				// Делаем реинит
				editableSelectReinit($('#filter-archive2'));
				// Эмулируем фокус для появления дропдауна
				$('#filter-archive2').next('.es').children('.es-input').focus();

				reinited = true;
			}
		});
	}
	// тестовое одписание на событие очистки
	$('#filter-archive2').on('clear', function() {
		console.log('editable select cleared');
	});

	// CATALOGUE SEARCH LOADER DEMO
	if ($('#catalogue').length) {
		$('#catalogue').append('<div id="catalogue-loader"></div>');
		$loader = $('#catalogue-loader');
		
		var cImageSrc = 'assets/images/sprites.png';
		var cImageTimeout = false;	
		window.cTotalFrames = 18;
		window.cFrameWidth = 64;
		window.cSpeed = 9;
		window.g_run = false;

		var loaderFun = function (){cImageTimeout=setTimeout(function() {
			$('#catalogue-loader').html('<canvas id="canvas" width="'+$loader.width()+'" height="'+$loader.height()+'"><p>Your browser does not support the canvas element.</p></canvas>');
			
			//FPS = Math.round(100/(maxSpeed+2-speed));
			FPS = Math.round(100 / window.cSpeed);
			SECONDS_BETWEEN_FRAMES = 1 / FPS;
			g_GameObjectManager = null;
			g_run = genImage;

			g_run.width = window.cTotalFrames * window.cFrameWidth;
			genImage.onload = function() {
				cImageTimeout=setTimeout(loaderFun, 0);
			};
			initCanvas();
		}, 0)};

		clearTimeout(cImageTimeout);
		cImageTimeout=0;
		genImage = new Image();
		genImage.onload = loaderFun;
		genImage.onerror = new Function('alert(\'Could not load the image\')');
		genImage.src = cImageSrc;

		$('#search-top form').submit(function(e) {
			// FIXME
			e.preventDefault();
			e.stopPropagation();

			$('#catalogue').addClass('loading');
			setTimeout(function() {
				$('#catalogue').removeClass('loading');
			}, 4000);
		});
	}

});