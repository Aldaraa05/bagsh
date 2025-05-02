"use client";
import Link from "next/link";
import { useState } from "react";
import "../../styles/global.css";
import "../../styles/signup.css";

export default function Signup() {
  const [formData, setFormData] = useState({
    name: "",
    subject: "",
    experience: "",
    price: "",
    location: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch("/api/teachers", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    const result = await res.json();
    if (res.ok) {
      alert("Багш амжилттай бүртгэгдлээ!");
      console.log("Success:", result);
      // хүсвэл Info page рүү хөтлөөрэй
      // router.push("/Info");
    } else {
      alert("Алдаа: " + result.error || result.message);
      console.error("Error:", result);
    }
  };

  return (
    <div>
      <Link className="back" href="/">
        <img src="/backicon.png" alt="Back" />
      </Link>

      <div className="container">
        <div className="header">
          <h2>Багш бүртгүүлэх</h2>
          <p>Та мэдээллээ үнэн зөв оруулна уу</p>
        </div>

        <form id="signup-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Нэр</label>
            <div className="input-with-icon">
              <input
                type="text"
                id="name"
                name="name"
                placeholder="Нэрээ оруулна уу"
                required
                onChange={handleChange}
              />
              <i className="fas fa-user"></i>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="subject">Хичээл</label>
            <div className="input-with-icon">
              <input
                type="text"
                id="subject"
                name="subject"
                placeholder="Заах хичээл"
                required
                onChange={handleChange}
              />
              <i className="fas fa-book"></i>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="experience">Туршлага</label>
            <div className="input-with-icon">
              <input
                type="text"
                id="experience"
                name="experience"
                placeholder="Жишээ: 5 жилийн туршлага"
                required
                onChange={handleChange}
              />
              <i className="fas fa-briefcase"></i>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="price">Үнэ</label>
            <div className="input-with-icon">
              <input
                type="text"
                id="price"
                name="price"
                placeholder="₮30,000/цаг"
                required
                onChange={handleChange}
              />
              <i className="fas fa-money-bill"></i>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="location">Байршил</label>
            <div className="input-with-icon">
              <input
                type="text"
                id="location"
                name="location"
                placeholder="Улаанбаатар"
                required
                onChange={handleChange}
              />
              <i className="fas fa-map-marker-alt"></i>
            </div>
          </div>

          <button type="submit" className="btn">
            Бүртгүүлэх
          </button>
        </form>

        <div className="login-link">
          Бүртгэлтэй юу? <Link href="../Signin">Нэвтрэх</Link>
        </div>
      </div>
    </div>
  );
}
