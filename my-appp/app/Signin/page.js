import Link from "next/link";
import '../../styles/signin.css'
import '../../styles/global.css'
export default function Signin() {
  return (
    <div>
      <Link className="back" href="/">
        <img src="/backIcon.png" alt="Back" />
      </Link>

      <div className="container">
        <div className="logo">
          <h1>BAGSH</h1>
        </div>

        <h2>Sign In</h2>

        <form id="signin-form">
          <div className="input-group">
            <i className="fas fa-envelope"></i>
            <input type="email" id="email" placeholder="Email" required />
          </div>

          <div className="input-group">
            <i className="fas fa-lock"></i>
            <input type="password" id="password" placeholder="Password" required />
          </div>

          <div className="remember-forgot">
            <label>
              <input type="checkbox" /> Remember me
            </label>
            <a href="#">Forgot password?</a>
          </div>

          <button type="submit" className="btn">Sign In</button>

          <div className="register-link">
            <p>
              Don't have an account? <Link href="/Signup">Register</Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
