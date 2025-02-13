"use client";
import styles from "@/app/page.module.css";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const Login = () => {
  const router = useRouter();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    localStorage.clear();
  }, []);

  const [user, userData] = useState({
    email: "",
    password: "",
  });

  const handleFieldChange = (e) => {
    const { name, value } = e.target;
    userData({ ...user, [name]: value });
  };

  const formSubmit = async (e) => {
    e.preventDefault();
    const url = "https://law-firm-be.vercel.app/loginuser";

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user }),
      });

      const result = await response.json();

      if (response.ok) {
        console.log(result);
        if (result.user.isAdmin) {
          localStorage.setItem("useremail", user.email);
          localStorage.setItem("isAdmin", true);
          router.push("/adminpanel");
        } else {
          if (isClient) {
            localStorage.setItem("useremail", user.email);
            localStorage.setItem("isAdmin", false);
          }
          router.push("/userhomepage");
        }
      } else if (response.status === 401) {
        alert(result.message); // Display error message
      }
    } catch (error) {
      alert("Something went wrong. Please try again.");
    }
  };

  if (!isClient) {
    return null; // Prevents rendering during SSR
  }

  return (
    <div className={styles.login_form_main_box}>
      <div className={styles.form_box}>
        <h2 style={{ color: "#383838" }}>Please Login To your Account.</h2>
        <form className={styles.form_align} onSubmit={formSubmit}>
          <input
            type="text"
            name="email"
            value={user.email}
            onChange={handleFieldChange}
            placeholder="Email (required)"
          />
          <input
            name="password"
            type="password"
            value={user.password}
            onChange={handleFieldChange}
            placeholder="Password (required)"
          />
          <button disabled={!user.email || !user.password} className={styles.login_btn}>
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
