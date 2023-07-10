const router = require('express').Router();
//import our db connection for the sql literals
const sequelize = require("../../config/connection");
const { Category, Product, User, Transaction } = require('../../models');
//import help function for authentication
const withAuth = require("../../utils/auth");
//import segment analytics
const {Analytics} = require("@segment/analytics-node");
const analytics = new Analytics({
    writeKey : "fCvCtaAKBxvdEqrQ2WHlAT1jrsRT5eks",
});

//CREATE
// ROUTE TO POST NEW CATEGORY
router.post("/", async (req, res) => {
    console.log("req.body", req.body);
    try {
        //create new category
        const newCategory = await User.create({
            name: req.body.name,
            id: req.body,id
        });
        //save new session to db
    req.session.save(() => {
        // create session variables based on the newly signed up category
        (req.session.id = newCategory.id);
        res.status(201).json(newCategory); // 201 - Created
      });

    } catch (error) {
        console.log(error);
        res.status(500).json(error); // 500 - Internal Server Error
    }
})

//put method to replace category
router.put("/", withAuth, async (req, res) => {
    try {
      // pass in req.body to only update what's sent over by the client
      const updateCategory = await Category.update(req.body, {
        where: {
          // since only logged in users can update their profile, id will come from req.session.userId
          name: req.session.name,
        },
        individualHooks: true,
      });
  
      // if no user was updated, let client know the user was not found
      if (!updateCategory[0])
        return res.status(404).json({ message: "No user found." }); // 404 - Not Found
  
      res.status(202).json(updateCategory); // 202 - Accepted
    } catch (error) {
      console.log(error);
      res.status(500).json(error); // 500 - Internal Server Error
    }
  });

  //delete method to remove category
  router.delete("/", withAuth, async (req, res) => {
    try {
      const deleteCategory = await Category.destroy({
        where: {
          // since only logged in users can delete their account, id will come from req.session.userId
          id: req.session.id,
          name: req.session.name
        },
      });
  
      // if no user was deleted, let client know the user was not found
      if (!deleteCategory)
        return res.status(404).json({ message: "No category found." }); // 404 - Not Found
  
      res.status(202).json(deleteCategory); // 202 - Accepted
    } catch (error) {
      console.log(error);
      res.status(500).json(error); // 500 - Internal Server Error
    }
  });
