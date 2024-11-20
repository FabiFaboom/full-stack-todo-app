const mongoose = require('mongoose');

// Schema -> structure of our document (equivalent to table in Relational Database)
const TodoSchema = mongoose.Schema({
    text: {type: String, required: true} // if someone would add a black field it would not be added
})


const TodoModel = mongoose.model("todos", TodoSchema);

module.exports = TodoModel;