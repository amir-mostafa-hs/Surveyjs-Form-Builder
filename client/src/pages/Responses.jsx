import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getResponses } from "../api/responses";

function Responses() {
  const { formId } = useParams();
  const [responses, setResponses] = useState([]);

  useEffect(() => {
    getResponses(formId).then((res) => {
      setResponses(res.data);
    });
  }, [formId]);

  return (
    <div style={{ padding: "20px" }}>
      <h2>پاسخ‌ها</h2>
      {responses.length === 0 ? (
        <p>هنوز پاسخی ثبت نشده است.</p>
      ) : (
        <div>
          {responses.map((resp, idx) => (
            <div
              key={idx}
              style={{
                marginBottom: "20px",
                padding: "10px",
                border: "1px solid #ccc",
              }}
            >
              <strong>پاسخ شماره {idx + 1}</strong>
              <pre>{JSON.stringify(resp.answers, null, 2)}</pre>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Responses;
