const express = require("express");
const router = express.Router();
let validate = require('../middlewares/validate');
const controller = require("../controllers");
const validation = require("../validations");
let auth = require('../middlewares/auth');
const passport = require("passport");

// router.post("/quiz-answer", validate(validation.userValidation.getQuizAnswer), controller.userController.getQuizAnswer)
router.post("/quiz", validate(validation.userValidation.getQuiz), controller.userController.getQuiz);
router.post("/modules", validate(validation.userValidation.getModules), controller.userController.getModule);
router.post("/lessons", validate(validation.userValidation.getLessons), controller.userController.getLessons);
router.get("/description", validate(validation.userValidation.getDescription), controller.userController.getDescription);
router.get("/ask-question", validate(validation.userValidation.askQuestion), controller.userController.askQuestion);
router.get("/examples", validate(validation.userValidation.getExample), controller.userController.getExample);
router.post("/register", validate(validation.userValidation.register), controller.userController.register);
router.post("/login", validate(validation.userValidation.login), controller.userController.login);
router.put("/profile", auth('profile'),validate(validation.userValidation.profile), controller.userController.updateProfile);
router.get("/profile", auth('profile'), controller.userController.getProfile);
router.delete("/profile", auth("profile"), controller.userController.deleteProfile)
router.get("/auth/google", passport.authenticate("google", ["profile", "email"]));
router.get("/auth/login/success", controller.userController.loginSucess);
router.get(
	"/auth/google/callback",
	passport.authenticate("google", {
		successRedirect: "http://localhost:3000/googleLogin",
		failureRedirect: "/auth/login/failed",
	})
);
router.get("/auth/login/failed", controller.userController.loginFailed);
router.get("/auth/logout", controller.userController.logout);
router.post("/verify-email", auth('profile'), controller.userController.verifyEmail);
router.post("/change-password", auth('profile'), controller.userController.changePassword)
router.post("/reset-password", controller.userController.resetPassword)
module.exports = router;