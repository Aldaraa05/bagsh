'use client';

import Link from "next/link";
import { useState } from "react";
import '../../styles/signin.css';
import '../../styles/global.css';

export default function Signin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch('/api/signup');
      const users = await res.json();

      const foundUser = users.find(
        (user) => user.gmail === email && user.password === password
      );

      if (foundUser) {
        console.log(foundUser.name);
      } else {
        console.log('email эсвэл password буруу байна');
        alert('email эсвэл password буруу байна')
      }
    } catch (error) {
      console.error('Error:', error);
      alert("burtgel alga")
    }
  };

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

        <form id="signin-form" onSubmit={handleSubmit}>
          <div className="input-group">
            <i className="fas fa-envelope"></i>
            <input
              type="email"
              id="email"
              placeholder="Email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="input-group">
            <i className="fas fa-lock"></i>
            <input
              type="password"
              id="password"
              placeholder="Password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
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
