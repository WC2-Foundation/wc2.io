    //"use strict";		
    var ipStackKey = "9d13d36c2a7e9e7bc30a79a295118ee7";
    ////https://openexchangerates.org/api/latest.json?app_id=3e824a6d77374740bffd916fd232efd1
	var paymentRequest, prButton;
	var exchangeRate;
	var ttl;
	var pass;
	var handled = false;
	var handled2 = false;
	var counter = 0;
	var counter2 = 1;
	var currencySymbol = "$";
	var countryCode = "US";
	var languageCode;
	var labelTotal;
	var multiplier;
	var stripeCurrencyCode = "usd";
	var unitOfMeasure = "centimeters";
	var sizeStandardKrane = 72;
	var sizeJumboKrane = 86;
	var lengthSymbol = " cm";
    var checkoutComplete = false;
    var slideContainer = 600;
    var freeUSShippingOver = 45;
    var shippingInterArr = [];
    var shippingUSArr = [];
    var contactInformation = {firstName: "", lastName: "", emailAddress: ""};

    var cart = [
        {k: [0,28,0]}, 
        {k: [0,28,0]}, 
        {k: [0,28,0]}, 
        {k: [0,0,0]}, 
        {k: [0,0,0]},
        {k: [0,0,0]},
        {k: [0,0,0]},
        {k: [0,0,0]},
        {k: [0,0,0]},
        {k: [0,0,0]}
    ]
    
        var cartObj = {
        cartTabs: [
            {
                tabName: "Standard - 28&ldquo;", cartItems: [
                    {items: [
                            {columns: [{title: "Krane - "},{title:"Ibycus"},{size:"Standard"},{price: "24.95"},{shippingInt: ["9.00"] },{shippingUS: ["4.00"] }]},
                            {columns: [{title: "Krane - "},{title:"Pyramís"},{size:"Standard"},{price: "28.95"},{shippingInt: ["9.00"] },{shippingUS: ["4.00"] }]},
                            {columns: [{title: "Krane - "},{title:"Electrum"},{size:"Standard"},{price: "32.95"},{shippingInt: ["9.00"] },{shippingUS: ["4.00"] }]}
                        ]}
                    ]
            },
            {
                tabName: "Large - 34&ldquo;", cartItems: [
                    {items: [
                            {columns: [{title: "Krane - "},{title:"Ibycus"},{size:"Large"},{price: "28.95"},{shippingInt: ["9.00"] },{shippingUS: ["4.00"] }]},
                            {columns: [{title: "Krane - "},{title:"Pyramís"},{size:"Large"},{price: "32.95"},{shippingInt: ["9.00"] },{shippingUS: ["4.00"] }]},
                            {columns: [{title: "Krane - "},{title:"Electrum"},{size:"Large"},{price: "36.95"},{shippingInt: ["9.00"] },{shippingUS: ["4.00"] }]} 
                        ]}
                    ]  
            },
            {  
                tabName: "Accessories", cartItems: [
                    {
                        items: [
                            {columns: [{title: "Tablet Extension"},{title:""},{size: ""},{price: "9.95"},{shippingInt: ["9.00"] },{shippingUS: ["4.00"] }]},
                            {columns: [{title: "Replacement Part"},{title:""},{size: ""},{price: "2.95"},{shippingInt: ["9.00"] },{shippingUS: ["4.00"] }]}  
                        ],
                    }
                ]  
            }
        ]
    }

    var calcTotal; 
	var containers;
    var containerID = 0;
    var currencyCode;
    var paypalCurrencyCode = "usd";
    var cardNumberElement;
    var stopSmoking = false;
    var thumbnailHover;
    var calculatedTotal;
    var shippingUS = "4.00";
    var shippingInternational = "9.00";
    var cartItem = [];
	var arrayOfImages = [];
	arrayOfImages[0] = "images/main_image_lights_off.png";
	preload(arrayOfImages);





    function showTagalongOnScroll(){
        var scrollAmount = $(window).scrollTop();
        if(scrollAmount > 755){
            $("#tagalongBar-container").fadeIn(500);
        }else{
            $("#tagalongBar-container").hide();
        }
    }



    //#############################################################	
    //#############################################################	
    //#############################################################	
    //READY
    //#############################################################	
    //#############################################################	
    //#############################################################	


    var parts,canvas,ctx,paymentAPIavailable;


    
    var mg = 0;
	$(document).ready(function () {

        //languageSearch(true);
        setOrderDetailInputs(true);
        //$("#k1-qty").val(0);
        var tags2 = document.querySelectorAll('div,input,option,textarea,select,button');

        Array.from(tags2).forEach(function(value, index){
            //value.tabIndex = "-1";
        });

        $.get("./php/language_dropdown_list.php", function (response) {
            $("#language-picker").html(response);
        });	

        $("#language-search").autocomplete({
            source:  function(request, response) {
                //console.log("--->" + languageCode);
            $.getJSON('./php/language_dropdown_list.php', {
                term: $("#language-search").val(),
                language_code: languageCode
            }, response);
        },

            minLength: 1,
        }); 		

        fillHoles(0);
 
	//uncomment to test ipstack data
	$.removeCookie("country_lookup", { path: '/' });
	if ($.cookie("country_lookup")) {
		console.log("cookie exists: " + $.cookie("country_lookup"));
		countryCode = $.cookie("country_lookup");
        $("#country").val(countryCode);
        if(countryCode != "US"){
                $("#state").attr("placeholder", "Province");
        }
		$("#countries option[value=\"" + $.cookie("country_lookup") + "\"]").attr('selected','selected');
		detectLanguage();
		//convert(currencyCode);
	}else{
			//First visit, grab language and currency data
			$.get("https://api.ipstack.com/check?access_key=" + ipStackKey, function (response) {
				var currencySymbol = response.currency.symbol;
				//ajax call to mysql, make sure currency is supported; if not fallback 
				//to US for now (TODO: country based fallback [euros etc])
				currencyCode = response.currency.code.toLowerCase(); //nok
                paypalCurrencyCode =  "usd"; //convert(currencyCode,"paypal"); //response.currency.code.toLowerCase();
				var countryCode = response.country_code;
				
				if(countryCode == "US"){
					unitOfMeasure = "inches";
					sizeStandardKrane = 28;
					sizeJumboKrane = 34;
					lengthSymbol = "&#34;";
				}
                 
				setMeasurementVariables();
				var lc = response.location.languages[0]["code"]; //no
                var cc = response.country_name;
                
				
                convert(currencyCode,"stripe"); 
				createCookie("country_lookup",cc);
				$("#country").val(cc);
                
                detectLanguage(lc);
                
			}, "jsonp");

	}
        		
    var requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
    window.requestAnimationFrame = requestAnimationFrame;

	canvas = document.getElementById("canvas"),
	ctx = canvas.getContext("2d");
	canvas.height = 300; //document.body.offsetHeight;
	canvas.width = 300;    
    parts = [],
    minSpawnTime = 60,
    lastTime = new Date().getTime(),
    maxLifeTime = Math.min(5000, (canvas.height/(1.5*60)*1000)),
    emitterX = canvas.width / 2,
    emitterY = canvas.height - 50,
    smokeImage = new Image();	
	smokeImage.src = "images/smoke.png";
	
	smokeImage.onload = function () {
		render();
	}

        
});	

    showTagalongOnScroll();


