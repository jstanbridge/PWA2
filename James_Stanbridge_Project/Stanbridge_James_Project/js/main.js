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
	
	
	
	//Login Code 
	$('#signinButton').click(function(){
		var user = $('#user').val();
		var pass = $('#pass').val();
		console.log("This notifies you if the password is working");
		$.ajax({
			url: 'xhr/login.php',
			type: 'post',
			dataType: 'json',
			data: {
				username: user,
				password: pass
			},
			success: function(response){
				console.log("Test User");
				if (response.error){
					alert(response.error);
				}else{
					window.location.assign('dashboard.html')
				};
			}
		});
	});
	
	
	
	//Logout Code
	$('#logOut').click(function(e){
		e.preventDefault;
		$.get('xhr/logout.php', function(){
			window.location.assign('index.html')
		})
	});
	
	
	
	//Register Code
	$('#register').on('click', function(){
		var firstname= $('#first').val(),
			lastname= $('#last').val();
			username= $('#userName').val();
			email= $('#email').val();
			password= $('#password').val();
			console.log(firstname+' '+lastname+' '+username+' '+email+' '+password);
			
		$.ajax({
			url:'xhr/register.php',
			type: 'post',
			dataType: 'json',
			data: {
				firstname: firstname,
				lastname: lastname,
				username: username,
				email: email,
				password: password
			},
			success: function(response){
				if (response.error){
					alert(response.error);
				}else{
					window.location.assign('dashboard.html');
				};
			}
		});
	});
	
	
	
	//Signup Button Code
	$('#signUp').click(function(){
		window.location.assign('register.html')
	});
	
	//Dashboard Button Code
	$('#dboardbtn').click(function(){
		window.location.assign('dashboard.html')
	});
	
	
	//Dynamic Username Display Code
	$.getJSON("xhr/check_login.php", function(data){
			console.log(data);
			$.each(data, function(key, val){
				console.log(val.user_n);
				$(".userid").html("Welcome "+val.user_n+"!");
			})
	});
	
	
	
	//Go To Projects Page Code
	$('.projbtn').on('click', function(e) {
		e.preventDefault();
		window.location.assign('projects.html');
	});
	
	
	
	//Add New Project Code
	$('#addButton').on('click', function() {

		var projName = $('#pName').val(),
		projDesc = $('#projectDescription').val(),
		projDue = $('pDue').val(),
		status = $('input[name = "status"]:checked').prop("id");
	
		$.ajax({
			url: "xhr/new_project.php",
			type: "post",
			dataType: "json",
			data: {
				projectName: projName,
				projectDescription: projDesc,
				dueDate: projDue,
				status: status
			},
			success: function(response) {
				console.log('Testing for success');
			
				if(response.error) {
					alert(response.error);
				}else{
					window.location.assign("projects.html");
				};
			}
		});
	});	
	
	

	//Get Projects Page Code
	var projects = function(){
	
		$.ajax({
			url: 'xhr/get_projects.php',
			type: 'get',
			dataType: 'json',
			success: function(response){
				if(response.error){
					console.log(response.error);
				}else{
					
					for(var i=0, j=response.projects.length; i < j; i++){
						var result = response.projects[i];
						
						$(".projects").append(
							'<div class="projectbox">' + 
							" <input class='projectid' type='hidden' value='" + result.id + "'>" +
							" Set Name: " + result.projectName + "<br>" +
							" Set Description: " + result.projectDescription + "<br>" +
							" Project Status: " + result.status + "<br>"
							+ '<button class="editbtn">Edit</button>'
							+ '<button class="deletebtn">Delete</button>'
							+ '</div> <br>'
						);
					};
					$('.deletebtn').on('click', function(e){
						var pid = $(this).parent().find(".projectid").val();
						console.log('test delete');
						$.ajax({
							url: 'xhr/delete_project.php',
							data: {
								projectID: pid
							},
							type: 'POST',
							dataType: 'json',
							success: function(response){
								console.log('Testing for success');
							
								if(response.error) {
									alert(response.error);
								}else{
									window.location.assign("projects.html");
								};
							}
						});
					});
				}
			}
		})
	}
	projects();
	
	
	
	//Sortable Code
	$(".mydatepicker").datepicker();
	
	
	
	//Drag & Drop Code
	$("#sortable").sortable();
	$("#sortable").disableSelection();
	
	
	
	//Progress Bar Code
	$(function() {
    	$( "#progressbar" ).progressbar({
      	value: 37
    	});
  	});
	
	
	

});	//final closing tag
