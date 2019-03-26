const express = require('express')
const path = require('path')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')


const app = express()

//define  paths for express config
const publicDirPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//setup handlebars and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//setup static directory to serve
app.use(express.static(publicDirPath))

app.get('', (req,res) =>{
    res.render('index', {
        title: 'weather app',
        name: 'Bryan B'
    })
})

app.get('/about', (req,res) =>{
    res.render('about', {
        title: 'About Page',
        name: 'Bryan B'
    })
})

app.get('/help', (req,res) =>{
    res.render('help', {
        title: 'Help Page',
        name: 'Bryan B'
    })
})


app.get('/weather', (req,res) =>{
    if (!req.query.address){
       return res.send({ 
           error: 'No address provided'
        })
    } else {
        geocode(req.query.address, (error, {latitude, longitude, location} = {})=>{
            if (error){
              return res.send({error})
            }
          
            forecast(latitude, longitude, (error, forecastData) => {
             if (error) {
                 return res.send({error})
             }

             res.send({
                 forecast: forecastData,
                 location,
                 address:req.query.address
             })
            })
          
          })
    }
    // res.send({
    //     forecast:'sunny',
    //     loction:'Philadelphia',
    //     address: req.query.address
    // })
})

app.get('/products', (req,res)=>{
    console.log(req.query)
    res.send({
        products:[]
    })
})

app.get('/help/*', (req,res)=>{
    res.render('404', {
       error: 'The help article was not found.'
    })
})
app.get('*', (req,res)=>{
    res.render('404', {
        error: 'Page not found'
      
    })
})
app.listen(3000, () => {
    console.log('Server is running on port 3000')
})