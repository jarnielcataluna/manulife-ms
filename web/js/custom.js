var delay = 300;
var timeout;

function scrollToDiv(element){
    var offset = element.offset();
    var offsetTop = offset.top;
    var totalScroll = offsetTop;
    var headerH = $('header').outerHeight(false);
    $('body, html').animate({
        scrollTop: totalScroll - headerH + 1
    }, 500);
}

function updateNav() {
    var wH = window.innerHeight ? window.innerHeight : $(window).height(),
        headerH = $('header').outerHeight(false),
        curPos = $(window).scrollTop() + headerH,
        currentHash,
        subMenu = $('.sec-menu, .menu'),
        liItems = subMenu.find('li');


    $('.jq-section').each(function(i, v){
        if($(this).offset().top <= curPos){
            currentHash = liItems.find('a[href="#'+$(this).attr('id')+'"]');

            liItems.children('a').removeClass('active');
            currentHash.addClass('active'); 
        }

        if($(this).offset().top <= curPos){
            $(this).find('.phone-width').addClass('slide-left');
        }

    });
}

//get all elements with class and get the biggest box
function get_biggest(elements){
	var biggest_height = 0;
	for ( var i = 0; i < elements.length ; i++ ){
		var element_height = $(elements[i]).height();
		//compare the height, if bigger, assign to variable
		if(element_height > biggest_height ) biggest_height = element_height;
	}
	return biggest_height;
}

function resize() {
	var windowWidth = $(window).width();
	var windowHeight = $(window).height();

	// STICKY FOOTER
	var headerHeight = $('header').outerHeight();
	var footerHeight = $('footer').outerHeight();
	var footerTop = (footerHeight) * -1
	$('footer').css({marginTop: footerTop});
	$('#main-wrapper').css({paddingBottom: footerHeight});

	// for vertically middle content
	$('.bp-middle').each(function() {
		var bpMiddleHeight = $(this).outerHeight() / 2 * - 1;
		$(this).css({marginTop: bpMiddleHeight});
	});

	$('.banner-wrap, .home-banner-holder').css({'height' : windowHeight});

	// for equalizer
	$('.classname').css({minHeight: 0});
  var ClassName = get_biggest($('.classname'));
  $('.classname').css({minHeight: ClassName});
}

$(window).resize(function() {
	resize();
});

$(document).ready(function() {
	if (Modernizr.touch) {
		$('html').addClass('bp-touch');
	}

	if (Modernizr.touch) {
		$('.hiding').css({'opacity' : '1'})

	} else {
		$('.animated').appear(function() {
            var element = $(this);
            var animation = element.data('animation');
            var animationDelay = element.data('delay');
            if(animationDelay) {
              setTimeout(function(){
                  element.addClass( animation + " visible" );
                  element.removeClass('hiding');
              }, animationDelay);
            } else {
              element.addClass( animation + " visible" );
              element.removeClass('hiding');
            }               
        }, {accY: -90});
	}
	 


	// PARALLAX BACKGROUND
	$('.background-image-holder').each(function() {
        var imgSrc = $(this).children('img').attr('src');
        $(this).css('background-image', 'url("' + imgSrc + '")');
        $(this).children('img').hide();
        $(this).css('background-position', 'initial');
    });
	
	// Disable parallax on mobile
	if ( Modernizr.touch ) { 
		$('section').removeClass('parallax');
		$('.background-image-holder').addClass('mobile');
	}

	$('.menu ul li a, .sec-menu ul li a').click(function(e){
        e.preventDefault();
        var __this = $(this),
        $targetDiv = $(__this.attr('href'));
        
        $('.menu ul li a, .sec-menu ul li a').removeClass('active');


        //window.history.pushState({}, '', $(this).attr('href').split('#')[1]);

        if($('.header-hamburger').is(':visible')) {
            $('.mobile-menu ul li').removeClass('is-open');
            $('.mobile-menu').hide();
            $('.header-hamburger').removeClass('active');
        }
        __this.addClass('active');
        scrollToDiv($targetDiv,0);

    });

     $('.header-hamburger').click(function(){
        var _this = $(this);
        $('.mobile-menu ul li').removeClass('is-open');
    

        if (_this.hasClass('active')) {

            $('.mobile-menu').hide();
            
            $('.mobile-menu ul li').removeClass('is-open');
            setTimeout(function(){
                _this.removeClass('active');
            }, 400);
            

        } else {
   
            $('.mobile-menu').stop(true, false).slideDown(300);

            $('.mobile-menu ul li').each(function(index){
                var _this = $(this);
                setTimeout(function(){
                    _this.addClass('is-open');
                }, 100 + (index * 100));

            });
            setTimeout(function(){
                _this.addClass('active');
            }, 100 + ($('.mobile-menu ul li').size() * 100));
        }
        
        
    });
	
	resize();
});

$(window).load(function() {
	resize();

	clearTimeout(timeout);

	$('.head-wrap').addClass('animated');

	timeout = setTimeout(function(){
        $('.banner-anim').addClass('animated');
    }, delay);

    timeout = setTimeout(function(){
        $('.home-text').addClass('animated');
    }, 1000);

    timeout = setTimeout(function(){
        $('.icon-logo').addClass('animated');
    }, 1200);

});

$(window).scroll(function() {
    updateNav();

});

$(window).on('scroll load', function(){
    var _cur_top = $(window).scrollTop();
    //var topH = $('.banner-wrap').outerHeight(false);
    
	if(  _cur_top >=  100) {
		$('.head-wrap').addClass('animate');

	} else {
		$('.head-wrap').removeClass('animate');
	}
});



// preloader once done
Pace.on('done', function() {
	// totally hide the preloader especially for IE
	setTimeout(function() {
		$('.pace-inactive').hide();
	}, 500);
});
