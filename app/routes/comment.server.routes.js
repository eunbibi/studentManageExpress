
var comment = require("../controllers/comment.server.controller");

//handle routing for get and post request
module.exports = function (app) {
  //handle a get request made to root path
  app.get("/comments", comment.comments);  
  app.post("/comments", comment.create);
  app.get("/thankyou", comment.thankYou); 
 app.get("/submit_comments", comment.submitComments); 
  //app.get("/submit_comments", comment.commentsByStudent); 
};  
