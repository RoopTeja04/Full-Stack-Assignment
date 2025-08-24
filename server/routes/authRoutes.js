const express = require("express")
const router = express.Router()

const { CreateAccount, Login } = require("../controllers/authController");

router.post("/createAccount", CreateAccount);
router.post("/login", Login )

module.exports = router;