import { useState } from "react";
import Axios from "axios";
import FileDownload from "js-file-download";

function GenerateContent() {
  const [Topic, setTopic] = useState("");
  const [Tone, setTone] = useState("");
  const [Audience, setAudience] = useState("");
  const [Keywords, setKeywords] = useState("");
  const [Purpose, setPurpose] = useState("");
  const [OtherDetails, setOtherDetails] = useState("");
  const [responseMessage, setResponseMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const generateTest = async () => {
    setLoading(true);
    const data = {
      Topic,
      Tone,
      Audience,
      Keywords,
      Purpose,
      OtherDetails,
    };

    try {
      const response = await fetch("http://localhost:5000/generate-content", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const responseData = await response.json();
      setResponseMessage(responseData.message);
      setLoading(false);
      downloadPDF();
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const downloadPDF = async () => {
    setLoading(true);
    try {
      const response = await Axios.get(
        "http://localhost:5000/downloadContent-pdf",
        {
          responseType: "blob",
        }
      );
      FileDownload(response.data, "content.pdf");
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  return (
    <div className=" flex flex-col w-100% h-100% mx-auto p-4 text-center bg-gray-900 text-white">
      <div className=" w-[50%] mx-auto">
        <h1 className="text-4xl font-bold mb-20 mt-5 ">Generate Content</h1>
        <div className="mb-4 flex flex-col text-left gap-y-5">
          <label>
            <p className="text-lg">Topic or Theme :</p>
            <input
              type="text"
              value={Topic}
              placeholder="Specific Topic or theme for the content."
              onChange={(e) => setTopic(e.target.value)}
              className=" bg-slate-800  rounded-lg px-3 py-2 mt-2 w-full border-b-[1px] border-b-neutral-400 "
            />
          </label>
          <label>
            <p className="text-lg">Tone or Style:</p>
            <input
              type="text"
              value={Tone}
              placeholder="e.g., formal, casual, humorous, professional"
              onChange={(e) => setTone(e.target.value)}
              className=" bg-slate-800  rounded-lg px-3 py-2 mt-2 w-full border-b-[1px] border-b-neutral-400 "
            />
          </label>
          <label>
            <p className="text-lg">Audience :</p>
            <input
              type="text"
              value={Audience}
              placeholder="e.g., general readers, professionals in a specific industry, teenagers"
              onChange={(e) => setAudience(e.target.value)}
              className=" bg-slate-800  rounded-lg px-3 py-2 mt-2 w-full border-b-[1px] border-b-neutral-400 "
            />
          </label>
          <label>
            <p className="text-lg">Keywords :</p>
            <input
              type="text"
              value={Keywords}
              placeholder="Provide any relevant keywords or phrases"
              onChange={(e) => setKeywords(e.target.value)}
              className=" bg-slate-800  rounded-lg px-3 py-2 mt-2 w-full border-b-[1px] border-b-neutral-400 "
            />
          </label>
          <label>
            <p className="text-lg">Purpose :</p>
            <input
              type="text"
              value={Purpose}
              placeholder="e.g., to inform, entertain, persuade, promote"
              onChange={(e) => setPurpose(e.target.value)}
              className=" bg-slate-800  rounded-lg px-3 py-2 mt-2 w-full border-b-[1px] border-b-neutral-400 "
            />
          </label>
          <label>
            <p className="text-lg">Other Details :</p>
            <input
              type="text"
              value={OtherDetails}
              placeholder="References or examples that can help guide the content creation process"
              onChange={(e) => setOtherDetails(e.target.value)}
              className=" bg-slate-800  rounded-lg px-3 py-2 mt-2 w-full border-b-[1px] border-b-neutral-400 "
            />
          </label>
        </div>
        <div className="gap-y-10">
          <button
            onClick={generateTest}
            className="w-full text-xl bg-yellow-300 text-center py-2 rounded-lg text-black font-medium mt-10"
          >
            Generate Content
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

export default GenerateContent;
