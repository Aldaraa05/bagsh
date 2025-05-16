'use client'

import "../../styles/infos.css";
import { useState } from "react";

export default function Infos() {
  const [showAddForm, setShowAddForm] = useState(false);
  const [newInfo, setNewInfo] = useState({
    infoid: "",
    title: "",
    desc: "",
    image: ""
  });

  // Check localStorage for user data
  const userData = JSON.parse(localStorage.getItem("userData"));
  const isAdminUser = userData && userData.gmail === "a@gmail.com";

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewInfo(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically send the data to your backend
    console.log("New info to add:", newInfo);
    // Reset form
    setNewInfo({
      infoid: "",
      title: "",
      desc: "",
      image: ""
    });
    setShowAddForm(false);
    // You might want to refresh the infos list here
  };

  return (
    <div className="container">
      {isAdminUser && (
        <div className="admin-controls">
          <button 
            onClick={() => setShowAddForm(!showAddForm)}
            className="add-info-btn"
          >
            {showAddForm ? "Cancel" : "Мэдээлэл нэмэх"}
          </button>
          
          {showAddForm && (
            <form onSubmit={handleSubmit} className="add-info-form">
              <h3>Шинэ мэдээ нэмэх</h3>
              <div className="form-group">
                <label>Мэдээллийн ID:</label>
                <input
                  type="text"
                  name="infoid"
                  value={newInfo.infoid}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Гарчиг:</label>
                <input
                  type="text"
                  name="title"
                  value={newInfo.title}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Тайлбар:</label>
                <textarea
                  name="desc"
                  value={newInfo.desc}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Зурагны URL:</label>
                <input
                  type="text"
                  name="image"
                  value={newInfo.image}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <button type="submit" className="submit-btn">
                Submit
              </button>
            </form>
          )}
        </div>
      )}
      
      <div className="infoContainer">
        <div className="infoRow">
          <div className="infoColumn">
            <p className="blueText">Тогтвортой хөгжил</p>
            <h1>
              Юнител группийн "Тогтвортой байдлын тайлан 2024"-өөс онцлох ажлууд
            </h1>
          </div>
          <img src="https://unread.today/files/969a1aed-77a4-45e9-b7b7-3ee2709aaf31/c88200a93f3a73f06149e88537ddaa00_square.jpg" />
        </div>
      </div>
    </div>
  );
}