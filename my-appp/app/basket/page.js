"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import "../../styles/global.css";
import "../../styles/basket.css";

export default function Basket() {
  const router = useRouter();
  const [currentUser, setCurrentUser] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [selectedDay, setSelectedDay] = useState("Даваа");
  const [selectedTime, setSelectedTime] = useState("09:00 - 12:00");

  useEffect(() => {
    const user = typeof window !== "undefined" ? JSON.parse(window.sessionStorage.getItem("currentUser")) : null;
    setCurrentUser(user);
  }, []);

  const handleLogout = () => {
    if (confirm("Системээс гарах уу?")) {
      sessionStorage.removeItem("currentUser");
      setCurrentUser(null);
      router.push("/");
    }
  };

  const handleCheckout = () => {
    if (!currentUser) {
      alert("Захиалахын тулд эхлээд нэвтэрнэ үү");
      router.push("/SignIn");
      return;
    }
    alert("Захиалга амжилттай хийгдлээ! Төлбөр төлөх хуудас руу шилжиж байна...");
  };

  const removeItem = () => {
    if (confirm("Энэ багшийг сагснаас устгах уу?")) {
      alert("Багшийг сагснаас устгалаа");
    }
  };

  const updateQuantity = (change) => {
    const newQuantity = quantity + change;
    if (newQuantity >= 1) {
      setQuantity(newQuantity);
    }
  };

  const totalPrice = quantity * 25000;

  return (
    
    <div className="basket-page">

      <div className="basket-container">
        <h1>
          <i className="fas fa-shopping-cart"></i> Миний сагс
        </h1>

        <div className="basket-items">
          <div className="basket-item">
            <div className="item-teacher">
              <Image
                src="/pro.png"
                alt="Teacher"
                className="teacher-thumbnail"
                width={80}
                height={80}
              />
              <div className="teacher-details">
                <h3>А.Балданпүрэв</h3>
                <p className="subject">Математикийн багш</p>
                <div className="rating">
                  <span className="stars">★★★★★</span>
                  <span>4.9</span>
                </div>
              </div>
            </div>
            <div className="item-schedule">
              <h4>Хуваарь:</h4>
              <div className="schedule-options">
                <select
                  className="day-select"
                  value={selectedDay}
                  onChange={(e) => setSelectedDay(e.target.value)}
                >
                  <option>Даваа</option>
                  <option>Мягмар</option>
                  <option>Лхагва</option>
                  <option>Пүрэв</option>
                  <option>Баасан</option>
                </select>
                <select
                  className="time-select"
                  value={selectedTime}
                  onChange={(e) => setSelectedTime(e.target.value)}
                >
                  <option>09:00 - 12:00</option>
                  <option>14:00 - 18:00</option>
                </select>
              </div>
            </div>
            <div className="item-price">
              <span className="price">₮25,000/цаг</span>
              <div className="quantity-controls">
                <button
                  className="quantity-btn minus"
                  onClick={() => updateQuantity(-1)}
                >
                  -
                </button>
                <span className="quantity">{quantity}</span>
                <button
                  className="quantity-btn plus"
                  onClick={() => updateQuantity(1)}
                >
                  +
                </button>
              </div>
            </div>
            <div className="item-actions">
              <button className="remove-btn" onClick={removeItem}>
                <i className="fas fa-trash"></i>
              </button>
            </div>
          </div>
        </div>

        <div className="basket-summary">
          <div className="summary-details">
            <h3>Захиалгын дэлгэрэнгүй</h3>
            <div className="summary-row">
              <span>Багш:</span>
              <span>А.Балданпүрэв</span>
            </div>
            <div className="summary-row">
              <span>Хуваарь:</span>
              <span>
                {selectedDay}, {selectedTime}
              </span>
            </div>
            <div className="summary-row">
              <span>Тоо ширхэг:</span>
              <span>{quantity} цаг</span>
            </div>
            <div className="summary-row total">
              <span>Нийт дүн:</span>
              <span>₮{totalPrice.toLocaleString()}</span>
            </div>
          </div>
          <button className="checkout-btn" onClick={handleCheckout}>
            Захиалах
          </button>
        </div>
      </div>
    </div>
  );
}