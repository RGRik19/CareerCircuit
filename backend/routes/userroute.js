const express = require("express");
const { registerUser,loginUser,logout, forgotpassword,resetPasswords} = require("../controllers/usercontroller");

const router = express.Router();

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/password/forgot").post(forgotpassword);
router.route("/password/reset/:token").put(resetPasswords);
router.route("/logout").get(logout);


module.exports=router;

