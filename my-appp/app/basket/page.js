"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import "../../styles/global.css";
import "../../styles/basket.css";

export default function Basket() {
  const router = useRouter();
  const [basketItems, setBasketItems] = useState([]);
  const [loading, setLoading] = useState(true);
  console.log(localStorage)
  useEffect(() => {
    const items = typeof window !== 'undefined' 
      ? JSON.parse(localStorage.getItem('basket')) || []
      : [];
    setBasketItems(items);
    setLoading(false);
  }, []);

  const removeItem = (teacherId) => {
    if (confirm("Энэ багшийг сагснаас устгах уу?")) {
      const updatedBasket = basketItems.filter(item => item.id !== teacherId);
      setBasketItems(updatedBasket);
      localStorage.setItem('basket', JSON.stringify(updatedBasket));
      alert("Багшийг сагснаас устгалаа");
    }
  };

  // const updateHours = (teacherId, change) => {
  //   const updatedBasket = basketItems.map(item => {
  //     if (item.id === teacherId) {
  //       const newHours = Math.max(1, (item.hours || 1) + change);
  //       return {
  //         ...item,
  //         hours: newHours
  //       };
  //     }
  //     return item;
  //   });
  //   setBasketItems(updatedBasket);
  //   localStorage.setItem('basket', JSON.stringify(updatedBasket));
  // };

  if (loading) {
    return <div className="loading">Түр хүлээнэ үү...</div>;
  }

  return (
    <div className="basket-page">
      <div className="basket-container">
        <h1><i className="fas fa-shopping-cart"></i> Миний захиалга</h1>

        {basketItems.length === 0 ? (
          <div className="empty-basket">
            <p>Таны захиалга хоосон байна</p>
            <Link href="/Teachers">
              <button className="browse-teachers-btn">Багш хайх</button>
            </Link>
          </div>
        ) : (
          <>
            <div className="basket-items">
              {basketItems.map((teacher) => (
                <div className="basket-item" key={teacher.id}>
                  <div className="item-teacher">
                    <Image
                      src={teacher.image || "/pro.png"}
                      alt={teacher.name}
                      width={80}
                      height={80}
                      className="teacher-thumbnail"
                    />
                    <div className="teacher-details">
                      <h3>{teacher.name}</h3>
                      <p className="subject">{teacher.subject} багш</p>
                      <div className="rating">
                        <span className="stars">
                          {'★'.repeat(Math.round(teacher.rating || 4))}
                          {'☆'.repeat(5 - Math.round(teacher.rating || 4))}
                        </span>
                        <span>{teacher.rating?.toFixed(1) || '4.0'}</span>
                      </div>
                      <p className="experience">{teacher.experience}</p>
                    </div>
                  </div>
                  
                  <div className="item-schedule">
                    <h4>Хуваарь:</h4>
                    <div className="schedule-options">
                      <select
                        value={teacher.selectedDay}
                        onChange={(e) => {
                          const updated = basketItems.map(item => 
                            item.id === teacher.id 
                              ? {...item, selectedDay: e.target.value} 
                              : item
                          );
                          setBasketItems(updated);
                          localStorage.setItem('basket', JSON.stringify(updated));
                        }}
                      >
                        {['Даваа', 'Мягмар', 'Лхагва', 'Пүрэв', 'Баасан'].map(day => (
                          <option key={day} value={day}>{day}</option>
                        ))}
                      </select>
                      <select
                        value={teacher.selectedTime}
                        onChange={(e) => {
                          const updated = basketItems.map(item => 
                            item.id === teacher.id 
                              ? {...item, selectedTime: e.target.value} 
                              : item
                          );
                          setBasketItems(updated);
                          localStorage.setItem('basket', JSON.stringify(updated));
                        }}
                      >
                        {['09:00 - 12:00', '14:00 - 18:00'].map(time => (
                          <option key={time} value={time}>{time}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                  
                  <div className="item-hours">
                    {/* <h4>Цаг:</h4>
                    <div className="hours-controls">
                      <button onClick={() => updateHours(teacher.id, -1)}>-</button>
                      <span>{teacher.hours || 1} цаг</span>
                      <button onClick={() => updateHours(teacher.id, 1)}>+</button>
                    </div> */}
                    <div className="hourly-price">
                      <span>Нэг цагийн үнэ:</span>
                      <span>{teacher.price || '₮25,000'}</span>
                    </div>
                  </div>
                  
                  <div className="item-actions">
                    <button 
                      onClick={() => removeItem(teacher.id)}
                      className="remove-btn"
                    >
                      <i className="fas fa-trash"></i> Устгах
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="basket-summary">
              <div className="summary-details">
                <h3>Захиалгын дэлгэрэнгүй</h3>
                {basketItems.map(teacher => (
                  <div key={teacher.id} className="teacher-summary">
                    <div className="summary-row">
                      <span>Багш:</span>
                      <span>{teacher.name}</span>
                    </div>
                    <div className="summary-row">
                      <span>Хичээл:</span>
                      <span>{teacher.subject}</span>
                    </div>
                    <div className="summary-row">
                      <span>Хуваарь:</span>
                      <span>{teacher.selectedDay}, {teacher.selectedTime}</span>
                    </div>
                    <div className="summary-row">
                      <span>Цагийн тоо:</span>
                      <span>{teacher.hours || 1} цаг</span>
                    </div>
                    <div className="summary-row">
                      <span>Нэг цагийн үнэ:</span>
                      <span>{teacher.price || '₮25,000'}</span>
                    </div>
                    <div className="summary-row">
                      <span>Нийт дүн:</span>
                      <span>₮{(parseInt(teacher.price?.replace(/[^\d]/g, '') || 25000) * (teacher.hours || 1))}</span>
                    </div>
                  </div>
                ))}
                <div className="summary-row total">
                  <span>Нийт төлөх дүн:</span>
                  <span>
                    ₮{basketItems.reduce((sum, item) => {
                      const price = parseInt(item.price?.replace(/[^\d]/g, '')) || 25000;
                      return sum + (price * (item.hours || 1));
                    }, 0).toLocaleString()}
                  </span>
                </div>
              </div>
              
              <button 
                className="checkout-btn"
                onClick={() => {
                  if (!JSON.parse(localStorage.getItem('signUpData'))) {
                    alert('Захиалахын тулд эхлээд нэвтэрнэ үү');
                    router.push('/SignIn');
                    return;
                  }
                  router.push('/Checkout');
                }}
              >
                Захиалах
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}