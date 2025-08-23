const express = require("express")
const router = express.Router()

const { CreateAccount } = require("../controllers/authController");

router.post("/createAccount", CreateAccount);

module.exports = router;