// Load the 'Student' Mongoose model
var Student = require("mongoose").model("Student");

exports.index = function (req, res) {
  //display index.ejs
  res.render("index", {
    title: "Home",
  });
};

exports.signUp = function (req, res) {
  //display signup.ejs
  res.render("signup", {
    title: "Sign Up",
   
  });
};

exports.signIn = function (req, res) {
  //display signin.ejs
  res.render("signin", {
    title: "Sign in",
  });
};

exports.students = async function (req, res) {
  let students = await Student.find({});
  res.render("students", {
    title: "Students List",
    data: students,
  });
};

//Mongoose stuff
// Create a new 'create' controller method
exports.create = function (req, res, next) {
  req.session.email = req.body.email;
  // Create a new instance of the 'Student' Mongoose model
  var student = new Student(req.body); //get data from ejs page and attaches them to the model
  // Use the 'Student' instance's 'save' method to save a new user document
  student.save(function (err) {
    if (err) {
      // Call the next middleware with an error message
      return next(err);
    } else {
      // Use the 'redirect' object t
      res.redirect("/comments");
    }
  });
};

// Create a new 'find' controller method
exports.find = function (req, res, next) {
  // executes, passing results to callback
  req.session.email = req.body.email;
  Student.find(
    { email: req.body.email, password: req.body.password },
    function (err, student) {
      if (err) {
        res.json({ Error: err });
      } else if (!student.length) {
        res.json({
          Error:
            "Invalid Email or password. Please try it again",
        });
      } else {
        res.redirect("/comments");
      }
    }
  );
};

