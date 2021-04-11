const request = require('request');

const fetchWeather = (lat,lng, callback) => {
    request({url:'https://api.darksky.net/forecast/07d03f27d9ee6d09d5b41b7940181a81/'+lat+','+lng, json:true}, (error, response) => {
        if(error){
            console.log('Error Fetch Weather');
            return;
        }
            
        
        console.log("fetchWeather", response.body.currently);
        callback(response.body.currently);
    });
}

const geocode = (address, callback) => {
    const geocodeUrl = "https://api.mapbox.com/geocoding/v5/mapbox.places/"+ encodeURIComponent(address)+".json?limit=1&access_token=pk.eyJ1IjoibWFya3kxMTI0MDgiLCJhIjoiY2p2eDlpbngwMDJ0bzN5czI1MTBybzJjOCJ9.JQjt3aKWFUV_9oGd_PLS-Q";
    request({url: geocodeUrl, json:true}, (error, response) => {
        if(error){
            console.log('Error geocode');
            return;
        }
            
    
        callback(response.body.features[0]);
    });
}

module.exports = {
    fetchWeather,
    geocode
}