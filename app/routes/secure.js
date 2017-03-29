module.exports = function(router, passport){

	router.use(function(req, res, next){
		if(req.isAuthenticated() && req.user.jwt.token){
			console.log('******************** req.user.jwt.token');
			console.log(req.user.jwt.token);
			console.log('******************** res');
			console.log(res.user);
			return next();
		}
		res.redirect('/auth');
	});

	router.get('/profile', function(req, res){
		//res.render('profile.ejs', { user: req.user });
		//res.redirect('/profileview');
		//res.json({message: "Success!"});
		res.sendFile('index.html', { root: "./public" } );
		//res.send('hello world');
	});

	 /*router.get('/*', function(req, res){
	 	res.redirect('/profile');
	 });*/

	

}