const router = require('express').Router();
//import our db connection for the sql literals
const sequelize = require("../../config/connection");
const { Category } = require('../../models');
//import help function for authentication
const withAuth = require("../../utils/auth");

//CREATE
// ROUTE TO POST NEW CATEGORY
router.post("/", withAuth, async (req, res) => {
    try {
        //create new category
        const newCategory = await Category.create({
            name: req.body.name
        });
        res.status(201).json(newCategory);
    } catch (error) {
        console.log(error);
        res.status(500).json(error); // 500 - Internal Server Error
    }
});

//RETRIEVE
  //get method for category
  router.get('/', withAuth, async (req, res) => {
    try {
      const getCategory = await Category.findAll({
        attributes: {
          include: ['id', 'name']
        }
      });
      res.status(200).json(getCategory); // 200 - OK

    } catch (error) {
      console.log(error);
        req.statusCode(500).json(error); //500 internal server error
    }
  });
//REPLACE
//put method to replace category
router.put("/", withAuth, async (req, res) => {
    try {
      // pass in req.body to only update what's sent over by the client
      const updateCategory = await Category.update(req.body, {
        where: {
          // since only logged in users can update their profile, id will come from req.session.userId
          name: req.body.name
        },
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
//DESTROY!
  //delete method to remove category
  router.delete("/", withAuth, async (req, res) => {
    try {
      const deleteCategory = await Category.destroy({
        where: {
          // since only logged in users can delete their account, id will come from req.session.userId
          id: req.body.id,
          name: req.body.name
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
