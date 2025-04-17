import Link from "next/link";
import '../styles/global.css';
import '../styles/profile.css';

export default function Amjiltuud() {
    const amjiltuudd = [
            {
                id : 1,
                title : "Шилдэг багш",
                year : "2012",
            },
            {
                id: 2,
                title: "Олон улсын математикийн олимпиадын аварга сурагч бэлтгэсэн",
                year: "2014, 2017",
            },
            {
                id: 3,
                title: "Математикийн сурах бичиг зохиогч",
                year: "2018",
            }
    ]
    return (
        <section className="profile-section">
            <h2><i className="fas fa-trophy"></i> Амжилтууд</h2>
            <ul className="achievements-list">
            {
                    amjiltuudd.map((amjilt) => (
                        <li key={amjiltuudd.id} className="amjilt">
                            <span>
                                {amjilt.year} онд {amjilt.title}
                            </span>
                        </li>
                    ))
                }
            </ul>
        </section>
    );
}
