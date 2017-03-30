module.exports = function(router, passport){

	router.use(function(req, res, next){
		if(req.isAuthenticated() && req.user.jwt.token){
			//console.log('******************** req.user.jwt.token');
			//console.log(req.user.jwt.token);
			//console.log('******************** res');
			//console.log(res.user);
			return next();
		}
		res.redirect('/auth');
	});

	router.get('/profile', function(req, res){		
		res.json(req.user.toJSON());
	});

	 router.get('/*', function(req, res){
	 	res.redirect('/profile');
	 });

	

}