const express = require("express");
const router = express.Router();

const { CreationOfQuestion, sendQuestionPaper } = require("../controllers/questionController");

router.post("/creationOfQuestion", CreationOfQuestion);
router.get("/all", sendQuestionPaper);

module.exports = router;
