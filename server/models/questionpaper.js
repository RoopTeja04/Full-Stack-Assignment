const mongoose = require("mongoose");

const QuestionSchema = new mongoose.Schema({
    questionName: {
        type: String,
        required: true,
    },
    questionOptions: [
        {
            option: {
                type: String,
                required: true,
            },
            isCorrect: {
                type: Boolean,
                default: false,
            },
        },
    ],
    marks: {
        type: Number,
        default: 1,
    },
});

const QuestionPaperSchema = new mongoose.Schema(
    {
        title: { type: String, required: true },
        subject: { type: String, required: true },
        duration: { type: Number, default: 30, required: true },
        instructions: { type: String },
        questions: { type: [QuestionSchema], required: true },
    },
    { timestamps: true }
);

module.exports = mongoose.model("QuestionPaper", QuestionPaperSchema);
