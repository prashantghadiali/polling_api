const express = require('express');
const router = express.Router();

// console.log("in index route");

const quesController = require('../controller/questioncontroller')


router.get('/', function(req, res){
    return res.status(200).json({
        messeage: "home page!"
    })
});

// create Question
router.post('/questions/create', quesController.createquestion);

// Delete Question
router.post('/questions/:id/delete', quesController.deletequestion);

// create Options
router.post('/questions/:id/options/create', quesController.createoption);

// Delete Option
router.post('/options/:id/delete', quesController.deleteoption);

// To add Votes
router.post('/options/:id/add_vote', quesController.add_vote);

// Get Question by ID
router.get('/questions/:id', quesController.getquestion)




module.exports = router;