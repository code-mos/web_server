const request = require('request');

const forecast = (lat,long,callback) => {
    const weatherURL=`https://api.darksky.net/forecast/e836563bdf694641a853a1fa9e01bf14/${lat},${long}`;

    request({url: weatherURL, json: true},(error,response) => {
        if(error) {
            callback('Unable to reach to weather services',undefined);
        } else if(response.body.error) {
            callback('Unable to find given location. Try again', undefined);
        } else {
            callback(undefined,response.body.currently);
        }
    })
}

module.exports = forecast;