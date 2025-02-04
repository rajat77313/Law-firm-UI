import styles from '../page.module.css'
const Footer = () => {
  return (
    <div style={{position: 'relative'}}>
        <div className={styles.footer_main}>
            <div>
                <b>About Us :  <span>Organization Name</span></b>
            </div>
            <br />
            <div>
                <b>Contact Us :</b>
                <div>
                    <span>Phone Number: 8828828828</span><br />
                    <span>Email: ah@testmail.com</span>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Footer