<?php

    //########################################################################
    //########################################################################
    //########################################################################
    //---------------------------- TRUTH SEREUM ------------------------------
    //---------------------------- truthserum.io -----------------------------
    //########################################################################
    //########################################################################
    //########################################################################

/*

Browser refresh script

This script requires the following icrontab entry

open icrontab:
incrontab -e

paste in the following command (directory varies):
/var/www/krane.tv IN_MODIFY echo "1" > /var/www/directory_watcher.txt

Make sure the above file is below your root directory, otherwise an infinite loop may occur

Call the following javascript function after your page has loaded (ready...)

function pollServer(){
    console.log("pollServer()"); 
    $.ajax({
        type:"GET", 
        url: "https://krane.tv/php/auto_refresh.php?statusRequest=true",
        success: function(data){
			console.log(data); 
            if(data == "refresh"){
                location.reload();
            }else{
                pollServer();
            }
            
        }
    });
 
}


*/

    if(isset($_GET["statusRequest"])){
        checkForFileChange();
    }

    $fileChanged = 0;

    function checkForFileChange(){
        global $fileChanged;
        $seconds = 0;
        while(checkFile()== 0 && $fileChanged == 0 && $seconds < 5){
            sleep(1);
            $seconds++; 
        } 

        $myfile = fopen("/var/www/krane_tv_directory_watcher.txt", "w") or die("Unable to open file!");
        fwrite($myfile, "0");
        fclose($myfile);
        if($fileChanged == 1){
                echo "refresh";
            }else{
                echo "false";
        }
       
    } 
   
    function checkFile(){
        global $fileChanged;
        $myfile = fopen("/var/www/krane_tv_directory_watcher.txt", "r") or die("Unable to open file!");
        $fileChanged = fgets($myfile);
        return $fileChanged;
        fclose($myfile); 
    }


?>