import Link from "next/link";
import "../../styles/songolt.css";
import "../../styles/global.css"
export default function Songolt() {
  return (
    <div className="songolt-wrapper">
    <Link className="back" href="/">
        <img src="/backicon.png" alt="Back" />
      </Link>
      <h2 className="songolt-title">Бүртгүүлэх төрөл сонгоно уу</h2>
      <div className="choice-container">
        <Link href="/Signup">
          <div className="choice-card teacher">Багш</div>
        </Link>
        <Link href="/student-signup">
          <div className="choice-card student">Сурагч</div>
        </Link>
      </div>
    </div>
  );
}
