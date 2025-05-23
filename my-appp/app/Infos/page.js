"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import "../../styles/infos.css";

export default function Infos() {
  const router = useRouter(); 
  const [showAddForm, setShowAddForm] = useState(false);
  const [infos, setInfos] = useState([]);
  const [imagePreview, setImagePreview] = useState("");
  const [newInfo, setNewInfo] = useState({
    title: "",
    desc: "",
    info: "",
    image: "",
  });
  const [editingInfo, setEditingInfo] = useState(null);
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
    if (name === "image") {
      setImagePreview(value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = editingInfo ? "/api/infos2" : "/api/infos2";
      const method = editingInfo ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(
          editingInfo ? { id: editingInfo._id, ...newInfo } : newInfo
        ),
      });

      if (!response.ok) {
        throw new Error(
          editingInfo ? "Failed to update info" : "Failed to add info"
        );
      }

      setNewInfo({ title: "", desc: "", image: "", info: "" });
      setShowAddForm(false);
      setEditingInfo(null);
      fetchInfos();
    } catch (error) {
      console.error("Error:", error);
      alert(error.message);
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

  const startEditing = (info) => {
    setEditingInfo(info);
    setNewInfo({
      title: info.title,
      desc: info.desc,
      image: info.image,
      info: info.info,
    });
    setImagePreview(info.image);
    setShowAddForm(true);
  };

  const cancelEditing = () => {
    setEditingInfo(null);
    setNewInfo({ title: "", desc: "", image: "", info: "" });
    setImagePreview("");
    setShowAddForm(false);
  };
  const handleInfoClick = (id) => {
    router.push(`/Infos/${id}`);
  };
  return (
    <div className="container">
      {isAdminUser && (
        <div className="admin-controls">
          <button
            onClick={() => {
              setEditingInfo(null);
              setNewInfo({ title: "", desc: "", image: "", info: "" });
              setShowAddForm(!showAddForm);
            }}
            className="add-info-btn"
          >
            {showAddForm ? "Cancel" : "Мэдээлэл нэмэх"}
          </button>

          {showAddForm && (
            <form onSubmit={handleSubmit} className="add-info-form">
              <h3>{editingInfo ? "Мэдээлэл засах" : "Шинэ мэдээ нэмэх"}</h3>
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
                {imagePreview && (
                  <div className="image-preview" style={{ marginTop: '10px' }}>
                    <img 
                      src={imagePreview} 
                      alt="Preview" 
                      style={{ 
                        maxWidth: '100%', 
                        maxHeight: '200px',
                        border: '1px solid #ddd',
                        borderRadius: '4px'
                      }}
                      onError={(e) => {
                        e.target.onerror = null; 
                        e.target.src = '/zurag/1.png';
                      }}
                    />
                  </div>
                )}
              </div>
              <div className="form-group">
                <label>Мэдээлэл:</label>
                <input
                  type="text"
                  name="info"
                  value={newInfo.info}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-actions">
                <button type="submit" className="submit-btn">
                  {editingInfo ? "Хадгалах" : "Илгээх"}
                </button>
                {editingInfo && (
                  <button
                    type="button"
                    onClick={cancelEditing}
                    className="cancel-btn"
                  >
                    Цуцлах
                  </button>
                )}
              </div>
            </form>
          )}
        </div>
      )}

      {infos.map((info, index) => (
        <div
          className={index % 2 === 1 ? "infoContainer1" : "infoContainer"}
          key={info._id}
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
            <div className="action-buttons">
              <button className="edit-btn" onClick={(e) => {
                e.stopPropagation();
                startEditing(info)}}>
                Засах
              </button>
              <button
                className="delete-btn"
                onClick={(e) => {
                  e.stopPropagation();
                  handleDelete(info._id)}}
              >
                Устгах
              </button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
