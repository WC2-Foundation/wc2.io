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

PHP/Javascript/Incron Automatic browser refresh on file change (hard or soft reload)

Overview: incron watches for file changes recursively within your web directory. Upon IN_MODIFY (any change to any file), directory_watcher.txt 
is updated which in turn causes a page reload via long-polling from the client.


This script requires the following incrontab entry (make sure incron is installed first: "yum install incron" etc...)

open incron:
incrontab -e

paste in the following command:
/var/www/krane.tv IN_MODIFY echo "1" > /var/www/krane_tv_directory_watcher.txt

Make sure the above file is below your root web directory, otherwise an infinite loop may occur.

*/

$dirWatcher = "/var/www/krane_tv_directory_watcher.txt";
$waitSeconds = 30;

/*


Call the following javascript function after your page has loaded (ready...)



function pollServer(){
    console.log("pollServer()"); 
    $.ajax({
        type:"GET", 
        url: "https://krane.tv/php/auto_refresh.php?statusRequest=true",
        success: function(data){
			console.log(data); 
            if(data == "refresh"){
                //Pass in true to hard reload
                location.reload(true);
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
        global $fileChanged,$dirWatcher,$waitSeconds;
        $seconds = 0;
        while(checkFile() == 0 && $fileChanged == 0 && $seconds < $waitSeconds){
            //This is the long-polling part... wait 30 seconds for a response, if no changes occur return false
            sleep(1);
            $seconds++; 
        } 

        $myfile = fopen($dirWatcher, "w") or die("Unable to open file!");
        fwrite($myfile, "0");
        fclose($myfile);
        if($fileChanged == 1){
                echo "refresh";
            }else{
                echo "false";
        }
       
    } 
   
    function checkFile(){
        global $fileChanged,$dirWatcher;
        $myfile = fopen($dirWatcher, "r") or die("Unable to open file!");
        $fileChanged = fgets($myfile);
        return $fileChanged;
        fclose($myfile); 
    }


?>