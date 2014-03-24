//require('newrelic');

var routes = require('./routes'),
    logs = require('./logs'),
    express = require('express'),
    api = express(),
    config = require('../config').Config,
    auth = require('./auth');

api.use(express.methodOverride());
api.use(express.json());

auth.setup(api, express);

logs.setupLogger(api);

routes.setup(api, auth);

logs.setupErrorLogger(api);

api.use(express.static('../../static/app'));

api.listen(config.app.port, config.app.host);
