// Require mongoose
const mongoose = require("mongoose")

// Define a schema for the option subdocument
const optionSchema = new mongoose.Schema({
  id: Number,
  text: String,
  votes: Number,
  link_to_vote: String
})

// Define a schema for the question document
const questionSchema = new mongoose.Schema({
  id: Number,
  title: String,
  options: [optionSchema] // Use the option schema as a subdocument
})

// Create a model from the question schema
const Question = mongoose.model("Question", questionSchema)

// Export the model
module.exports = Question