 
   



		var style = {
		  base: {
			iconColor: '#666EE8',
			color: '#31325F',
			lineHeight: '40px',
			fontWeight: 300,
			letterSpacing: '.05em',
			fontFamily: 'Arial',
			fontSize: '15px',

			'::placeholder': {
			  color: '#000000',
			},
		  },
		};




var stripe = Stripe('pk_test_fgP1IfitRDyrHERTzo9BABmR');
        var elements = stripe.elements();
        var z = 1;


    function manuallyEnteredCard(result){
		
		var successElement = document.querySelector('.success');
		var errorElement = document.querySelector('.error');
		
		successElement.classList.remove('visible');
		errorElement.classList.remove('visible');
        
        console.log("result.token: " + result.token);
		if(result.token){
				//A token was generated successfully
				console.log("Token generated successfully::: " + result.token.id);
                saveTokenToSession(result.token.id);
                $("#cc-inputs").animate({left: '-600px'});
                $("#CC-review-order").animate({left: '0px'});
                $("#CC-review-order").css('display', 'block');
                $("#main").css('visibility', 'hidden');
                return true;
            
			}else if (result.error) {
				counter2 = 5;
				$('#next').show();
				$('#next-button-label').show();
				errorElement.textContent = result.error.message;
				errorElement.classList.add('visible');
				return false;
		}
	}

	var paymentRequest;
	function generatePaymentRequest(){
        
		if(prButton){
			prButton.destroy();
		};
	
		//If currency is non-decimal, change multiplier to 1
		if(currencyCode == "jpy"){
				multiplier = 1;
			}else{
				multiplier = 100;
		}
        
        $.post("./php/save_customer_information.php", {
            "updateType": "cart",
            "cart": JSON.stringify(cart)
        }, function(result){
            if(result > 0){
                    return true;
                }else{
                    return false;     
            }
        });
        
        console.log("payment request: " + calculatedTotal);
		paymentRequest = stripe.paymentRequest({
			country: 'US',
			currency: currencyCode,
			total: {
			label: 'Total: ',
			amount: calculatedTotal,
			},
			requestShipping: true,
			requestPayerName: true,
			requestPayerEmail: true,
            /*// `shippingOptions` is optional at this point:
            shippingOptions: [
            // The first shipping option in this list appears as the default
            // option in the browser payment interface.
            {
              id: 'shipping',
              label: 'Shipping Included',
              detail: 'Arrives in 5 to 7 days',
              amount: 500,
            },
            {
              id: 'shipping 2',
              label: 'Shipping outside US',
              detail: '',
              amount: 20000,
            },
            ],*/
		});

		//re-create stripe payment request button with new values 
		prButton = elements.create('paymentRequestButton', {
		  paymentRequest: paymentRequest,
		 style: {
			paymentRequestButton: {
			  type: 'default',
			  theme: 'light-outline',
			  height: '40px',
			},
		  },
		})	

		paymentRequest.on('token', function(ev) {
            console.log("paymentRequest.on('token')");
            //console.log("--->" + ev.error.message);
            console.log("__________________source " + ev.payerEmail);
            console.log("__________________source " + ev.payerName);
			saveTokenToSession2(ev);
		});
        
        paymentRequest.on('shippingaddresschange', function(ev) {
          if (ev.shippingAddress.country !== 'US') {
                  ev.updateWith({
                        total: {
                        amount : calculateShipping("international") + calculatedTotal,
                        label: "Total: "
                           },
                    displayItems: cartDisplayItems(),
                    status: 'success',
                    shippingOptions: [
			// The first shipping option in this list appears as the default
			// option in the browser payment interface.
			{
			  id: 'shipping',
			  label: 'International Shipping',
			  detail: 'Shipping is flat-rate for international orders',
			  amount: 2000,
			}]});
              //ev.updateWith({status: 'invalid_shipping_address'}); 
          } else {
              /*            // Perform server-side request to fetch shipping options
            fetch('/calculateShipping', {
                data: JSON.stringify({
                shippingAddress: ev.shippingAddress
                })
            }).then(function(response) {
                return response.json();
            }).then(function(result) {
                ev.updateWith({
                    status: 'success',
                    shippingOptions: result.supportedShippingOptions,
                });
            });*/
              
/*                ev.updateWith({
                    status: 'success',
                    total: {
                        amount : 100,
                        label: "heloz"
                           }
                }
                );*/
              console.log("))) " + cartItem[0]);
              
                ev.updateWith({
                    status: 'success',
                        total: {
                        amount : calculateShipping("US") + calculatedTotal,
                        label: "Total: "
                           },
                    displayItems: cartDisplayItems(),
                    shippingOptions: [
			{
			  id: 'shipping',
			  label: 'Shipping',
			  detail: 'Arrives in 5 to 7 days',
			  amount: 500 * z,
			}] 
            });
              console.log("shipping within US");
          }
        });
	}


