"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import "../../../styles/infoDetails.css"
export default function InfoDetailPage() {
  const { id } = useParams();
  const [info, setInfo] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchInfo = async () => {
      try {
        const response = await fetch(`/api/infos2/${id}`);
        const data = await response.json();
        setInfo(data);
      } catch (error) {
        console.error("Error fetching info:", error);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchInfo();
    }
  }, [id]);

  if (loading) {
    return <div className="loading-state">Уншиж байна...</div>;
  }

  if (!info) {
    return <div className="not-found-state">Мэдээлэл олдсонгүй</div>;
  }

  return (
    <div className="info-detail-container">
      <h1 className="info-detail-title">{info.title}</h1>
      <p className="info-detail-desc">{info.desc}</p>
      {info.image && (
        <img
          src={info.image}
          alt={info.title}
          className="info-detail-image"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = '/zurag/pro.png';
          }}
        />
      )}
      <div className="info-detail-content">{info.info}</div>
    </div>
  );
}