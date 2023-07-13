const router = require("express").Router();
// import helper function for authentication
const withAuth = require("../../utils/auth");

const { Order } = require("../../models");

/***** CREATE *****/
// Route to create a new order
// Gathers user and product info for one product
// POST method with endpoint '/api/orders/'
// Only authenticated users can add to their cart

router.post("/", withAuth, async (req, res) => {
  try {
    // create new order
    const newOrder = await Order.create({
      date: req.body.date,
      quantity: req.body.quantity,
      user_id: req.session.user_id,
      product_id: req.body.product_id,
    });

    console.log(newOrder);
    //save new session to db
    req.session.save(() => {
      //create new session variable based on newly created order
      req.session.orderId = newOrder.id;
      res.status(201).json(newOrder); // 201 - Created
    });
  } catch (error) {
    console.log(error);
    res.status(500).json(error); // 500 - Internal Server Error
  }
});

/***** UPDATE *****/
// Route to update a order by id
// PUT method with endpoint '/api/orders/profile'
// Only authenticated users can update their order
router.put("/profile", withAuth, async (req, res) => {
  try {
    const updatedOrder = await Order.update(req.body, {
      where: {
        id: req.session.orderId,
      },
    });

    // if order was updated, let client know order is not found
    if (!updatedOrder[0])
      return res.status(404).json({ message: "No order found." }); // 404 - Not Found

    res.status(202).json(updatedOrder); // 202 - Accepted
  } catch (error) {
    console.log(error);
    res.status(500).json(error); // 500 - Internal Server Error
  }
});

/***** DELETE *****/
// Route to delete a order by id
// DELETE method with endpoint '/api/orders/profile'
// Only authenticated users can delete their orders
router.delete("/profile", withAuth, async (req, res) => {
  try {
    const deletedOrder = await Order.destroy({
      where: {
        // since only logged in users can delete their account, id will come from req.session.userId
        id: req.session.orderId,
      },
    });

    // if no user was deleted, let client know the user was not found
    if (!deletedOrder)
      return res.status(404).json({ message: "No order found." }); // 404 - Not Found

    res.status(202).json(deletedOrder); // 202 - Accepted
  } catch (error) {
    console.log(error);
    res.status(500).json(error); // 500 - Internal Server Error
  }
});

module.exports = router;
