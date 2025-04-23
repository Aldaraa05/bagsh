import Link from "next/link";
import Image from "next/image";
import '../../styles/global.css';
import '../../styles/how.css';

export default function HowItWorks() {
  return (
    <div className="main">
      <div className="how-hero">
        <div className="how-hero-content">
          <h1>TeachLink платформ хэрхэн ажилладаг вэ?</h1>
          <p>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. 
            Harum tenetur incidunt ea officia magni dignissimos a asperiores magnam et amet.
          </p>
        </div>
      </div>

      <div className="steps">
        <div className="steps-container">
          <div className="step-card">
            <div className="step-number">1</div>
            <div className="step-content">
              <h3>Бүртгүүлэх</h3>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. 
                Incidunt libero provident quis non repellendus dolores illo deserunt obcaecati sapiente numquam!
              </p>
            </div>
            <div className="step-image1">
            </div>
          </div>

          <div className="step-card reverse">
            <div className="step-number">2</div>
            <div className="step-content">
              <h3>Мэдээлэл оруулах</h3>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Dignissimos modi explicabo, quibusdam aliquam natus 
                hic laudantium repellat odio architecto earum quod optio, ut, ducimus laborum fugit ipsam libero repudiandae molestias!
              </p>
            </div>
            <div className="step-image2">
            </div>
          </div>

          <div className="step-card">
            <div className="step-number">3</div>
            <div className="step-content">
              <h3>Хайлт хийх, холбогдох</h3>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis non quis, ab quod reprehenderit nulla, 
                natus magni facere vero delectus est provident beatae aliquid nesciunt! Ea molestiae tenetur dignissimos omnis!
              </p>
            </div>
            <div className="step-image3">
            </div>
          </div>


          <div className="step-card reverse">
            <div className="step-number">4</div>
            <div className="step-content">
              <h3>Бусад</h3>
              <p>
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Praesentium natus doloremque laudantium est nihil similique ullam odit.
                 Consequuntur non, voluptatibus id, recusandae suscipit nihil corrupti accusantium fugiat maxime accusamus eius?
              </p>
            </div>
            <div className="step-image4">
            </div>
          </div>
        </div>
      </div>

      <div className="features-section">
        <h2>Манай онцлог шинж чанарууд</h2>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">📅</div>
            <h3>Цагийн хуваарь</h3>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae, itaque.
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">💬</div>
            <h3>Чат систем</h3>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Blanditiis, sunt.
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">🎯</div>
            <h3>Хэрэглээ</h3>
            <p>
              Lorem ipsum dolor, sit amet consectetur
               adipisicing elit. Odit, ipsum vel. Magni vel deserunt repellendus fugiat eius enim corrupti dignissimos.
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">🔒</div>
            <h3>Аюулгүй байдал</h3>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. 
              \Facilis eaque sapiente laboriosam ducimus voluptatem a, cupiditate rem doloribus perspiciatis architecto.
            </p>
          </div>
        </div>
      </div>

      <div className="how-cta">
        <h2>Та бэлэн үү?</h2>
        <p>LearnLink платформд бүртгүүлж, өнөөдөр л хичээлээ эхлүүлээрэй!</p>
        <div className="cta-buttons">
          <Link href="/Signin" className="cta-button primary">
            Бүртгүүлэх
          </Link>
          <Link href="/Signup" className="cta-button secondary">
            Нэвтрэх
          </Link>
        </div>
      </div>
    </div>
  );
}