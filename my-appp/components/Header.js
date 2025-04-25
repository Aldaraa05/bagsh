import Link from "next/link";
import '../styles/header.css';

export default function Navbar() {
  return (
    <div id="navv">
      <nav>
      <Link href="/"><div className="linkContainer" /></Link>
        

        <div id="golNav">
          <div><Link href="/About">Бидний тухай</Link></div>
          <div><Link href="/how">Хэрхэн ажилладаг вэ</Link></div>
          <div><Link href="/Teachers">Багш нар</Link></div>
          <div><Link href="/students">Profile</Link></div>
        </div>

        <Link className="sign" href="/songolt">Бүртгүүлэх</Link>
      </nav>
    </div>
  );
}
