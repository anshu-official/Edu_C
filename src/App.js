import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Components/login"; // Import your Login component
import Dashboard from "./Components/Dashboard"; // Import your Dashboard component
import QuizCreator from "./Components/make_a_quiz";
import QuizAttempter from "./Components/submit_a_quiz"; // Import your QuizAttempter component
import Home from "./Components/homepage";
import AIorManual from "./Components/ai_or_manual";
import GenerateAssessment from "./Components/generateAssessment";
import GenerateContent from "./Components/GenerateContent.jsx";
import TestAI from "./Components/TestAI.jsx";

import SendMail from "./Components/SenMail.jsx";
const AppRouter = () => {
  const [link, setlink] = useState("");
  return (
    <Router>
      <Routes>
        <Route path="/ai_or_manual" element={<AIorManual />} />
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/quizCreator"
          element={<QuizCreator link={link} setlink={setlink} />}
        />
        <Route path="/quiz/:link" element={<QuizAttempter />} />
        <Route path="/generateAssessment" element={<GenerateAssessment />} />
        <Route path="/sendmail" element={<SendMail />}></Route>
        <Route path="/testai" element={<TestAI />}></Route>
        <Route path="/generateContent" element={<GenerateContent />}></Route>
      </Routes>
    </Router>
  );
};

export default AppRouter;
