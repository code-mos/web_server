const path = require('path');
const hbs = require('hbs');
const express = require('express');
const app = express();

const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

// console.log(__dirname)
// console.log(__filename)

// this is used to set default path to public folder
// console.log(path.join(__dirname, '../public'))

// setting up path for express config
const viewsPath = path.join(__dirname,'../templates/views');  // not necessary if name of folder is views
const partialsPath = path.join(__dirname,'../templates/partials'); 
const publicDirPath = path.join(__dirname, '../public');

// setup handlebar engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// setup static directory to serve
app.use(express.static(publicDirPath));

app.get('/',(req,res) => {
    res.render('index',{
        title: 'Weather App',
        name: 'milek'
    });
});

app.get('/help',(req,res) => {

    // send() automatically stringify the object
    // res.send({
    //     name: 'milek',
    //     age: 21
    // });
    res.render('help',{
        title: 'Help Page',
        name: 'milek'
    })
})

app.get('/about',(req,res) => {
    res.render('about', {
        title: 'About Us',
        name: 'milek'
    })
})

app.get('/weather',(req,res) => {
    if(!req.query.address) {
        return res.send({
            error: 'Please provide the location'
        })
    }

    geocode(req.query.address,(error,data) => {
        if(error) {
            return res.send({
                error: error
            })
        } 
        forecast(data.latitude,data.longitude,(err,forecastData) => {
            if(err) {
                return res.send({
                    error: err
                })
            } 
            
            res.send({
                latitude :data.latitude,
                longitude: data.longitude,
                location:data.location,
                temperature: forecastData.temperature,
                Summary: forecastData.summary
            })
            
        })
    })
})

app.get('/help/*',(req,res) => {
    res.render('404',{
        title: '404',
        errorMsg: 'Help article not found',
        name: 'milek'
    })
})

app.get('*',(req,res) => {
    res.render('404',{
        title: '404',
        errorMsg: 'Page not found',
        name: 'milek'
    })
})

app.listen(3000, () => {
    console.log('server is running on port 3000');
})