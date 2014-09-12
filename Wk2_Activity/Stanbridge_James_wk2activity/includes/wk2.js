/**
 * @author James Stanbridge
 */

$(document).ready(function(){
	
	$('.wk2_question').click(function(){
		
		if ( $(this).parent().is('.open') ){
			$(this).closest('.wk2').find('.wk2_answer_container').animate({'height':'0'},500);
			$(this).closest('.wk2').find('.letter_a').fadeOut(500);
			$(this).closest('.wk2').find('.letter_q').animate({'left':'25px'});
			$(this).closest('.wk2').removeClass('open');
		}else{
			var newHeight = $(this).closest('.wk2').find('.wk2_answer').height() + 'px';
			$(this).closest('.wk2').find('.wk2_answer_container').animate({'height':newHeight},500);
			$(this).closest('.wk2').find('.letter_a').fadeIn(500);
			$(this).closest('.wk2').find('.letter_q').animate({'left':'10px'});
			$(this).closest('.wk2').addClass('open');
		}	
	});
	
	$('.wk2').each(function(){
		$(this).append('<div class="letter_q"></div><div class="letter_a"></div>');	
	});
	
	findAnchorLink();
	
});

function findAnchorLink(){
	if( location.href.indexOf('#') != -1){
		var namedAnchor = window.location.hash;
		var wk2ToFind = namedAnchor + ' .wk2_question';
		$(wk2ToFind).trigger('click');
	}
}






