import { useState, useEffect } from "react";
import Axios from "axios";
import { useAuth } from "../authProvider";

function SendMail() {
  const [to, setTo] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [responseMessage, setResponseMessage] = useState("");
  const [loading, setLoading] = useState(false);
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

  const sendMail = async () => {
    setLoading(true);
    try {
      const response = await Axios.post(
        "http://localhost:5000/sendMail",
        { to, subject, message } // Pass data as an object
      );

      setResponseMessage(response.data.message);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

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
      <div className="flex flex-col items-center justify-center h-screen bg-gray-900 text-white">
        <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-[70%]">
          <h1 className="text-3xl font-bold mb-6 text-center">Send Email</h1>
          <input
            type="email"
            value={to}
            onChange={(e) => setTo(e.target.value)}
            placeholder="To"
            className="w-full mb-4 p-7 border text-black border-gray-400 rounded"
          />
          <input
            type="text"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            placeholder="Subject"
            className="w-full mb-4 p-7 border text-black border-gray-400 rounded"
          />
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Message"
            className="w-full h-32 mb-4 p-7 text-black border border-gray-400 rounded"
          />
          <button
            onClick={sendMail}
            disabled={loading}
            className={`w-full py-2 text-white  rounded ${
              loading
                ? "bg-gray-500 cursor-not-allowed"
                : "bg-blue-500 hover:bg-blue-700"
            }`}
          >
            {loading ? "Sending..." : "Send Email"}
          </button>
          {responseMessage && (
            <p className="mt-4 text-green-500">{responseMessage}</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default SendMail;
