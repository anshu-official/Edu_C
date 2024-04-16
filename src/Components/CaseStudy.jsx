import React, { useState } from "react";
import axios from "axios";

function CaseStudy() {
  const [image, setImage] = useState(null);
  const [questions, setQuestions] = useState([]);

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append("image", image);

    try {
      const response = await axios.post("/caseStudy", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setQuestions(response.data.questions);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div>
      <input type="file" onChange={handleImageChange} />
      <button onClick={handleSubmit}>Process Image</button>
      <div>
        {questions.map((question, index) => (
          <div key={index}>{question}</div>
        ))}
      </div>
    </div>
  );
}

export default CaseStudy;
