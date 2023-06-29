const router = require('express').Router();
// import our db connection for the SQL literals
const sequelize = require('../../config/connection');
const { User, Product, Category, Transaction } = require('../../models');

//POST method
router.post('/', async (req, res) => {
	console.log('req.body', req.body);
	try {
		const newUser = await User.create({
			first_name: req.body.first_name,
			last_name: req.body.last_name,
			email: req.body.email,
			password: req.body.password,
		});
		// TODO: modify session object to include user information and loggedIn boolean
		res.status(201).json(newUser); // 201 - Created
	} catch (error) {
		console.log(error);
		res.status(500).json(error); // 500 - Internal Server Error
	}
});

//GET method
router.get('/', async (req, res) => {
	try {
		const users = await User.findAll({
			attributes: {
				exclude: ['password'],
				include: [
					// Use plain SQL to get a count of the number of posts made by a user
					[
						sequelize.literal(
							'(SELECT COUNT(*) FROM post WHERE post.userId = user.id)'
						),
						'postsCount',
					],
					// Use plain SQL to get a count of the number of comments made by a user
					[
						sequelize.literal(
							'(SELECT COUNT(*) FROM comment WHERE comment.userId = user.id)'
						),
						'commentsCount',
					],
				],
			},
		});
		res.status(200).json(users); // 200 - OK
	} catch (error) {
		console.log(error);
		res.status(500).json(error); // 500 - Internal Server Error
	}
});


//PUT method
router.put('/:userId', async (req, res) => {
	try {
		// Pass in req.body to only update what's sent over by the client
		const updatedUser = await User.update(req.body, {
			where: {
				id: req.params.userId,
			},
			individualHooks: true,
		});

		if (!updatedUser[0])
			return res.status(404).json({ message: 'No user found.' }); // 404 - Not Found

		res.status(202).json(updatedUser); // 202 - Accepted
	} catch (error) {
		console.log(error);
		res.status(500).json(error); // 500 - Internal Server Error
	}
});

//DELETE method
router.delete('/:userId', async (req, res) => {
	try {
		const deletedUser = await User.destroy({
			where: {
				id: req.params.userId,
			},
		});
		console.log(deletedUser);

		if (!deletedUser)
			return res.status(404).json({ message: 'No user found.' }); // 404 - Not Found

		res.status(202).json(deletedUser); // 202 - Accepted
	} catch (error) {
		console.log(error);
		res.status(500).json(error); // 500 - Internal Server Error
	}
});

module.exports = router;