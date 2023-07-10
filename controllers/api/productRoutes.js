const router = require('express').Router();
const withAuth = require("../../utils/auth");
const sequelize = require('../../config/connection');
const { Product } = require('../../models');

//post a new product
router.post('./product', async (req, res) => {
    try {
        const newProduct = await User.create({
            id: req.body.id,
            name: req.body.name,
            description: req.body.description,
            date: req.body.date,
    }); 
    res.status(201).json(newProduct);
} catch (error) {
        console.log(error);
        req.status(500).json(error);
    }
});
//TO DO: create a get method for reviewing a product
router.get('./product', withAuth, async (req, res) => {
    console.log("req.body", req.body);
    try {
        const getProduct = await Product.findAll({
        attributes: {
        include: ['id', 'name', 'description', 'price', 'on_sale_price', 'product_image'],
        exclude: ['category_id', 'merchant_id']
    }
});
res.status(200).json(getProduct); // 200 - OK

} catch (error) {
    console.log(error);
        req.statusCode(500).json(error); //500 internal server error
}

//TO DO: create a put method for replacing a product
router.put('./product', withAuth, async (req, res) => {
try {
    const updatedProduct = await Product.update(req.body, {
        where: {
          name: req.body.name,
          price: req.body.price,
          product_image: req.body.product_image,
          description: req.body.description
        },
      });
  
      // if order was updated, let client know order is not found
      if (!updatedProduct[0])
        return res.status(404).json({ message: "No product found." }); // 404 - Not Found
    res.status(202).json(updatedProduct); // 202 - Accepted
} catch (error) {
    console.log(error);
    res.status(500).json(error); // 500 - Internal Server Error 
}
});

//to do: create a delete method to remove a product
router.delete('./product', withAuth, async (req, res) => {
try {
    const deleteProduct = await Product.destroy({
        where: {
          // delete elements from body
          id: req.body.id,
          name: req.body.name,
          price: req.body.price,
          product_image: req.body.product_image,
          description: req.body.description
        },
      });
  
      // if no user was deleted, let client know the user was not found
      if (!deleteProduct)
        return res.status(404).json({ message: "No order found." }); // 404 - Not Found
  
      res.status(202).json(deleteProduct); // 202 - Accepted
} catch (error) {
    console.log(error);
      res.status(500).json(error); // 500 - Internal Server Error
}
});
});

module.exports = router;
