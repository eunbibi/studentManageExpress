// Load the Mongoose model
var Student = require("mongoose").model("Student");
var Comment = require("mongoose").model("Comment");


exports.comments = function (req, res) {
  req.session.comment = req.body.comment;
  Student.findOne({ email: req.session.email }, function (err, student) {
    if (err) {
      res.json({ Error: err });
    } else {
      res.render("comments", {
        title: "Comments Form",
        firstName: student.firstName,
        lastName: student.lastName,
        email: student.email,
      });
    }
  });
};

exports.thankYou = async function (req, res) {
  let students = await Student.findOne({ email: req.session.email });
  res.render("thankyou", {
    title: "Thank You",
    email: students.email,
    comment: req.session.comment,
  });
};

exports.submitComments = async function (req, res) {
  var email = req.session.email;
  let comments = await Comment.find({});
  console.log('email:', email);
  console.log('comments:', comments);
  res.render("submit_comments", {
    title: "Comments List",
    data: comments,
  });
};

exports.commentsByStudent = function (req, res, next) {
  var email = req.session.email;
  //find the student then its comments using Promise mechanism of Mongoose
  Student.
  findOne({ email: email }, (err, student) => {
    if (err) { return getErrorMessage(err); }
    //
    req.id = student._id;
    console.log(req.id);
  }).then(function () {
    //find the posts from this author
    Comment.
    find({
      student: req.id
    }, (err, comments) => {
      if (err) { return getErrorMessage(err); }
      //res.json(comments);
      res.render('comments', {
       comments: comments, email: email
      });
    });
  });
  };
  function getErrorMessage(err) {
    if (err.errors) {
      for (let errName in err.errors) {
        if (err.errors[errName].message) return err.errors[errName].message;
        }
    } 
    else {
      return 'Unknown server error';
    }
  };



//find by user
exports.findByUser = function (req, res, next) {
  var email = req.session.email;
  console.log('email:', email)
  //find the user then its posts using Promise mechanism of Mongoose
   Student.findOne({ email: email }, (err, student) => {
          if (err) { return getErrorMessage(err); }
          //
          req.id = student._id;
          console.log(req.id);
      }).then(function () {
          //find the posts from this student
          Comment.
              find({
                  student: req.id
              }, (err, comments) => {
                  if (err) { return getErrorMessage(err); }
                  res.render('comments', {
                      comments: comments, email: email
                  });
              });
      });
};


//Mongoose stuff
// Create a new 'create' controller method
exports.create = function (req, res, next) {
  var email = req.session.email;
  console.log('email: ', email);
  
  req.body.email = email;
  req.body.comment.email = email;
  req.session.comment = req.body.comment;
  // Create a new instance of the 'Student' Mongoose model
  var comment = new Comment(req.body); //get data from ejs page and attaches them to the model
  // Use the 'Student' instance's 'save' method to save a new user document
  comment.save(function (err) {
    if (err) {
      // Call the next middleware with an error message
      return next(err);
    } else {
      // Use the 'redirect' object t
      res.redirect("/thankyou");
    }
  });
};

