const express = require('express')
const router = express.Router()
const mongoClient = require('mongodb').MongoClient
const dbURL = "mongodb://localhost:27017"

router.get('/:meal',function(req, res){
	
	mongoClient.connect(dbURL,function(err, db) {
        const meals = db.db('meals');
        const zaocan = meals.collection(req.params.meal)
        zaocan.find({}).toArray(function(error, docs) {
            res.send(docs);         
            res.end();
            db.close();
        })
    })
})

router.get('/:meal/page/:page',function(req, res){
	
	mongoClient.connect(dbURL,function(err, db) {
        const meals = db.db('meals');
        const zaocan = meals.collection(req.params.meal)
        const num = 10
        const page = req.params.page
        zaocan.find({}).limit(num).skip(num * page).toArray(function(error, docs) {
            res.send(docs);         
            res.end();
            db.close();
        })
    })
})

router.get('/:meal/meal_id/:id',function(req, res){
	
	mongoClient.connect(dbURL,function(err, db) {
        const meals = db.db('meals');
        const meal_collection = meals.collection(req.params.meal);
        meal_collection.find({'recipe_id' : req.params.id}).toArray(function(error, docs) {
            res.send(docs);         
            res.end();
            db.close();
        })
    })
})

module.exports = router