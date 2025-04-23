import Image from "next/image";
import Footer from "@/components/Footer";
import Navbar from "@/components/Header";
import TInfo from "@/components/teacherTest";
import Link from "next/link";
import '../styles/global.css';
import '../styles/main.css';
export default function Home() {
  return (
    <div className="main">
      <div className="nuur">
        <div className="zurag1"></div>
        <div id="info1">
          <div id="info1_1">
            <h1>Таньд тохирох</h1>
            <h1>Төгс багшийг ол</h1>
          </div>
          <div className="loremm">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Labore deserunt nobis in,
            quam recusandae pariatur magni maxime asperiores, reiciendis consequatur minima soluta
            dolore eum quasi facere reprehenderit tempore veritatis delectus.
          </div>
          <div id="infoB">
          <Link href="/Teachers" passHref>
            <button className="infoBtn">
              Багш хайх
            </button>
          </Link>

            <Link href="/how" passHref>
            <button className="infoBtn1">
              Илүү ихийг...
            </button>
          </Link>
          </div>
        </div>
      </div>

      {/* eh biy info */}
      <div className="lilinfo">
        <div className="lilinfo_1">
          <div id="info2">
            <div>
              <h1>Бидний Төлөвлөгөө болон үнэ цэнэ</h1>
              <span>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Necessitatibus id quae
                dolorum minima inventore quaerat soluta cupiditate, magni iste beatae, labore illo
                totam veritatis quam. Quis, ad dicta! Cum, nobis?
              </span>
            </div>
            <div id="info2_2">
              <div>
                <h2>100%</h2>
                <span>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae, deleniti!</span>
                <h2>100%</h2>
                <span>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae, deleniti!</span>
              </div>
              <div>
                <h2>100%</h2>
                <span>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae, deleniti!</span>
                <h2>100%</h2>
                <span>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae, deleniti!</span>
              </div>
            </div>
          </div>
          <div className="zurag1"></div>
        </div>
      </div>

      {/* eh biy info2 */}
      <div className="lilinfo2">
        <div className="lilinfo2_1">
          <div id="lilh"><h1>Lorem ipsum sdfasfasghj</h1></div>
          <div>
            <span>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo assumenda quas explicabo
              iste provident sint aliquid nulla, tempora distinctio! Id placeat dolores, ut dolore
              nam aut voluptatibus eaque corporis. Molestias.
            </span>
            <ul>
              <li>Lorem ipsum dolor sit.</li>
              <li>Lorem ipsum dolor sit amet.</li>
              <li>Lorem, ipsum dolor.</li>
              <li>Lorem ipsum dolor sit amet consectetur.</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="teacherInfo">
        <div className="teacherInfo_1">
          <div className="zurag2"></div>
          <div className="info3">
            <div className="info3_1">
              <h1>Багштай танилцах</h1>
              <span>
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Facere dolores at quae
                facilis? Optio beatae tenetur ducimus, minima cum modi repellendus quidem harum
                fugit, quo magni facere omnis! Repudiandae, quos.
              </span>
              <span># Өндөр турглага</span>
              <span># Заах чадвар сайн</span>
              <span># Тухайн сэдэвдээ мангас</span>
            </div>
            <div className="info3_2">
              <div>
                <h1>Шалгаруулалт</h1>
                <span>expertise</span>
              </div>
              <div>
                <h1>Хичээлүүд</h1>
                <span>Various fields</span>
              </div>
            </div>
            <div className="info3_2">
              <div>
                <h1>Туршлага</h1>
                <span>Years of teaching</span>
              </div>
              <div>
                <h1>Боломжтой байдал</h1>
                <span>Flexible schedule</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="teacherInfo2">
        <div className="teacherInfo2_1">
          <h1>Сурагчдын сэтгэгдэл</h1>
          <span>
            Discover how LearnLink has transformed the learning journey for students across various
            subjects bdsfs dfdf fsfdfsd fdssdfs fdsfsdf sdfsdf sdfsdfsdf sdfsdf sdffsf fssfs sdfsdf
            sdfsdf dsffsf .
          </span>
          <div className="scroll">
            <div className="spro"></div>
            <div className="spro"></div>
            <div className="spro"></div>
            <div className="spro"></div>
            <div className="spro"></div>
          </div>
        </div>
      </div>

      {/* faq */}
      <div className="faq">
        <div className="faq_1">
          <h1>FAQS</h1>
          <span>
            Find answers to your questions about our platform’s features, services, and how we
            connect students with teachers.
          </span>
          <div className="faq-table">
            <table>
              <tbody>
                <tr>
                  <td>Хэрхэн багшаа хайж олох вэ?</td>
                </tr>
                <tr>
                  <td>Хэрэв багш таалагдаагүй бол яах вэ?</td>
                </tr>
                <tr>
                  <td>Хэрхэн багш болох вэ?</td>
                </tr>
              </tbody>
            </table>
          </div>
          <h1>Тусламж?</h1>
          <span>Бидэнтэй холбогдох</span>
          <button>Тусламж авах</button>
        </div>
      </div>

      {/* Featured Teachers */}
      {/* <h2>Best teachers</h2>
          <h1>Шилдэг багш нартай танилц</h1>
          <span>Meet our best teachers.</span> */}
      <TInfo/>
      <TInfo/>
      <TInfo/>
      <TInfo/>
      <TInfo/>
    </div>
  );
}
