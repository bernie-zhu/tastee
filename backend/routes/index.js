module.exports = function (app, router) {
    app.use('/api', require('./default.js')(router));
    app.use('/api/login', require('./login.js')(router))
    app.use('/api/signup', require('./signup.js')(router))
    app.use('/api/home', require('./home.js')(router))
    app.use('/api/userinfo', require('./userinfo.js')(router))
};