
    //########################################################################
    //########################################################################
    //########################################################################
    //---------------------------- TRUTH SEREUM ------------------------------
    //---------------------------- truthserum.io -----------------------------
    //########################################################################
    //########################################################################
    //########################################################################
	
    var paypalSandboxKey = 'AXNBHeDq2JrjOTfP8sNlOuZorGOBNG5_9QuWelMSgznz6PBvFmJhT7e01jqfmw1a_NAT8cWnOmGA3tVn';
    //var paypalProductionKey = 'AZQS_HL1WChQTKMDP1vUJXUvVxl9ggnqdV7-RdqQjqj2wcUrbMg-0BPeth5My3N7gNTuw4NipsI9VAp9';

    var cardBrandToPfClass = {
        'visa': 'pf-visa',
      'mastercard': 'pf-mastercard',
      'amex': 'pf-american-express',
      'discover': 'pf-discover',
      'diners': 'pf-diners',
      'jcb': 'pf-jcb',
      'unknown': 'pf-credit-card',
    }
    
    
    
    var nextDiv = [];
    var navPositionObj = {
        "positions" : [
          {"name":"manually-entered", "functions":[ 
            {"name" : "order-details", "x": "120px", "y": "-280px", "skipContainerAnimation" : false},
            {"name" : "pay-with", "x": "", "y": "",  "skipContainerAnimation" : false},
            {"name" : "contact-information", "x": "50px", "y": "-500px",  "skipContainerAnimation" : false},
            {"name" : "shipping", "x" : "35px", "y": "-380px", "skipContainerAnimation" : false},
            {"name" : "cc-inputs", "x" : "50px", "y": "-485px", "skipContainerAnimation" : true},
            {"name" : "order-review", "x" : "50px", "y": "-505px", "skipContainerAnimation" : true}
          ]},
          {"name":"paypal", "functions":[
            {"name" : "start", "x": "", "y": "", "skipContainerAnimation" : false},
            {"name" : "paypal", "x": "-20px", "y": "-200px",  "skipContainerAnimation" : false}
          ]},
          {"name":"CCerror", "functions":[ 
            {"name" : "start", "x": "", "y": "", "skipContainerAnimation" : true}
          ]}
        ]    
    }
    
    var containersObj = {
      "width":"600",
      "containers":[
            {"name":"order-details", "functions":[ 
                {"functionName" : "calculateTotal", "reverse" : false, "parameters":[true]}, 
                {"functionName" : "generatePaymentRequest",  "reverse" : false, "parameters":[]},
                {"functionName" : "isWebAPIavaiable",  "reverse" : false, "parameters":[]},
                {"functionName" : "updatePaypal",  "reverse" : false, "parameters":[]},
                {"functionName" : "showHideMainNav",  "reverse" : false, "parameters":[true,false]},
                {"functionName" : "showHideMainNav",  "reverse" : true, "parameters":[true,true]},
                {"functionName" : "fillHoles",  "reverse" : false, "parameters":[1]}
            ]},
            {"name" : "pay-with", "functions" : [
                {"functionName" : "moveNavPayAPI", "reverse" : true, "parameters":[]},
                {"functionName" : "showHideMainNav", "reverse" : false, "parameters":[true,true]},
                {"functionName" : "showHideMainNav", "reverse" : true, "parameters":[true,false]},
                {"functionName" : "fillHoles",  "reverse" : false, "parameters":[2]}
            ]},
            {"name" : "contact-information", "skipContainerAnimation" : false, "functions" : [
                {"functionName" : "checkNameAndEmail", "reverse" : false, "parameters":[]},
                {"functionName" : "fillHoles",  "reverse" : false, "parameters":[5]}
            ]},
            {"name" : "shipping", "functions" : [
                {"functionName" : "validateShipping", "reverse" : false, "parameters":[]},
                {"functionName" : "saveShippingInformation", "reverse" : false, "parameters":[]},
                {"functionName" : "fillHoles",  "reverse" : false, "parameters":[8]}
            ]},
            {"name" : "cc-inputs", "functions" : [
                {"functionName" : "createStripeToken", "reverse" : false, "parameters":[]},
                {"functionName" : "showHideMainNav", "reverse" : true, "parameters":[true,true]}
            ]},
            {"name" : "order-review", "functions" : [
                {"functionName" : "showHideMainNav", "reverse" : true, "parameters":[true,true]}
            ]}      
        ],
      "paypal":[
            {"name" : "pay-with", "functions" : [
                {"functionName" : "fillHoles",  "reverse" : false, "parameters":[2]},
                {"functionName" : "moveNavPayAPI", "reverse" : true, "parameters":[]}
            ]},
            {"name":"paypal", "functions":[
                {"functionName" : "fillHoles",  "reverse" : false, "parameters":[1]}
            ]}
        ]
     }
    

    var containers = [containersObj.containers, containersObj.paypal];
    //reset array of counters
    for(i in containers){
        nextDiv[i] = 0;
    }

    function navigate(forward){
        
        if(!forward && nextDiv[containerID] == 0){return};
        var j, functions = forward ? containers[containerID][nextDiv[containerID]].functions : containers[containerID][nextDiv[containerID]-1].functions;
        for(j in functions){
            var callFunc = functions[j].functionName;
            var params = functions[j].parameters;
            var reverse = functions[j].reverse;
            if((forward && !reverse) || (!forward && reverse)){
                var func = window[callFunc];
                var returnedValue = func(params);
                if(typeof returnedValue === "boolean"){
                    if(returnedValue == false){
                        return false;
                    }
                }
            }
        }
        
        console.log("Container Name: " + containers[containerID][nextDiv[containerID]].name);
        if(navPositionObj.positions[containerID].functions[nextDiv[containerID]].skipContainerAnimation == true && forward){return};
        if(nextDiv[containerID] >= containersObj.containers.length - 1 && forward){return};
        forward ? nextDiv[containerID]++ : nextDiv[containerID]--;
        //console.log("containerID: " + containerID);
        animateContainers(forward,containerID);
        if(navPositionObj.positions[containerID].functions[nextDiv[containerID]].name == "start"){containerID = 0;}

    }

    function animateContainers(forward, containerID){
        var incDec = forward ? nextDiv[containerID]-1:nextDiv[containerID] + 1;
        var leftFR = forward ? "-" + containersObj.width + "px" :  containersObj.width + "px";
        var x = navPositionObj.positions[containerID].functions[nextDiv[containerID]].x;
        var y = navPositionObj.positions[containerID].functions[nextDiv[containerID]].y;
        if(x.length > 0){$("#main").animate({left: x,top: y})};
        $("#" + containers[containerID][incDec].name).animate({left: leftFR});
        $("#" + containers[containerID][nextDiv[containerID]].name).animate({left: "0px"},{complete:function(){displayNone(containerID,nextDiv[containerID])}});
        $("#" + containers[containerID][nextDiv[containerID]].name).css("display","block");
    }

    

    
        function buildShoppingCart(){
                console.log("buildShoppingCart()");
                $("#cart-outter-container").empty();
                m = cartObj.cartTabs;
                for(n in m){
                    tabName = m[n].tabName;
                    tabNameSuffix = (parseFloat(n) + 1);
                    if(n == 0){firstMiddleLast = "cart-tab-first"};
                    if(n > 0 && n < m.length){firstMiddleLast = ""};
                    if(n == m.length - 1){firstMiddleLast = "cart-tab-last"};
                    
                    $("#cart-tab-button-container").append('<button data-languagekey = "cart-tab-' + tabNameSuffix + '" id = "tab' + tabNameSuffix + '" class = "cart-tab-buttons ' + firstMiddleLast + '"></button>');
                    $("#cart-outter-container").append('<div class = "cart-tabs" id = "cart-container-' + n + '"></div>');
                    w = m[n].cartItems;
                        for(j in w){
                            y = w[j].items;
                            for(p in y){
                                a = y[p].columns;
                                cartItem[mg] = a[3].price;
                                k = (cartItem[mg] * exchangeRate);
                                adjustedTotal = Math.round(k.toFixed(2) * 1000) / 10;
                                shippingInterArr[mg] = a[4].shippingInt[0];
                                shippingUSArr[mg] = a[5].shippingUS[0];
                                formattedCurrency = formatCurrency(currencyCode,languageCode + "-" + countryCode,k);
                                newItem = createCartRow(a[0].title,a[1].title,a[2].size,formattedCurrency);
                                $("#cart-container-" + n).append(newItem);
                                $("#cart-container-" + n).addClass("cart-tabs");
                            }
                        }
                }
                loadEvents();
                translateCart();
        }



        function translateCart(){
            console.log("translateCart()");
            $.post("./php/get_native_language.php", {language_code: languageCode,}, 

               function(result){
                        var j = 0;
                        var langDocument = JSON.parse(result);
                        var tags = document.getElementById('orderForm1').querySelectorAll('div,input,span,a,label,option,textarea,select,button');
                        Array.from(tags).forEach(function(value, index){
                            var key = value.dataset.languagekey;
                            j++;  
                            c = value.id;
                            if(langDocument[key] && c !== "total" && c !== "you-have-number-of-items-in-cart"){
                                value.placeholder = langDocument[key];
                                value.innerText =  decodeEntities(langDocument[key]);
                            }
                            
                            if(c.indexOf("cartItem-") == 0){
                                $("#" + c).boxfit({maximum_font_size: 18});
                            }
                        }

                    );
                //wait for boxfit to calculate font sizes
                ship = freeUSShippingOver * exchangeRate;
                ship = formatCurrency(currencyCode,languageCode + "-" + countryCode,ship.toFixed(0),0);
                 $('*[data-languagekey="shipping-offer"]').html(langDocument["shipping-offer"] + " " + ship);
                $("#tab1").click();
                $("#cart-container-0").show();
                }
            );
        }

        function createCartRow(productName,productModel,productSize,productPrice){
            console.log("createCartRow(" + productName + "," + productModel + "," + productSize + "," + productPrice + ")");
            var returnCart = '<div id = "k' + mg + '" class="grid-container">' +
            '    <div class="grid-item">' +
            '        <i class="fas fa-check checkmarks" id = "checkmark-' + mg + '"></i>' +
            '        <i class="fas fa-shopping-cart" style = "padding-left:5px;"></i>' +
            '    </div>' +
            '    <div class="grid-item-center"  >' +
            '        ' + productName + '  <a href = "#ibycus" class = "thumbnail-links" id = "krane-model-' + productModel.toLowerCase() + '" >' + productModel + '</a>'+
            '        <div id = "ibycus" class = "thumbnails" ></div>' +
            '    </div>'+
            '    <div class="grid-item-right" data-languagekey = "' + productSize.toLowerCase() + '"></div>' +
            '    <div class="grid-item-right">' +
            '        <div id = "cartItem-' + mg + '"  >' + productPrice + ' x</div>' +
            '    </div>'+
            '    <div class="grid-item">'+
            '        <input type="number" tabindex = "1" class = "cart-qty" id = "k' + mg + '-qty" onChange="addItemToCart(\'' + mg + '\');" value = "0" min="0" max="10000" >'+
            '    </div>'+
            '</div>';
            mg++;
            return returnCart;
        }
    
        var mg2 = 0;
        function buildShoppingCart2(){


                io = 0;
                m = cartObj.cartTabs;
                var listCounter = 0; 
            
                for(n in m){
                    tabName = m[n].tabName;
                    w = m[n].cartItems;
                        for(j in w){
                            y = w[j].items;
                            for(p in y){
                                a = y[p].columns;
                                //cartItem[mg] = a[3].price;
                                g = (cartItem[io] * exchangeRate);
                                adjustedTotal = Math.round(g.toFixed(2) * 1000) / 10;
                                //console.log("======> " + cart[mg].k[0]);
                                //shippingInterArr[mg] = a[4].shippingInt[0];
                                //shippingUSArr[mg] = a[5].shippingUS[0];
                                //mm = cart[io].k[0];
                                //console.log("***> " + mm);
 
                                if(cart[io].k[0] > 0){
                                    formattedCurrency = formatCurrency(currencyCode,languageCode + "-" + countryCode,g);
                                    newItem = createCartRow2(a[0].title,a[1].title,a[2].size,formattedCurrency,cart[io].k[0]);
                                    $("#review-order-container").append(newItem);
                                    listCounter++;
                                }
                                io++;
                            }  
                        }
                }
            
/*           while(listCounter < 3){
                //newItem = createCartRow2("","","","","",true);
                //$("#review-order-container").addClass("review-cart-tab");
                //$("#review-order-container").append(newItem);
                //$("#m" + listCounter).addClass("disableCartItems");
               listCounter++;
            }*/
            
            console.log("listCounter: " + listCounter);
            if(listCounter == 2){
                
              
                //document.getElementsByClassName("review-cart-tab").style.overflowY = "hidden";
                //$("#review-order-shipping").css({width: "575px"});
            }
            if(listCounter == 1){
                 //document.getElementsByClassName("review-cart-tab").style.overflowY = "hidden";
                //$("#review-order-shipping").css({top: "140px"});
            //    $("#review-order-shipping").css({width: "575px"});
            }
            $("#review-order-container").addClass("review-cart-tab");
            $("#review-order-container").show();
            //$("#m0").addClass("disableCartItems");
        }

        function createCartRow2(productName,productModel,productSize,productPrice,qty,blankRow = false){
            
            //qty > 0 ? a = "visible" : a = "hidden";
            var rowClass;
            blankRow ? rowClass = "" : "";
            var returnCart = '<div id = "m' + mg2 + '" class="grid-container" >' +
            '<div class="grid-item">';
                returnCart += '<i class="fas fa-check checkmarks" style = "visibility:visible" id = "checkmark-' + mg2 + '"></i>' +
                              '<i class="fas fa-shopping-cart" style = "padding-left:5px;"></i>';
            
            returnCart += '</div>' + 
            '    <div class="grid-item-center">' +
            '        ' + productName + '  <a href = "#ibycus" class = "thumbnail-links" id = "krane-model-' + productModel.toLowerCase() + '" >' + productModel + '</a>'+
            '        <div id = "ibycus" class = "thumbnails" ></div>' +
            '    </div>' +
            '    <div class="grid-item-right" data-languagekey = "' + productSize.toLowerCase() + '" >' +
            '' + productSize +
            '    </div>' +
            '    <div class="grid-item-right">' +
            '        <div id = "cartItem-' + mg2 + '" >' + productPrice + ' x</div>' +
            '    </div>'+
            '    <div class="grid-item">';

               returnCart += '<input type="number" tabindex = "1" class = "cart-qty" id = "k' + mg2 + '-qty" onChange="" value = "' + qty + '" min="0" max="10000" >';
            
            returnCart +=  '</div>' +
            '</div>';
            mg2++;
            return returnCart;
        }
    



    function calculateShipping(location){
        console.log("calculateShipping(" + location + ")");
        if(location == "US"){
                //exchangeRate
                newTotal = (shippingUS * 100);
                calculatedAmount = (newTotal + calculatedTotal);
                return newTotal;
        }
        if(location == "international"){
                newTotal = (shippingInternational * 100);
                calculatedAmount = newTotal + calculatedTotal;
                return newTotal;
        }
    }
    
		function setBrandIcon(brand) {
			
			var brandIconElement = document.getElementById('brand-icon');
			var pfClass = 'pf-credit-card';
			if (brand in cardBrandToPfClass) {
				pfClass = cardBrandToPfClass[brand];
			}
			for (var i = brandIconElement.classList.length - 1; i >= 0; i--) {
				brandIconElement.classList.remove(brandIconElement.classList[i]);
			}
			brandIconElement.classList.add('pf');
			brandIconElement.classList.add(pfClass);
			
		}





    function calculateDiscountedTotal(setInputs = false){
		
		var kraneqty = $('#k1-qty').val();
		var extenqty = $('#extensions').html();
        //cartitems = prices
		var q = k1 + k2 + k3 + k4;
		ttl = (q * exchangeRate);
		//ttl = Math.floor(ttl);
        //$("#a").addClass("disableCartItems");
        ttl = ttl.toFixed(2);
        calculatedTotal = Math.round(ttl * 1000) / 10;
        if(setInputs){setOrderDetailInputs(true)};
		var locale = languageCode + "-" + countryCode;
		var formattedCurrency = formatCurrency(currencyCode,locale,ttl);		
		$('#total').html(labelTotal + ": " + formattedCurrency);
		$('#review-order-price').html(labelTotal + ": " + formattedCurrency); 
		var calcTotal = true;
		if(ttl == 0 | isNaN(ttl)){
            if(setInputs){setOrderDetailInputs(false)};
			return false;
		}
		return true;
		 
	}




    function calculateTotal(setInputs = false){
		console.log("calculateTotal(" + setInputs + ")");
		var kraneqty = $('#k1-qty').val();
		var extenqty = $('#extensions').html();
        //cartitems = prices
        var p = 0;
        
        for(E in cart){
            if(cartItem[E] !== undefined && cart[E].k[0] > 0){
                //console.log("Cart Quantity: " + cart[E].k[0]);
                //console.log("Item Price: " + cartItem[E]);
                c = (cart[E].k[0] * cartItem[E]);
                p += c;
            } 
        }
        
        ttl = (p * exchangeRate);
		if(currencyCode == "jpy"){
			 minFractional = 0;
		  }else{
            minFractional = 2;
        }
        
        ttl = ttl.toFixed(minFractional);
        calculatedTotal = Math.round(ttl * 1000) / 10;
        if(setInputs){setOrderDetailInputs(true)};
		var locale = languageCode + "-" + countryCode;
		var formattedCurrency = formatCurrency(currencyCode,locale,ttl);		
		$('#total').html(labelTotal + ": " + formattedCurrency);
        
		$('#review-order-price').html(labelTotal + ": " + formattedCurrency); 
		var calcTotal = true;
		if(ttl == 0 | isNaN(ttl)){
            if(setInputs){setOrderDetailInputs(false)};
			return false;
		}
		return true;
		 
	}



    function displayNone(containerID,nextDiv){
        console.log("displayNone(" + containerID + "," + nextDiv + ")");
        $(".order-containers").each(function(i, obj){
                if(containers[containerID][nextDiv].name !== obj.id){
                    $(this).css({
                        "display": "none"
                    });
                }
            });
            $("#" + containers[containerID][nextDiv].name).find(':input')[0].focus();
    }


    function showHideMainNav(arr){
       console.log("showHideMainNav(" + arr + ")");
        var showBack = arr[0];
        var showNext = arr[1];
        
        if(showBack){
                $('#back').show(300);
                $('#back-button-label').show(300);
            }else{
                $('#back').hide(300);
                $('#back-button-label').hide(300);
        }
        if(showNext){
                $('#next').show(300);
                $('#next-button-label').show(300);
            }else{
                $('#next').hide(300);
                $('#next-button-label').hide(300);
        }
    }

    function saveShippingInformation(){
        console.log("saveShippingInformation()");
        var shippingAddress = {
            "country"  : $("#country").val(),
            "address1" : $("#address1").val(),
            "address2" : $("#address2").val(),
            "address3" : "",
            "city" : $("#city").val(),
            "state" : $("#state").val(),
            "zip" : $("#zip").val()
        };

        $.post("./php/save_customer_information.php", {
            "updateType": "cart",
            "customer_name": $("#firstName").val() + " " + $("#lastName").val(),
            "email_address": $("#emailAddress").val(),
            "cart": JSON.stringify(cart),
            "shippingAddress": JSON.stringify(shippingAddress)
        }, function(result){
            //console.log("--->" + result);

            buildShoppingCart2();
            
            if(result > 0){
                    return true;
                }else{
                    return false;     
            }
        });

    }

	function formatCurrency(currencyCode,locale,amount,minFractional = 2){
        console.log("formatCurrency(" + currencyCode + "," + locale + "," + amount + "," + minFractional + ")");
		//currencyCode = 3 letter: USD
		//locale = en-US
		//amount = dollar amount
		//currencyCode = "MXN";
		//locale = "es-MX";

		//Set non-decimal currency variable
		//var minFractional = 2;
		if(currencyCode == "jpy"){
			minFractional = 0;
		}	
		const formatter = new Intl.NumberFormat(locale, {
		  style: 'currency',
		  currency: currencyCode,
		  currencyDisplay: 'symbol',
		  minimumFractionDigits: minFractional
		})
		return formatter.format(amount);
	}

	var cartItemCounter = 0;
	var cartItemArray = [];

	function validateShipping(){
        console.log("validateShipping()");
		pass = true;
		$("#address1").val().length===0?pass=changeBGcolor("address1",false):changeBGcolor("address1",true);
		$("#country").val().length===0?pass=changeBGcolor("country",false):changeBGcolor("country",true);
		$("#city").val().length===0?pass=changeBGcolor("city",false):changeBGcolor("city",true);
		$("#state").val().length===0?pass=changeBGcolor("state",false):changeBGcolor("state",true);
		$("#zip").val().length===0?pass=changeBGcolor("zip",false):changeBGcolor("zip",true);

		if(pass){
				return true;
			}else{
				return false;
		}
	}

    function addItemToCart(sku,incrementQty = 0){
        console.log("addItemToCart(" + sku + "," + incrementQty + ")");
        if(incrementQty){
            var b = parseInt($("#k" + sku + "-qty").val());
            $("#k" + sku + "-qty").val(b + 1);
        }
        var qty = $("#k" + sku + "-qty").val();
        cart[sku].k[0] = qty;
        cart[sku].k[2] = cartItem[sku];
        //If item value is greater than 0, set checkmark to visible
        var a;
        qty > 0 ? a = "visible" : a = "hidden";

        calculateTotal();

        var totalItemsInCart = 0;
        for(w in cartItem){
            totalItemsInCart += parseInt($("#k" + w + "-qty").val());
            changeBGcolor("k" + w + "-qty",true);
        }
        $("#checkmark-" + sku).css('visibility',a);
        
        $("#number-of-items-in-cart").html("(" + totalItemsInCart + ")");
        $("#you-have-number-of-items-in-cart").html("(" + totalItemsInCart + ")");
        if(totalItemsInCart == 1){
                $("#item-or-items").html(langDocument["items-singular"]);
            }else{
                $("#item-or-items").html(langDocument["items-plural"]);
        }
        

    }

	function orderComplete(response){
		$("#order-container").animate({right: "" + (counter + 300) + 'px'});
		document.write(JSON.stringify(response));
	}

    function setOrderDetailInputs(valid){
            for(r in cartItem){
                changeBGcolor("k" + r + "-qty",valid);
            }
    }


    function convert(CC,processor){
        console.log("convert(" + CC + "," + processor + ")");
        //Uncomment to test
        //CC = "SEK";
        //currencyCode = CC.toLowerCase();
        //languageCode = "sv";
        
        $.get("./php/currency_lookup.php?currency_code=" + CC + "&CCprocessorName=" + processor, function (response) {

            //If currency is not found in database, set 1 US Dollar and
            //update currency code variable
            paypalCurrencyCode = "USD";
            if(!response){
                exchangeRate = 1;
                currencyCode = "USD";
                paypalCurrencyCode = "USD";
            }else{
                exchangeRate = response;
                
            }
            buildShoppingCart();
            //detectLanguage(lc);
            mg = 0;
            
            calculateTotal();
        });	
    }









