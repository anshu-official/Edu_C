import React from "react";
import "../styles/homepage.css";
import { useAuth } from "../authProvider";
import { useEffect } from "react";
function Home() {
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
        <div>
          <img src="/images/logo.png" alt="logo" width="90vw" />
          <p className="educraft">Edu Craft</p>
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
      <section className="section1_home">
        <p className="main_text">
          <span className="main_text_color">Empowering Creators:</span>{" "}
          Effortless Content Creation at Your Fingertips!
        </p>
        <img src="/images/home_main.png" alt="main image" width="100%" />
      </section>
      <section className="section2_home">
        <div className="section2_inside">
          <div>
            <h2>25K+</h2>
            <p>Professional Service Providers</p>
          </div>
          <div>
            <h2>50000+</h2>
            <p>Clients Trust</p>
          </div>
          <div>
            <h2>1lac+</h2>
            <p>Clients Served</p>
          </div>
          <div>
            <h2>4.8/5</h2>
            <p>Average Rating</p>
          </div>
        </div>
      </section>
      <section className="section3_home">
        <h2 className="ourservices">Our Services</h2>
        <p className="services_we_offer">Here are the services we offer</p>
        <div className="section3_inside1">
          <div className="services1">
            <a href="/generateContent">
              <div className="service1">
                <div className="image">
                  <img src="/images/ppt.png" alt="ppt" width="118vw" />
                </div>
                <p>AI based Content generator</p>
              </div>
            </a>
            <a href="/sendmail">
              <div className="service1">
                <div className="image">
                  <img src="/images/notification.png" width="118vw" />
                </div>
                <p>Notification System</p>
              </div>
            </a>
          </div>
          <div className="services1">
            <a href="http://127.0.0.1:8000/">
              <div className="service1">
                <div className="image">
                  <img src="/images/video.png" width="200vw" />
                </div>
                <p>Video Tool</p>
              </div>
            </a>
            <a href="/generateAssessment">
              <div className="service1">
                <div className="image">
                  <img src="/images/assessment.png" width="204vw" />
                </div>
                <p>Assessment generator</p>
              </div>
            </a>
          </div>
        </div>
      </section>
      <section className="section4_home">
        <div className="review">
          <div className="image">
            <img src="/images/user1.png" alt="photo" width="100vw" />
          </div>
          <div className="rating">
            <img src="/images/star.png" width="25vw" />
            <p className="rate">5.0</p>
          </div>
          <h2>Elias Watsica</h2>
          <p className="comment">Super recommended product. You have to try!</p>
        </div>
        <div className="review">
          <div className="image">
            <img src="/images/user2.png" alt="photo" width="100vw" />
          </div>
          <div className="rating">
            <img src="/images/star.png" width="25vw" />
            <p className="rate">4.75</p>
          </div>
          <h2>Wade Warren</h2>
          <p className="comment">
            Awesome website and funnel for your business
          </p>
        </div>
        <div className="review">
          <div className="image">
            <img src="/images/user3.png" alt="photo" width="100vw" />
          </div>
          <div className="rating">
            <img src="/images/star.png" width="25vw" />
            <p className="rate">4.95</p>
          </div>
          <h2>Nicole Champlin</h2>
          <p className="comment">Couldn’t agree more to this product! </p>
        </div>
        <div className="review">
          <div className="image">
            <img src="/images/user4.png" alt="photo" width="100vw" />
          </div>
          <div className="rating">
            <img src="/images/star.png" width="25vw" />
            <p className="rate">4.5</p>
          </div>
          <h2>Theresa Conroy</h2>
          <p className="comment">I cannot believe my eyes, this is real!</p>
        </div>
      </section>
      <section>
        <img src="/images/footer.png" width="100%" />
      </section>
    </div>
  );
}

export default Home;
