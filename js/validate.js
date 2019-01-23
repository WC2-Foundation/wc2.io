	function changeBGcolor(fieldName,boo,color = "#FFF"){
        var bgColor;
		boo?bgColor=color:bgColor="red";
		$("#" + fieldName).css("background-color", bgColor);
		if(!boo){
			pass = false;
		}
		return boo;
	}

    function validateInput(fieldNames){
        
        var validated = true;
        var myarray = fieldNames.split(',');
        for(var i = 0; i < myarray.length; i++){
            if($("#" + myarray[i]).val().length == 0){
                changeBGcolor(myarray[i],false);
                validated = false;
            }else{
                changeBGcolor(myarray[i],true);
            }
        }
        return validated; 
    }


	function checkNameAndEmail(){ 

        if(!validateInput("firstName,lastName") | !validateEmail($("#emailAddress").val())){
            return false;
        }

        contactInformation["firstName"] = $("#firstName").val();
        contactInformation["lastName"] = $("#lastName").val();
        contactInformation["emailAddress"] = $("#emailAddress").val();
        return true;
    }
	
	function validateEmail(sEmail) {
		var filter = /^\b[A-Z0-9._%-]+@[A-Z0-9.-]+\.[A-Z]{2,4}\b$/i;
		if (filter.test(sEmail)) {
			changeBGcolor("emailAddress",true);
            return true;
		}else{
            changeBGcolor("emailAddress",false);
			return false;
		}

	}


