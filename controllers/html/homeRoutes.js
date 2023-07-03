const router = require('express').Router();
const sequelize = require('../../config/connection');
const { User, Category, Product } = require('../../models');

// Render homepage with all existing posts
router.get('/', async (req, res) => {
	try {
		const category = await Category.findAll({
			include: [{ model: Product, attributes: ['name'] }],
			attributes: {
				include: [
					// Use plain SQL to get a count of the number of products for each category
					[
						sequelize.literal(
							'(SELECT COUNT(*) FROM product WHERE product.category_id = category.id)'
						),
						'categoriesCount',
					],
				],
			},
		});
		const serializedCategories = category.map((category) => category.get({ plain: true }));

		// TODO: modify response with actual VIEW|template
		res
			.status(200)
			.send(
				'<h1>HOMEPAGE</h1><h2>Render the homepage view along with all posts retrieved.</h2>'
			);
	} catch (error) {
		console.log(error);
		res.status(500).json(error);
	}
});

// // Render single-post page with selected post
// router.get('/post/:id', async (req, res) => {
// 	try {
// 		let post = await Post.findByPk(req.params.id, {
// 			include: [
// 				{ model: User, attributes: ['username'] },
// 				{ model: Comment, include: { model: User, attributes: ['username'] } },
// 			],
// 			attributes: {
// 				include: [
// 					// Use plain SQL to get a count of the number of comments for each post
// 					[
// 						sequelize.literal(
// 							'(SELECT COUNT(*) FROM comment WHERE comment.postId = post.id)'
// 						),
// 						'commentsCount',
// 					],
// 				],
// 			},
// 		});

// 		if (!post) return res.status(404).json({ message: 'No post found.' });

// 		post = post.get({ plain: true });
// 		console.log(post);

// 		// TODO: modify response with actual VIEW|template
// 		res
// 			.status(200)
// 			.send(
// 				'<h1>SINGLE POST PAGE</h1><h2>Render the view for a single post along with the post retrieved.</h2>'
// 			);
// 	} catch (error) {
// 		console.log(error);
// 		res.status(500).json(error);
// 	}
// });

// // Render signup page
// router.get('/signup', async (req, res) => {
// 	// TODO: redirect to dashboard if user is already logged in
// 	// TODO: modify response with actual VIEW|template
// 	res.status(200).send('<h1>SIGN UP PAGE</h1><h2>Render the signup view.</h2>');
// });

// // Render login page
// router.get('/login', async (req, res) => {
// 	// TODO: redirect to dashboard if user is already logged in
// 	// TODO: modify response with actual VIEW|template
// 	res.status(200).send('<h1>LOGIN PAGE</h1><h2>Render the login view.</h2>');
// });

module.exports = router;