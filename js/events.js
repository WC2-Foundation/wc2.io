

function loadEvents() {

    
   
    
    
        $("[id^=size-]").change(function() {
            q = this.id;
            cart[q.replace("size-","")][1] = this.value;
            console.log("???" + cart["k1"][1]);
            
        });
    
        var clickedTab = "tab1";
        $(".cart-tab-buttons").on('click', function(){
             $(".cart-tab-buttons").each(function(){$(this).css("background-color","#1B1B1B");})
            $(this).css("background-color","forestgreen");
            clickedTab = this.id;
            
            $("#cart-container-0").hide();
            $("#cart-container-1").hide();
            $("#cart-container-2").hide();
            
            if(clickedTab == "tab1"){
                console.log("tab1");
                $("#cart-container-0").show();
            };
            if(clickedTab == "tab2"){
                console.log("tab2");
                $("#cart-container-1").show();
            };
            if(clickedTab == "tab3"){
                console.log("tab3");
                $("#cart-container-2").show();
            };
            
        });
    
         $(".cart-tab-buttons").hover(function(){
            $(this).css("background-color","darkgreen");
		});    
    
        $(".cart-tab-buttons").mouseout(function(){
            $(this).css("background-color","#1B1B1B");
            
            if(this.id == clickedTab){
                $(this).css("background-color","darkgreen");
            }
		});  

        $('#country').change(function() { 
                if($('#country').val() == "United States" || $('#country').val() == "US" || $('#country').val() == "U.S."){
                    $("#state").attr("placeholder", "State");
                }else{
                    $("#state").attr("placeholder", "Province");
                }
		  });	
		
        $("#next").on('click', function(){
            navigate(true);
		});

		$('#next').on('keypress', function(e) {
			if(e.keyCode == 13) {
				navigate(true); 
			}
		});
        $("#countries").click(function(e) {
            e.stopPropagation();
        });

            $("#chat-button-send").click(function(e) {
                q = $('#chat').val();
                n = $('#name').val();
                console.log(n + ': ' + q);$('#chat').val('');$('#chat').focus();
        });
        
		var toggleOff = false;
		$(document).keydown(function (e) {
					var keycode1 = (e.keyCode ? e.keyCode : e.which);
					if(e.shiftKey && e.which == 9){
						return;
					}		
					if (keycode1 == 0 || keycode1 == 9) {
						var focused = document.activeElement.id;
						if(focused == "next"){
							e.preventDefault();
							e.stopPropagation();
						}
					}
				if(toggleOff){
				}
			});


        $("#krane-model-ibycus").mouseover(function() {
                    showThumbnail(0,true);
                    thumbnailHover = true;
        });
    
        $("#krane-model-ibycus").mouseout(function() {
                    thumbnailHover = false;
                    showThumbnail(0,false);
            
        });
    
        $("#krane-model-pyramís").mouseover(function() {
                    showThumbnail(1,true);
            
                    thumbnailHover = true;
        });
        $("#krane-model-pyramís").mouseout(function() {
                    thumbnailHover = false;
                    showThumbnail(1,false);
            
        });
    
    
        $("#krane-model-electrum").mouseover(function() {
                    showThumbnail(2,true);
            console.log("???");
                    thumbnailHover = true;
        });
    
        $("#krane-model-electrum").mouseout(function() {
                    thumbnailHover = false;
            console.log("???");
                    showThumbnail(2,false);
            
        });
            


        $("#country").autocomplete({
            source:  function(request, response) {
                //console.log("--->" + languageCode);
            $.getJSON('./php/shipping_country.php', {
                term: $("#country").val(),
                language_code: languageCode
            }, response);
        },

            minLength: 1,
        });

		$("#buy-now").on('click', function(e){
			checkout();
		});
        
  		$("#stop-it").on('click', function(e){
			$("#crazy-click").html("CrAzY ClIcK <a href = ''> ::: ");
		});     
        
		
		$("#pay-with-paypal").on('click', function(e){
            containerID = 1;
            navigate(true);
		});

		$("#CCbutton").on("click", function(e){
			containerID = 0;
			navigate(true);
		});
		
		$("#send-message").on("click", function(e){
			
		$("#emailOrPhoneNumber").val().length ? changeBGcolor("emailOrPhoneNumber",true,"#000") : changeBGcolor("emailOrPhoneNumber",false,"#000");
		$("#message").val().length ? changeBGcolor("message",true,"#000") : changeBGcolor("message",false,"#000");
			
			if($("#emailOrPhoneNumber").val().length > 0 && $("#message").val().length > 0){
			
				if($("#captcha").val() == 4){
							sendContactFormMessage();
						}else{
							$("#captcha").css('background-color',"red");
					}
				}else{
					console.log("email or message or both etc");
					changeBGcolor("k1-qty",false);
				};
		});		

		$("#back").on('click', function(){
            //console.log("___>");
            navigate(false);
		});

		$("#turn-off-lights").on( "click", function(e) {
			$(".einstein").toggleClass("active");
		});
    
    
       $("#countries2 li").on("click", function(){
      alert($(this).text());

    });
		

		$("#content-i").mCustomScrollbar({theme:"inset"});
		
		$("#instagram").on('click',function() {
			window.open('https://www.instagram.com/krane.tv/','_blank');
		});

		$("#facebook").on('click',function() {
			window.open('https://www.facebook.com/krane.tv','_blank');
		});
		
		$("#twitter").on('click',function() {
			window.open('https://twitter.com/KraneTV','_blank');
		});

		$("#pinterest").on('click',function() {
			window.open('https://www.pinterest.com/kranetv/','_blank');
		});
		
		$("#tag-along-logo").on('click',function() {
			//$('html, body').animate({scrollTop: $("#thetop").offset().top}, 1000);
			$("html,body").animate({scrollTop:$(".thetop").offset().top},"1000");
		});
	
		$("#tagalong-nav-1").on('click',function() {
			$('html, body').animate({scrollTop: $("#about-krane").offset().top}, 1000);
		});
		
		$("#tagalong-nav-2").on('click',function() {
			$('html, body').animate({scrollTop: $("#order-krane").offset().top}, 1000);
		});
		
		$("#tagalong-nav-3").on('click',function() {
			$('html, body').animate({scrollTop: $("#contact-krane").offset().top}, 1000);
		});

		$("#nav1").on('click',function() {
			$('html, body').animate({scrollTop: $("#about-krane").offset().top}, 1000);
		});

		$("#nav2").on('click',function() {
			$('html, body').animate({scrollTop: $("#order-krane").offset().top}, 1000);
		});

		$("#nav3").on('click',function() {
			$('html, body').animate({scrollTop: $("#contact-krane").offset().top}, 1000);
		});		
		$("#login").on('click',function() {
			//$(location).attr('href',"/admin/");
			$("#language-picker").show();
			
		});
        
		$("#crazy-click").on('click',function() {
			//$(location).attr('href',"/admin/");
			$("#crazy-click").html("CrAzY cLiCkEd <a href = ''> ::: ");
			
		});

		$("#shopping-cart").on('click',function() {
			$('html, body').animate({scrollTop: $("#order-krane").offset().top}, 1000); 
		});
        
		$("#buy-on-amazon").on('click',function() {
            window.open("https://www.amazon.com/s/ref=hnd_pdp_byline?_encoding=UTF8&node=11260432011&lo=image&me=AIFHS54CQVDIY" 
            ,'_blank');
        });
		
		$("#no-smoking").on('click',function() {
			stopSmoking = !stopSmoking;
		});
     
    
	$("#country").keypress(function (e) {
		$("#country").attr("autocomplete","off");
	});


	$("#quantity").keyup(function (e) {
	 //Catch non-digit entries
        if($("#quantity").val() <= 0){
            $("#quantity").val("1");
            return false;
         }
		 if (e.which != 8 && e.which != 0 && (e.which < 48 || e.which > 57)) {
			//display error message
			$("#errmsg").html("Digits Only").show().fadeOut("slow");
			 $("#quantity").val("1");
			 return false;
		}
	});
    
    
	$("#discount-code").keyup(function (e) {
		$.post("/php/discount_code.php", {"code": $("#discount-code").val()}, function(result){
			
            console.log(result);
            if(result){
                    
                    if(result == "false"){
                            $("#available-discounts").fadeOut();
                            $("#discount-code").css("background-color","white");
                        }else{
                            $("#discount-code").css("background-color","forestgreen");
                           $("#available-discounts").fadeIn();
                            $("#" + result).addClass("enableCartItems");
                    }
				}else{
                    $("#available-discounts").fadeOut();
                    
			}
		})
	});
		

 	$(window).scroll(function() {
		if ($(this).scrollTop() > 50 ) {
			$('.scrolltop:hidden').stop(true, true).fadeIn();
		} else {
			$('.scrolltop').stop(true, true).fadeOut();
		}
	});



$(document).mouseup(function(e) 
{
    var container = $("#language-picker");

    // if the target of the click isn't the container nor a descendant of the container
    if (!container.is(e.target) && container.has(e.target).length === 0) 
    {
        container.hide();
    }
});

$("#extensions").keypress(function (e) {
        //digits only
        if (e.which != 8 && e.which != 0 && (e.which < 48 || e.which > 57)) {
            return false;
        }
    });
	
	$(function(){$(".scroll").click(function(){$("html,body").animate({scrollTop:$(".thetop").offset().top},"1000");return false})})
   
    
    
    
      $(document).scroll(function(e){
        showTagalongOnScroll();
    });  
    
 
    

    
    
    
    
    
    
    
}









