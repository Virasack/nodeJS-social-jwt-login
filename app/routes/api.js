module.exports = function(router, passport){

	//Middleware to use JWT Strategy
	router.use(passport.authenticate('jwt', { session: false }));

	// Protect test API route with JWT
	router.get("/testAPI", function(req, res){
 		res.json({message: "Success!"});
	});

}