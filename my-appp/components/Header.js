"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import "../styles/header.css";

export default function Navbar() {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    async function loadSession() {
      try {
        const response = await fetch("/api/auth", {
          credentials: "include",
        });
        const data = await response.json();
        setSession(data.session);
      } catch (error) {
        console.error("Failed to load session:", error);
      } finally {
        setLoading(false);
      }
    }
    loadSession();
  }, []);

  const handleSignOut = async () => {
    try {
      await fetch("/api/auth", {
        method: "DELETE",
        credentials: "include",
      });
      setSession(null);
      router.refresh();
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  if (loading) return <div className="loading-indicator">Loading...</div>;

  return (
    <div id="navv">
      <nav>
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
            <Link href="/students">Profile</Link>
          </div>
        </div>

        {session ? (
          <div className="user-menu-container">
            <button
              className="user-button"
              onClick={() => setDropdownOpen(!dropdownOpen)}
            >
              {session.user.name} {session.user.surname}
            </button>

            {dropdownOpen && (
              <div className="dropdown-menu">
                <button onClick={handleSignOut}>Гарах</button>
                <Link
                  href="/teacherinfo"
                  onClick={() => setDropdownOpen(false)}
                >
                  Мэдээлэл нэмэх
                </Link>
                {session.user.role === "teacher" && (
                  <Link
                    href="/teacherinfo/edit"
                    onClick={() => setDropdownOpen(false)}
                  >
                    Мэдээлэл засах
                  </Link>
                )}
              </div>
            )}
          </div>
        ) : (
          <Link className="sign" href="/songolt">
            Бүртгүүлэх
          </Link>
        )}
      </nav>
    </div>
  );
}
