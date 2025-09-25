import React, { useState, useEffect } from "react";
import { SurveyCreator, SurveyCreatorComponent } from "survey-creator-react";
import "survey-core/survey-core.css";
import "survey-creator-core/survey-creator-core.css";
import { createForm, updateForm, getFormById } from "../api/forms";
import { useNavigate, useParams } from "react-router-dom";

function FormBuilder() {
  const navigate = useNavigate();
  const { id } = useParams(); // اگر id باشد، یعنی ویرایش

  const [creator, setCreator] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const options = {
      showLogicTab: true,
      // گزینه‌های دیگر ...
    };
    const c = new SurveyCreator(options);
    setCreator(c);

    if (id) {
      // بارگذاری فرم برای ویرایش
      getFormById(id)
        .then((res) => {
          const formData = res.data;
          // فرض کن سرور دادهٔ json فرم را در formData.json دارد
          c.JSON = formData.json;
          // اگر بخوای عنوان فرم هم در creator نمایش داده شود:
          if (formData.title) {
            // بعضی ورژن‌ها از property title در JSON استفاده می‌کنند
            c.JSON.title = formData.title;
          }
          setIsLoading(false);
        })
        .catch((err) => {
          console.error("Error loading form:", err);
          setIsLoading(false);
        });
    } else {
      setIsLoading(false);
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
    try {
      if (id) {
        await updateForm(id, payload);
        alert("فرم با موفقیت به‌روز شد");
      } else {
        await createForm(payload);
        alert("فرم جدید ساخته شد");
      }
      navigate("/");
    } catch (err) {
      console.error("Error saving form:", err);
      alert("خطا در ذخیره فرم");
    }
  };

  if (isLoading) {
    return <div>در حال بارگذاری فرم ...</div>;
  }

  return (
    <div style={{ padding: "20px" }}>
      <h2>{id ? "ویرایش فرم" : "ساخت فرم جدید"}</h2>
      <button onClick={handleSave}>
        {id ? "به‌روزرسانی فرم" : "ذخیره فرم"}
      </button>
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
