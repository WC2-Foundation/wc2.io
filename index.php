<!doctype html>

<!--
	HTML/CSS/JS by Sam Stauffacher
-->
<html lang="en">
	<head>
		<meta charset="utf-8">
		<meta name="viewport" content="width=940, initial-scale=.4, maximum-scale=1" />
		<meta name="description" content="Krane builds uniquely designed smartphone suspension devices made from renewable and responsibly sourced materials."/>
		<title>Krane - Smartphone Elevator</title>
		
				<!-- CSS --> 
				<link rel="stylesheet" href="css/general.css" >
				<link rel="stylesheet" href="css/normalize.min.css">
				<link rel="stylesheet" href="css/scrollbars.css">
				<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/paymentfont/1.1.2/css/paymentfont.min.css">
				<link rel="stylesheet" href="https://ajax.googleapis.com/ajax/libs/jqueryui/1.10.1/themes/base/minified/jquery-ui.min.css" type="text/css" />
		
				<!-- FONT AWESOME -->
				<link rel="stylesheet" href="./css/fontawesome-all.min.css">

				<!-- JS -->
                <script src="js/jquery.min.js" ></script>
                <script src="js/jquery.UI.min.js" ></script>
                <script src="js/jquery.validate.min.js" ></script>
                <script src="js/jquery.boxfit.js"></script>
                <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery-cookie/1.4.1/jquery.cookie.js"></script>
                <script src="https://www.paypalobjects.com/api/checkout.js"></script>
                <script src="js/scrollbars.js" ></script>
                <script src="js/svg.js" ></script>
                <script src="https://js.stripe.com/v3/"></script>
                
                <!-- truthserum.io -->
                    <script src="js/javascript.js"></script>
                    <script src="js/utilities.js"></script>
                    <script src="js/language.js"></script>
                    <script src="js/paypal.js"></script>
                    <script src="js/stripe.js"></script>
                    <script src="js/cart.js"></script>
                    <script src="js/events.js"></script>
                    <script src="js/validate.js"></script>
                <!-- truthserum.io -->
        
				<!--
					Todo: refractor away from jQuery to modern JS
					<script src="https://cdn.polyfill.io/v2/polyfill.min.js"></script>
				-->
				
				<!-- FONTS -->
				<link href="css/google-font-comfortaa.css" rel="stylesheet">
				<link href="https://fonts.googleapis.com/css?family=Montserrat" rel="stylesheet">

		

</head>
<body>
	<div id = "tagalongBar-container" >
		<div id = "tagalongBar">
				<div id = "tag-along-logo" ></div>
				<button class = "tagalong-buttons" id = "tagalong-nav-1" data-languagekey="nav1" ></button>
				<button class = "tagalong-buttons" id = "tagalong-nav-2" data-languagekey="nav2" >order a krane</button>
				<button class = "tagalong-buttons" id = "tagalong-nav-3" data-languagekey="nav3" >contact krane</button>
		</div>
	</div>
    
    
	<? if(isset($_GET["debug"])){echo "<div id = 'debug'></div>";};?>

<div class='thetop'></div>
<div id="einstein" class="einstein">
    <div id="top-bar"></div>
    <div class='scrolltop'>
		<div id = "number-of-items-in-cart" >(0)</div>
			<div id="shopping-cart">
				<i class="fas fa-shopping-cart">
				</i>
			</div>
        <div class='scroll icon'><i class="fa fa-4x fa-angle-up"></i></div>
    </div>
    <div id="nav-container">
        <div id="login">
            <span id = "language-label">English</span>
            <div id="language-picker"></div>
        </div>
        
        <div id = "landing-container">
            <div id="nav1" data-languagekey="nav1" class="nav-button"></div>
            <div id="nav2" data-languagekey="nav2" class="nav-button"></div>
            <div id="nav3" data-languagekey="nav3" class="nav-button"></div>

            <div style = "left:-15px;position: relative;top:-240px;" >
                <div id="no-smoking"></div>
                <div id="turn-off-lights"></div>
            </div>
        </div>
        
        <div id="social-links">
            <div id="instagram" class="social-links"></div>
            <div id="facebook" class="social-links"></div>
            <div id="twitter" class="social-links"></div>
            <div id="pinterest" class="social-links"></div>
        </div>
    </div>
    <canvas id="canvas"></canvas>
