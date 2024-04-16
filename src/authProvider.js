// AuthContext.js
import React, { createContext, useContext, useState } from "react";
import { useEffect } from "react";
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [person, setPerson] = useState("");
  useEffect(() => {
    localStorage.setItem("person", person);
  }, [person]);
  const signup = async (
    email,
    username,
    password,
    role,
    setloggedIn,
    setError
  ) => {
    try {
      // Perform validation (e.g., check if fields are not empty)

      // Make a POST request to your backend API for user authentication
      const response = await fetch("http://localhost:5000/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          name: username,
          password: password,
          role: role,
        }),
      });
      if (response.ok) {
        // Redirect to dashboard on successful login
        const data = await response.json();
        console.log(data);
        setPerson(data.name);
        setloggedIn(true);
      } else {
        // Handle login error
        setloggedIn(false);
        console.error("Failed to log in:", response.statusText);
      }
    } catch (error) {
      // Handle login error
      setError("Invalid email or password"); // Set error message based on your API response
    }
    // Perform login logic
    setIsLoggedIn(true);
    localStorage.setItem("loggedIn", true);
  };
  const login = async (username, password, role, setloggedIn, setError) => {
    try {
      // Perform validation (e.g., check if fields are not empty)

      // Make a POST request to your backend API for user authentication
      console.log(username, password, role);
      const response = await fetch("http://localhost:5000/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: username,
          password: password,
          role: role,
        }),
      });
      if (response.ok) {
        // Redirect to dashboard on successful login
        const data = await response.json();
        console.log(data);
        setPerson(data.name);
        setloggedIn(true);
      } else {
        // Handle login error
        setloggedIn(false);
        console.error("Failed to log in:", response.statusText);
      }
    } catch (error) {
      // Handle login error
      setError("Invalid email or password"); // Set error message based on your API response
    }
    // Perform login logic
    setIsLoggedIn(true);
    localStorage.setItem("loggedIn", true);
  };

  const logout = () => {
    // Perform logout logic
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider
      value={{ isLoggedIn, person, setPerson, login, logout, signup }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
