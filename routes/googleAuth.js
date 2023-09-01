const express = require("express");
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const User = require("../models/User.js"); // Replace this with the path to your User model

const router = express.Router();

// Set up the GoogleStrategy
passport.use(
	new GoogleStrategy(
		{
			clientID:
				"249394045328-s95llv2o2o0o1gq1qm0trlt1umc3t36k.apps.googleusercontent.com",
			clientSecret: "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",
			callbackURL: "/api/auth/google/callback", // This URL should match the callback URL registered in your Google Developer Console
		},
		async (accessToken, refreshToken, profile, done) => {
			try {
				// Check if the user email exists in the database
				const existingUser = await User.findOne({
					email: profile._json.email,
				});

				if (existingUser) {
					console.log("User already exists:", existingUser);
					return done(null, existingUser);
				}

				// If user email does not exist, save the user to the database
				const newUser = await new User({
					userId: profile.id,
					email: profile._json.email,
					username: profile._json.name,
				}).save();

				console.log("New user saved:", newUser);
				return done(null, newUser);
			} catch (err) {
				console.error("Error during Google authentication:", err);
				return done(err, null);
			}
		}
	)
);

// Create the route to start the Google login process
router.get(
	// "/api/auth/google",
	"/google",
	passport.authenticate("google", { scope: ["profile", "email"] })
	// console.log("success")
);

// Handle the callback from Google after successful login
router.get(
	"/google/callback",
	passport.authenticate("google", { failureRedirect: "/login" }),
	(req, res) => {
		console.log("User data:", req.user);
		res.redirect("/"); // Redirect to the homepage or any desired route after successful login
	}
);

module.exports = router;
