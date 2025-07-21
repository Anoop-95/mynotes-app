const express = require("express");
const User = require("../models/User");
const router = express.Router();
const { query, validationResult, body } = require("express-validator");
const bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");
const fetchuser = require("../middleware/fetchuser");

const JWT_SECRET = "anoopisgoodboy$";



//route 1: create user
router.post(
  "/Createuser",
  [
    body("name").notEmpty().withMessage("name is empty"),
    body("email").notEmpty().withMessage("email is empty"),
    body("password")
      .isLength({ min: 3, max: 10 })
      .withMessage("password must be within 3- 10 characters"),
  ],
  async (req, res) => {
    let success = false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success, errors: errors.array() });
    }
    //check whether the user this email already exists
    try {
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        return res
          .status(400)
          .json({ success, error: "sorry this emaill already exists: " });
      }
      var salt = await bcrypt.genSaltSync(10);
      const secPass = await bcrypt.hash(req.body.password, salt);
      //create a new user
      user = await User.create({
        name: req.body.name,
        password: secPass,
        email: req.body.email,
      });
      const data = {
        user: {
          id: user.id,
        },
      };
      const authtoken = jwt.sign(data, JWT_SECRET);
      
      success = true;
      res.json({success, authtoken });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("some error has occured!!!!");
    }
  }
);

    
////route 2: Authenticate user login

router.post("/login", [
      body("email", "Enter a valid email").isEmail(),
      body("password", "password cannot be blank").exists(),],
      async (req, res) => {
        let success = false
        //If there are any errors return them
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(400).json({ success, errors: errors.array() });
        }
        const { email, password } = req.body;
        try {
          let user = await User.findOne({ email });
          if (!user) {
            return res
              .status(400)
              .json({ error: "please enter with correct username" });
          }

          const passwordCompare = await bcrypt.compare(password, user.password);
          if (!passwordCompare) {
            return res
              .status(400)
              .json({ error: "please enter with correct password" });
          }

          const data = {
            user: {
              id: user.id,
            },
          };
          const authtoken = jwt.sign(data, JWT_SECRET);
          success = true;
          res.json({success, authtoken });
        } catch (error) {
          console.error(error.message);
          res.status(500).send("Internal server error has occured!!!!");
        }
      },
);

//route 3: finding user details api/auth/getuser  login required.
router.post('/getuser', fetchuser, async(req, res)=>{
    try {
        const userId = req.user.id;
        const user = await User.findById(userId).select('-password')
        res.send(user)
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal server error has occured!!!!");
    }

})

module.exports = router;
