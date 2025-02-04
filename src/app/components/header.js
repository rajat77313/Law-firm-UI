import styles from "@/app/page.module.css";

const Header = () => {
  return (
    <>
      <div className={styles.header_box}>
        <div>
          <h1 className={styles.logo_text}>Law Firm</h1>
        </div>
      </div>
    </>
  );
};

export default Header;
