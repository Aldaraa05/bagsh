"use client";

import { useRouter } from "next/navigation"; // navigation hook
import { useEffect, useState } from "react";
import "../../styles/infos.css";

export default function Infos() {
  const router = useRouter(); // navigation ашиглах
  const [showAddForm, setShowAddForm] = useState(false);
  const [infos, setInfos] = useState([]);
  const [newInfo, setNewInfo] = useState({
    infoid: "",
    title: "",
    desc: "",
    image: "",
  });

  const [isAdminUser, setIsAdminUser] = useState(false);

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("userData"));
    setIsAdminUser(userData?.gmail === "a@gmail.com");

    fetchInfos();
  }, []);

  const fetchInfos = async () => {
    try {
      const response = await fetch("/api/infos2");
      const data = await response.json();
      setInfos(data);
    } catch (error) {
      console.error("Error fetching infos:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("/api/infos2", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newInfo),
      });

      if (!response.ok) {
        throw new Error("Failed to add info");
      }
      setNewInfo({
        title: "",
        desc: "",
        image: "",
      });
      setShowAddForm(false);
      fetchInfos();
    } catch (error) {
      console.error("Error adding info:", error);
      alert("Failed to add info");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Та энэ мэдээллийг устгахдаа итгэлтэй байна уу?")) {
      return;
    }

    try {
      const response = await fetch(`/api/infos2?id=${id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Failed to delete");
      }
      fetchInfos();
    } catch (error) {
      console.error("Error deleting info:", error);
      alert("Устгах явцад алдаа гарлаа");
    }
  };

  const handleInfoClick = (id) => {
    router.push(`/Infos/${id}`);
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
                Илгээх
              </button>
            </form>
          )}
        </div>
      )}

      {infos.map((info, index) => (
        <div
          key={info._id}
          className={index % 2 === 1 ? "infoContainer1" : "infoContainer"}
          onClick={() => handleInfoClick(info._id)}
          style={{ cursor: "pointer" }}
        >
          <div className="infoRow">
            <div className="infoColumn">
              <p className="blueText">{info.title}</p>
              <h1>{info.desc}</h1>
            </div>
            {info.image && (
              <img src={info.image} alt={info.title} className="image" />
            )}
          </div>
          {isAdminUser && (
            <button
              className="delete-btn"
              onClick={(e) => {
                e.stopPropagation();
                handleDelete(info._id);
              }}
            >
              Устгах
            </button>
          )}
        </div>
      ))}
    </div>
  );
}
