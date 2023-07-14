const router = require('express').Router();
// imported in case literals are needed. delete if we do not use
const sequelize = require('../../config/connection');
const { Transaction, User} = require('../../models');

// Render dashboard with all transactions ever created by the user logged in
// Endpoint is '/dashboard/:userId/transactions'
// TODO: only authenticated users can access their dashboard
// TODO: once we have set up our sessions, remove ':userId' from endpoint and get userId from req.sessions instead
router.get('/:user_id/transactions', async (req, res) => {
	try {
		const userTransactions = await Transaction.findAll({
			where: {
				// TODO: eventually, get userId from req.sessions instead of req.params
				user_id: req.params.user_id,
			},
			include: [{ model: User }],
		});
		const serializedTransactions = userTransactions.map((transactions) => transactions.get({ plain: true }));
		console.log(serializedTransactions)
		// TODO: modify response with actual VIEW|template
		res
			.status(200)
			.send(
				'<h1>DASHBOARD</h1><h2>Render the dashboard view along with all orders from logged in user.</h2>'
			);
	} catch (error) {
		console.log(error);
		res.status(500).json(error);
	}
});

// Render dashboard view for a single post created by the user logged in
// Endpoint is '/dashboard/post/:id'
router.get('/transaction/:id', async (req, res) => {
	try {
		let transaction = await Transaction.findOne({
			where: {
				id: req.params.id,
				// TODO: might need to verify that post belongs to user attempting to view it (userId will come from req.sessions once we have set up our sessions)
				// userId: req.session.userId
			}
		});

		if (!transaction) return res.status(404).json({ message: 'No transaction found.' });

		transaction = transaction.get({ plain: true });
		// TODO: modify response with actual VIEW|template
		res
			.status(200)
			.send(
				'<h1>DASHBOARD</h1><h2>Render the dashboard view for a single transaction.</h2>'
			);
	} catch (error) {
		console.log(error);
		res.status(500).json(error);
	}
});

module.exports = router;
