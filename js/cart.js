
    //########################################################################
    //########################################################################
    //########################################################################
    //---------------------------- TRUTH SEREUM ------------------------------
    //---------------------------- truthserum.io -----------------------------
    //########################################################################
    //########################################################################
    //########################################################################
	
    //var stripe = Stripe('pk_live_oRL9EVHl8I93CAciYj5xi2OA');
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
            {"name" : "order-details", "x": "120px", "y": "-300px", "skipContainerAnimation" : false},
            {"name" : "pay-with", "x": "", "y": "",  "skipContainerAnimation" : false},
            {"name" : "contact-information", "x": "50px", "y": "-490px",  "skipContainerAnimation" : false},
            {"name" : "shipping", "x" : "40px", "y": "-375px", "skipContainerAnimation" : false},
            {"name" : "cc-inputs", "x" : "50px", "y": "-485px", "skipContainerAnimation" : false}
          ]},
          {"name":"paypal", "functions":[
            {"name" : "start", "x": "", "y": "", "skipContainerAnimation" : false},
            {"name" : "paypal", "x": "-20px", "y": "-200px",  "skipContainerAnimation" : false}
          ]},
          {"name":"paypal2...", "functions":[ 
            {"name" : "start", "x": "", "y": "", "skipContainerAnimation" : false},
            {"name" : "paypal", "x": "-20px", "y": "-200px",  "skipContainerAnimation" : false}
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
                {"functionName" : "createStripeToken", "reverse" : false, "parameters":[]}
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
    
        function buildShoppingCart(){

                m = cartObj.cartTabs;
                for(n in m){
                    tabName = m[n].tabName;
                    $("#cart-outter-container").append('<div class = "cart-tabs" id = "cart-container-' + n + '"></div>');
                    w = m[n].cartItems;
                        for(j in w){
                            y = w[j].items;
                            for(p in y){
                                a = y[p].columns;
                                cartItem[mg] = a[3].price;
                                formattedCurrency = formatCurrency("EUR",languageCode + "-" + countryCode,cartItem[mg]);
                                newItem = createCartRow(a[0].title,a[1].title,a[2].size,formattedCurrency);
                                $("#cart-container-" + n).append(newItem);
                            }
                        }
                    $("#cart-container-" + n).addClass("cart-tabs");
                }

                $("cart-container-0").addClass("cart-tabs");  
                $("#cart-container-0").show();
        }

        function createCartRow(productName,productModel,productSize,productPrice){
            
            var returnCart = '<div id = "k' + mg + '" class="grid-container">' +
            '    <div class="grid-item">' +
            '        <i class="fas fa-check checkmarks" id = "checkmark-' + mg + '"></i>' +
            '        <i class="fas fa-shopping-cart" style = "padding-left:5px;"></i>' +
            '    </div>' +
            '    <div class="grid-item-center">' +
            '        ' + productName + '  <a href = "#ibycus" class = "thumbnail-links" id = "krane-model-' + productModel.toLowerCase() + '" >' + productModel + '</a>'+
            '        <div id = "ibycus" class = "thumbnails" ></div>' +
            '    </div>'+
            '    <div class="grid-item-right">' +
            '        ' + productSize +
            '    </div>'+
            '    <div class="grid-item-right">' +
            '        <div id = "cartItem-' + mg + '" >' + productPrice + '</div>' +
            '    </div>'+
            '    <div class="grid-item">'+
            '        <input type="number" tabindex = "1" class = "cart-qty" id = "k' + mg + '-qty" onChange="addItemToCart(\'' + mg + '\');" value = "0" min="0" max="10000" >'+
            '    </div>'+
            '</div>';
            mg++;
            return returnCart;
        }
    
    
    function calculateShipping(location){
        if(location == "US"){
                newTotal = (shippingUS * 1000 / 10);
                calculatedAmount = (newTotal + calculatedTotal);
                return newTotal;
        }
        if(location == "international"){
                newTotal = (shippingInternational * 1000 / 10) ;
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
		var k1 = cart[0].k[0] * cartItem[0];
		var k2 = cart[1].k[0] * cartItem[1];
		var k3 = cart[2].k[0] * cartItem[2];
        var k4 = cart[3].k[0] * cartItem[3];
        //var k5 = cart["k5"] * cartItem[4];
		var q = k1 + k2 + k3 + k4; // + k5;
		
		ttl = (q * exchangeRate);
		//ttl = Math.floor(ttl);
        //$("#a").addClass("disableCartItems");
        ttl = ttl.toFixed(2);
        calculatedTotal = Math.round(ttl * 1000) / 10;
        //console.log("total calc func: " + ttl + "q: " + q + " x exchangeRate: " + exchangeRate);
        
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
		
		var kraneqty = $('#k1-qty').val();
		var extenqty = $('#extensions').html();
        //cartitems = prices
        var p = 0;
        
        for(E in cart){
            if(cartItem[E] !== undefined && cart[E].k[0] > 0){
                console.log("Cart Quantity: " + cart[E].k[0]);
                console.log("Item Price: " + cartItem[E]);
                c = (cart[E].k[0] * cartItem[E]);
                p += c;
            } 
        }
        
        console.log("###" + p);
		ttl = (p * exchangeRate);
        console.log("---" + ttl);
		//ttl = Math.floor(ttl);
        //$("#a").addClass("disableCartItems");
        ttl = ttl.toFixed(2);
        calculatedTotal = Math.round(ttl * 1000) / 10;
        //console.log("total calc func: " + ttl + "q: " + q + " x exchangeRate: " + exchangeRate);
        
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


    function enableCartItems(enable){
        if(enable){
                $("#k1").addClass("enableCartItems");
                $("#k2").addClass("enableCartItems");
                $("#k3").addClass("enableCartItems");
                $("#k4").addClass("enableCartItems"); 
                
            }else{  
                $("#k1").addClass("disableCartItems");
                $("#k2").addClass("disableCartItems");
                $("#k3").addClass("disableCartItems");
                $("#k4").addClass("disableCartItems");
        }
    }

   var containers = [containersObj.containers, containersObj.paypal];
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
        
        if(containers[containerID][nextDiv[containerID]].skipContainerAnimation == true && forward){return};
        if(nextDiv[containerID] >= containersObj.containers.length - 1 && forward){return};
        forward ? nextDiv[containerID]++ : nextDiv[containerID]--;
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

    function displayNone(containerID,nextDiv){
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
            if(result > 0){
                    return true;
                }else{
                    return false;     
            }
        });

    }

	function formatCurrency(currencyCode,locale,amount){

		//currencyCode = 3 letter: USD
		//locale = en-US
		//amount = dollar amount
		//currencyCode = "MXN";
		//locale = "es-MX";

		//Set non-decimal currency variable
		var minFractional = 2;
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

        if(incrementQty){
            var b = parseInt($("#k" + sku + "-qty").val());
            $("#" + sku + "-qty").val(b + 1);
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
                $("#item-or-items").html("item");
            }else{
                $("#item-or-items").html("items");
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
            calculateTotal();
        });	
    }









