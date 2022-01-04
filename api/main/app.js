const express = require('express');
const app = express();
const dotenv =require('dotenv')
const bodyParser = require('body-parser');
const passport = require('passport')
app.use(passport.initialize())
app.use(bodyParser.json());


const path =require("path");
require('dotenv').config();

// view engine setup
app.set('views', path.join(__dirname, './welcome/views'));
app.set('view engine', 'ejs');
//connect to database
require('./connection.pools')();
require('./identity/models/identity.schema');
require('./identity/controllers/iam.provider');
require('./Field/field.schema');
require('./Parcel/parcel.schema');
require('./mqtt/mqtt.model')

const SecurityRouter = require('./security/routes.config');
const IdentityRouter = require('./identity/routes.config');
const FieldRouter = require('./Field/routes.config');
const ParcelRouter = require('./Parcel/routes.config');
const indexRouter  = require('./welcome/routes.config');
//const MqttRouter = require('./mqtt/config.routes')

//bind routes to the express application
SecurityRouter.routesConfig(app);
IdentityRouter.routesConfig(app);
FieldRouter.routesConfig(app);
ParcelRouter.routesConfig(app);
indexRouter.routesConfig(app);
//MqttRouter.routesConfig(app)
module.exports = app;