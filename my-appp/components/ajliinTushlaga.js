import Link from "next/link";
import '../styles/global.css';
import '../styles/profile.css';

export default function ATurshlaga() {
    const workExperience = [
        {
            period: "2001 - 2008",
            position: "Улаанбаатар хотын 45-р сургуульд математикийн багш",
            description: ""
        },
        {
            period: "2008 - 2015",
            position: "Монгол Улсын Их Сургууль ахлах багш",
            description: ""
        },
        {
            period: "2015 - 2023",
            position: "ШУТИС-д Докторын зэрэг хамгаалсан",
            description: ""
        },
        {
            period: "2023 - одоо",
            position: "Математикийн хичээлийн сургалт ордог",
            description: ""
        }
    ];

    return (
        <section className="profile-section">
            <h2>
                <i className="fas fa-briefcase"></i> Ажлын туршлага
            </h2>
            <div className="timeline">
                {workExperience.map((work, index) => (
                    <div key={index} className="timeline-item">
                        <div className="timeline-dot"></div>
                        <div className="timeline-content">
                            <h3>{work.period}</h3>
                            <p>{work.position}</p>
                            {work.description && <p className="work-description">{work.description}</p>}
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}