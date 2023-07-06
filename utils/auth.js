const withAuth = (req, res, next) => {
	// if the user is not logged in, redirect the user to the login page
	if (!req.session.loggedIn) return res.redirect('/login');
	// otherwise, execute the function that comes next
	next();
};

module.exports = withAuth;
