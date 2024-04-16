import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "../styles/submit_a_quiz.css";
import Footer from "./Footer";
import { useAuth } from "../authProvider";

const QuizAttempter = () => {
  const { isLoggedIn, person, setPerson } = useAuth();
  useEffect(() => {
    // Fetch the 'person' value from localStorage when the component mounts
    const storedPerson = localStorage.getItem("person");
    if (storedPerson) {
      setPerson(storedPerson);
      localStorage.setItem("loggedIn", true);
    } else {
      localStorage.setItem("loggedIn", false);
    }
  }, []);
  const { link } = useParams();
  const [quiz, setQuiz] = useState(null);
  const [answers, setAnswers] = useState([]); // State to store the student's answers
  const [submit, setSubmit] = useState(false);
  const [viewResult, setViewResult] = useState(false);
  const [result, setResult] = useState({});
  let i = 1;
  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/quiz/${link}`);
        if (!response.ok) {
          throw new Error("Failed to fetch quiz");
        }
        const data = await response.json();
        console.log(data);
        setQuiz(data);
      } catch (error) {
        console.error("Error fetching quiz:", error);
      }
    };

    fetchQuiz();
  }, [link]);

  const handleAnswerChange = (questions, question, selectedOption) => {
    // Update the answers state when the student selects an option
    const index = question.options.indexOf(selectedOption);
    const questionIndex = questions.indexOf(question);
    // Check if the question index already exists in the answers state
    const updatedAnswers = { ...answers };
    if (updatedAnswers[questionIndex]) {
      // Update the existing question index with the selected option index
      updatedAnswers[questionIndex] = index;
    } else {
      // Add a new question index with the selected option index
      updatedAnswers[questionIndex] = index;
    }

    // Update the answers state
    setAnswers(updatedAnswers);
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch(
        "http://localhost:5000/api/quiz/submit-answers",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            quizId: quiz._id,
            answers,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to submit answers");
      }

      const data = await response.json();
      console.log(data);
      setResult(data);
      setSubmit(true);
      // Handle response from the backend as needed
    } catch (error) {
      console.error("Error submitting answers:", error);
      // Handle error
    }
  };

  if (!quiz) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
      </div>
    );
  }

  return (
    <div>
      <nav className="navbar">
        <div className="navbar_left">
          <a href="/">
            <img src="/images/back.png" width="50vw" />
          </a>
          <div>
            <img src="/images/logo.png" alt="logo" width="90vw" />
            <p className="educraft">Edu Craft</p>
          </div>
        </div>
        <div className="navbar_right">
          <a href="">
            <img
              src="/images/notification.png"
              alt="notify"
              width="25vw"
              height="35vh"
            />
          </a>
          {localStorage.getItem("loggedIn") && person !== "" ? (
            <h2 style={{ fontSize: "20px", fontWeight: "700" }}>{person}</h2>
          ) : (
            <a className="login" href="/login">
              Login/SignUp
            </a>
          )}
          <a href="/login">
            <img
              src="/images/login.png"
              alt="login"
              width="50vw"
              height="50vh"
            />
          </a>
        </div>
      </nav>
      <div className="quiz-container">
        {submit === false ? (
          <div>
            <h1 className="quiz_title">{quiz.title}</h1>
            <form>
              {quiz.questions.map((question) => (
                <div key={question._id} className="question-container">
                  <h3>
                    {i++}. {question.question}
                  </h3>
                  <ul>
                    {question.options.map((option) => (
                      <li key={option}>
                        <label>
                          <input
                            type="radio"
                            name={`question-${question._id}`}
                            value={option}
                            onChange={() =>
                              handleAnswerChange(
                                quiz.questions,
                                question,
                                option
                              )
                            }
                          />
                          {option}
                        </label>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
              <button
                onClick={(e) => {
                  e.preventDefault();
                  handleSubmit();
                }}
                className="btn"
              >
                Submit
              </button>
            </form>
          </div>
        ) : (
          <div>
            <h1 className="quiz_title">Quiz Submitted successfully:</h1>
            <button onClick={() => setViewResult(true)} className="btn">
              Click to view Result
            </button>
            {viewResult && (
              <div>
                <h3 className="title1">Score: {result.score}</h3>
                <h3 className="title1">
                  Percentage: {result.percentageScore}%
                </h3>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default QuizAttempter;