function cartDisplayItems(){
    
          //{amount: calculateShipping("US"), label: "Shipping x " + cart["k1"],}
            cartDisplayItemsArr = [];
            for(x in cartItem){
                if(cart["k" + x] > 0){
                    cartDisplayItemsArr[x] = {
                                amount: ((cartItem[x] * 1000 / 10) * cart["k" + x]), 
                                label: "Krane x (" + cart["k"+x] + " @ " + cartItem[x] + " each)"
                    }
                }
            }

    return cartDisplayItemsArr;
}

	function saveTokenToSession2(ev){
        console.log("saveTokenToSession2 called_____ " + ev.token.id);
		$.post("./php/checkout_WPA.php", {"saveToken": ev.token.id}, function(result){
                    if(result){
                            $("#main").css('visibility', 'hidden');
                            digitalWalletCheckout(ev);
                        }else{
                            //generate error
                    }
		});
	}

	function saveTokenToSession(token){
        console.log("saveTokenToSession called");
		$.post("./php/checkout.php", {"saveToken": token}, function(result){
                    if(result){
                            fillHoles(11);
                            $("#cc-inputs").animate({left: '-600px'});
                            $("#CC-review-order").animate({left: '0px'});
                            $("#main").css('visibility', 'hidden');
                        }else{
                            //generate error
                    }
		});
        
	}

	function digitalWalletCheckout(ev){
		//ev is passed from payments API
		calculatedAmount = ttl * multiplier;
		$.post("./php/checkout_WPA.php", {"checkout": "true", 
                                      "amount": calculatedAmount, 
                                      "currency": currencyCode, 
                                      "email" : ev.payerEmail,
                                      "name" : ev.payerName
                                     }, function(result){
			//console.log("amount: " + calculatedAmount + " currencyCode: " + currencyCode + " result: " + result + "<<<");
            if(result == "true"){
                    console.log("web payments API");
                    $("#main").fadeTo(250,0.0);
                    $("#CC-review-order").hide();
                    $("#pay-with").hide();
                    $("#order-complete").show();
                    $("#order-complete").animate({left: '0px'});
                    ev.complete('success');	         
				}else{
                    console.log("checkout failed");
                    ev.complete('fail');
			}
		});
	}

	function checkout(){
		//ev is passed from payments API
		//calculatedAmount = ttl * multiplier;
        $("#checkout-spinner").fadeIn(250);
        $("#review-container").fadeTo(250,0.3);
		$.post("./php/checkout.php", {"checkout": "true", "amount": calculatedTotal, "currency": currencyCode}, function(result){
			console.log("amount: " + calculatedTotal + " currencyCode: " + currencyCode + " result: " + result + "<<<");
            if(result == "true"){
                    console.log("Manually entered CC info");
                    $("#review-container").animate({left: '-600px'});
                    $("#review-container").fadeTo(250,0.0);
                    $("#order-complete").fadeIn(250);
                    $("#order-complete").animate({left: '0px'});
                    console.log("res: " + result);
                    
				}else{
                    nextDiv[0] = 5;
                    containerID = 0;
                    $("#main").css('visibility', 'visible');
                    console.log("nextDiv[0]: " + nextDiv[0]);
                    navigate(false);
                    console.log("checkout failed");
                    var errorElement = document.querySelector('.error');
                    errorElement.textContent = result;
                    errorElement.classList.add('visible');
                    $("#checkout-spinner").fadeOut(250);
                    $("#review-container").fadeTo(250,1.0);
			}
		});
	}

    function createStripeToken(){
        console.log("createStripeToken() called...");
        stripe.createToken(cardNumberElement).then(manuallyEnteredCard);
    }

    function isWebAPIavaiable(){
            // Check the availability of the Payment Request API first.
            paymentRequest.canMakePayment().then(function(result) {
                if(result){
                    prButton.mount('#payment-request-button');
                    paymentAPIavailable = true;
                    moveNavPayAPI();
                }else{ 
                    paymentAPIavailable = false;
                    $("#payment-request-api-container").hide();
                    moveNavPayAPI();
                }
            });
    }

    function moveNavPayAPI(){
        if(paymentAPIavailable){
                $("#main").animate({top: '-240px',left: '-20px'});
            }else{
                $("#main").animate({top: '-300px',left: '-20px'}); 
        }
    }


$(document).ready(function () {

		cardNumberElement = elements.create('cardNumber', {
		  style: style
		});
    
		cardNumberElement.mount('#card-number-element'); 

		var cardExpiryElement = elements.create('cardExpiry', {
		  style: style
		});
		cardExpiryElement.mount('#card-expiry-element');

		var cardCvcElement = elements.create('cardCvc', {
		  style: style
		});
		cardCvcElement.mount('#card-cvc-element');

		cardNumberElement.on('change', function(event) {
			// Switch brand logo
			if (event.brand) {
			setBrandIcon(event.brand);
		  }
			manuallyEnteredCard(event);
		});
})
    
    
