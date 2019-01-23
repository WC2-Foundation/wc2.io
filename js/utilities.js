

var consoleColorArr = [];


function randomConsoleColor(){

/*consoleColorArr[0] = "\x1b[30m";
consoleColorArr[1] = "\x1b[31m";
consoleColorArr[2] = "\x1b[32m";
consoleColorArr[3] = "\x1b[33m";
consoleColorArr[4] = "\x1b[34m";
consoleColorArr[5] = "\x1b[35m";
consoleColorArr[6] = "\x1b[36m";*/
//consoleColorArr[7] = "\x1b[37m";
consoleColorArr[0] = "\x1b[40m";
consoleColorArr[1] = "\x1b[41m";
consoleColorArr[2] = "\x1b[42m";
consoleColorArr[3] = "\x1b[43m";
consoleColorArr[4] = "\x1b[44m";
consoleColorArr[5] = "\x1b[45m";
consoleColorArr[6] = "\x1b[46m";
consoleColorArr[7] = "\x1b[40m";
consoleColorArr[8] = "\x1b[41m";
consoleColorArr[8] = "\x1b[2m";
consoleColorArr[10] = "\x1b[42m";
consoleColorArr[11] = "\x1b[43m";
consoleColorArr[12] = "\x1b[44m";
consoleColorArr[13] = "\x1b[45m";
consoleColorArr[14] = "\x1b[46m";
consoleColorArr[15] = "\x1b[47m";
consoleColorArr[16] = "\x1b[0m";
consoleColorArr[17] = "\x1b[1m";
consoleColorArr[18] = "\x1b[2m";
consoleColorArr[19] = "\x1b[4m";
consoleColorArr[20] = "\x1b[5m";
consoleColorArr[21] = "\x1b[7m";
consoleColorArr[22] = "\x1b[8m";

var randomStrLen = [];
randomStrLen[0] = "BUY NOW BUY NOW BUY NOW BUY NOW BUY NOW BUY NOW BUY NOW BUY NOW BUY NOW BUY NOW BUY NOW BUY NOW BUY NOW BUY NOW BUY NOW BUY NOW BUY NOW ";
randomStrLen[1] = "BUY NOW BUY NOW BUY NOW NOW BUY BUY NOW BUY NOW NOW BUY BUY NOW BUY BUY NOW BUY NOW NOW BUY BUY NOW BUY NOW NOW BUY NOW ";
randomStrLen[2] = "BUY NOW BUY NOW BUY NOW BUY NOW BUY NOW BUY NOW BUY NOW BUY NOW BUY NOW BUY NOW BUY NOW BUY NOW BUY NOW BUY";
randomStrLen[3] = "BUY NOW BUY NOW BUY NOW BUY NOW BUY NOW BUY NOW BUY NOW BUY NOW BUY NOW BUY NOW BUY NOW BUY NOW";
randomStrLen[4] = "BUY NOW BUY NOW BUY NOW BUY NOW BUY NOW BUY NOW BUY NOW BUY NOW BUY NOW BUY NOW BUY";
randomStrLen[5] = "BUY NOW BUY NOW BUY NOW BUY NOW BUY NOW BUY NOW BUY NOW BUY NOW BUY";
randomStrLen[6] = "BUY BUY NOW BUY NOW NOW BUY BUY NOW BUY NOW NOW BUY BUY";
randomStrLen[7] = "BUY NOW BUY NOW BUY NOW BUY NOW BUY NOW";
randomStrLen[8] = "BUY NOW BUY NOW BUY NOW BUY";
randomStrLen[9] = "BUY NOW BUY NOW";
randomStrLen[10] = "BUY NOW";
    
    q = Math.floor((Math.random() * 15) + 1);
    e = Math.floor((Math.random() * 10) + 1);
    console.log(consoleColorArr[q] + "%s\x1b[0m" ,randomStrLen[e]);
}





        function getRandomColor() {
			var letters = '0123456789ABCDEF';
			var color = '#';
			for (var i = 0; i < 6; i++) {
			color += letters[Math.floor(Math.random() * 16)];
			}
			return color;
		}
		
        var intervalID = 0;
        var intervalID2 = 0;

        function randomColors(onOrOff){
        $("div").each(function(i) {
                        rc = getRandomColor();
                        if(this.id !== "nav-container"){
                            onOrOff ? $(this).animate({backgroundColor: rc}, 'fast') : this.style.backgroundColor = "";
                        }
                    });
        }

		function divDebugMode(onOrOff = true){
            
            
            if(onOrOff && intervalID2 == 0){
            intervalID2 = window.setInterval(function(){
                                   randomColors(onOrOff);
                                }, 200);

            }
            
            if(onOrOff && intervalID == 0){
                    intervalID = window.setInterval(function(){
                      randomConsoleColor();
                    }, 80);            
            }
            if(!onOrOff){
                clearInterval(intervalID2);
                 intervalID2 = 0;
                randomColors(false);
              clearInterval(intervalID);
            intervalID = 0;
           
                
            console.clear();          
            
            }
		}

        var cartThumbnailArr = ["ibycus","pyramís","electrum"];
        function showThumbnail(imgArrNum,show){
            console.log("showThumbnail(" + imgArrNum + "," + show + ")");
            //if(thumbnailHover){return};
            $("#" + cartThumbnailArr[imgArrNum]).css("background-image", "url('/images/thumbs/" + cartThumbnailArr[imgArrNum] + ".png')");
            if(show){
                    $("#" + cartThumbnailArr[imgArrNum]).show(300);
                }else{
                    $("#" + cartThumbnailArr[imgArrNum]).hide(300);
            }
            
        }

        function decodeEntities(encodedString) {
          var textArea = document.createElement('textarea');
          textArea.innerHTML = encodedString;
          return textArea.value;
        }
		
		//get language code from querystring
		function getLCfromQS(){
			var vars = [], hash;
				var q = document.URL.split('?')[1];
				if(q == undefined){return false};
				if(q != undefined){
					q = q.split('&');
					for(var i = 0; i < q.length; i++){
						hash = q[i].split('=');
						vars.push(hash[1]);
						vars[hash[0]] = hash[1];
					}
			}
			return vars['language'];
		}
		
		function isDesbug(){
			var vars = [], hash;
				var q = document.URL.split('?')[1];
				if(q == undefined){return false};
				if(q != undefined){
					q = q.split('&');
					for(var i = 0; i < q.length; i++){
						hash = q[i].split('=');
						vars.push(hash[1]);
						vars[hash[0]] = hash[1];
					}
			}
			
			//divDebugMode();
			return vars['debug'];
		}
		
        function setMeasurementVariables(){
            $(".measurement-string").html(unitOfMeasure);
            $(".standard-krane-length").html(sizeStandardKrane);
            $(".jumbo-krane-length").html(sizeJumboKrane);
            $(".length-symbol").html(lengthSymbol);
        }		

        function getParameterByName(name) {
            var match = RegExp('[?&]' + name + '=([^&]*)').exec(window.location.search);
            return match && decodeURIComponent(match[1].replace(/\+/g, ' '));
        }





