module.exports = function (app, router) {
    app.use('/', require('./home.js')(router));
    app.use('/login', require('./login.js')(router))
    app.use('/signup', require('./signup.js')(router))
};