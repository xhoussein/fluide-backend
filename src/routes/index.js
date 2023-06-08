const express = require('express');
const config = require('../config/config');

const router = express.Router();
const userRoute = require("./user.route")


router.use("/", userRoute)
module.exports = router;
