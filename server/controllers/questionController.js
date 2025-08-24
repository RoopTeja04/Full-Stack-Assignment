const QuestionPaper = require("../models/questionpaper");

exports.CreationOfQuestion = async (req, res) => {
    try {
        const newPaper = new QuestionPaper({
            title: req.body.title,
            subject: req.body.subject,
            duration: req.body.duration || 30,
            instructions: req.body.instructions,
            questions: req.body.questions,
        });

        await newPaper.save();
        return res.status(200).json({ message: "Question Created Successfully..." });
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
};

exports.sendQuestionPaper = async (req, res) => {

    try {
        const questions = await QuestionPaper.find();

        return res.status(200).json(questions);
    }
    catch (err) {
        return res.status(500).json({ error: err.message });
    }

}