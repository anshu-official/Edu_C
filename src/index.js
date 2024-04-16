// import React from "react";
// import ReactDOM from "react-dom/client";
// import Login from "./Components/login";
// import Dashboard from "./Components/Dashboard";
// import App from "./App";
// import { createBrowserRouter, RouterProvider } from "react-router-dom";
// import QuizCreator from "./Components/make_a_quiz";
// import QuizSubmitter from "./Components/submit_a_quiz";
// const root = ReactDOM.createRoot(document.getElementById("root"));

// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <App />,
//   },
//   {
// path: "/login",
//   element: <Login/>
// },{
//     path: "/dashboard",
//     element: <Dashboard/>
// },{
//     path: "/createQuiz",
//     element: <QuizCreator link={link} setlink={setlink}/>
// },{
//   path:  `/quiz/:link`,
//   element: <QuizSubmitter/>
// }
// ]);
// root.render(<RouterProvider router={router} />);
import React from 'react';
import ReactDOM from 'react-dom';
import AppRouter from './App'; // Adjust the path as needed
import { AuthProvider } from './authProvider';

ReactDOM.render(
  <React.StrictMode>
    <AuthProvider>
    <AppRouter />
    </AuthProvider>
  </React.StrictMode>,
  document.getElementById('root')
);