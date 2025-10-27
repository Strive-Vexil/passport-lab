import express from "express";
import passport from 'passport';
import { forwardAuthenticated } from "../middleware/checkAuth";

declare module "express-session" {
  interface SessionData {
    messages?: string[];
  }
}

const router = express.Router();

router.get(
  '/github', 
  passport.authenticate('github', { scope: ["user:email"] })
);

router.get(
  '/github/callback',
  passport.authenticate('github', {
    failureRedirect: '/auth/login',
    failureMessage: true, 
  }),
  (req, res) => {
    res.redirect('/dashboard');
  }
);

router.get("/login", forwardAuthenticated, (req, res) => {
  let loginStatus = "";
  if (Array.isArray(req.session.messages) && req.session.messages.length > 0) {
    loginStatus = req.session.messages[0];
    req.session.messages = [];
  }
  res.render("login", { loginStatus });
});


router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/dashboard",
    failureRedirect: "/auth/login",
    failureMessage: true,
    /* FIX ME: 😭 failureMsg needed when login fails */
  })
);

router.get("/logout", (req, res) => {
  req.logout((err) => {
    if (err) console.log(err);
  });
  res.redirect("/auth/login");
});

export default router;
