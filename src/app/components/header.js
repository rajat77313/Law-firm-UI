'use client'
import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "@/app/page.module.css";

const Header = () => {
  const pathname = usePathname();
  console.log(pathname)
  return (
    <>
      <div className={styles.header_box}>
        <div>
          <h1 href = "/" className={styles.logo_text}>Law Firm</h1>
        </div>

        <div>
          {pathname !== "/login" && (
            <div>
              {pathname === "/" ? (
                <Link href="/login">
                  <span className={styles.login_btn}>Login</span>
                </Link>
              ) : (
                <Link href="/">
                  <span className={styles.login_btn} onClick={() => localStorage.clear()}>Logout</span>
                </Link>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Header;
