# nodeWeatherApp
This is node app which can be run from temrinal using node.js. 
Just run the app.js script with your zipcode as argument and it returns lat/lng from google, then the weather from forecast.

#APIs used
Google geolocation API
Forecast API

#Functions 
get(PostalCode) : This basically takes in the postal code and calls the google api for the exact longitude and latitude location 
for the zipcode. 

getForecast(lat,lng) : This takes in the latitude and longitude from previous function and use it to get the forecast for the 
respective API. 

