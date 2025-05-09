"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import "../../styles/global.css";
import "../../styles/signin.css";

export default function Signin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      // Trim and validate inputs
      const trimmedEmail = email.trim();
      const trimmedPassword = password.trim();

      if (!trimmedEmail || !trimmedPassword) {
        throw new Error("Email and password are required");
      }

      const res = await fetch("/api/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          gmail: trimmedEmail,
          password: trimmedPassword,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        const errorMessage = data.error || 
          (res.status === 401 ? "Invalid email or password" : "Login failed");
        throw new Error(errorMessage);
      }

      if (!data.user) {
        throw new Error("User data not received");
      }

      // Store user data and redirect
      localStorage.setItem("userData", JSON.stringify(data.user));
      
      // Redirect based on role with a small delay for better UX
      setTimeout(() => {
        router.push(data.user.role === "teacher" ? "/" : "/");
      }, 100);

    } catch (error) {
      console.error("Login error:", error);
      setError(error.message || "An error occurred during login");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="signin-page">
      <Link className="back" href="/">
        <img src="/backIcon.png" alt="Back" />
      </Link>

      <div className="container">
        <div className="logo">
          <h1>BAGSH</h1>
        </div>

        <h2>Sign In</h2>
        
        {error && (
          <div className="error-message">
            <i className="fas fa-exclamation-circle"></i>
            {error}
          </div>
        )}

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
              autoComplete="username"
              disabled={isLoading}
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
              autoComplete="current-password"
              disabled={isLoading}
            />
          </div>

          <div className="remember-forgot">
            <label>
              <input type="checkbox" disabled={isLoading} /> Remember me
            </label>
            <Link href="/forgot-password" className={isLoading ? "disabled-link" : ""}>
              Forgot password?
            </Link>
          </div>

          <button 
            type="submit" 
            className={`btn ${isLoading ? "loading" : ""}`}
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <span className="spinner"></span>
                Signing In...
              </>
            ) : (
              "Sign In"
            )}
          </button>

          <div className="register-link">
            <p>
              Don't have an account?{" "}
              <Link href="/Signup" className={isLoading ? "disabled-link" : ""}>
                Register
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}