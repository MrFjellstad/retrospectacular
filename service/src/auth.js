'use strict';

var passport = require('passport'),
    googleStrategy = require('passport-google').Strategy,
    config = require('../config').Config;


exports.setup = function (api, express) {
    api.use(express.cookieParser());
    api.use(express.session({ secret: config.app.secret }));
    api.use(passport.initialize());
    api.use(passport.session());
    //api.use(flash());
    passport.serializeUser(function(user, done) {
        done(null, user);
    });

    passport.deserializeUser(function(obj, done) {
        done(null, obj);
    });


    passport.use(new googleStrategy({
        returnURL: 'http://' + config.app.host + ':' +
            config.app.port + '/auth/google/return',
        realm: 'http://' + config.app.host + ':' +
            config.app.port + '/'
    }, function(identifier, profile, done) {
        // asynchronous verification, for effect...
            process.nextTick(function () {


    // Passport session setup.
    // To support persistent login sessions, Passport needs to be able to
    // serialize users into and deserialize users out of the session. Typically,
    // this will be as simple as storing the user ID when serializing, and finding
    // the user by ID when deserializing. However, since this example does not
    // have a database of user records, the complete Google profile is serialized
    // and deserialized.
                profile.identifier = identifier;
                return done(null, profile);
            });
        }));
};

exports.authenticate = function ( strategy, options, callback ) {
    return passport.authenticate( strategy, options, callback );
};

exports.isAuth = function(req, res, next) {
    if (!req.isAuthenticated()) {
        res.send(401);
    } else {
        next();
    }
};