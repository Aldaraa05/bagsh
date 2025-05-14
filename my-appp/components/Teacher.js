import Link from "next/link";
import Image from "next/image";
import '../styles/global.css'

export default function Teacher({ teacher }) {
    return (
      <div className="teacher-card-small">
        <div className="card-image">
          <Image 
            src={teacher.image || "/zurag/pro.png"} 
            alt="Teacher" 
            width={150} 
            height={150}
          />
          <div className="rating-badge">{teacher.rating}</div>
        </div>
        <div className="card-content">
          <h3>{teacher.name}</h3>
          <p className="subject">{teacher.subject} багш</p>
          <p className="experience">{teacher.experience}</p>
          <div className="card-footer">
            <span className="price">{teacher.price}</span>
            <button 
                className="view-btn"
                onClick={() => {
                  localStorage.setItem('currentTeacher', JSON.stringify(teacher));
                  window.location.href = `/profile/${teacher.id}`;
                }}
              >
                Дэлгэрэнгүй
            </button>
        </div>
        </div>
      </div>
    );
}