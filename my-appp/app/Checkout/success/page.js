import Link from 'next/link';
import "../../../styles/success.css";

export default function SuccessPage() {
  return (
    <div className="success-container">
      <h1 className="success-title">Амжилттай!</h1>
      <p className="success-message">Бидэнтэй хамтарж ажилласанд баярллаа.</p>
      <Link href="/" className="success-button">
        Буцах
      </Link>
    </div>
  );
}