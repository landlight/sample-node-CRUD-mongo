
var db = require('../../database')
var ObjectID = require('mongodb').ObjectID;

const create = async (req, res, next) => {
    try{
        if (!req.body.name){
            return res.status(400).json({message: "name is required"});
        }
        let collection = db.get().collection('sample');
        
        collection.insertOne(req.body, function(err, result) {
            if (err) 
                return next(err);
            res.json(result.ops);
        });
    }catch(error){
        return res.status(500).json({error: error});
    }
}

const find = async (req, res, next) => {
    try{
        let collection = db.get().collection('sample')

        collection.find().toArray(function(err, docs) {
            if(err)
                return next(err);
            res.json({sample: docs})
        })
    }catch(error){
        return res.status(500).json({error: error})
    }
}

const update = async (req, res, next) => {
    try{
        if (!req.params.sample_id){
            return res.status(400).json({message: "sample_id is required to update."})
        }
        if (!req.body.name){
            return res.status(400).json({message: "name is required to update."})
        }
        let collection = db.get().collection('sample')
   
        collection.update({_id:ObjectID(req.params.sample_id)}, {$set:{name:req.body.name}}, function(err, result) {
            if (err)
            {
               return next(err);
            }
            else{
               return res.json(result);
            }
          });
    }catch(error){
        return res.status(500).json({error: error})
    }
}

const remove = async (req, res, next) => {
    try{
        if (!req.params.sample_id){
            return res.status(400).json({message: "sample_id is required to update."})
        }
        let collection = db.get().collection('sample')
       
        collection.remove({_id:ObjectID(req.params.sample_id)}, function(err, result) {
            if (err)
            {
               return next(err);
            }
            else{
               console.log(result);
               return res.json(result);
            }
          });
    }catch(error){
        return res.status(500).json({error: error})
    }
}

module.exports = {
    create,
    find,
    update,
    remove
}