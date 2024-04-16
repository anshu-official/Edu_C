import React, { useState, useEffect } from "react";
import "../styles/make_a_quiz.css";
import { useAuth } from "../authProvider";
const QuizCreator = ({ link, setlink }) => {
  const [questions, setQuestions] = useState([
    { question: "", options: [""], correctAnswerIndex: -1 },
  ]);
  const [title, settitle] = useState("");
  const [correct, setCorrect] = useState("false");
  const [created, setCreated] = useState(false);
  /////////////////////////NEW Changes///////////////////////////
  const [selectedStudents, setSelectedStudents] = useState([]);
  const [students, setStudents] = useState([]);
  const [selectstudent, setSelectstudents] = useState(false);
  const [email_sent, setEmail_sent] = useState("");
  /////////////////////////END Changes///////////////////////////
  const handleQuestionChange = (index, event) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index].question = event.target.value;
    setQuestions(updatedQuestions);
  };
  /////////////////////////NEW Changes///////////////////////////
  const handleCheckboxChange = (event, student) => {
    const isChecked = event.target.checked;

    if (isChecked) {
      setSelectedStudents([...selectedStudents, student.email]); // Add student email to selected students
    } else {
      setSelectedStudents(
        selectedStudents.filter((email) => email !== student.email)
      ); // Remove student email from selected students
    }
  };
  /////////////////////////End Changes///////////////////////////

  const handleOptionChange = (questionIndex, optionIndex, event) => {
    const updatedQuestions = [...questions];
    updatedQuestions[questionIndex].options[optionIndex] = event.target.value;
    setQuestions(updatedQuestions);
  };
  /////////////////////////NEW Changes///////////////////////////
  const handleSharing = async () => {
    setSelectstudents(true);
    await fetchallStudents();
  };
  const handleshare = async () => {
    console.log(link);
    console.log(selectedStudents);
    const response = await fetch(
      "http://localhost:5000/api/quiz/send-notification",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          testlink: "http://localhost:3000/quiz/" + link,
          studentEmails: selectedStudents,
        }),
      }
    );
    const data = await response.json();
    setEmail_sent(data.message);
  };
  const fetchallStudents = async () => {
    const response = await fetch("http://localhost:5000/api/quiz/getstudents", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message: "Quiz Retreival",
      }),
    });
    const data = await response.json();
    setStudents(data);
    console.log(data);
  };
  /////////////////////////end Changes///////////////////////////

  const addQuestion = () => {
    setQuestions([...questions, { question: "", options: [""] }]);
  };

  const addOption = (questionIndex) => {
    const updatedQuestions = [...questions];
    updatedQuestions[questionIndex].options.push("");
    setCorrect("false");
    setQuestions(updatedQuestions);
  };

  const removeOption = (questionIndex, optionIndex) => {
    const updatedQuestions = [...questions];
    updatedQuestions[questionIndex].options.splice(optionIndex, 1);
    setQuestions(updatedQuestions);
  };

  const removeQuestion = (index) => {
    const updatedQuestions = [...questions];
    updatedQuestions.splice(index, 1);
    setQuestions(updatedQuestions);
  };
  const markasCorrect = (questionIndex, optionIndex) => {
    const updatedQuestions = [...questions];
    updatedQuestions[questionIndex].correctAnswerIndex = optionIndex;
    setQuestions(updatedQuestions);
    if (correct === "false") {
      setCorrect("true");
    } else {
      setCorrect("false");
    }
  };
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
  const handleCreationofquiz = async (title, questions) => {
    const response = await fetch("http://localhost:5000/api/quiz/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: title,
        questions: questions,
      }),
    });
    const data = await response.json();
    if (data.link) {
      const temp_link = data.link;
      setlink(String(temp_link));
    }
    setCreated(true);
  };
  if (created === true) {
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
            {localStorage.getItem("loggedIn") ? (
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
        <div>
          {link ? (
            <div className="container1">
              <h2 className="heading1">Quiz Created successfully</h2>
              <h3 className="title1">Share this link with the students:</h3>
              <a href={"/quiz/" + link} className="link_of_quiz">
                {"http://localhost:3000/quiz/" + link}
              </a>
              <button
                className="share-bt"
                onClick={() => {
                  handleSharing();
                }}
              >
                Share via Email
              </button>
              {selectstudent && (
                <div className="student_list">
                  <h2>Student List</h2>
                  <ul>
                    {students.map((student) => (
                      <li key={student.id}>
                        <label>
                          <input
                            type="checkbox"
                            onChange={(e) => handleCheckboxChange(e, student)}
                          />
                          {student.name} - {student.email}
                        </label>
                      </li>
                    ))}
                  </ul>
                  <p>Selected Students: {selectedStudents.join(", ")}</p>
                  <button className="share-bt" onClick={() => handleshare()}>
                    Share
                  </button>
                  {email_sent}
                </div>
              )}
            </div>
          ) : (
            <div className="container1">
              <h3 className="title1">
                Quiz not created, <a href="/quizCreator">try again</a>
              </h3>
            </div>
          )}
        </div>
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
      <div className="container1">
        <h2 className="heading1">Generate Quiz</h2>
        <div className="title_box1">
          <span className="title1">Title of quiz:</span>{" "}
          <input
            type="text"
            placeholder="title"
            value={title}
            onChange={(e) => settitle(e.target.value)}
          />
        </div>
        {questions.map((question, questionIndex) => (
          <div key={questionIndex} className="question1">
            <input
              type="text"
              placeholder="Enter question"
              value={question.question}
              onChange={(e) => handleQuestionChange(questionIndex, e)}
            />
            <button
              onClick={() => removeQuestion(questionIndex)}
              className="add-remove-btn1"
            >
              Remove Question
            </button>
            <ul className="options1">
              {question.options.map((option, optionIndex) => (
                <li key={optionIndex} className="option1">
                  <input
                    type="text"
                    placeholder={`Option ${optionIndex + 1}`}
                    value={option}
                    onChange={(e) =>
                      handleOptionChange(questionIndex, optionIndex, e)
                    }
                  />
                  <button
                    onClick={() => removeOption(questionIndex, optionIndex)}
                    className="add-remove-btn1"
                  >
                    Remove Option
                  </button>
                  <button
                    onClick={() => markasCorrect(questionIndex, optionIndex)}
                    className={
                      optionIndex ===
                      questions[questionIndex].correctAnswerIndex
                        ? "true"
                        : "false add-remove-btn1"
                    }
                  >
                    Mark as Correct
                  </button>
                </li>
              ))}
              <button
                onClick={() => addOption(questionIndex)}
                className="add-remove-btn1"
              >
                Add Option
              </button>
            </ul>
          </div>
        ))}
        <button onClick={addQuestion} className="add-remove-btn1">
          Add Question
        </button>
        <button
          onClick={() => handleCreationofquiz(title, questions)}
          className="create-quiz-btn1"
        >
          Create Quiz
        </button>
      </div>
    </div>
  );
};

export default QuizCreator;
