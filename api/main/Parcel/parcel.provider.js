const ParcelModel = require('./parcel.model');

exports.createParcel = async (req ,res , next) =>  {
    try {
        req.body.fieldId = req.params.fieldId
        const saved = await ParcelModel.createAParcel(req.body);
        res.status(201).send({id: saved._id});
    } catch (err) {
        return next(err);
    }
}

exports.removeById = (req, res) => {
    ParcelModel.deleteParcel(req.params.parcelId)
        .then((result)=>{
            res.status(201).send({'delete': 'ok'});
        });
};
//In the case where a field is deleted all its associated parcels should be deleted by consequence, this is the 
//the role of the folowing methoode

exports.removeAllParcels = (req , res , next) => {
    ParcelModel.deleteLotParcels(req.params.fieldId)
        .then((result) => {
            next();
        });
}


exports.findByLocation = (req , res , next) =>{
    try {
        const result = ParcelModel.findBylocation(req.params.location);
        res.status(201).send(result);
    } catch (err) {
        return next(err);
    }

}

exports.getById = (req, res) => {
    ParcelModel.findById(req.params.parcelId)
        .then((result) => {
            res.status(200).send(result);
        });
};

exports.getList = (req, res) => {
    ParcelModel.findListOfParcels(req.params.fieldId)
    .then ((result) => res.status(201).send(result))
};

exports.putById = (req, res) => {
    ParcelModel.updateParcelInfo(req.params.parcelId, req.body)
        .then((result)=>{
            res.status(201).send({result});
        });
};


