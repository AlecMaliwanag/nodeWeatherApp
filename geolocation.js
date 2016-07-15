//Problem: We need a simple way to look at a user's badge count and JavaScript points
//Solution:  Use Node.js to connect to Treehouse's API to get profile information to print out
var https = require("https");


var googleKey = "AIzaSyBgJ6sb7mVhAuafK_C84dIOxoVBbtf5kHY"
var forecastKey = "bb226c0a478ea6fbec19b7800767f448"



//print out message
function printMessage(lat,lng) {
  var message ="The latitude is " + lat + "and the longitude is " + lng;
  console.log(message);
  }

//Print out error messages
function printError(error) {
  console.error(error.message);
}

function get(postalCode) {
  //connect to the Google API
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
            var lat = geolocation.results[0].geometry.location.lat;
            var lng = geolocation.results[0].geometry.location.lng;
            printMessage(lat,lng);
            getForecast(lat,lng);
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

function getForecast(lat,lng) {
//   //connect to the Forecast API
  var request = https.get("https://api.forecast.io/forecast/" + forecastKey +"/" + lat + "," + lng, function(response) {
   var body = '';
  //Read the data
   response.on('data', function (chunk) {
     body += chunk;
   });
  
   //Parse the data
   response.on('end', function() {
     if(response.statusCode == 200) {
         try {
           var weather = JSON.parse(body);
             //store latitude and longitude
            console.log(weather.daily.summary);
          //console.log(lat1 + " " + lng1);
         } catch(error) {
           //parse error
          printError(error); 
         }
     } else {
       //Status Code Error
       printError({message: "There was an error getting the weather  "  + http.STATUS_CODES[response.statusCode] });
     }  
   });
  
 


  });
  //Connection Error
  request.on("error", printError);
}


module.exports.get = get;