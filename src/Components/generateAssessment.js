import React from "react";
import "../styles/homepage.css";
import { useAuth } from "../authProvider";
import { useEffect } from "react";
import "../styles/generateAssessment.css";
function GenerateAssessment() {
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
      <section className="section1_home assessment">
        <p className="main_text1">
          The{" "}
          <span className="main_text_color1">
            Smart
            <br />
          </span>{" "}
          Choice For <span className="main_text_color1">Future</span>
        </p>
        <img src="/images/generate_main.png" alt="main image" width="120%" />
      </section>
      <section className="section3_home assessment_2">
        <h1 className="generate_assess">Generate Assessment</h1>
        <div className="section3_inside1">
          <div className="services1">
            <a href="/ai_or_manual">
              <div className="service1 new">
                <div className="image">
                  <img src="/images/generate1.png" alt="ppt" width="200vw" />
                </div>
                <p>Quizzes</p>
              </div>
            </a>
            <a href="/testai">
              <div className="service1 new">
                <div className="image">
                  <img src="/images/generate2.png" width="200vw" />
                </div>
                <p>Tests</p>
              </div>
            </a>
          </div>
          <div className="services1">
            <a href="">
              <div className="service1 new">
                <div className="image">
                  <img src="/images/generate3.png" width="200vw" />
                </div>
                <p>Assignments</p>
              </div>
            </a>
            <a href="">
              <div className="service1 new">
                <div className="image">
                  <img src="/images/generate4.png" width="200vw" />
                </div>
                <p>Case Study</p>
              </div>
            </a>
          </div>
        </div>
      </section>
      <section>
        <img src="/images/footer.png" width="100%" />
      </section>
    </div>
  );
}

export default GenerateAssessment;
