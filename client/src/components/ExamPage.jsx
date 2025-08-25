import React, { useEffect } from 'react'
import api from '../apis/api'
import { useNavigate } from 'react-router-dom';

const ExamPage = () => {

    const [questions, setQuestions] = React.useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const handleFetch = async () => {
            try {
                const res = await api.get("/question/all");
                if (res.status === 200) {
                    setQuestions(res.data);
                }
            } catch (err) {
                console.log(err);
                alert("Something went wrong! Please check again later");
            }
        };

        handleFetch();
    }, []);

    return (
        <div className='bg-gray-400 min-h-screen flex flex-col items-center justify-center space-y-10'>
            <h1 className="text-xl font-bold">Welcome to Exam Page</h1>
            {
                questions.length > 0 ? (
                    <div className="w-[60%] p-6 bg-white rounded-lg shadow-md">
                        <ol className="list-decimal list-inside space-y-4">
                            {questions.map((question, index) => (
                                <div key={index}
                                    className='p-4 flex flex-col items-center space-y-4'
                                >
                                    <span className="text-2xl font-semibold">{question.title} </span>
                                    <span>{question.instructions}</span>
                                    <span>Duration: {question.duration}</span>
                                    <ul className='list-disc list-inside space-y-2'>
                                        <li>Type: MCQ's</li>
                                        <li>Points: Each Question carry one mark </li>  
                                        <li>Total Questions: {question.questions.length}</li>
                                        <li>Topics Covered: {question.subject}</li>
                                    </ul>
                                    <button
                                        className='px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition cursor-pointer'
                                        onClick={() => navigate("/main_paper")}
                                    >
                                        Start Exam
                                    </button>
                                </div>
                            ))}
                        </ol>
                    </div>
                ) : (
                    <p className="text-lg">Loading Instructions...</p>
                )
            }
        </div>
    )
}

export default ExamPage;