//#############################################################	
//#############################################################	
//#############################################################	
//END READY
//#############################################################	
//#############################################################	
//#############################################################


        
		function sendContactFormMessage(){ 
                
                $.post("./php/contact_form.php", {emailOrPhoneNumber: $("#emailOrPhoneNumber").val(), message: $("#message").val()}, function(result){
				
				if(result){
						$("#contact-form-wrapper").hide();
						$("#message-sent").show();
						console.log("sendContactFormMessage: " + result);
					}else{
						$("#contact-form-wrapper").hide();
						$("#message-sent").show();
						$("#message-sent").text("Send Failed. Please use email address.");
						console.log("Failed");
				}
			});			
		}
        

    function measureString(str){
        canvas = document.createElement('canvas');
        ctx = canvas.getContext("2d");
        fontSize = 28;
        ctx.font = "normal normal " + fontSize + "px 'Comfortaa', cursive";       
        width = ctx.measureText(str).width; 
        return width;
    }
 
    function resizeDiv(str,width,ele){
        canvas = document.createElement('canvas');
        ctx = canvas.getContext("2d");
        fontSize = 28;
        while(width > ele){
            ctx.font = "normal normal " + fontSize + "px 'Comfortaa', cursive";       
            width = ctx.measureText(str).width; 
            fontSize-=4;
        }
        return fontSize + "px"; 
    }




    //The following is for Safari 8 and below
    var ua = navigator.userAgent;
    var verRe = /Version\/(\d+)/;
    var version = ua.match(verRe);
    var safari = ua.indexOf("Safari");

    if (safari !== -1 && version !== null)  {
        if (version[1] <= 8) {
            addStyleTag("./css/safari8.css");
        }
    }

    function addStyleTag(url) {
        var link,head;
        head = document.querySelector("head");
        link = document.createElement("link");
        link.setAttribute("href",url);
        link.setAttribute("type","text/css");
        link.setAttribute("rel","stylesheet");
        head.appendChild(link);
    }






	function spawn() {
        //var lastTime, minSpawnTime;
        if(stopSmoking){return};
		if (new Date().getTime() > lastTime + minSpawnTime) {
			lastTime = new Date().getTime();
			parts.push(new smoke(emitterX, emitterY));
		}
	}

    
    
	function render() {
		var len = parts.length;
		ctx.clearRect(0, 0, canvas.width, canvas.height);

		while (len--) {
			if (parts[len].y < 0 || parts[len].lifeTime > maxLifeTime) {
				parts.splice(len, 1);
			} else {
				parts[len].update();
				ctx.save();
				var offsetX = -parts[len].size/2,offsetY = -parts[len].size/2;
				ctx.translate(parts[len].x-offsetX, parts[len].y-offsetY);
				ctx.rotate(parts[len].angle / 180 * Math.PI);
				ctx.globalAlpha  = parts[len].alpha;
				ctx.drawImage(smokeImage, offsetX,offsetY, parts[len].size, parts[len].size);
				ctx.restore();
			}
		}
		spawn();
		requestAnimationFrame(render);
	}

	function smoke(x, y, index) {
		this.x = x;
		this.y = y;

		this.size = 1;
		this.startSize = 10;
		this.endSize = 22;

		this.angle = Math.random() * 359;

		this.startLife = new Date().getTime();
		this.lifeTime = 0;

		this.velY = -1 - (Math.random()*0.04);
		this.velX = Math.floor(Math.random() * (-6) + 3) / 10;
	}

	smoke.prototype.update = function () {
		this.lifeTime = new Date().getTime() - this.startLife;
		this.angle += 0.2;
		
		var lifePerc = ((this.lifeTime / maxLifeTime) * 100);

		this.size = this.startSize + ((this.endSize - this.startSize) * lifePerc * .1);

		this.alpha = 1 - (lifePerc * .01);
		this.alpha = Math.max(this.alpha,0);
		
		this.x += this.velX;
		this.y += this.velY;
	}

	//window.onresize = resizeMe;
	//window.onload = resizeMe,calculateTotal();
	//function resizeMe() {
	   //canvas.height = document.body.offsetHeight;
	//}
	
	 function preload(arrayOfImages) {
		$(arrayOfImages).each(function () {
			$('<img />').attr('src',this).appendTo('body').css('display','none');
		});
	}


			
	function createCookie(cookieName,CC){
	 	$.cookie(cookieName,CC,{ expires : 7, path: '/' } );	
	}



