var express = require('express');
var router = express.Router();
var models = require('../models')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index')
})

router.post('/register', function(req, res, next) {
  models.users.create({
    username: req.params.username,
    email: req.params.email,
    password: req.params.password,
    role: req.params.role
  }).then(function(todo) {
    res.redirect('/')
  });
})

module.exports = router;
