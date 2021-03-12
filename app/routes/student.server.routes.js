
var student = require("../controllers/student.server.controller");

module.exports = function (app) {
  //handle a get request made to root path
  app.get("/", student.index); 
  app.get("/signup", student.signUp); 
  app.post("/signup", student.create);
  app.get("/signin", student.signIn); 
  app.post("/signin", student.find);
  app.get("/students", student.students); 
};
