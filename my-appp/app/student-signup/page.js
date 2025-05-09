"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import '../../styles/signup.css';
import '../../styles/global.css'
import { useRouter } from "next/navigation";

export default function Signup() {
  const [formData, setFormData] = useState({
    name: '',
    surname: '',
    gmail: '',
    number: '',
    password: '',
    confirmPassword: '',
    role: 'student',
  });
  const router = useRouter();

    useEffect(() => {
      if (typeof window !== 'undefined') {
        const savedData = localStorage.getItem('signUpData');
        if (savedData) {
          setFormData(JSON.parse(savedData));
        }
      }
    }, []);
  
    useEffect(() => {
      if (typeof window !== 'undefined') {
        localStorage.setItem('signUpData', JSON.stringify(formData));
      }
    }, [formData]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("Нууц үг таарахгүй байна");
      return;
    }

    try {
      const res = await fetch('/api/signup', {  
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          surname: formData.surname,
          gmail: formData.gmail,
          number: formData.number,
          password: formData.password,
          role: formData.role
        }),
        credentials: 'include' 
      });

      const result = await res.json();
      if (res.status === 201) {
        alert("Амжилттай бүртгэгдлээ!");
        router.push('/'); 
      } else {
        alert(result.error || "Бүртгэл амжилтгүй. Алдаа гарлаа.");
      }
    } catch (err) {
      console.error(err);
      alert("Сервертэй холбогдоход алдаа гарлаа.");
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
          {/* Овог */}
          <div className="form-group">
            <label htmlFor="surname">Овог</label>
            <div className="input-with-icon">
              <input
                type="text"
                id="surname"
                name="surname"
                placeholder="Овог оруулна уу"
                value={formData.surname}
                onChange={handleChange}
                required
              />
              <i className="fas fa-user"></i>
            </div>
          </div>

          {/* Нэр */}
          <div className="form-group">
            <label htmlFor="name">Нэр</label>
            <div className="input-with-icon">
              <input
                type="text"
                id="name"
                name="name"
                placeholder="Нэрээ оруулна уу"
                value={formData.name}
                onChange={handleChange}
                required
              />
              <i className="fas fa-user"></i>
            </div>
          </div>

          {/* И-мэйл */}
          <div className="form-group">
            <label htmlFor="gmail">И-мэйл</label>
            <div className="input-with-icon">
              <input
                type="email"
                id="gmail"
                name="gmail"
                placeholder="И-мэйл хаягаа оруулна уу"
                value={formData.gmail}
                onChange={handleChange}
                required
              />
              <i className="fas fa-envelope"></i>
            </div>
          </div>

          {/* Утас */}
          <div className="form-group">
            <label htmlFor="number">Утасны дугаар</label>
            <div className="input-with-icon">
              <input
                type="tel"
                id="number"
                name="number"
                placeholder="Утасны дугаараа оруулна уу"
                value={formData.number}
                onChange={handleChange}
                required
              />
              <i className="fas fa-phone"></i>
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
                value={formData.password}
                onChange={handleChange}
                required
              />
              <i className="fas fa-lock"></i>
            </div>
          </div>

          {/* Баталгаажуулах */}
          <div className="form-group">
            <label htmlFor="confirmPassword">Нууц үг баталгаажуулах</label>
            <div className="input-with-icon">
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                placeholder="Нууц үгээ дахин оруулна уу"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />
              <i className="fas fa-lock"></i>
            </div>
          </div>

          <div className="form-group">
            <div className="checkbox-container">
              <input type="checkbox" id="terms" name="terms" required />
              <label htmlFor="terms">Үйлчилгээний нөхцөл зөвшөөрөх</label>
            </div>
          </div>

          <button type="submit" className="btn">Бүртгүүлэх</button>
        </form>

        <div className="login-link">
          Бүртгэлтэй юу? <Link href="../Signin">Нэвтрэх</Link>
        </div>
      </div>
    </div>
  );
}
