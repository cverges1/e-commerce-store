const router = require("express").Router();
const sequelize = require("../../config/connection");
const { User, Category, Product } = require("../../models");

// Render homepage with all existing categories and products belonging to those categories
// End point is /
router.get("/", async (req, res) => {
  try {
    // variable to gather all categories and products associated with them
    const categoryData = await Category.findAll({
      include: [{ model: Product }],
    });
    // variable to gather categories and products with no metadata
    const serializedCategories = categoryData.map((category) =>
      category.get({ plain: true })
    );
    // console.log(serializedCategories);

    // setup Array to gather each individual products w/ for loop below to push
    let serializedProductsbyCategory = [];

    for (let i = 0; i < serializedCategories.length; i++) {
      serializedProductsbyCategory.push(serializedCategories[i].products);
    }

    // console.log("serializedProductsbyCategory", serializedProductsbyCategory);

    // setup Array to gather each individual product w/ for loop below to push
    const foodProducts = serializedProductsbyCategory[0];
    const toys = serializedProductsbyCategory[1];
    const leashes = serializedProductsbyCategory[2];
    const beds = serializedProductsbyCategory[3];

    // console.log("foodProducts", foodProducts);
    // console.log("toys", toys);
    // console.log("leashes", leashes);
    // console.log("beds", beds);

    // setup Arrays to gather each sale products and new arrivals w/ for loop below to push
    let saleProducts = [];
    let newProducts = [];

    for (let i = 0; i < foodProducts.length; i++) {
      if (foodProducts[i].arrival === true) {
        newProducts.push(foodProducts[i]);
      }

      if (foodProducts[i].on_sale_price) {
        saleProducts.push(foodProducts[i]);
      }
    }

    for (let i = 0; i < toys.length; i++) {
      if (toys[i].arrival === true) {
        newProducts.push(toys[i]);
      }

      if (toys[i].on_sale_price) {
        saleProducts.push(toys[i]);
      }
    }

    for (let i = 0; i < leashes.length; i++) {
      if (leashes[i].arrival === true) {
        newProducts.push(leashes[i]);
      }

      if (leashes[i].on_sale_price) {
        saleProducts.push(leashes[i]);
      }
    }

    for (let i = 0; i < beds.length; i++) {
      if (beds[i].arrival === true) {
        newProducts.push(beds[i]);
      }

      if (beds[i].on_sale_price) {
        saleProducts.push(beds[i]);
      }
    }

    console.log("all on sale", saleProducts);
    console.log("all new arrival", newProducts);

    for (let i = 0; i < saleProducts.length; i++) {
      if (saleProducts.length > 4) {
        saleProducts.splice([i], 1);
      }
    }

    for (let i = 0; i < newProducts.length; i++) {
      if (newProducts.length > 4) {
        newProducts.splice([i], 1);
      }
    }

    console.log("on sale 4", saleProducts);
    console.log("new arrival 4", newProducts);

    res.status(200).render("homepage", {
      allCategories: serializedCategories,
      foodProducts: foodProducts,
      toys: toys,
      leashes: leashes,
      beds: beds,
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
      .render("homepage", {
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
    res.status(200).render("homepage", {
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
  res.status(200).render("signUp");
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
  res.status(200).render("signIn");
});

module.exports = router;
