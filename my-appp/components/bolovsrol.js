import Link from "next/link";
import '../styles/global.css';
import '../styles/profile.css'; 

export default function Bolovsrol() {
    const educationData = [
        {
            institution: "Монгол Улсын Их Сургууль",
            degree: "Математикийн багшийн мэргэжлээр бакалавр",
            duration: "1995-1999"
        },
        {
            institution: "ШУТИС",
            degree: "Математик, Магистр",
            duration: "2005-2007"
        },
        {
            institution: "ШУТИС",
            degree: "Математик, Доктор (PhD)",
            duration: "2015-2018"
        }
    ];

    return (
        <section className="profile-section">
            <h2>
                <i className="fas fa-graduation-cap"></i> Боловсрол
            </h2>
            {educationData.map((edu, index) => (
                <div key={index} className="education-item">
                    <h3>{edu.institution}</h3>
                    <p className="degree">{edu.degree}</p>
                    <p className="duration">{edu.duration}</p>
                </div>
            ))}
        </section>
    );
}