</div>

<div id="about-krane">
    <div id="drop-shadow-1"></div>
	
	<div class = "heading" data-languagekey = "welcome-to" ></div>

	<div id = "krane-about">
		
		<span id = "above-laptop" style = "font-weight: bold;" >
			A Sustainably Built Phone & Tablet Elevator</span>
		<br><br>
		The choice is yours my friend, either grow a third arm or get yourself a Krane!<br><br>
		
		
		Whether you're a serious student trying to increase screen real estate <span id = "above-laptop-22" style = "text-decoration: underline;font-weight: bold; cursor: pointer" >above your laptop,</span> or 
		simply binge-watching your favorite Netflix show into the wee hours of the night, the Krane elevator is a great way 
		to get the most out of your favorite smartphone device 
		<span id = "above-laptop-2" style = "text-decoration: underline;font-weight: bold; cursor: pointer" >
		around the house</span> or even in the <span id = "above-laptop-3" style = "text-decoration: underline;font-weight: bold; cursor: pointer" >kitchen</span>.
		
		
        <div id = "hand-jive">

        <i class="fa fa-hand-paper" style = "font-size:28px;"></i>
        <i class="fa fa-hand-paper" style ="font-size:28px;"></i>
        <i class="fa fa-hand-paper" style ="font-size:28px;"></i>
				
		<br><br>

		Just imagine how much money you'll save long-term on third-hand gloves if you were to 
				<span style = "text-decoration: underline;font-weight: bold; cursor: pointer" onClick="$('html, body').animate({scrollTop: $('#order-krane').offset().top}, 1000);">order a Krane</span> today.<br><br>




	</div>			
		
		
		<br><br>
		<div id = "carousel"></div><br><br>
	</div>	



	
	
	<div id = "krane-environs" >	
		<div class = "rounded-header" >Krane - Material Usage and Sustainability</div>
		<br><br>
		<span id = "above-laptop-4" >Something to Feel Good About</span>
		<br><br>
			Built with sustainability in mind, Krane places energy-efficiency as our highest priority when sourcing
			materials as well as throughout the entire manufacturing process end-to-end; from responsibly sourced wood, to recycled materials, to long-term 
			plans to run our equipment from solar, Krane strives to someday become a more responsible, carbon-neutral place of business.
			<br><br>
			something something about average lcd television vs phone, biodegradability etc
			<br>
			newer LCD/LED type average 91.5 watts<br>
			<br>
			Phones use approximately 2 to 6 watts while charging<br>
	</div>
	
	
	<div id = "which-krane">
		Which size Krane is right for me?
	</div>
	
	<img style = "margin-top:25px;" alt = "Measuring Tape" src = "images/metric_tape_measure.png">

	<div id = "krane-size">
		Our standard size Krane, which extends up to <span class = "standard-krane-length"></span> <span class = "measurement-string"></span>, is ideally suited for places where your back rests close to
		where the Krane will be mounted. 
		<br><br>
		Our Jumbo Krane, with a total reach of <span class = "jumbo-krane-length"></span> <span class = "measurement-string"></span>, works well with reclining chairs, beds with extended headboards, large bean bags or any other
		place that seats the viewer several <span class = "measurement-string"></span> away from where the Krane is to be mounted. 
		<br><br>
		<div class = "measurement-outter-container" >
			Standard Krane: <span class = "measurement-container" ><b><span class = "standard-krane-length"></span> 
			<span class = "measurement-string"></span> (maximum)</b></span> 
		</div>
		
		<div class = "measurement-outter-container" >
		<i class="fa fa-plane" style ="font-size:28px;"></i> Jumbo Krane: <span class = "measurement-container" ><b><span class = "jumbo-krane-length"></span>
		<span class = "measurement-string"></span> (maximum)</b></span><br><br>
		</div>
		
		The easiest way to decide is to grab a tape measure and determine the distance between the surface behind you (wall, headboard etc.) and where you'd like
		your device to be positioned in front of you.
		<br><br>
		Our most popular model is the standard size Krane, which seems to suit most peoples' needs.
		
	</div>
	
	

    <div id="about-images-container-1">
        <div id="photo1" class="photos"></div>
        <div id="photo2" class="photos"></div>
        <div id="photo3" class="photos"></div>
    </div>

	<button id = "standard-krane-add-to-cart" onClick="addItemToCart('k1',1)"  >
		<i class="fas fa-shopping-cart" style = "padding-left:30px;"></i> Standard Krane ( extends to <span class = "standard-krane-length"></span><span class = "length-symbol"></span> ) <i class="fas fa-check" style = "padding-left:5px;color: black"></i>
	</button>
	
	<button id = "jumbo-krane-add-to-cart" onClick="addItemToCart('k2',1)"  >
		<i class="fas fa-shopping-cart" style = "padding-left:30px;"></i> Jumbo Krane ( extends to <span class = "jumbo-krane-length"></span><span class = "length-symbol"></span> ) <i class="fas fa-check" style = "padding-left:5px;color: black"></i>
	</button>

