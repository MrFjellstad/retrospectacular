require('newrelic');

var routes = require('./routes'),
    logs = require('./logs'),
    express = require('express'),
    api = express(),
    config = require('../config').Config,
    auth = require('./auth');

api.use(express.methodOverride());
api.use(express.json());

auth.setup(api, express);
//api.use(auth.session()); // persistent login sessions
//api.use(auth.flash());   // use connect-flash for flash messages stored
                    //in session. Sounded like a good idea

logs.setupLogger(api);

routes.setup(api, auth);

logs.setupErrorLogger(api);

api.listen(config.app.port, config.app.host);
