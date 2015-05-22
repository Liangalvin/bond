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
    var msg = parseInt(users[0].score);
    console.log(msg);

    if(page !== "results"){
      res.render('./'+page+'.jade');
    }
    else {
      res.render('./results.jade', {msg: msg});
    }
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

  .post('/ans/:id', function(req, res){
    var num = parseInt(req.params.id);
    users[0].correctAns(parseInt(req.body.ans));
    console.log(users[0]);
    if (num <= 9) {
      num += 1;
      res.redirect('/page'+num);
    }
    else {
      res.redirect('/results');
    }

  })

app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

//port 3000
app.listen(3000, function(){
  console.log("Listening on 3000");
});
