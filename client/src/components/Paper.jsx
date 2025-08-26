import React, { useEffect } from 'react'
import api from '../apis/api';

const Paper = ({ handleStopExam }) => {

    const [questions, setQuestions] = React.useState([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = React.useState(0);
    const [answers, setAnswers] = React.useState({});

    useEffect(() => {

        const handleFetch = async () => {
            try {

                const res = await api.get("/question/all");
                const data = await res.json();

                if (data) {
                    setQuestions(data);
                }

            } catch (err) {
                console.error("Failed to fetch questions:", err);
            }
        }
        handleFetch();
    }, []);

    const handleAnswer = (qid, ans) => {
        setAnswers((prev) => ({ ...prev, [qid]: ans }));
    };

    const goToQuestion = (index) => {
        if (index >= 0 && index < questions.length) {
            setCurrentIndex(index);
        }
    };

    return (
        <div className="flex min-h-screen">
            {/* Sidebar with question numbers */}
            <div className="w-1/4 bg-gray-100 p-4 border-r overflow-y-auto">
                <h2 className="font-bold mb-4">Questions</h2>
                <div className="grid grid-cols-5 gap-2">
                    {questions.map((q, idx) => {
                        const isAnswered = answers[q.id] !== undefined;
                        return (
                            <button
                                key={q.id}
                                onClick={() => goToQuestion(idx)}
                                className={`w-10 h-10 rounded-full font-bold ${isAnswered
                                        ? "bg-green-500 text-white"
                                        : "bg-red-500 text-white"
                                    }`}
                            >
                                {idx + 1}
                            </button>
                        );
                    })}
                </div>
            </div>

            {/* Main Question Area */}
            <div className="flex-1 p-6 flex flex-col">
                {currentQuestionIndex ? (
                    <>
                        <h1 className="text-xl font-bold mb-4">
                            Q{currentIndex + 1}. {currentQuestionIndex.question}
                        </h1>
                        <div className="flex flex-col gap-3">
                            {currentQuestion.options.map((opt, i) => (
                                <label key={i} className="flex items-center gap-2">
                                    <input
                                        type="radio"
                                        name={`q-${currentQuestionIndex.id}`}
                                        value={opt}
                                        checked={answers[currentQuestionIndex.id] === opt}
                                        onChange={() => handleAnswer(currentQuestionIndex.id, opt)}
                                    />
                                    {opt}
                                </label>
                            ))}
                        </div>

                        {/* Navigation buttons */}
                        <div className="mt-6 flex justify-between">
                            <button
                                onClick={() => goToQuestion(currentIndex - 1)}
                                disabled={currentIndex === 0}
                                className="px-4 py-2 rounded bg-gray-400 text-white disabled:opacity-50"
                            >
                                Prev
                            </button>
                            <button
                                onClick={() => goToQuestion(currentIndex + 1)}
                                disabled={currentIndex === questions.length - 1}
                                className="px-4 py-2 rounded bg-blue-600 text-white disabled:opacity-50"
                            >
                                Next
                            </button>
                        </div>
                    </>
                ) : (
                    <p>Loading questions...</p>
                )}
            </div>
        </div>
    );
}

export default Paper