const request = require('request');

const geocode = (address,callback) => {
    const geocodeURL = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1IjoibWlsZWthZzAxIiwiYSI6ImNqdGZ2dDg0dTF4OTgzeXQ1aWNxbm9qbGUifQ.cY67Gs5VsVTLZq-vdAow7A&limit=1`

    request({url: geocodeURL, json: true}, (error,response) => {
        if(error) {
            callback('Unable to connect to location services.', undefined);
        } else if(response.body.features.length === 0) {
            callback('Unable to find location. Please try again.',undefined);
        } else {
            callback(undefined,{
                latitude: response.body.features[0].center[1],
                longitude: response.body.features[0].center[0],
                location: response.body.features[0].place_name
            });
        }
    });
}

module.exports = geocode;