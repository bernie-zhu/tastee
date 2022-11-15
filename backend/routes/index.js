module.exports = function (app, router) {
    app.use('/api', require('./home.js')(router));
    app.use('/api/login', require('./login.js')(router))
    app.use('/api/signup', require('./signup.js')(router))
};