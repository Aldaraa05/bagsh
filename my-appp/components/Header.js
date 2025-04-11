import Link from "next/link";
import '../styles/header.css';

export default function Navbar() {
  return (
    <div id="navv">
      <nav>
        <div className="linkContainer" />

        <div id="golNav">
          <div><Link href="/about">About Us</Link></div>
          <div><Link href="/how-it-works">How it Works</Link></div>
          <div><Link href="/teachers">Teachers</Link></div>
          <div><Link href="/students">Student</Link></div>
        </div>

        <Link className="sign" href="/signup">Get started</Link>
      </nav>
    </div>
  );
}
