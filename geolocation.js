//Problem: We need a simple way to look at a user's badge count and JavaScript points
//Solution:  Use Node.js to connect to Treehouse's API to get profile information to print out
var https = require("https");
var http = require("http");

var googleKey = "AIzaSyBgJ6sb7mVhAuafK_C84dIOxoVBbtf5kHY"



//print out message
function printMessage(lat1,lng1) {
  var message ="The latitude is " + lat1 + "and the longitude is " + lng1;
  console.log(message);
  }

//Print out error messages
function printError(error) {
  console.error(error.message);
}

function get(postalCode) {
  //connect to the API URL (http://teamtreehouse.com/username.json)
  var request = https.get("https://maps.googleapis.com/maps/api/geocode/json?address=" + postalCode+"&components=postal_code&key=" + googleKey, function(response) {
   var body = '';
  //Read the data
   response.on('data', function (chunk) {
     body += chunk;
   });
    
   //Parse the data
   response.on('end', function() {
     if(response.statusCode == 200) {
         try {
           var geolocation = JSON.parse(body);
             //store latitude and longitude
            var lat1 = geolocation.results[0].geometry.location.lat;
            var lng1 = geolocation.results[0].geometry.location.lng;
            printMessage(lat1,lng1);
          //console.log(lat1 + " " + lng1);
         } catch(error) {
           //parse error
          printError(error); 
         }
     } else {
       //Status Code Error
       printError({message: "There was an error getting the location"  + http.STATUS_CODES[response.statusCode] + ")"});
     }  
   });
    
   
  

  });
  //Connection Error
  request.on("error", printError);
}


module.exports.get = get;