import { useState } from "react";
import Axios from "axios";
import FileDownload from "js-file-download";

function WorkingTestAI() {
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
      const response = await Axios.get("http://localhost:5000/download-pdf", {
        responseType: "blob",
      });
      FileDownload(response.data, "test.pdf");
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Generate Test</h1>
      <div className="mb-4">
        <label className="block">Subject:</label>
        <input
          type="text"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          className="border rounded p-2 w-full"
        />
      </div>
      <div className="mb-4">
        <label className="block">Topic:</label>
        <input
          type="text"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          className="border rounded p-2 w-full"
        />
      </div>
      <div className="mb-4">
        <label className="block">Number of Questions:</label>
        <input
          type="number"
          value={numberOfQuestions}
          onChange={(e) => setNumberOfQuestions(e.target.value)}
          className="border rounded p-2 w-full"
        />
      </div>
      <div className="mb-4">
        <label className="block">Optional Details:</label>
        <textarea
          value={optionalDetails}
          onChange={(e) => setOptionalDetails(e.target.value)}
          className="border rounded p-2 w-full"
        />
      </div>
      <button
        onClick={generateTest}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Generate Test
      </button>
      <p>{loading && "Loading..."}</p>
      {responseMessage && (
        <button
          onClick={downloadPDF}
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mt-4"
        >
          Download
        </button>
      )}
      <div className="response">{responseMessage}</div>
    </div>
  );
}

export default WorkingTestAI;
