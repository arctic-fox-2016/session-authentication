var express = require('express');
var router = express.Router();
var model = require("../models/index")

/* GET home page. */
router.get('/', function(req, res, next) {
  if(req.session.username){
    res.render('welcome',{role:req.session.role,username:req.session.username})
  }
  else{
    res.render('index');
  }
});



router.post('/login', function(req, res, next) {
  model.User.findAll({
  where: {
    username: req.body.username,
    password: req.body.password
    }
  }).then(function(result){

      if(result.length==1){
          console.log(result[0].role);
          req.session.username = result[0].username;
          req.session.role = result[0].role;
          res.render('welcome',{role:req.session.role,username:req.session.username})
      }

    else{
        res.render('index')
    }
  })
});

router.get('/register', function(req, res, next) {
  res.render('register');
})

router.post('/insert', function(req, res, next) {
  model.User.create({username: req.body.username,password:req.body.password,role:req.body.role})
  res.redirect('/')
})

router.get('/signout', function(req, res, next) {
  req.session.destroy()
  res.redirect('/')
});

module.exports = router;
