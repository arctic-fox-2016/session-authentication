var express = require('express');
var router = express.Router();
var model = require("../models/index")

/* GET home page. */
router.get('/', function(req, res, next) {
  res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
  res.header('Expires', '-1');
  res.header('Pragma', 'no-cache');
  if(req.session.username){
    res.redirect('welcome')
  }
  else{
    res.render('index');
  }
});

router.get('/welcome', function(req, res, next) {
  res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
  res.header('Expires', '-1');
  res.header('Pragma', 'no-cache');
  console.log("Masuk welcome page page page");
  if(req.session.username){
    res.render('welcome',{role:req.session.role,username:req.session.username})
  }
  else{
    res.redirect('/')
  }
});

router.post('/check', function(req, res, next) {
  res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
  res.header('Expires', '-1');
  res.header('Pragma', 'no-cache');
  model.User.findAll({
  where: {
    username: req.body.username,
    password: req.body.password
    }
  }).then(function(result){

      if(result.length==1){
          if(result[0].username==req.body.username && result[0].password==req.body.password){
            console.log(result[0].role);
            console.log("Masuk siniiiiiiiiii");
            req.session.username = result[0].username;
            req.session.role = result[0].role;
            res.redirect('welcome')
          }
          else{
              res.redirect('/')
          }
      }
  })
});

router.get('/register', function(req, res, next) {
  res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
  res.header('Expires', '-1');
  res.header('Pragma', 'no-cache');
  res.render('register');
})

router.post('/insert', function(req, res, next) {
  res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
  res.header('Expires', '-1');
  res.header('Pragma', 'no-cache');
  model.User.create({username: req.body.username,password:req.body.password,role:req.body.role})
  res.redirect('/')
})

router.get('/signout', function(req, res, next) {
  req.session.destroy(function(){
      res.redirect('/')
  })
});

module.exports = router;
