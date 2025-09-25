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
  const [loading, setLoading] = useState(true);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    getFormBySlug(slug)
      .then((res) => {
        setForm(res.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error loading form:", error);
        setLoading(false);
      });
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-emerald-600 mx-auto mb-6"></div>
          <h2 className="text-xl font-semibold text-gray-700 mb-2">
            در حال بارگذاری فرم
          </h2>
          <p className="text-gray-500">لطفاً صبر کنید...</p>
        </div>
      </div>
    );
  }

  if (!form) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 to-pink-100 flex items-center justify-center">
        <div className="bg-white rounded-xl shadow-lg p-8 max-w-md mx-4 text-center">
          <div className="text-6xl mb-4">❌</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-3">
            فرم یافت نشد
          </h2>
          <p className="text-gray-600 mb-6">
            متأسفانه فرم مورد نظر شما یافت نشد یا ممکن است حذف شده باشد.
          </p>
          <button
            onClick={() => window.history.back()}
            className="bg-red-500 hover:bg-red-600 text-white font-medium py-2 px-6 rounded-lg transition-colors"
          >
            بازگشت
          </button>
        </div>
      </div>
    );
  }

  if (submitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 flex items-center justify-center">
        <div className="bg-white rounded-xl shadow-lg p-8 max-w-md mx-4 text-center">
          <div className="text-6xl mb-6">🎉</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-3">
            پاسخ شما با موفقیت ثبت شد!
          </h2>
          <p className="text-gray-600 mb-6">
            از شما برای تکمیل این فرم تشکر می‌کنیم. پاسخ شما ذخیره شده است.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button
              onClick={() => window.location.reload()}
              className="bg-green-500 hover:bg-green-600 text-white font-medium py-2 px-6 rounded-lg transition-colors"
            >
              تکمیل مجدد فرم
            </button>
            <button
              onClick={() => window.close()}
              className="bg-gray-500 hover:bg-gray-600 text-white font-medium py-2 px-6 rounded-lg transition-colors"
            >
              بستن صفحه
            </button>
          </div>
        </div>
      </div>
    );
  }

  const survey = new Model(form.json);

  // Custom CSS for SurveyJS
  survey.css = {
    ...survey.css,
    root: "sv_main sv_frame sv_default_css " + (survey.css.root || ""),
    container: "sv_container " + (survey.css.container || ""),
    header: "sv_header " + (survey.css.header || ""),
    body: "sv_body " + (survey.css.body || ""),
    footer: "sv_nav " + (survey.css.footer || ""),
  };

  survey.onComplete.add((sender) => {
    setSubmitting(true);
    createResponse({
      formId: form.id,
      answers: sender.data,
    })
      .then(() => {
        setSubmitted(true);
        setSubmitting(false);
      })
      .catch((error) => {
        console.error("Error submitting response:", error);
        alert("خطا در ذخیره پاسخ. لطفاً دوباره تلاش کنید.");
        setSubmitting(false);
      });
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-100">
      {/* Header */}
      <div className="bg-white shadow-md border-b">
        <div className="container mx-auto px-4 py-6">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-full mb-4">
              <svg
                className="w-6 h-6 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
            </div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">
              {form.title}
            </h1>
            {form.description && (
              <p className="text-gray-600 max-w-2xl mx-auto leading-relaxed">
                {form.description}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Survey Container */}
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            {/* Progress indicator could go here if needed */}

            {/* Survey Content */}
            <div className="p-6 md:p-8">
              <div className="survey-container">
                <Survey model={survey} />
              </div>
            </div>
          </div>

          {/* Help Text */}
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-500">
              تمامی فیلدهای ستاره‌دار (*) اجباری هستند
            </p>
          </div>
        </div>
      </div>

      {/* Loading Overlay */}
      {submitting && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600 mx-auto mb-4"></div>
            <p className="text-gray-700 font-medium">
              در حال ذخیره پاسخ شما...
            </p>
          </div>
        </div>
      )}

      {/* Custom Styles for SurveyJS */}
      <style jsx global>{`
        .survey-container .sv_main {
          background: transparent !important;
        }

        .survey-container .sv_container {
          max-width: none !important;
        }

        .survey-container .sv_body {
          padding: 0 !important;
        }

        .survey-container .sv_q_title {
          font-weight: 600 !important;
          color: #374151 !important;
          margin-bottom: 0.5rem !important;
        }

        .survey-container .sv_q_description {
          color: #6b7280 !important;
          font-size: 0.875rem !important;
          margin-bottom: 1rem !important;
        }

        .survey-container input[type="text"],
        .survey-container input[type="email"],
        .survey-container input[type="number"],
        .survey-container textarea {
          border: 2px solid #e5e7eb !important;
          border-radius: 0.5rem !important;
          padding: 0.75rem !important;
          transition: border-color 0.2s !important;
        }

        .survey-container input[type="text"]:focus,
        .survey-container input[type="email"]:focus,
        .survey-container input[type="number"]:focus,
        .survey-container textarea:focus {
          border-color: #10b981 !important;
          outline: none !important;
          box-shadow: 0 0 0 3px rgba(16, 185, 129, 0.1) !important;
        }

        .survey-container .sv_q_checkbox,
        .survey-container .sv_q_radiogroup {
          margin-bottom: 1rem !important;
        }

        .survey-container .sv_q_checkbox_item,
        .survey-container .sv_q_radiogroup_item {
          margin-bottom: 0.5rem !important;
        }

        .survey-container .sv_complete_btn {
          background: linear-gradient(135deg, #10b981, #059669) !important;
          border: none !important;
          color: white !important;
          padding: 0.75rem 2rem !important;
          border-radius: 0.5rem !important;
          font-weight: 600 !important;
          font-size: 1rem !important;
          cursor: pointer !important;
          transition: all 0.2s !important;
        }

        .survey-container .sv_complete_btn:hover {
          transform: translateY(-1px) !important;
          box-shadow: 0 4px 12px rgba(16, 185, 129, 0.3) !important;
        }

        .survey-container .sv_prev_btn,
        .survey-container .sv_next_btn {
          background: #6b7280 !important;
          border: none !important;
          color: white !important;
          padding: 0.5rem 1.5rem !important;
          border-radius: 0.5rem !important;
          font-weight: 500 !important;
          cursor: pointer !important;
          transition: background-color 0.2s !important;
        }

        .survey-container .sv_next_btn {
          background: #10b981 !important;
        }

        .survey-container .sv_prev_btn:hover,
        .survey-container .sv_next_btn:hover {
          background: #059669 !important;
        }

        .survey-container .sv_progress {
          background: #e5e7eb !important;
          height: 0.5rem !important;
          border-radius: 0.25rem !important;
          margin-bottom: 2rem !important;
        }

        .survey-container .sv_progress_bar {
          background: linear-gradient(135deg, #10b981, #059669) !important;
          border-radius: 0.25rem !important;
        }
      `}</style>
    </div>
  );
}

export default FormViewer;
