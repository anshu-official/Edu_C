import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/dashboard.css";

const Dashboard = () => {
  const [quizzes, setQuizzes] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    // Fetch quizzes from the backend when the component mounts
    const fetchQuizzes = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/quiz/quizzes"
        );
        setQuizzes(response.data); // Assuming the response contains an array of quizzes
      } catch (error) {
        setError("Failed to fetch quizzes");
      }
    };

    fetchQuizzes();
  }, []);

  return (
    <div className="quiz-container">
      <h2 className="quiz-title">Quiz Dashboard</h2>
      <ul className="quiz-list">
        {quizzes.map((quiz, index) => (
          <li key={index} className="quiz-item">
            <h3 className="quiz-info">{quiz.title}</h3>
            <ul className="question-list">
              {quiz.questions.map((question, index) => (
                <li key={index} className="question-item">
                  <h4 className="question">{question.question}</h4>
                  <ul className="options-list">
                    {question.options.map((option, index) => (
                      <li key={index} className="option">
                        {option}
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Dashboard;
