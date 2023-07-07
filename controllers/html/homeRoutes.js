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
    console.log(serializedCategories);
    // HOMEPAGE WITH CATEGORIES AND PRODUCTS
    // TODO: modify response with actual VIEW|template replace .send with .render
    res
      // .status(200)
      .render(
        'homepage', { 
          categories: serializedCategories, 
          loggedIn: req.session.loggedIn,
        });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

// Render homepage with all existing categories and products belonging to those categories
// End point is /
router.get("/products", async (req, res) => {
  try {
    const productData = await Product.findAll({
    });
    const serializedProducts = productData.map((products) =>
    products.get({ plain: true })
    );
    // console.log(serializedProducts);

    let saleProducts = [];
    let newProduct = [];

    for (let i=0; i<serializedProducts.length; i++) {
      if(serializedProducts[i].on_sale_price) {
        saleProducts.push(serializedProducts[i])
      }

      if (serializedProducts[i].arrival === true) {
        newProduct.push(serializedProducts[i])
      }
    }

    console.log("on sale", saleProducts);
    console.log("new arrival", newProduct);

    // HOMEPAGE WITH CATEGORIES AND PRODUCTS
    // TODO: modify response with actual VIEW|template replace .send with .render
    res

      // .status(200)
      .render(
        'homepage', { 
          saleProducts: saleProducts, 
          newProduct: newProduct,
          loggedIn: req.session.loggedIn,
        });

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
      // .status(200)
      .render(
        'homepage', { 
          category: serializedCategory, 
          loggedIn: req.session.loggedIn,
        });
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
      .status(200)
      .render(
        'homepage', { 
          productData: serializedProduct, 
          loggedIn: req.session.loggedIn,
        });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

// Render signup page
// End point is /signup
// signUp
router.get("/signup", async (req, res) => {
  if (req.session.logged_in) {
    // TODO: decide where to redirect users if they are logged in
    res.redirect("/");
    return;
  }
  // TODO: modify response with actual VIEW|template go to sign up page
  res.status(200).render('signUp');
});

// Render login page
// End point is /login
//signIn
router.get("/login", async (req, res) => {
  if (req.session.logged_in) {
    // TODO: decide where to redirect users if they are logged in
    res.redirect("/");
    return;
  }
  // TODO: modify response with actual VIEW|template go to login page
  res.status(200).render('signIn');
});

module.exports = router;
