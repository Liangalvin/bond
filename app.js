var express = require('express')
,    app = express()
,    bodyParser = require('body-parser')
,    users = [];

app.use(bodyParser.urlencoded({ extended: false }))

//get routes
app.get('/', function(req, res){
    res.render('./index.jade');
  })
  .get('/home', function(req,res){
    var msg = {
      fName: users[0].firstName,
      lName: users[0].lastName,
    }
    res.render('./home.jade', {msg: msg});
  })
  .get('/page1', function(req,res){
    res.render('./page1.jade');
  })

//post routes
app.post('/create', function(req, res){
  if (!req.body) return res.sendStatus(400);

  function User(fName, lName, dob, email){
    this.firstName = fName,
    this.lastName = lName,
    this.dob = dob,
    this.email = email,
    this.score = 0
  }(function(){
    this.correctAns = function(){
      return this.score += points
    };
  }).call(User.prototype);

  var user = new User(req.body.firstName, req.body.lastName, req.body.dob, req.body.email);

  users.push(user);
  console.log(users);

  res.redirect('/home');
})
  .post('/ans1', function(req, res){

    var answer ;
  })

//port 3000
app.listen(3000, function(){
  console.log("Listening on 3000");
});
