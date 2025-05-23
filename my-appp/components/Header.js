"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import "../styles/header.css";

export default function Navbar() {
  const [user, setUser] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedData = localStorage.getItem('userData');
      if (savedData) {
        try {
          console.log(savedData);
          const userData = JSON.parse(savedData);
          if (userData.name && userData.surname) {
            setUser({ 
              name: userData.name,
              surname: userData.surname,
              role: userData.role || "user",
            });
          } else {
            console.warn("Incomplete user data in localStorage:", userData);
            localStorage.removeItem("userData");
          }
        } catch (error) {
          console.error("Error parsing user data:", error);
          localStorage.removeItem("userData");
        }
      }
    }
  }, []);

  const handleSignOut = () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('userData');
    }
    setUser(null);
    router.refresh();
  };

  return (
    <div id="navv">
      <nav>
      <button onClick={() => router.back()} className="back">
      <img src="/backicon.png" alt="Back" />
      </button>
        <Link href="/">
          <div className="linkContainer" />
        </Link>

        <div id="golNav">
          <div>
            <Link href="/About">Бидний тухай</Link>
          </div>
          <div>
            <Link href="/Infos">Мэдээлэл</Link>
          </div>
          <div>
            <Link href="/how">Хэрхэн ажилладаг вэ</Link>
          </div>
          <div>
            <Link href="/Teachers">Багш нар</Link>
          </div>
          <div>
            <Link href="/basket">Сагс</Link>
          </div>
        </div>

        {user ? (
          <div className="user-menu-container">
            <button
              className="user-button"
              onClick={() => setDropdownOpen(!dropdownOpen)}
            >
              {user.name} {user.surname}
              {console.log(user.name)}
            </button>

            {dropdownOpen && (
              <div className="dropdown-menu">
                <button onClick={handleSignOut}>Гарах</button>
                <Link href="/Info" onClick={() => setDropdownOpen(false)}>
                  Мэдээлэл нэмэх
                </Link>
                {user.role === "teacher" && (
                  <Link
                    href="/infoUp"
                    onClick={() => setDropdownOpen(false)}
                  >
                    Мэдээлэл засах
                  </Link>
                )}
              </div>
            )}
          </div>
        ) : (
          <div>
          <Link className="sign" href="/songolt">
            Бүртгүүлэх
          </Link>
          <Link className="signin" href="/Signin">
            Нэвтрэх
          </Link>
          </div>

        )}
      </nav>
    </div>
  );
}
