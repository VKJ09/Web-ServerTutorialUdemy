const path = require('path')
const express = require('express')
const hbs = require('hbs')
const getGeoCode = require("./utils/geocode")
const forecast = require("./utils/forecast")
const app = express()
const port = process.env.PORT || 3000


const pathToPublic = path.join(__dirname, '../public')
const pathToView = path.join(__dirname, '../template/views')
const pathToPartial = path.join(__dirname, '../template/partials')

app.set('view engine', 'hbs')
app.set('views', pathToView)
hbs.registerPartials(pathToPartial)


app.use(express.static(pathToPublic))

const title = 'Weather App'
const name = 'Vineet Joshi' 
app.get('', (req,resp) =>{
    resp.render('index', {
        title,
        name, 
    })
})

app.get('/about', (req,resp) =>{
    resp.render('about', {
        title : 'About',
        name,
    })
})

app.get('/help', (req,resp) =>{
    resp.render('help', {
        title : 'Help',
        example : "This is some useful help.",
        name,
    })
})

app.get('/weather' , (req,resp) => {
    if (!req.query.address)
    {
        return resp.send({
            error :  'No Address provided'
        })
    }
    
    getGeoCode( req.query.address , (error, {lat, long, place} = {}) => {
        if (error){
            return  resp.send ({
                "Error" : error
            })
        }
       
        forecast(lat, long, (error, Fdata) => {
            if (error){
                return  resp.send ({
                    "Error" : error
                })
            }

            resp.send ({
                location : place,
                Forecast : Fdata,
                address  : req.query.address
          })
    })    

    })
})

app.get('/help/*' , (req,resp) => {
    resp.render('404Page', {
        title : 404,
        name,
        error : "Help Article Not Found"

    })
})

app.get('/product' , (req,resp) => {
    if (!req.query.search){
    return resp.send({
        error : 'Incomplete Query'
    })
    }
    resp.send({
        product : []
    })
})

app.get('*' , (req,resp) => {
    resp.render('404Page', {
        title : 400,
        name,
        error : "Page not found"
    })
})



app.listen(port, () => {
    console.log("Server started at port" + port)
})