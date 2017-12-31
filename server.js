const express = require('express');
// Handlbars template engine
const hbs = require('hbs');
// const fs = require('fs');
const port = process.env.PORT || 3000;

var app = express();

// Register location for HBS partials
hbs.registerPartials(__dirname + '/views/partials')
// Set view engine
app.set('view engine', 'hbs');
// Middleware (applied in order of calls)
app.use((req, res, next) => {
    var now = new Date().toString();
    var log = `${now}: ${req.method} ${req.url}`
    console.log(log);
    // Callback required in node v7+
    // fs.appendFile('server.log', log + '\n', (err) => {
    //     if (err) {
    //         console.log('Unable to append to server.log');
    //     }
    // });
    next();
});

// without next() no other route allowed
// app.use((req, res, next) => {
//     res.render('maintenance.hbs');
// });

app.use(express.static(__dirname + '/public'));

// HBS helplers
hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear()
});
hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase();
});

// Routes
app.get('/', (req, res) => {
    res.render('home.hbs', {
        pageTitle: 'Home Page',
        welcome: 'Welcome to my web site!'
        //currentYear provided by hbs helper
    });
});

app.get('/about', (req, res) => {
        res.render('about.hbs', {
            pageTitle: 'About Page'
            //currentYear provided by hbs helper
        });
});

app.get('/projects', (req, res) => {
    res.render('projects.hbs', {
        pageTitle: 'Projects Page'
        //currentYear provided by hbs helper
    });
});

app.get ('/bad', (req, res) => {
    res.send({
        error:'This is bad'
    });
});

// Server start up
app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});