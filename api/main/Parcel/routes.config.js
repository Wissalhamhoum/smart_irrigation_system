const ParcelProvider = require('./parcel.provider');
const AuthorizationPermission = require('../security/authorization/authorization.permission');

const   passport = require('passport'),
        config = require('../env.config');


exports.routesConfig = function (app) {
    app.post('/:fieldId/parcel/new',[
        passport.authenticate('jwt', { session: false }),
        ParcelProvider.createParcel
    
    ]);

    app.delete('/users/:userId/deleteparcel/:parcelId',[
        passport.authenticate('jwt', { session: false } ),
        AuthorizationPermission.onlySameUserOrAdminCanDoThisAction,
        ParcelProvider.removeById
    ]);

    app.get('/users/:userId/parcel/:parcelId',[
        passport.authenticate('jwt', { session: false }),
        AuthorizationPermission.onlySameUserOrAdminCanDoThisAction,
        ParcelProvider.getById
    ]);

    app.post('/users/:userId/update/:parcelId/',[
        passport.authenticate('jwt', { session: false }),
        AuthorizationPermission.onlySameUserOrAdminCanDoThisAction,
        ParcelProvider.putById
    ]);

    app.get('/users/:userId/parcel/list/',[
        passport.authenticate('jwt', { session: false }),
        AuthorizationPermission.onlySameUserOrAdminCanDoThisAction,
        ParcelProvider.getList
    ]);
    

};
