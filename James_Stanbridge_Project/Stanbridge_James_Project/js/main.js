/* James Stanbridge */

$(document).ready(function(){




	//Tooltip Code
	
	$('.tooltip').mouseover(function(e){
	
		if( $(this).attr('data-tip-type') == 'text' ){
			$('.tooltip_container').html( $(this).attr('data-tip-source') );
		}
		
		$('.tooltip_container').css({'display':'block', 'opacity':0}).animate({opacity:1}), 250;
		
	}).mousemove(function(e){
	
		var tooltipWidth = $('.tooltip_container').outerWidth();
		var tooltipHeight = $('.tooltip_container').outerHeight();

		var pageWidth = $('body').width();
		if ( e.pageX > pageWidth / 2 ){
			$('.tooltip_container').css('left',( e.pageX - tooltipWidth + 20 ) + 'px');
		}else{
			$('.tooltip_container').css('left',( e.pageX - 20 ) + 'px');
		}
		
		if ( e.pageY > 100 ){
			$('.tooltip_container').css('top',( e.pageY - (tooltipHeight+20) ) + 'px' );
		}else{
			$('.tooltip_container').css('top',( e.pageY + 20 ) + 'px' );
		}
		
		$('.bodywidth').html( pageWidth );
		$('.xpos').html(e.pageX);
		$('.ypos').html(e.pageY);
			
	}).mouseout(function(e){
		$('.tooltip_container').css('display', 'none').html('');
	
	});
	
	
	
	
	//Tabbed Nav Code
	
	$('#tabs p').hide().eq(0).show();
	$('#tabs p:not(:first)').hide();
	
	$('#navtabs li').click(function(e) {
		e.preventDefault();
		$('#tabs p').hide();
		
	$('#tabs-nav .current').removeClass("current");
		$(this).addClass('current');
		var clicked = $(this).find('a:first').attr('href');
		
		$('#tabs ' + clicked).fadeIn('fast');
	}).eq(0).addClass('current');
	
	
	
	

	//Modal Code

	$('.modalClick').on('click', function(event){
		event.preventDefault();
		$('#overlay')
			.fadeIn()
			.find('#modal')
			.fadeIn();
	});

	$('.close').on('click', function(event){
		event.preventDefault();
		$('#overlay')
			.fadeOut()
			.find('#modal')
			.fadeOut();
	});

	$('.mystatus').mouseover(function(){
		$(this).fadeTo(100, .3);
	});

	$('.mystatus').mouseout(function(){
		$(this).fadeTo(100, 1);
	});
	
	
	
	

});
