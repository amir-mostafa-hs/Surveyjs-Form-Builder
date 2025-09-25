import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getResponses } from "../api/responses";

function Responses() {
  const { formId } = useParams();
  const [responses, setResponses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getResponses(formId).then((res) => {
      setResponses(res.data);
      setLoading(false);
    });
  }, [formId]);

  const formatAnswerValue = (value) => {
    if (Array.isArray(value)) {
      return value.join(", ");
    }
    if (typeof value === "object" && value !== null) {
      return JSON.stringify(value, null, 2);
    }
    return String(value);
  };

  const exportToCSV = () => {
    if (responses.length === 0) return;

    // Get all unique question keys
    const allKeys = new Set();
    responses.forEach((resp) => {
      Object.keys(resp.answers).forEach((key) => allKeys.add(key));
    });

    const csvHeaders = Array.from(allKeys).join(",");
    const csvRows = responses.map((resp) =>
      Array.from(allKeys)
        .map((key) => `"${formatAnswerValue(resp.answers[key] || "")}"`)
        .join(",")
    );

    const csvContent = [csvHeaders, ...csvRows].join("\n");
    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `responses-${formId}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p className="text-gray-600">در حال بارگذاری پاسخ‌ها...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-100">
      <div className="container mx-auto px-4 py-8">
        {/* Header Section */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div className="mb-4 md:mb-0">
              <Link
                to="/"
                className="inline-flex items-center text-purple-600 hover:text-purple-700 mb-2 transition-colors"
              >
                <svg
                  className="w-4 h-4 ml-1"
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
                بازگشت به صفحه اصلی
              </Link>
              <h1 className="text-3xl font-bold text-gray-800 flex items-center">
                <svg
                  className="w-8 h-8 ml-3 text-purple-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                  />
                </svg>
                پاسخ‌های فرم
              </h1>
              <p className="text-gray-600 mt-1">
                تعداد کل پاسخ‌ها:{" "}
                <span className="font-semibold text-purple-600">
                  {responses.length}
                </span>
              </p>
            </div>

            {responses.length > 0 && (
              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={exportToCSV}
                  className="bg-green-500 hover:bg-green-600 text-white font-medium py-2 px-4 rounded-lg shadow-md transition-colors flex items-center"
                >
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
                      d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                  دانلود CSV
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Content Section */}
        {responses.length === 0 ? (
          <div className="bg-white rounded-xl shadow-lg p-12 text-center">
            <div className="text-6xl mb-6">📊</div>
            <h2 className="text-2xl font-semibold text-gray-700 mb-3">
              هنوز پاسخی دریافت نشده
            </h2>
            <p className="text-gray-500 mb-6">
              پس از دریافت اولین پاسخ، آن‌ها در اینجا نمایش داده خواهند شد
            </p>
            <div className="flex justify-center">
              <Link
                to="/"
                className="bg-purple-500 hover:bg-purple-600 text-white font-medium py-2 px-6 rounded-lg transition-colors"
              >
                بازگشت به لیست فرم‌ها
              </Link>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            {responses.map((resp, idx) => (
              <div
                key={idx}
                className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
              >
                {/* Response Header */}
                <div className="bg-gradient-to-r from-purple-500 to-pink-500 px-6 py-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-white font-semibold text-lg flex items-center">
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
                          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                        />
                      </svg>
                      پاسخ شماره {idx + 1}
                    </h3>
                    <div className="text-purple-100 text-sm">
                      {new Date(
                        resp.createdAt || Date.now()
                      ).toLocaleDateString("fa-IR")}
                    </div>
                  </div>
                </div>

                {/* Response Content */}
                <div className="p-6">
                  <div className="grid gap-4">
                    {Object.entries(resp.answers).map(
                      ([question, answer], answerIdx) => (
                        <div
                          key={answerIdx}
                          className="border-r-4 border-purple-200 pr-4"
                        >
                          <div className="flex flex-col sm:flex-row sm:items-start">
                            <div className="sm:w-1/3 mb-2 sm:mb-0">
                              <label className="text-sm font-medium text-gray-600 block">
                                {question}
                              </label>
                            </div>
                            <div className="sm:w-2/3">
                              <div className="bg-gray-50 rounded-lg p-3">
                                {typeof answer === "object" &&
                                answer !== null ? (
                                  <pre className="text-sm text-gray-800 whitespace-pre-wrap font-mono">
                                    {JSON.stringify(answer, null, 2)}
                                  </pre>
                                ) : (
                                  <p className="text-gray-800">
                                    {formatAnswerValue(answer) ||
                                      "پاسخ داده نشده"}
                                  </p>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      )
                    )}
                  </div>
                </div>

                {/* Response Footer */}
                <div className="bg-gray-50 px-6 py-3 border-t">
                  <div className="flex items-center text-sm text-gray-500">
                    <svg
                      className="w-4 h-4 ml-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    زمان ثبت:{" "}
                    {new Date(resp.createdAt || Date.now()).toLocaleString(
                      "fa-IR"
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Responses;
