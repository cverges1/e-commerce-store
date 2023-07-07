const router = require('express').Router();
//import our db connection for the sql literals
const sequelize = require("../../config/connection");
const { Category, Product, User, Transaction } = require('../../models');
//import help function for authentication
const auth = require("../../utils/auth");
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
        // create session variables based on the newly signed up user
        (req.session.userId = newUser.id), (req.session.loggedIn = true);
        res.status(201).json(newUser); // 201 - Created
      });
      //Analytics package used to track user's actions
    //TO DO CHANGE category ID FROM BODY TO SESSION
    analytics.track({

    })
    } catch (error) {
        
    }
})