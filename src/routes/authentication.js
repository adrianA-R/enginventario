const express = require("express");
const { validationResult, body } = require("express-validator");
const router = express.Router();

const passport = require("passport");
const { isLoggedIn } = require("../lib/auth");

// SIGNUP
router.get("/signup", (req, res) => {
  res.render("/profile");
});

router.post(
  "/signup",
  passport.authenticate("local.signup", {
    successRedirect: "/profile",
    failureRedirect: "/signup",
    failureFlash: true,
  })
);

// SINGIN
router.get("/signin", (req, res) => {
  res.render("./index");
});

router.post(
  "/signin",
  body("username", "por favor ingrese su nombre de usuario").notEmpty(),
  body("password", "Es necesaria la contraseña").notEmpty(),
  (req, res, next) => {
    const errors = validationResult(req);

    if (errors.isEmpty() == false) {
      req.flash("message", "Es necesario ingresar los datos solicitados.");
      res.redirect("/signin");
    }

    passport.authenticate("local.signin", {
      successRedirect: "/profile",
      failureRedirect: "/signin",
      failureFlash: true,
    })(req, res, next);
  }
);

router.get("/logout", isLoggedIn, (req, res) => {
  req.logOut();
  res.redirect("/");
});

router.get("/profile", isLoggedIn, (req, res) => {
  res.render("profile");
});

module.exports = router;
