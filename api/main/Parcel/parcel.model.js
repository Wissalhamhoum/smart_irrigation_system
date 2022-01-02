const Parcel = require('mongoose').model('Parcel')

exports.createAParcel = async (parcelData) => {
    const parcel = new Parcel(parcelData);
    return await parcel.save();
};

exports.deleteParcel = (parcelId) => {
    return new Promise((resolve, reject) => {
        Parcel.deleteOne({_id:parcelId }, (err) => {
            if (err) {
                reject(err);
            } else {
                resolve(err);
            }
        });
    });
}

exports.deleteLotParcels = (fieldId) => {
    return new Promise((resolve, reject) => {
        Parcel.deleteMany({"fieldId":fieldId }, (err) => {
            if (err) {
                reject(err);
            } else {
                resolve(err);
            }
        });
    });
}

exports.updateParcelInfo = (id , parcelData) =>{
    return new Promise((resolve, reject) => {
        Parcel.findByIdAndUpdate(id,parcelData,function (err,parcel) {
            if (err) reject(err);
            resolve(parcel);
        });
    });
}

//In case a user wants to retrieve information about the parcel he is standing on
exports.findBylocation = (location) => {
    return Parcel.find({goloactaion : location})        
};

exports.findById=(id) => {
    return Parcel.findById(id)
        .then((result) => {
            result = result.toJSON();
            delete result._id;
            delete result.__v;
            return result;
        });
}

exports.findListOfParcels = (fieldId) => {
    return Parcel.find({"fieldId" : fieldId})
}

