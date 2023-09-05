const Question = require('../models/Question');

module.exports.questionhome = async function(req, res){
    let que = await Question.find({});
    return res.status(200).json({
        messeage: "home page question",
        que:que
    })
}


module.exports.createquestion = async function(req, res){
    console.log(req.body);
    try {
        // let que = await Question.find({});
        // function generateId() {
        //     return Math.floor(Math.random() * 1000000)
        // }
        // console.log("id :", id);
        await Question.create(req.body);
            // const doc = await Question.findOne(que);
            // let link_to_vote = `http://localhost:8000/options/${id}/add_vote`;
            // // push the body value to interview array in created student
            // doc.options.push({id:id, text:req.body.text, votes:votes, link_to_vote: link_to_vote})
            // // if pushed complete then save the value
            // await doc.save()
        // console.log("Question Created :", doc);
        console.log("create Success Question", req.body);
        return res.status(201).json({
                message: 'Question created successfully',
            });
        
        
    } catch (error) {
        console.log("Error Creating Question:", error);   
    }
}


// create Option 
module.exports.createoption = async function(req, res){
    try {
        // Get the question ID from the request parameters
        let questionId = req.params.id

        console.log("optionText", req.body.text);


        let question = await Question.findById(questionId);

        console.log("que:", question);

        // If the question is not found, send a not found response
        if (!question) {
            res.status(404).send("Question not found");
            return
        }

        

        // Create a new option object with a unique ID, the option text, and zero votes
        let option = {
            text: req.body.text,
            votes: req.body.votes ? req.body.votes : question.options.votes + 1,
        }
        console.log("option:", option);

        
        // Push the option to the question's options array using mongoose
        question.options.push(option);
        

        const updatedQuestion = await question.save();

        // Find the newly added option in the updated question
        const newOption = updatedQuestion.options.find(
            (o) => o.text === option.text 
        );

        // Add the link_to_vote property to the new option
        newOption.link_to_vote = `http://localhost:8000/options/${newOption._id}/add_vote`;
       
        
        // Save the updated question (including the newOption.link_to_vote) to the database
        await updatedQuestion.save();

        console.log("Entry question:", question);

        return res.status(201).json({
            message: 'Option created successfully',
        });
        
    } catch (error) {
        console.log("Error Creating Option:", error);
    }
}



// delete Question
module.exports.deletequestion = async function(req, res){
    try {
        // Get the question ID from the request parameters
        let questionId = req.params.id;

        let que = await Question.findById(questionId);

        if (!que) {
            res.status(404).send("Question not found");
            return
        }

        await Question.findByIdAndDelete(questionId);

        return res.status(200).json({
            message: 'Question Deleted Succesfully'
        })
    } catch (error) {
        console.log("Error Deleting Question:", error);
    }
}

// delete Option
module.exports.deleteoption = async function(req, res){
    try {
        // Get the question ID from the request parameters
        let optionID = req.params.id;

         // Find the question that contains the option by using the $pull operator
        const Option_fetch = await Question.findOneAndUpdate(
            { 'options._id': optionID },
            { $pull: { options: { _id: optionID } } },
            { new: true }
        );
        
        if (!Option_fetch) {
            res.status(404).send("Option not found");
            return
        }

        console.log("option :", Option_fetch);
        return res.status(200).json({
            message: "Deleted Option"
        })
        
    } catch (error) {
        console.log("Error Deleting Option:", error);
    }
}



// Add Vote
module.exports.add_vote = async function(req, res){
    try {
        // Get the option ID from the request parameters
        let optionId = req.params.id

        // Find the question that contains the option by its ID
        const question = await Question.findOne({ 'options._id': optionId });

        if (!question) {
        return res.status(404).send('Question not found');
        }

        // Find the specific option within the question's options array
        const optionToUpdate = question.options.find((option) => option._id.toString() === optionId);

        if (!optionToUpdate) {
        return res.status(404).send('Option not found');
        }

        // Check if req.body.votes is specified
        if (typeof req.body.votes !== 'undefined') {
            // If specified, set the votes property to the specified value
            optionToUpdate.votes = req.body.votes;
        } else {
            // If not specified, increment the votes property by 1
            optionToUpdate.votes += 1;
        }

        // Save the updated question
        await question.save();
        

        console.log("option :", question );

        return res.status(200).json({
            message: 'votes added succesfully'
        });

    } catch (error) {
        console.log("Error Adding Vote:", error);
    }
}



module.exports.getquestion = async function(req, res){
    try {
        let queID = req.params.id;

        let que = await Question.findById(queID);

        return res.status(200).json({
            question: que
        })
    } catch (error) {
        console.log("Error Fetching Question:", error);
    }
}