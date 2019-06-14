const express  = require('express'),
      router   = express.Router(),
      models     = require('../../models');

// Login routes
router.post("/login", async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  let user;

  user = await models.User.findOne({ email });
  if (!user) return res.status(401).json({status: 401, message: 'No such user found'});

  if (user.validPassword(password)) return user;
  else return res.status(400).json({status: 400, message: 'Invalid username or password'});
});


// Register routes
router.post("/register", async (req, res) => {
  let user;

  const userLogin = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    password: req.body.password
  }

  const { firstName, lastName, email, password } = userLogin;

  user = await models.User.findOne({where: {email} });

  if (!user) {
    try {
      user = await models.User.create({
        firstName,
        lastName,
        email,
        password
      })
      user.token = models.User.getJWT();
      return res.status(201).json({ data: user, message: 'Login Success'})
    } catch (error) {
      return res.status(401).json({status: 401, message: 'Invalid username or password'})
    }
  } else {
    return res.status(400).json({status: 401, message: 'User already exists'});
  }
});

router.get("/register/add-default", async (req, res) => {
  let user;

  const userLogin = {
    firstName: 'Martez',
    lastName: 'Conner',
    email: 'conner.martez@gmail.com',
    password: 'testpassword'
  }

  const { firstName, lastName, email, password } = userLogin;

  user = await models.User.findOne({where: {email} });

  if (!user) {
    try {
      user = await models.User.create({
        firstName,
        lastName,
        email,
        password
      })
      user.token = models.User.getJWT();
      return res.status(201).json({ data: user, message: 'Login Success'})
    } catch (error) {
      return res.status(401).json({status: 401, message: 'Invalid username or password'})
    }
  } else {
    return res.status(400).json({status: 401, message: 'User already exists'});
  }
})



module.exports = router;
