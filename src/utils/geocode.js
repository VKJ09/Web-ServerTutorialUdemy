const req = require ('postman-request')

const getGeoCode = (location, callback)=>{
    const url = "http://api.mapbox.com/geocoding/v5/mapbox.places/" + location +".json?access_token=pk.eyJ1IjoidmluZWV0am9zaGkiLCJhIjoiY2tjbmM1bG9zMDlxZDJzcXZ1amU4bzZsYyJ9.WHkkjAmxh-F09-ad4u2Efw&limit=1"
    req({url, json : true}, (error, {body } )=>{
        if (error){
            console.log ("populating error")
            callback("Unable to connect to service",undefined)
        } else if (body.features.length == 0){
            callback("wrong Input Area not found",undefined )
        }else{
            console.log ("Should not come here ")
            const data = {
               long : body.features[0].center[0],
               lat : body.features[0].center[1],
               place : body.features[0].place_name
            }
            callback(undefined, data)
        }
    })
}

module.exports = getGeoCode
