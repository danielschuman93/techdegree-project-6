//Require app dependencies
const express = require('express');
const { projects } = require('./data.json');

//Initiate express
const app = express();

//Set view engine to pug
app.set('view engine', 'pug');

//Set route to serve static files
app.use('/static', express.static('public'));

//Configure routes for GET requests to render from pug templates:
//Home page
app.get('/', (req, res) => {
    res.render('index', { projects });
});
//About page
app.get('/about', (req, res) => {
    res.render('about');
});
//Project page(s)
app.get('/projects/:id', (req, res) => {
    const projectId = req.params.id;
    const project = projects.find( ({ id }) => id === +projectId);
    res.render('project', { project });
});

//Create custom 404 error object and pass it to `next` function
app.use((req, res, next) => {
    const err = new Error('Page Not Found');
    err.status = 404;
    next(err);
});
//Display error page when no valid route is found
app.use((err, req, res, next) => {
    res.locals.error = err;
    res.status(err.status);
    res.render('error');
    console.log(err.message);
});

//Host app on port 3000
app.listen(3000, () => {
    console.log('The application is running on localhost:3000!')
});
