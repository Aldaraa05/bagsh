// import Image from "next/image";
// import Footer from "@/components/Footer";
// import Navbar from "@/components/Header";
import Link from "next/link";
import '../../styles/global.css'
import '../../styles/main.css'
import '../../styles/about.css'
export default function AboutUs() {
  return (
    <div className="main">
      <div className="about">
        <div className="about-content">
          <h1>Бидний тухай</h1>
          <p>
            TearnLink нь сурагч болон багшдыг холбож, чанартай боловсролыг хүн бүрт хүртээмжтэй болгох зорилготой платформ юм.
          </p>
        </div>
      </div>

      <div className="about-section mission">
        <div className="about-container">
          <div className="about-text">
            <h2>Бидний зорилго</h2>
            <p>
              Бид боловсролын салбарт шинэчлэл хийж, суралцах үйл явцыг илүү хүртээмжтэй, үр дүнтэй болгохыг зорьдог. 
              Манай платформ нь сурагчид өөрсдөд тохирсон багшийг олох, багш нарт өөрсдийн мэдлэгээ хуваалцах шинэ боломжийг нээж өгдөг.
            </p>
          </div>
          <div className="about-image">
            <div className="zurag about-zurag1"></div>
          </div>
        </div>
      </div>

      <div className="about-section values">
        <div className="about-container reverse">
          <div className="about-image">
            <div className="zurag about-zurag2"></div>
          </div>
          <div className="about-text">
            <h2>Бидний үнэт зүйлс</h2>
            <div className="value-items">
              <div className="value-item">
                <h3>Чанар</h3>
                <p>Бид боловсролын өндөр чанарыг эрхэмлэдэг</p>
              </div>
              <div className="value-item">
                <h3>Хүртээмж</h3>
                <p>Хүн бүрт тэгш боломжийг бүрдүүлэх</p>
              </div>
              <div className="value-item">
                <h3>Шударга байдал</h3>
                <p>Ил тод, шударга харилцааг дэмжих</p>
              </div>
              <div className="value-item">
                <h3>Инноваци</h3>
                <p>Боловсролын технологийн шинэчлэлийг хөхиүлэн дэмжих</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="about-section team">
        <div className="about-container">
          <div className="section-header">
            <h2>Манай баг</h2>
            <p>Биднийг энэ агуу аялалд удирдаж буй авьяаслаг хүмүүс</p>
          </div>
          <div className="team-members">
            <div className="team-member">
              <div className="member-image"></div>
              <h3>Ач-эрдэнэ</h3>
              <p>CEO, Үүсгэн байгуулагч</p>
            </div>
            <div className="team-member">
              <div className="member-image"></div>
              <h3>Алдараа</h3>
              <p>CTO</p>
            </div>
            <div className="team-member">
              <div className="member-image"></div>
              <h3>Тэмүүлэн</h3>
              <p>Боловсролын ахлах зөвлөх</p>
            </div>
          </div>
        </div>
      </div>

      <div className="about-cta">
        <h2>Бидэнтэй нэгдэх</h2>
        <p>Хэрэв та манай зорилго, үнэт зүйлстэй нийцэж байгаа бол бидэнтэй хамтран ажиллахыг урьж байна.</p>
      </div>
    </div>
  );
}