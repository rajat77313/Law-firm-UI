"use client";
import styles from "@/app/page.module.css";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const Login = () => {
  const router = useRouter();
  const [isClient, setIsClient] = useState(false);
  const [user, setUser] = useState({ email: "", password: "" });

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleFieldChange = (e) => {
    const { name, value } = e.target;
    setUser((prev) => ({ ...prev, [name]: value }));
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

        if (isClient) {
          localStorage.setItem("useremail", user.email);
          localStorage.setItem("isAdmin", result.user.isAdmin ? "true" : "false");
        }

        router.push(result.user.isAdmin ? "/adminpanel" : "/userhomepage");
      } else if (response.status === 401) {
        alert(result.message);
      }
    } catch (error) {
      alert("Something went wrong. Please try again.");
    }
  };

  if (!isClient) return null;

  return (
    <div className={styles.login_form_main_box}>
      <div className={styles.form_box}>
        <h2 style={{ color: "#383838" }}>Please Login To your Account.</h2>
        <form className={styles.form_align} onSubmit={formSubmit}>
          <input type="text" name="email" value={user.email} onChange={handleFieldChange} placeholder="Email (required)" />
          <input name="password" type="password" value={user.password} onChange={handleFieldChange} placeholder="Password (required)" />
          <button disabled={!user.email || !user.password} className={styles.login_btn}>Sign In</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
