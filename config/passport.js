var LocalStrategy = require('passport-local').Strategy;
var FacebookStrategy = require('passport-facebook').Strategy;
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
var jwt = require('jsonwebtoken');
var passportJWT = require('passport-jwt');
var ExtractJwt = passportJWT.ExtractJwt;
var JwtStrategy = passportJWT.Strategy;



var User = require('../app/models/user');

var configAuth = require('./auth');

module.exports = function(passport) {


	passport.serializeUser(function(user, done){
		done(null, user.id);
	});

	passport.deserializeUser(function(id, done){
		User.findById(id, function(err, user){
			done(err, user);
		});
	});

	//Define Strategy

	//Local Signup Strategy
	passport.use('local-signup', new LocalStrategy({
		usernameField: 'email',
		passwordField: 'password',
		passReqToCallback: true
	},
	function(req, email, password, done){
		process.nextTick(function(){
			User.findOne({'local.username': email}, function(err, user){
				if(err)
					return done(err);
				if(user){
					return done(null, false, req.flash('signupMessage', 'That email already taken'));
				} 
				if(!req.user) {
					var newUser = new User();
					newUser.local.username = email;
					newUser.local.password = newUser.generateHash(password);
					newUser.save(function(err){
						if(err)
							throw err;
						return done(null, newUser);
					})
				} else {
					var user = req.user;
					user.local.username = email;
					user.local.password = user.generateHash(password);

					user.save(function(err){
						if(err)
							throw err;
						return done(null, user);
					})
				}
			})

		});
	}));

	//Local Login Strategy
	passport.use('local-login', new LocalStrategy({
			usernameField: 'email',
			passwordField: 'password',
			passReqToCallback: true
		},
		function(req, email, password, done){
			process.nextTick(function(){
				User.findOne({ 'local.username': email}, function(err, user){
					if(err)
						return done(err);
					if(!user)
						return done(null, false, req.flash('loginMessage', 'No User Found'));
					if(!user.validPassword(password)){
						return done(null, false, req.flash('loginMessage', 'Invalid Password'));
					}

					var userToken = {
						id : user.id
					}
		
					user.jwt.token = generateJWT(userToken);
					
					user.save(function(err){
						if(err)
							throw err;
		    		});

					return done(null, user);

				});
			});
		}
	));

	//Facebook Login Strategy
	passport.use(new FacebookStrategy({
	    clientID: configAuth.facebookAuth.clientID,
	    clientSecret: configAuth.facebookAuth.clientSecret,
	    callbackURL: configAuth.facebookAuth.callbackURL,
	    passReqToCallback: true
	  },
	  function(req, accessToken, refreshToken, profile, done) {
	    	process.nextTick(function(){
	    		//user is not logged in yet
	    		if(!req.user){
					User.findOne({'facebook.id': profile.id}, function(err, user){
		    			if(err)
		    				return done(err);
		    			if(user){
		    				if(!user.facebook.token){
		    					user.facebook.token = accessToken;
		    					user.facebook.name = profile.name.givenName + ' ' + profile.name.familyName;
		    					//user.facebook.email = profile.emails[0].value;

		    					var userToken = {
									id : user.id
								}
		
								user.jwt.token = generateJWT(userToken);

		    					user.save(function(err){
		    						if(err)
		    							throw err;
		    					});

		    				}
		    				return done(null, user);
		    			}
		    			else {
		    				var newUser = new User();
		    				newUser.facebook.id = profile.id;
		    				newUser.facebook.token = accessToken;
		    				newUser.facebook.name = profile.name.givenName + ' ' + profile.name.familyName;
		    				//newUser.facebook.email = profile.emails[0].value;

		    				var newUserToken = {
									id : profile.id
								}
		
							newUser.jwt.token = generateJWT(newUserToken);

		    				newUser.save(function(err){
		    					if(err)
		    						throw err;
		    					return done(null, newUser);
		    				});


		    			}
		    		});
	    		}

	    		//If user is logged already in, he needs to be merged
	    		else {
	    			var user = req.user;
	    			user.facebook.id = profile.id;
	    			user.facebook.token = accessToken;
	    			user.facebook.name = profile.displayName;
	    			//user.facebook.email = profile.emails[0].value;

	    			var userToken = {
									id : user.id
								}
		
					user.jwt.token = generateJWT(userToken);

	    			user.save(function(err){
	    				if(err)
	    					throw err
	    				return done(null, user);
	    			})
	    		}
	    		
	    	});
	    }

	));

	//Google Login Strategy
	passport.use(new GoogleStrategy({
	    clientID: configAuth.googleAuth.clientID,
	    clientSecret: configAuth.googleAuth.clientSecret,
	    callbackURL: configAuth.googleAuth.callbackURL,
	    passReqToCallback: true
	  },
	  function(req, accessToken, refreshToken, profile, done) {
	    	process.nextTick(function(){

	    		if(!req.user){
	    			User.findOne({'google.id': profile.id}, function(err, user){
		    			if(err)
		    				return done(err);
		    			if(user){
		    				if(!user.google.token){
		    					user.google.token = accessToken;
		    					user.google.name = profile.displayName;
		    					user.google.email = profile.emails[0].value;

		    					var userToken = {
									id : user.id
								}
		
								user.jwt.token = generateJWT(userToken);


		    					user.save(function(err){
		    						if(err)
		    							throw err;
		    					});
		    				}
		    				return done(null, user);
		    			}
		    			else {
		    				var newUser = new User();
		    				newUser.google.id = profile.id;
		    				newUser.google.token = accessToken;
		    				newUser.google.name = profile.displayName;
		    				newUser.google.email = profile.emails[0].value;

		    				var newUserToken = {
									id : profile.id
								}
		
							newUser.jwt.token = generateJWT(newUserToken);

		    				newUser.save(function(err){
		    					if(err)
		    						throw err;
		    					return done(null, newUser);
		    				});
		    			}
		    		});
	    		} else {
	    			var user = req.user;
	    			user.google.id = profile.id;
					user.google.token = accessToken;
					user.google.name = profile.displayName;
					user.google.email = profile.emails[0].value;

					var userToken = {
									id : user.id
								}
		
					user.jwt.token = generateJWT(userToken);


					user.save(function(err){
						if(err)
							throw err;
						return done(null, user);
					});
	    		}
	    		
	    	});
	    }

	));


	// JWT Strategy
	var jwtOptions = {}
	jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeader();
	jwtOptions.secretOrKey = configAuth.secret;

	passport.use(new JwtStrategy(jwtOptions, function(jwt_payload, done) {
	  console.log('payload received', jwt_payload);
	  User.findOne({_id: jwt_payload.id}, function(err, user) {
	      if (err) {
	        return done(err, false);
	      }
	      if (user) {
	        done(null, user);
	      } else {
	        done(null, false);
	      } 
	    });
	}));

	function generateJWT(id) {
		var token = jwt.sign(id, configAuth.secret, {
            expiresIn: 60 * 60 * 24 * 30 // in seconds (1 month)
        });
        return token;
	}


};