module.exports = (app) => {
    app.use('/', require('./main'));
    app.use('/login', require('./login'));
};
