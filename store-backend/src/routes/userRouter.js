const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { isAdmin } = require("../../auth");
const User = require("../models/userModel");

router.post("/register", async (req, res) => {
 
    // validate

    if (!req.body.email || !req.body.password || !req.body.passwordCheck)
      return res.status(400).json("Not all fields have been entered.");
    if (req.body.password.length < 5)
      return res
        .status(400)
        .json("The password needs to be at least 5 characters long." );
    if (req.body.password !== req.body.passwordCheck)
      return res
        .status(400)
        .json("Enter the same password twice for verification." );

    const existingUser = await User.findOne({ email: req.body.email });
    if (existingUser)
      return res
        .status(400)
        .json("An account with this email already exists." );

    if (!req.body.displayName) req.body.displayName = req.body.email;
    //encrypt password

     const passwordHash = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10));
     req.body.password = passwordHash
    try {
      const createdUser = await User.create(req.body);
 
    res.send(createdUser);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post("/login", async (req, res) => {
  try {
    
    // validate
    if (!req.body.email || !req.body.password)
      return res.status(400).json({ msg: "Not all fields have been entered." });

    const foundUser = await User.findOne({ email: req.body.email });
    if (!foundUser)
      return res.status(400).json({ msg: "No account with this email has been registered." });
        
    const isMatch = await bcrypt.compare(req.body.password, foundUser.password);
    if (!isMatch) return res.status(400).json({ msg:"Invalid credentials."  });

    const payload = {
      id: foundUser._id,
      user: foundUser.email,
      isAdmin: foundUser.isAdmin
    };

    jwt.sign(payload, process.env.JWT_SECRET, {expiresIn: '1h'}, (err, token) => {
    res.set('token', token);
    res.send();
    })

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/logout', (req, res) => {

 // destory token then send back to homepage
 

})

router.delete("/delete", async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.user);
    res.json(deletedUser);
  } catch (err) {
    res.status(500).json( err );
  }
});


module.exports = router;