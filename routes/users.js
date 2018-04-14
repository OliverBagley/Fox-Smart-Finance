var express = require('express');
var router = express.Router();
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var session = require('express-session')

var User = require('../models/user');

// Register
router.get('/register', function(req, res){
	res.render('register');
});

// Register
router.get('/account', function(req, res){
	res.render('account');
});

// Home
router.get('/home', function(req, res){
	res.render('home');
});

// Login
router.get('/login', function(req, res){
	res.render('login');
});




// Registration inputs
router.post('/register', function(req, res){
	var name = req.body.name;
	var lname = req.body.lname;
	var email = req.body.email;
	var username = req.body.username;
	var password = req.body.password;
	var password2 = req.body.password2;

	// Validate entered information
	req.checkBody('name', 'Firstname is required').notEmpty();
	req.checkBody('lname', 'Lastname is required').notEmpty();
	req.checkBody('username', 'Email is not valid').isEmail();
	req.checkBody('username', 'Username is required').notEmpty();
	req.checkBody('password', 'Password is required').notEmpty();
	req.checkBody('password2', 'Passwords do not match').equals(req.body.password);

	var errors = req.validationErrors();

	if(errors){
		res.render('register',{
			errors:errors
		});
	} else {
		var newUser = new User({
			name: name,
			lname: lname,
			email:email,
			username: username,
			password: password
		});

		User.createUser(newUser, function(err, user){
			if(err) throw err;
			console.log(user);
		});

		req.flash('success_msg', 'You are registered and can now login');

		res.redirect('/users/login');
	}
});

passport.use(new LocalStrategy(
  function(username, password, done) {
   User.getUserByUsername(username, function(err, user){
   	if(err) throw err;
   	if(!user){
   		return done(null, false, {message: 'Unknown User'});
   	}

   	User.comparePassword(password, user.password, function(err, isMatch){
   		if(err) throw err;
   		if(isMatch){
   			return done(null, user);
   		} else {
   			return done(null, false, {message: 'Incorrect password'});
   		}
   	});
   });
  }));

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.getUserById(id, function(err, user) {
    done(err, user);
  });
});

router.post('/login',
  passport.authenticate('local', {successRedirect:'/dashboard', failureRedirect:'/users/login',failureFlash: true}),
  function(req, res) {
    res.redirect('/dashboard');
  });

router.get('/logout', function(req, res){
	req.logout();

	req.flash('success_msg', 'You are now logged out, see you again soon!');

	res.redirect('/users/login');
});

module.exports = router;