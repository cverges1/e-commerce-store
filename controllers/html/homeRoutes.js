const router = require("express").Router();
const sequelize = require("../../config/connection");
const { User, Category, Product } = require("../../models");

// Render homepage with all existing categories and products belonging to those categories
// End point is /
router.get("/", async (req, res) => {
  try {
    const categoryData = await Category.findAll({
      include: [{ model: Product }],
    });
    const serializedCategories = categoryData.map((category) =>
      category.get({ plain: true })
    );
    console.log(serializedCategories);
    // HOMEPAGE WITH CATEGORIES AND PRODUCTS
    // TODO: modify response with actual VIEW|template replace .send with .render
    res.status(200).send(
      "<h1>HOMEPAGE</h1><h2>Render the homepage view along with all categories retrieved.</h2>"
    );
    // json(serializedCategories);

  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

// Render single category with products in that category
// End point is /category/:id
router.get("/category/:id", async (req, res) => {
  try {
    const categoryData = await Category.findByPk(req.params.id, {
      include: [{ model: Product }],
    });

    if (!categoryData)
      return res.status(404).json({ message: "No category found." });

    const serializedCategory = categoryData.get({ plain: true });
    console.log(serializedCategory);

    // TODO: modify response with actual VIEW|template replace .send with .render
    res
      .status(200).json(serializedCategory);
      // .send(
      //   "<h1>SINGLE CATEGORY WITH PRODUCTS PAGE</h1><h2>Render the view for a CATEGORY along with the products retrieved.</h2>"
      // );
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

// Render single product
// End point is /product/:id
router.get("/product/:id", async (req, res) => {
  try {
    const productData = await Product.findByPk(req.params.id, {});

    if (!productData)
      return res.status(404).json({ message: "No product found." });

    const serializedProduct = productData.get({ plain: true });
    console.log(serializedProduct);

    // TODO: modify response with actual VIEW|template single product page replace .send with .render
    res
      .status(200).json(serializedProduct);
      // .send(
      //   "<h1>SINGLE PRODUCT PAGE</h1><h2>Render the view for a single PRODUCT</h2>"
      // );
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

// Render signup page
// End point is /signup
router.get("/signup", async (req, res) => {
  if (req.session.logged_in) {
    // TODO: decide where to redirect users if they are logged in
    res.redirect("/");
    return;
  }
  // TODO: modify response with actual VIEW|template go to sign up page
  res.status(200).send("<h1>SIGN UP PAGE</h1><h2>Render the signup view.</h2>");
});

// Render login page
// End point is /login
router.get("/login", async (req, res) => {
  if (req.session.logged_in) {
    // TODO: decide where to redirect users if they are logged in
    res.redirect("/");
    return;
  }
  // TODO: modify response with actual VIEW|template go to login page
  res.status(200).send("<h1>LOGIN PAGE</h1><h2>Render the login view.</h2>");
});

module.exports = router;
