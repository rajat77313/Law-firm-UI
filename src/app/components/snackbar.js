import styles from "@/app/page.module.css";

const Snackbar = ({message, color}) => {
  return (
    <>
      <div className={styles.snackbar_main}>
        <div className={styles.snackbar_container} style={{ backgroundColor: color === 'G' ? '#9FE956' : '#FF266E', color: color === 'G' ? '#383838' : '#fff' }}>
            <div className={styles.close_icon}><span>x</span></div>
            <div className={styles.message}>{message}</div>
        </div>
      </div>
    </>
  ); 
};

export default Snackbar;
