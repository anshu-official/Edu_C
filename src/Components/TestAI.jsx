import { useState } from "react";
import Axios from "axios";
import FileDownload from "js-file-download";

function TestAI() {
  const [subject, setSubject] = useState("");
  const [topic, setTopic] = useState("");
  const [numberOfQuestions, setNumberOfQuestions] = useState("");
  const [optionalDetails, setOptionalDetails] = useState("");
  const [responseMessage, setResponseMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const generateTest = async () => {
    setLoading(true);
    try {
      const res = await Axios.post(`http://localhost:5000/generate-test`, {
        subject,
        topic,
        numberOfQuestions,
        optionalDetails,
      });
      setResponseMessage(res.data.message);
      setLoading(false);
      downloadPDF();
    } catch (error) {
      console.log(error);
    }
  };

  const downloadPDF = async () => {
    setLoading(true);
    try {
      const response = await Axios.get(
        "http://localhost:5000/downloadTest-pdf",
        {
          responseType: "blob",
        }
      );
      FileDownload(response.data, "test.pdf");
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  return (
    <div className=" flex flex-col w-100% h-screen mx-auto p-4 text-center bg-gray-900 text-white">
      <div className=" w-[50%] mx-auto">
        <h1 className="text-4xl font-bold mb-20 mt-5 ">Generate Test</h1>
        <div className="mb-4 flex flex-col text-left gap-y-5">
          <label>
            <p className="text-lg">Subject :</p>
            <input
              type="text"
              value={subject}
              placeholder="Enter Name of Subject eg-Math"
              onChange={(e) => setSubject(e.target.value)}
              className=" bg-slate-800  rounded-lg px-3 py-2 mt-2 w-full border-b-[1px] border-b-neutral-400 "
            />
          </label>
          <label>
            <p className="text-lg">Topic :</p>
            <input
              type="text"
              value={topic}
              placeholder="Enter Topic Name eg-Probability"
              onChange={(e) => setTopic(e.target.value)}
              className=" bg-slate-800  rounded-lg px-3 py-2 mt-2 w-full border-b-[1px] border-b-neutral-400 "
            />
          </label>
          <label>
            <p className="text-lg">Number of Questions :</p>
            <input
              type="text"
              value={numberOfQuestions}
              placeholder="Enter the Number of Questions eg-10"
              onChange={(e) => setNumberOfQuestions(e.target.value)}
              className=" bg-slate-800  rounded-lg px-3 py-2 mt-2 w-full border-b-[1px] border-b-neutral-400 "
            />
          </label>
          <label>
            <p className="text-lg">Optional Detials :</p>
            <input
              type="text"
              value={optionalDetails}
              placeholder="eg- Easy, Hard, MCQ , Subjective"
              onChange={(e) => setOptionalDetails(e.target.value)}
              className=" bg-slate-800  rounded-lg px-3 py-2 mt-2 w-full border-b-[1px] border-b-neutral-400 "
            />
          </label>
        </div>
        <div className="gap-y-10">
          <button
            onClick={generateTest}
            className="w-full text-xl bg-yellow-300 text-center py-2 rounded-lg text-black font-medium mt-10"
          >
            Generate Test
          </button>
          <p className="text-lg mt-5">{loading && "Loading..."}</p>
          {responseMessage && (
            <button
              onClick={downloadPDF}
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mt-4"
            >
              Download
            </button>
          )}
          <div className="mt-4">{responseMessage}</div>
        </div>
      </div>
    </div>
  );
}

export default TestAI;
