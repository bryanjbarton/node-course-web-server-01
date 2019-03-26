const request = require('request')

const forecast = (latitude, longitude, callback) =>{
    const url = `https://api.darksky.net/forecast/ae6f80eb9186363ba33f00a9069c5eb7/${latitude},${longitude}`

    request({url, json:true},(error,{body}) =>{
        if (error){
            callback('Unable to connect to forecast service', undefined)
        } else if (body.error) {
            callback('Unable to find location', undefined)
        } else {
            callback(undefined, body.daily.data[0].summary)
        }
    })
}

module.exports = forecast