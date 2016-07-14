var geolocation = require("./geolocation");
var postalCode = process.argv.slice(2);

postalCode.forEach(geolocation.get);

