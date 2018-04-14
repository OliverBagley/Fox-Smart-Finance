var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');

// User Schema
var UserSchema = mongoose.Schema({
	username: {
		type: String,
		index:true
	},
	password: {
		type: String
	},
	email: {
		type: String
	},
	name: {
		type: String
	}
});

//Database Schema route
var User = module.exports = mongoose.model('User', UserSchema);

//Encrypt password using bcrypt salting
module.exports.createUser = function(newUser, call){
	bcrypt.genSalt(10, function(err, salt) {
	    bcrypt.hash(newUser.password, salt, function(err, hash) {
	        newUser.password = hash;
	        newUser.save(call);
	    });
	});
}

//Find user by username, call variable.
module.exports.getUserByUsername = function(username, call){
	var query = {username: username};
	User.findOne(query, call);
}

//Find user ID in mongoDB
module.exports.getUserById = function(id, call){
	User.findById(id, call);
}

//Validate inputted password to passwored hashed by bCrypt.
module.exports.comparePassword = function(candidatePassword, hash, call){
	bcrypt.compare(candidatePassword, hash, function(err, isMatch) {
    	if(err) throw err;
    	call(null, isMatch);
	});
}