</div>
	
	

    <a id="order"></a>
    <div id="order-krane">
        <div id="order-krane-dashed-border">
            
 <!--<div id="order-form-heading" data-languagekey="order-form-heading-cx" class="section-heading" style ="margin-top:20px; "></div>-->
                            <div class="order-form-headings" id="order-form-subheading-1" data-languagekey="order-form-subheading-1" ></div>

         <div class="rounded-div">
                            <img class = "payment-logos" src="images/credit-cards/paypal.png" alt="" />
                            <img class = "payment-logos" src="images/credit-cards/mastercard.png" alt="" />
                            <img class = "payment-logos" src="images/credit-cards/visa.png" alt="" />
                            <img class = "payment-logos" src="images/credit-cards/discover.png" alt="" />
                            <img class = "payment-logos" src="images/credit-cards/switch.png" alt="" />
                            <img class = "payment-logos" src="images/credit-cards/amazon.png" alt="" />
                            <img class = "payment-logos" src="images/credit-cards/american-express.png" alt="" />
            </div>             
            
            <div id="strut">
                <!-- Draw SVG dynamically with svg.js--> 
                <div id="svg-js"></div>
            </div>

            <!--<div id="errors"></div>-->
            <div id="order-form-outer-container">
                <div id="order-container">
					<!-- Order details -->
                    <div id = "order-details" class="order-containers">
                        <div id = "items-in-cart" class="order-form-headings-small">You have <span id = "you-have-number-of-items-in-cart">(0)</span> <span id = "item-or-items">items</span> in your cart.
                            <br><span class="order-form-headings-extra-small">Free U.S. shipping on orders over $45.</span>
                        </div> 
                        
                        <div id="orderForm1">
                            
                            <div style = "width:100%;text-align: center">
                                <button id = "tab1" class = "cart-tab-buttons">Standard - 28"</button><button id = "tab2" class = "cart-tab-buttons">Large - 34"</button><button id = "tab3" class = "cart-tab-buttons">Accessories</button>
                            </div>
                            
                            <div id = "order-form-container">
                                
                                
                                <div class="order-form-labels" id="quantity-label" data-languagekey="quantity-label" ></div>
								
                                
                                    <div id = "cart-outter-container"> 
                                        <div id = "electrum" class = "thumbnails" ></div>
                                        <div id = "pyramís" class = "thumbnails" ></div>
                                        <div id = "ibycus" class = "thumbnails" ></div> 
                                        <input id="quantity" class="order-form-inputs" value="0" onKeyUp="calculateTotal();">
                                    </div>
                                
                            </div>
                            
                            
                            
  
                            
                            

                        <div id = "total-container">
                        <div style="text-align: right" id="total" data-languagekey="total" ></div>
                            <div style="align-items: flex-start; flex-direction: row;margin-top: 2px; ">
                                <label id = "discount-code-label" >Code: </label>
                                <input id = "discount-code" placeholder = "(Optional)"/>
                            </div>
                        </div>                           
                            
                            
                            
                            
                            
                            
                            
                        </div>
                    </div>
					
					<!-- Contact information -->
                    <div id="contact-information" class="order-containers" >
                        <form action="#" autocomplete="on">
                            <div id="contact-information-heading" data-languagekey="contact-information-heading" class="order-form-headings-small" style ="margin-bottom: 15px;"></div>
                            <div style ="margin-left:95px;">
                                <div id="m">
                                    <input type="text" tabindex = "1" id="firstName" data-languagekey="firstName" name="first name" placeholder="" onKeyUp="fillHoles(3);" class="order-form-inputs" style ="color:grey;width:150px;">
                                    <input type="text" tabindex = "2" id="lastName" data-languagekey="lastName" name="last name" placeholder="" class="order-form-inputs" style ="color:grey;width:200px;">
                                </div>
                                <input id="emailAddress" tabindex = "3" style ="color:grey;width:400px;" data-languagekey="emailAddress" name="email address" placeholder="" type="email" onKeyUp="fillHoles(2);" value="" class="order-form-inputs">
                            </div>
                        </form>
                    </div>

					<!-- Pay with -->
                    <div id="pay-with" class="order-containers" >
                        <div class="flex-item">
                            <div class="order-form-headings-small" id="pay-with-a-credit-card-subheading" data-languagekey="pay-with-a-credit-card-subheading"></div>
                            <div class="payment-methods-wrapper">
                                <button tabindex = "1" id="CCbutton"  class="fa fa-credit-card"></button>
                            </div>
                        </div>
                        
                        <div class="flex-item">
                            <div class="order-form-headings-small" id="buy-on-amazon-subheading" data-languagekey="buy-on-amazon-subheading"></div>
                            <div class="payment-methods-wrapper">
                                <button  id="buy-on-amazon" tabindex="2" ></button>
                            </div>
                        </div>
                        <div id="payment-request-api-container" class="flex-item">
                            <div class="order-form-headings-small" id="pay-with-a-digital-wallet-subheading" data-languagekey="pay-with-a-digital-wallet-subheading"></div>
                            <div class="payment-methods-wrapper" tabindex="3" >
                                <div id="payment-request-button-wrapper">
                                    <div id="payment-request-button"   style ="width:200px;margin: 0 auto; text-align: center;"></div>
                                </div>
                            </div>
                        </div>

                        <div class="flex-item">
                            <div class="order-form-headings-small" id="pay-with-paypal-subheading" data-languagekey="pay-with-paypal-subheading"></div>
                            <div class="payment-methods-wrapper">
                                <button tabindex="4" id="pay-with-paypal"></button>
                                <input type="hidden" id="card-nonce" name="nonce">
                            </div>
                        </div>
                    </div>

					<!-- Shipping Information -->
                    <div id="shipping" class="order-containers" >
                        <form action="#" autocomplete="on">
                            <div id="shipping-address" >
                                <div class="order-form-headings-small" id="order-form-subheading-2" data-languagekey="order-form-subheading-2" style ="margin-left:0px;text-align: center; margin-top:0px;margin-bottom: 10px;"></div>

                                <div style ="overflow-x: hidden;width: 100%; margin-left: 100px;">

                                    <input tabindex="1" type="text" placeholder="Country" autocomplete="shipping country" data-languagekey="country" name="country" id="country" value="" class="country">

                                    <input tabindex="2" type="text" id="address1" name="address 1" placeholder="" data-languagekey="address1" class="order-form-inputs" style ="color:grey;width:400px;">
                                    <input tabindex="3" type="text" id="address2" name="address 2" placeholder="" data-languagekey="address2" class="order-form-inputs" style ="color:grey;width:400px;">

                                    <div style ="align-items:flex-start;justify-content:flex-start;display:flex;flex-direction:row;width: 100%;">
                                        <input tabindex="4" type="text" name="city" id="city" placeholder="" data-languagekey="city" class="order-form-inputs" style ="color:grey;width:150px;">
                                        <input tabindex="5" type="text" id="state" placeholder="" name="state" data-languagekey="state" class="order-form-inputs" style ="color:grey;width:200px;">
                                    </div>

                                    <input type="text" tabindex="6" id="zip" name="zip code" placeholder="" data-languagekey="zip" class="order-form-inputs" style ="color:grey;width:150px;">
                                </div>
                            </div>
                        </form>
                    </div>

					<!-- Credit card info -->
                    <div id="cc-inputs" class="order-containers" >
                        <div style ="height:300px;width:600px;"> 
                            <div style ="width:475px;padding-left: 30px;">                               
                                <div id="credit-card-subheading" data-languagekey="credit-card-subheading" class="order-form-headings-small" style ="margin-left:4px;margin-top:0px;margin-bottom: 15px;"></div>                           
                                <div class="group">
                                    <label>
                                        <span id="card-number"></span>
                                        <span id="card-number-element" class="field"></span>
                                        <span class="brand"><i class="pf pf-credit-card" id="brand-icon"></i></span>
                                    </label>
                                    <label>
                                        <span></span>
                                        <span id="card-expiry-element" class="field"></span>
                                    </label>
                                    <label>
                                        <span></span>
                                        <span id="card-cvc-element" class="field"></span>
                                    </label>
                                    <label style ="display:none">
                                        <span></span>
                                        <input id="postal-code" name="postal_code" class="field" placeholder="" />
                                    </label>
                                </div>
                                
                              <div class="outcome">
                                    <div class="error"></div>
                                    <div class="success">
                                         <span class="token"></span>
                                    </div>
                                </div>  
                            </div>
                        </div>
                    </div>
					
					<!-- Credit Card Review Order -->
                    <div id="CC-review-order" class="order-containers" >
						<div id = "review-container" style ="height:550px;width:600px;margin-left:35px;">
						<div id = "checkout-spinner" style = "float: left; position: absolute;top:100px;left: 280px;display: none;" >
							<div class = "lds-dual-ring"></div>
						</div>	
						<div class="order-form-headings" data-languagekey="" style ="margin-left:-30px;text-align: center;margin-bottom: 10px;">Review Order</div>
							
							<div class="grid-container-review">
									<div class="grid-item">
										<i class="fas fa-shopping-cart" ></i>
									</div>

									<div class="grid-item-center">
										Standard Krane 
									</div>

									<div class="grid-item-right">
										$35 x
									</div>

									<div class="grid-item">
										<input type="number" id = "k2-qty-2" tabindex="-1" onClick="addItemToCart('k2');" onChange="addItemToCart('k2');" value = "0" min="0" max="10000" 
											   style ="margin-right: 15px;width:45px; height: 34px; text-align:center; padding-left:10px; border-radius: 4px 4px 4px 4px;border: none;" >
									</div>
								</div>
						
						
						
								<div class="grid-container-review">
									<div class="grid-item">
										<i class="fas fa-shopping-cart" ></i>
									</div>

									<div class="grid-item-center">
										Jumbo Krane 
									</div>

									<div class="grid-item-right">
										$45 x
									</div>

									<div class="grid-item">
										<input type="number" id = "k2-qty-2-2" tabindex="-1" onClick="addItemToCart('k2');" onChange="addItemToCart('k2');" value = "0" min="0" max="10000" 
											   style ="margin-right: 15px;width:45px; height: 34px; text-align:center; padding-left:10px; border-radius: 4px 4px 4px 4px;border: none;" >
									</div>
								</div>
						
						
						        <div style="margin-left: 190px;position: relative;margin-top:20px;">
                                    <div class="order-form-labels" id="review-order-price" data-languagekey="total" ></div>
                                </div>
						
							<div style="display: inline-block;width: 100%; text-align: center; margin-left: -20px;">
								<button id = "buy-now" tabindex="-1" >
									&nbsp;<i class="fas fa-shopping-cart" style = ""></i> BUY NOW &nbsp;&nbsp;
								</button>
							</div>
						</div>	
                    </div>

					
					<!-- CC# Order Complete -->
                    <div id="order-complete" class="order-containers" >
						<div class="order-form-headings" data-languagekey="" style ="text-align: center;margin-bottom: 10px;margin-left: 20px;">Order Complete</div>
                    </div>
					
					<!-- Paypal review details -->
                    <div id="paypal" class="order-containers">
						<div class="order-form-headings" data-languagekey="" style ="margin-left:-20px;text-align: center;margin-bottom: 30px;">Pay with Paypal</div>						
						<div style ="text-align: center;" tabindex="-1" id="paypal-button-container"></div>
						<div id="confirm" class="hidden">
							<span class="order-form-headings-small">Shipping Address</span>
							<div><span class="order-form-headings-small" id="recipient"></span>, <span class="order-form-headings-small" id="line1"></span>, <span id="paypal-city"></span></div>
							<div><span class="order-form-headings-small" id="paypal-state"></span>, <span class="order-form-headings-small" id="paypal-zip"></span>, <span class="order-form-headings-small" id="paypal-country"></span></div>
							<button id="confirmButton" tabindex="-1">Complete Payment</button>
						</div>
						<div id="thanks" class="hidden">
							Thanks, <span id="thanksname"></span>!
						</div>
                    </div>  
                </div>   
            </div>
        </div>
        
  			<!-- Navigation -->
        
        

        
        
            <div id="main">
                
                
                
                
                
              
                
                
                
                
                
                
                
                
				<div id="back-button-container">
                    <div id="back" class="fa fa-arrow-circle-left"></div>
                    <div data-languagekey="back-button-label" id="back-button-label"></div>
                </div>
            
                    <div style="z-index: 0; margin-top:10px;position: absolute; left:70px;">
                        <!-- FA Forward arrow only works occasionally... use back arrow and reverse to fix-->
                        <div id="next" tabindex="4">
                            <div class="front"><span class="fa fa-arrow-circle-left"></span></div>
                            <div class="back"><span class="fa fa-arrow-circle-left"></span></div>
                        </div>
                        <div id="next-button-label" data-languagekey="next-button-label"></div>
                    </div>
                
            </div>
    </div>
	
	
    <div id="contact-krane">
        <div class="section-heading-black" id="contact-krane-heading" data-languagekey="contact-krane-heading"></div>
        <div class="subheading-black"><span id="send-text-message" data-languagekey="send-text-message"></span>: (800) 626-8160</div>
        <div class="subheading-black">info at krane dot tv</div>
        <br>
        <div id="message-sent">
            <span id="message-sent-label" data-languagekey="message-sent">MESSAGE SENT!</span>
        </div>
        <div id="contact-form-wrapper">
            <input id="emailOrPhoneNumber" data-languagekey="emailOrPhoneNumber" type="email" contenteditable="true" placeholder="">
            <textarea id="message" placeholder="" data-languagekey="message"></textarea>
            <div id="captcha-container">

                <div id="captcha-question"><span id="captcha-label" data-languagekey="captcha-label"></span>: 1 + 3 =</div>

                <select id="captcha" data-languagekey="captcha">
                    <option value="0" selected>&nbsp;</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                </select>

            </div>

            <div id="forward-button-container">
                <div style ="z-index: 0; margin-top:0px;">
                    <!-- FA Forward arrow only works occasionally... use back arrow and reverse to fix-->
                    <div id="send-message">
                        <div class="front"><span class="fa fa-arrow-circle-left" style ="color:#000000;font-size: 84px"></span></div>
                        <div class="back"><span class="fa fa-arrow-circle-left" style ="color:#000000;font-size: 84px"></span></div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div id="fourth" style ="width:100%;">
        <div id="footer" class="footer" style ="display: inline-block; text-align: center;margin:0 auto;">
            <a href="#">top</a> | <a href="#">about krane</a> | <a href="#">order</a> | <a href="#">contact</a> | <a href="dev">dev blog</a> | <a href="https://en.wikipedia.org/wiki/Copyright" target="_blank">©</a> <a href="https://en.wikipedia.org/wiki/Spacetime" target="_blank">2017</a> - <a href="https://en.wikipedia.org/wiki/Spacetime" target="_blank">2019</a>
            <br><br>
            <a onClick="divDebugMode();" id = "crazy-click" >cRaZy cLiCk</a>&nbsp;<span onClick="divDebugMode(false);" id = "stop-it">Make it stop please.</span>
			<br><br> stackoverflow copy/paste by <a href = "https://truthserum.io" target="_blank">truth sereum</a> | CTRL+SHIFT+I, console:
            <input id="name" placeholder="name">
            <input id="chat" placeholder="message" >
            <span style ="cursor: pointer;" id = "chat-button-send" >send</span>
            <br>
            <br>
            <a href="https://validator.w3.org/nu/?doc=https%3A%2F%2Fkrane.tv%2F" target="_blank">W3C Validator</a> | <a href="https://ssllabs.com/ssltest/analyze.html?d=krane.tv&latest" target="_blank">SSL labs</a>
        </div> 
    </div>
</body>
</html>
