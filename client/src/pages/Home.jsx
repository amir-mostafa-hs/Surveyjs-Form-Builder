import { useEffect, useState } from "react";
import { getForms } from "../api/forms";
import { Link } from "react-router-dom";

function Home() {
  const [forms, setForms] = useState([]);

  useEffect(() => {
    getForms().then((res) => {
      setForms(res.data);
    });
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h1>لیست فرم‌ها</h1>
      <Link to="/builder">
        <button>ساخت فرم جدید</button>
      </Link>
      <ul>
        {forms.map((form) => (
          <li key={form._id}>
            {form.title} —{" "}
            <Link to={`/form/${form.slug}`} target="_blank">
              لینک عمومی
            </Link>{" "}
            — <Link to={`/responses/${form._id}`}>مشاهده پاسخ‌ها</Link> —{" "}
            <Link to={`/builder/${form._id}`}>ویرایش فرم</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Home;
