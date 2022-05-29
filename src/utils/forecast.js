const request=require('request')

const forecast=(latitude,longitude,callback)=>{
    const url='http://api.weatherstack.com/current?access_key=13070b075b89caff6ee2a856fe4a5943&query=latitude,longitude &units=m '
    request({url:url,json:true},(error,response)=>{
        if(error){
            callback('Unable to connnect to weather service!',undefined)
        }else if(response.body.error){
            callback('Unable to find location',undefined)
        }else{
            callback(undefined,response.body.current.weather_descriptions[0]+' It is currently '+ response.body.current.temperature + ' and it feels like '+ response.body.current.feelslike)

        }
    })

}




module.exports=forecast