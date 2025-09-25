import React, { useState, useEffect } from "react";
import { SurveyCreator, SurveyCreatorComponent } from "survey-creator-react";
import "survey-core/survey-core.css";
import "survey-creator-core/survey-creator-core.css";
import { createForm, updateForm, getFormById } from "../api/forms";
import { useNavigate, useLocation, useParams } from "react-router-dom";

function FormBuilder() {
  const navigate = useNavigate();
  // eslint-disable-next-line no-unused-vars
  const location = useLocation();
  const { id } = useParams(); // اگر بخوای ادیت هم بکنی
  const [creator, setCreator] = useState(null);

  useEffect(() => {
    const options = {
      showLogicTab: true,
      // می‌تونی گزینه‌های دیگر هم اضافه کنی
    };
    const c = new SurveyCreator(options);
    setCreator(c);

    if (id) {
      // اگر مد ادیت باشه، فرم را از سرور بگیر و JSON را ست کن
      getFormById(id).then((res) => {
        c.JSON = res.data.json;
        c.text = res.data.title; // اگر بخوای عنوان را هم ست کنی
      });
    }
  }, [id]);

  const handleSave = async () => {
    if (!creator) return;
    const json = creator.JSON;
    const title = json.title || "فرم بدون عنوان";
    const payload = {
      title,
      description: json.description || "",
      json,
    };
    if (id) {
      await updateForm(id, payload);
    } else {
      await createForm(payload);
    }
    navigate("/");
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>{id ? "ویرایش فرم" : "ساخت فرم جدید"}</h2>
      <button onClick={handleSave}>ذخیره فرم</button>
      {creator && (
        <SurveyCreatorComponent
          style={{ height: "100vh", width: "100%" }}
          creator={creator}
        />
      )}
    </div>
  );
}

export default FormBuilder;
