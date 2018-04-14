var express = require('express');
var router = express.Router();

// Get Homepage
router.get('/', function(req, res){
	res.render('home');
});

// Dashboard
router.get('/dashboard', ensureAuthenticated, function(req, res){ 
	res.render('dashboard', { name: req.user.name, email: req.user.username});
});

// My Account
router.get('/account', ensureAuthenticated, function(req, res){ 
	res.render('account', { name: req.user.name, username: req.user.username});
});

// Tools
router.get('/budget', ensureAuthenticated, function(req, res){ 
	res.render('budget', { name: req.user.name, username: req.user.username});
});

// Wikia
router.get('/wiki', ensureAuthenticated, function(req, res){
	res.render('wiki', { name: req.user.name});
});

router.get('/article', ensureAuthenticated, function(req, res){
	res.render('article', { name: req.user.name});
});

router.post('/budget', ensureAuthenticated, function(req, res){
})

function ensureAuthenticated(req, res, next){
	if(req.isAuthenticated()){
		return next();
	} else {
		req.flash('error_msg','Please login to continue');
		res.redirect('/users/login');
	}
}

module.exports = router;