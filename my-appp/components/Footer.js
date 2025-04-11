import Link from "next/link";
import '../styles/footer.css';

export default function Footer() {
  return (
    <div className="footer">
      <div className="footer-container">
        <div className="footer-row">
          <div className="footer-column">
            <h3>Explore</h3>
            <ul>
              <li><Link href="/about">About Us</Link></li>
              <li><Link href="/how-it-works">How It Works</Link></li>
              <li><Link href="/teachers">Teachers</Link></li>
            </ul>
          </div>
          <div className="footer-column">
            <h3>Connect</h3>
            <ul>
              <li><Link href="/students">Students</Link></li>
              <li><Link href="/contact">Contact Us</Link></li>
              <li><Link href="/faq">FAQ</Link></li>
            </ul>
          </div>
          <div className="footer-column">
            <h3>Resources</h3>
            <ul>
              <li><Link href="/blog">Blog</Link></li>
              <li><Link href="/support">Support</Link></li>
            </ul>
          </div>
          <div className="footer-column newsletter">
            <h3>Stay Updated</h3>
            <p>Subscribe to our newsletter for the latest news and updates.</p>
            <form className="newsletter-form">
              <input type="email" placeholder="Enter your email" required />
              <button type="submit">Subscribe</button>
            </form>
          </div>
        </div>
        <div className="footer-row bottom-row">
          <div className="copyright">
            © 2025 LearnLink. All rights reserved.{" "}
            <Link href="/terms">Terms and Conditions</Link>{" "}
            <Link href="/privacy">Privacy Policy</Link>
          </div>
          <div className="social-links">
            <a href="#" aria-label="Facebook">FB</a>
            <a href="#" aria-label="LinkedIn">IN</a>
            <a href="#" aria-label="Twitter">TW</a>
          </div>
        </div>
      </div>
    </div>
  );
}
