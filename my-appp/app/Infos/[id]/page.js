"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

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
    return <div>Уншиж байна...</div>;
  }

  if (!info) {
    return <div>Мэдээлэл олдсонгүй</div>;
  }

  return (
    <div style={{ padding: "2rem" }}>
      <h1 style={{ fontSize: "2rem", color: "#1e40af" }}>{info.title}</h1>
      <p style={{ marginTop: "1rem", fontSize: "1.2rem" }}>{info.desc}</p>
      {info.image && (
        <img
          src={info.image}
          alt={info.title}
          style={{
            width: "100%",
            maxWidth: "600px",
            marginTop: "2rem",
            borderRadius: "8px",
          }}
        />
      )}
    </div>
  );
}
