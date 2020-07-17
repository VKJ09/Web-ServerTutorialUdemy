const req = require('postman-request')

const forecast = (lat, long, callback) =>{
    const url = "http://api.weatherstack.com/current?access_key=81d1ca7a72e362c2e3e092ed9ab512a3&query="+lat+","+long
    req({url, json : true}, (error, {body})=>{

        if (error){
            callback("Unable to connect",undefined)
        } else if (body.error){
            callback(body.error.info, undefined)
        } else{
            callback(undefined, body.current.weather_descriptions[0]+ ". It is currently " + body.current.temperature + " degrees out, it feels like "+ body.current.feelslike + " out")
     
    }


    } )
}

module.exports = forecast

