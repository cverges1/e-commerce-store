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
    // console.log(serializedCategories);

    let serializedCategory = [];

    for (let i=0; i<serializedCategories.length; i++) {
      serializedCategory.push(serializedCategories[i])
    }

    // console.log(serializedCategory[1].products);

    let serializedProducts = [];

    for (let i=0; i<serializedCategory.length; i++) {
      serializedProducts.push(serializedCategory[i].products)
    }

    // console.log(serializedProducts[1]);

   let betterProductsArr = serializedProducts[1];

    let saleProducts = [];
    let newProducts = [];

    console.log(betterProductsArr);

    for (let i=0; i<betterProductsArr.length; i++) {


      if(betterProductsArr[1].on_sale_price) {
        saleProducts.push(betterProductsArr[i])
      }

      if (betterProductsArr[i].arrival === true) {
        newProducts.push(betterProductsArr[i])
      }
    }

    console.log("on sale", saleProducts);
    console.log("new arrival", newProducts);

    res

      .status(200)
      .render(
        'homepage', { 
          allCategories: serializedCategories, 
          singleCategory: serializedCategory,
          allProducts: betterProductsArr,
          saleProducts: saleProducts,
          newProducts: newProducts,
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

    // TODO: MODIFY WHERE THIS IS RENDERING
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

    // TODO: MODIFY WHERE THIS IS RENDERING
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
