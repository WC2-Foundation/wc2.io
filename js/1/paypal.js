 
function updatePaypal(){
	
		//Paypal button
		//Hack: re-render button after new total is calculated along with new variables
	 	var z = {
				env: 'sandbox', // sandbox | production

				style: {
					label: 'buynow',
					fundingicons: false, // optional
					branding: true, // optional
					size:  'medium', // small | medium | large | responsive
					shape: 'rect',   // pill | rect
					color: 'blue'   // gold | blue | silve | black  
				},

				// PayPal Client IDs - replace with your own
				// Create a PayPal app: https://developer.paypal.com/developer/applications/create
				client: {
					sandbox: paypalSandboxKey,
					//production: paypalProductionKey,
				},
			
				//Wait for the PayPal button to be clicked

				payment: function(data, actions) {
					var a = ttl;
					var myJsonObj = {transactions: [{amount: { total: a, currency: paypalCurrencyCode.toUpperCase() }}]};
					return actions.payment.create(myJsonObj);
				},

				// Wait for the payment to be authorized by the customer

				onAuthorize: function(data, actions) {
                    return actions.payment.get().then(function(data) {
                    //return actions.payment.execute().then(function() {
                    //window.alert('Payment Complete!');
                    //window.location = "./order_complete.php";
						

	             var shipping = data.payer.payer_info.shipping_address;

                document.querySelector('#recipient').innerText        = shipping.recipient_name;
                document.querySelector('#line1').innerText            = shipping.line1;
                document.querySelector('#paypal-city').innerText      = shipping.city;
                document.querySelector('#paypal-state').innerText     = shipping.state;
                document.querySelector('#paypal-zip').innerText       = shipping.postal_code;
                document.querySelector('#paypal-country').innerText   = shipping.country_code;
                document.querySelector('#paypal-button-container').style.display = 'none';
                document.querySelector('#confirm').style.display = 'block';

                // Listen for click on confirm button

                document.querySelector('#confirmButton').addEventListener('click', function() {

                    // Disable the button and show a loading message 
                    console.log("====================================================================================");
                    document.querySelector('#confirm').innerText = 'Loading...';
                    document.querySelector('#confirm').disabled = true;

                    // Execute the payment

                    return actions.payment.execute().then(function() {

                        // Show a thank-you note

                        document.querySelector('#thanksname').innerText = shipping.recipient_name;

                        document.querySelector('#confirm').style.display = 'none';
                        document.querySelector('#thanks').style.display = 'block';
                    });
                });
					
						//alert("paypal payment complete");
						//$("#order-container").animate({right: "" + (counter + 200) + 'px'});
					});
				}
			};
				
			document.getElementById('paypal-button-container').innerHTML = "";
			paypal.Button.render(z,'#paypal-button-container'); 
    }
