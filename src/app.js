const path = require('path');
const hbs = require('hbs');

const fetchWeather = require('../utils/weather').fetchWeather;
const geocode = require('../utils/weather').geocode;

const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

const public_path = path.join(__dirname,'../public');
const view_path = path.join(__dirname, '../templates/views');
const partials_path = path.join(__dirname, '../templates/partials');

// set handle bars view engin and path
app.use(express.static(public_path));
app.set('view engine', 'hbs');
app.set('views', view_path);
hbs.registerPartials(partials_path);

app.get('/', (req,res) => {
    res.render('index', {
        page_name: 'Welcome Page',
        developer: 'Marky Neri'
    });
});

app.get('/weather', (req, res) => {
    if(!req.query.address){
        return res.send('You must provide an address');
    }

    geocode(req.query.address, (data) => {
        if(!data){
            return res.send('Invalid address');
        }
        // console.log('geocode',data);
        fetchWeather(data.center[1],data.center[0],(result) => {
            res.send({result: result});
        });
        // res.send({result: result});
    });
});

app.get('/profile', (req,res) => {
    res.render('profile', {
        page_name: 'Profile',
        developer: 'Marky Neri'
    });
});

app.get('/about', (req,res) => {
    res.render('about', {
        page_name: 'About',
        developer: 'Marky Neri'
    });
});

app.get('*', (req,res) => {
    res.send('<h1>404 Page</h1>');
});

app.listen(port, () => { console.log('server is running at port '+port)});