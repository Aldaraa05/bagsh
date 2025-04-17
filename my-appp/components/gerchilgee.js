import Link from "next/link";
import Image from "next/image";
import "../styles/global.css";
import "../styles/profile.css";

export default function Gerchilgee() {
    const gerchilgeenuud = [
        {
            id : 1,
        }
    ]
  return (
    <section className="profile-section">
      <h2>
        <i className="fas fa-certificate"></i>Гэрчилгээ
      </h2>
      <div className="certificates-grid">
        <div className="certificate-item">
          <Image
            src="/zurag/certificate1.jpg"
            alt="Certificate 1"
            width={150}
            height={100}
          />
          <p>Математикийн багшийн мэргэжил</p>
        </div>
        <div className="certificate-item">
          <Image
            src="/zurag/certificate2.jpg"
            alt="Certificate 2"
            width={150}
            height={100}
          />
          <p>Дээд математик</p>
        </div>
        <div className="certificate-item">
          <Image
            src="/zurag/certificate3.jpg"
            alt="Certificate 3"
            width={150}
            height={100}
          />
          <p>Цөмийн Физик</p>
        </div>
      </div>
    </section>
  );
}
