# WC2 Shopping Cart
~ WORK IN PROGRESS ~
This project is divided into 3 main parts and is intended to offer a jumping-off point for the following technologies:

1.) Stripe: Custom Cart Integration<br>
2.) Flowroute: SMS Chat Support Client<br>
3.) Google Translate API: Recursively Translate Web Content to 105 Languages<br>

<b>Shopping cart: Stripe/PHP/MySQL/Javascript</b>

The shopping cart has been written in PHP and Javascript and integrates via AJAX calls client-side to Stripe's HTTP API originating from custom PHP scripts server-side. Shopping cart item pricing is based off of the latest exchange rate data, calcuated in real-time from MySQL which has been populated via a chron job every 12 hours. The cart supports 135 currencies total, formatted by language preference via Javascript's ECMAScript Internationalization API. Currency is determined by the origin of the website's vistors' IP address. All 493 USPS  shipping locations have been translated to all 105 languages offered by Google's Translation API.

<b>SMS Chat: Flowroute/PHP/Javascript</b>

SMS client is written in Javascript, chat sessions stored in MySQL, SMS messaging by Flowroute. New text messages are inserted into MySQL as they arrive from Flowroute via posted JSON data (from number, to number, actual text message). 

<b>Google translate API: PHP/Javascript</b> 

The website's textual content has been translated from English to 105 languages using Google's Translation API. Right to left languages have been taken into consideration as well as static variables (product names etc). Site content is stored as language-specific JSON objects in MySQL; JSON keys are then matched with HTML data-* attributes to populate actual values.
