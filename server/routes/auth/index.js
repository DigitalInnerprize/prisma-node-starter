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

  if (await user.validatePassword(password)) {
    const token = await user.getJWT();
    user.token = token;
    return res.status(201).json({data: user, message: 'Login success'});
  } else return res.status(400).json({status: 400, message: 'Invalid username or password'});
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

  if (user) return res.status(400).json({status: 400, message: 'User already exists'});

  try {
    user = await models.User.create({
      firstName,
      lastName,
      email,
      password
    })
    return res.status(201).json({ data: user, message: 'Login Success'})
  } catch (error) {
    return res.status(401).json({status: 401, message: 'Could not create user'})
  }
});

router.get("/register/add-default", async (req, res) => {
  let user;

  const userLogin = {
    firstName: 'Lee',
    lastName: 'Conner',
    email: 'bruceleroy@gmail.com',
    password: 'testpassword'
  }

  const { firstName, lastName, email, password } = userLogin;

  user = await models.User.findOne({where: {email} });

  if (user) return res.status(400).json({status: 400, message: 'User already exists'});

  try {
    user = await models.User.create({
      firstName,
      lastName,
      email,
      password
    });
    return res.status(201).json({ data: user, message: 'Register User Success'})
  } catch (error) {
    throw new Error('Error creating user', error)
  }
})



module.exports = router;
