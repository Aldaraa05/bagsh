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
    gmail: "",
    password: "",
    phone: "",
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
          {/* Нэр */}
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

          {/* Хичээл */}
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

          {/* Туршлага */}
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

          {/* Үнэ */}
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

          {/* Байршил */}
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

          {/* Gmail */}
          <div className="form-group">
            <label htmlFor="gmail">Gmail</label>
            <div className="input-with-icon">
              <input
                type="email"
                id="gmail"
                name="gmail"
                placeholder="you@example.com"
                required
                onChange={handleChange}
              />
              <i className="fas fa-envelope"></i>
            </div>
          </div>

          {/* Нууц үг */}
          <div className="form-group">
            <label htmlFor="password">Нууц үг</label>
            <div className="input-with-icon">
              <input
                type="password"
                id="password"
                name="password"
                placeholder="Нууц үгээ оруулна уу"
                required
                onChange={handleChange}
              />
              <i className="fas fa-lock"></i>
            </div>
          </div>

          {/* Утасны дугаар */}
          <div className="form-group">
            <label htmlFor="phone">Утас</label>
            <div className="input-with-icon">
              <input
                type="tel"
                id="phone"
                name="phone"
                placeholder="88110000"
                required
                onChange={handleChange}
              />
              <i className="fas fa-phone"></i>
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
