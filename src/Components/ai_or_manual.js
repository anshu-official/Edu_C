import React from "react";
import "../styles/ai_or_manual.css";
import { useAuth } from "../authProvider";
import { useState, useEffect } from "react";
function AIorManual() {
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
      <div className="buttons_section">
        <img src="/images/main_manual.png" width="50%" />
        <div className="buttons_section1">
          <a href="/quizCreator" className="icon-link">
            <span className="icon_link">
              <img src="/images/manually.png" width="68vw" />
            </span>
            <span className="text_link">Manually</span>
          </a>
          <a href="/testai" className="icon-link">
            <span className="icon_link">
              <img
                src="https://banner2.cleanpng.com/20191001/hpa/transparent-test-icon-educational-icons-icon-verified-text-pap-5d93b4186f5855.1024073315699609844561.jpg"
                width="64vw"
              />
            </span>
            <span className="text_link">AI Generated</span>
          </a>
        </div>
      </div>
      <section>
        <img src="/images/footer.png" width="100%" />
      </section>
    </div>
  );
}
export default AIorManual;
