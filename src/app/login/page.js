"use client";
import styles from "@/app/page.module.css";
import { useState } from "react";
import { useRouter } from "next/navigation";

const Login = () => {
  localStorage.clear()
  const router = useRouter();


  const [user, userData] = useState({
    email: "",
    password: "",
  });

  const handleFieldChange = (e) => {
    const field = e.target.name;
    const value = e.target.value;

    userData({ ...user, [field]: value });
  };

  const formSubmit = async (e, name) => {
    // showLoaderFn(true);
    e.preventDefault();
    // router.push('/adminpanel')
    // const url = `${url_prefix}/${formName}`;
    const url = 'https:/law-firm-be.vercel.app/loginuser'

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user }),
      });
      const result = await response.json();
      // showLoaderFn(false);
      if (response.ok) {
        console.log(result)
        if (result.user.isAdmin) {
          router.push('/adminpanel')
        } else {
          localStorage.setItem('useremail', user.email)
          router.push('/userhomepage')
        }
      } else if (response.status === 401) {
        msgFn({ message: result.message, type: "F" });
        setTimeout(() => {
          msgFn({ type: "" });
        }, 3000);
      }
    } catch (error) { }
  };

  return (
    <div>
      <div className={styles.login_form_main_box}>
        <div className={styles.form_box}>
          <h2 style={{ color: "#383838" }}>Please Login To your Account.</h2>
          <form
            className={styles.form_align}
            onSubmit={(e) => formSubmit(e, "login")}
          >
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
              id=""
            />
            <button
              disabled={!user.email || !user.password}
              className={styles.login_btn}
            >
              Sign In
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
