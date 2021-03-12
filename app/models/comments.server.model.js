
// Load the Mongoose module and Schema object
const mongoose = require("mongoose");

const Schema = mongoose.Schema;

//new CommentSchema
const CommentSchema = new Schema({
  coursecode: String,
  coursename: String,
  program: String,
  semester: String,
  comment: String,
  date: {
    type: Date,
    default: Date.now,
  },
  student:{
    type:Schema.Types.ObjectId,
    ref:'Student'
  }
});

mongoose.model("Comment", CommentSchema);
