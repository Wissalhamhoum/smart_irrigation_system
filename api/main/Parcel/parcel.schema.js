//Each field is formed by one or more parcels, each one is planted with one type of plants

const mongoose = require ('mongoose') 

const parcelSchema = new mongoose.Schema({
    fieldId: { type: String, required: true },
    geoLocation: {
        type: [ Number , Number ], 
        required: true ,

    },
    surface : {type: Number},
    plants: {type: String},
} ,{timestamps : true}
);


module.exports = mongoose.model('Parcel' , parcelSchema)