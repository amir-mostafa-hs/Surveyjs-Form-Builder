import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getFormBySlug } from "../api/forms";
import { createResponse } from "../api/responses";
import { Model } from "survey-core";
import { Survey } from "survey-react-ui";
import "survey-core/survey-core.css";

function FormViewer() {
  const { slug } = useParams();
  const [form, setForm] = useState(null);

  useEffect(() => {
    getFormBySlug(slug).then((res) => {
      setForm(res.data);
    });
  }, [slug]);

  if (!form) {
    return <div>در حال بارگذاری...</div>;
  }

  const survey = new Model(form.json);
  survey.onComplete.add((sender) => {
    createResponse({
      formId: form.id,
      answers: sender.data,
    }).then(() => {
      alert("پاسخ شما ذخیره شد");
    });
  });

  return (
    <div style={{ padding: "20px" }}>
      <h2>{form.title}</h2>
      <Survey model={survey} />
    </div>
  );
}

export default FormViewer;
