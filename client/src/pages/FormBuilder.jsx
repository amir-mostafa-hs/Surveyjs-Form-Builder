import React, { useState, useEffect } from "react";
import { SurveyCreator, SurveyCreatorComponent } from "survey-creator-react";
import "survey-core/survey-core.css";
import "survey-creator-core/survey-creator-core.css";
import { createForm, updateForm, getFormById } from "../api/forms";
import { useNavigate, useParams, Link } from "react-router-dom";

function FormBuilder() {
  const navigate = useNavigate();
  const { id } = useParams(); // اگر id باشد، یعنی ویرایش

  const [creator, setCreator] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [formTitle, setFormTitle] = useState("");
  const [showSaveSuccess, setShowSaveSuccess] = useState(false);

  useEffect(() => {
    const options = {
      showLogicTab: true,
      showJSONEditorTab: true,
      showTestSurveyTab: true,
      showEmbeddedSurveyTab: false,
      showTranslationTab: true,
      // گزینه‌های دیگر ...
    };
    const c = new SurveyCreator(options);
    setCreator(c);

    if (id) {
      // بارگذاری فرم برای ویرایش
      getFormById(id)
        .then((res) => {
          const formData = res.data;
          setFormTitle(formData.title || "");
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

    setIsSaving(true);
    const json = creator.JSON;
    const title = json.title || formTitle || "فرم بدون عنوان";
    const payload = {
      title,
      description: json.description || "",
      json,
    };

    try {
      if (id) {
        await updateForm(id, payload);
        setShowSaveSuccess(true);
        setTimeout(() => setShowSaveSuccess(false), 3000);
      } else {
        await createForm(payload);
        setShowSaveSuccess(true);
        setTimeout(() => {
          setShowSaveSuccess(false);
          navigate("/");
        }, 2000);
      }
    } catch (err) {
      console.error("Error saving form:", err);
      alert("خطا در ذخیره فرم");
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-indigo-600 mx-auto mb-6"></div>
          <h2 className="text-xl font-semibold text-gray-700 mb-2">
            در حال بارگذاری سازنده فرم
          </h2>
          <p className="text-gray-500">لطفاً صبر کنید...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-100">
      {/* Header */}
      <div className="bg-white shadow-lg border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div className="flex items-center mb-4 md:mb-0">
              <Link
                to="/"
                className="inline-flex items-center text-indigo-600 hover:text-indigo-700 ml-4 transition-colors"
              >
                <svg
                  className="w-5 h-5 ml-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 19l-7-7m0 0l7-7m-7 7h18"
                  />
                </svg>
                بازگشت
              </Link>
              <div>
                <h1 className="text-2xl font-bold text-gray-800 flex items-center">
                  <svg
                    className="w-7 h-7 ml-3 text-indigo-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                    />
                  </svg>
                  {id ? "ویرایش فرم" : "ساخت فرم جدید"}
                </h1>
                {formTitle && (
                  <p className="text-gray-600 mt-1">عنوان فرم: {formTitle}</p>
                )}
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={handleSave}
                disabled={isSaving || !creator}
                className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 disabled:from-gray-400 disabled:to-gray-500 text-white font-medium py-2 px-6 rounded-lg shadow-md transition-all duration-200 flex items-center justify-center min-w-[140px]"
              >
                {isSaving ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white ml-2"></div>
                    در حال ذخیره...
                  </>
                ) : (
                  <>
                    <svg
                      className="w-4 h-4 ml-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3-3m0 0l-3 3m3-3v12"
                      />
                    </svg>
                    {id ? "به‌روزرسانی فرم" : "ذخیره فرم"}
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Success Popup */}
      {showSaveSuccess && (
        <div className="fixed top-4 right-4 z-50 animate-fade-in">
          <div className="bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg flex items-center">
            <svg
              className="w-5 h-5 ml-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
            {id
              ? "فرم با موفقیت به‌روزرسانی شد!"
              : "فرم جدید با موفقیت ساخته شد!"}
          </div>
        </div>
      )}

      {/* Survey Creator Container */}
      <div className="container mx-auto px-4 py-6">
        <div
          className="bg-white rounded-xl shadow-lg overflow-hidden"
          style={{ height: "calc(100vh - 200px)" }}
        >
          {creator && (
            <div className="survey-creator-container h-full">
              <SurveyCreatorComponent
                style={{ height: "100%", width: "100%" }}
                creator={creator}
              />
            </div>
          )}
        </div>
      </div>

      {/* Helpful Tips */}
      <div className="container mx-auto px-4 pb-6">
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-start">
            <svg
              className="w-5 h-5 text-blue-500 ml-2 mt-0.5 flex-shrink-0"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <div className="text-sm text-blue-800">
              <p className="font-medium mb-1">راهنمای سریع:</p>
              <ul className="list-disc list-inside space-y-1 text-blue-700">
                <li>از تب "طراحی" برای افزودن و ویرایش سوالات استفاده کنید</li>
                <li>تب "منطق" برای تنظیم قوانین شرطی مفید است</li>
                <li>با کلیک روی "پیش‌نمایش" می‌توانید فرم را تست کنید</li>
                <li>فراموش نکنید فرم خود را ذخیره کنید</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Custom Styles */}
      <style jsx global>{`
        .survey-creator-container .svc-creator {
          font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif !important;
        }

        .survey-creator-container .svc-creator__toolbar {
          background: #f8fafc !important;
          border-bottom: 2px solid #e2e8f0 !important;
        }

        .survey-creator-container .svc-creator__tab-button {
          border-radius: 0.5rem !important;
          margin: 0 0.25rem !important;
          font-weight: 500 !important;
        }

        .survey-creator-container .svc-creator__tab-button--selected {
          background: linear-gradient(135deg, #6366f1, #8b5cf6) !important;
          color: white !important;
        }

        .survey-creator-container .svc-toolbox {
          background: #ffffff !important;
          border-left: 2px solid #e2e8f0 !important;
        }

        .survey-creator-container .svc-toolbox__category-header {
          background: #f1f5f9 !important;
          border-radius: 0.5rem !important;
          margin: 0.5rem !important;
          padding: 0.5rem !important;
          font-weight: 600 !important;
          color: #475569 !important;
        }

        .survey-creator-container .svc-toolbox__item {
          border-radius: 0.5rem !important;
          margin: 0.25rem 0.5rem !important;
          transition: all 0.2s !important;
        }

        .survey-creator-container .svc-toolbox__item:hover {
          background: #e0e7ff !important;
          transform: translateY(-1px) !important;
        }

        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in {
          animation: fade-in 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}

export default FormBuilder;
