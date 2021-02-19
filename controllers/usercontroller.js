require('dotenv').config();
const router = require("express").Router();
const { User } = require('../models');

const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");


router.post("/create", function (req, res) {
  /**********************************
   ********   USER CREATE   *********
   *********************************/

  let firstName = req.body.user.firstName;
  let lastName = req.body.user.lastName;
  let email = req.body.user.email;
  let pass = req.body.user.password;

  User.create({
    firstName: firstName,
    lastName: lastName,
    email: email,
    passwordhash: bcrypt.hashSync(pass, 10)
  }).then(
    function createSuccess(user) {
      let token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: 60 * 60 * 24 });

      res.json({
        user: user,
        message: 'created',
        sessionToken: token
      });
    },
    function createError(err) {
      res.send(500, err.message);
    }
  );
  //--------------------------------------
});
/**********************************
 ********   USER LOGIN   *********
 *********************************/

router.post("/login", function (req, res) {
  User.findOne({ where: { username: req.body.user.username } }).then(
    function (user) {
      if (user) {
        bcrypt.compare(req.body.user.password, user.passwordhash, function (err, matches) {
          if (matches) {
            let token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: 60 * 60 * 24 });
            res.json({
              user: user,
              message: "successfully authenticated",
              sessionToken: token
            });
          } else {
            res.status(502).send({ error: "Login failed" });
          }
        });
      } else {
        res.status(500).send({ error: "failed to authenticate" });
      }
    },
    function (err) {
      res.status(501).send({ error: "Login failed" });
    }
  );
});

module.exports = router;
