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

  .get('/:id', function(req, res){
    var page = req.params.id;
    console.log(page);
    res.render('./'+page+'.jade');
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
    this.correctAns = function(pts){
      //return parseInt(this.score) += pts;
      return this.score += pts;
    };
  }).call(User.prototype);

  var user = new User(req.body.firstName, req.body.lastName, req.body.dob, req.body.email);

  users.push(user);
  console.log(users);

  res.redirect('/home');
})

  .post('/ans1', function(req, res){
    users[0].correctAns(parseInt(req.body.ans));
    console.log(users[0]);
    res.redirect('/page2');
  })

  .post('/ans2', function(req, res){
    users[0].correctAns(parseInt(req.body.ans));
    console.log(users[0]);
    res.redirect('/page3');
  })
  .post('/ans3', function(req, res){
    users[0].correctAns(parseInt(req.body.ans));
    console.log(users[0]);
    res.redirect('/page4');
  })




//port 3000
app.listen(3000, function(){
  console.log("Listening on 3000");
});
