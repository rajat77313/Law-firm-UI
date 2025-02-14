"use client";
import { useState } from "react";
import styles from "../styles/formpage.module.css";
import Snackbar from "./snackbar";
import { url_prefix } from "../utils/constants";
import BeatLoader from "react-spinners/BeatLoader";

const override = {
  display: "block",
  margin: "0 auto",
  borderColor: "red",
};

const HearingForm = ({ title, parentRow, rowDetails, clickedCancel, clickedOk }) => {
  const [showLoader, showLoaderFn] = useState(false);
  const [formData, setFormData] = useState({
    clientId: parentRow[0]._id,
    hearing_date: rowDetails.length ? rowDetails?.[0]?.hearing_date : new Date().toISOString().split("T")[0],
    next_date: rowDetails.length ? rowDetails?.[0]?.next_date : new Date().toISOString().split("T")[0],
    court_order: rowDetails.length ? rowDetails?.[0]?.court_order : '',
    row_id: rowDetails.length ? rowDetails?.[0]?._id : '-'
  });

  const [showSnackbar, showSnackbarFn] = useState({ message: '', color: '', show: false })

  const isFormValid = Object.values(formData).every(
    (value) => value.trim() !== ""
  );

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const submitForm = async (e) => {
    showLoaderFn(true);
    e.preventDefault();
    let url = `${url_prefix}/admin/`
    // let url = "https:/law-firm-be.vercel.app/admin/"
    let identifier = ''
    if (title === 'Edit Hearing Details') {
      identifier = 'E'
      url += 'updatehearing'
    } else {
      identifier = 'A'
      url += 'addhearing'
    }
    try {
      const response = await fetch(url, {
        method: identifier == 'A' ? "POST" : 'PUT', headers: { "Content-Type": "application/json" }, body: JSON.stringify({ formData }),
      });
      const result = await response.json();
      if (response.ok) {
        showLoaderFn(false);
        clickedOk({ message: `Hearing Details Successfully ${identifier === 'A' ? 'Added' : 'Updated'}` });
      } else {
        showFailure()
      }
    } catch (error) {
      showFailure()
    }
  };

  const showFailure = () => {
    showSnackbarFn({ message: 'Something went wrong', color: 'R', show: true })
    setTimeout(() => {
      showSnackbarFn({ show: false })
    }, 2000);
  }


  const clickedCancelInside = (e) => {
    e.preventDefault();
    console.log("Cancel inside");
    clickedCancel();
  };

  return (
    <div className={styles.form_overlay_parent}>
      <div className={styles.form_overlay}>


        {showSnackbar.show ?
          <>
            <Snackbar message={showSnackbar.message} color={showSnackbar.color} />
          </> : null
        }


        <div className={styles.form_parent}>
          <div className={styles.form_title}>
            <span className={styles.form_title_span}>{title}</span>
          </div>

          <form onSubmit={(e) => submitForm(e)} className={styles.form}>
            <div className={styles.input_field}>
              <div>
                <label htmlFor="hearing_date">
                  <span className={styles.label_style}>Hearing Date</span>
                </label>
              </div>
              <input
                className={styles.input_p}
                type="date"
                value={formData.hearing_date}
                onChange={handleInputChange}
                name="hearing_date"
              />
            </div>

            <div className={styles.input_field}>
              <div>
                <label htmlFor="next_date">
                  <span className={styles.label_style}>Next Hearing Date</span>
                </label>
              </div>
              <input
                className={styles.input_p}
                type="date"
                value={formData.next_date}
                onChange={handleInputChange}
                name="next_date"
              />
            </div>

            <div className={styles.input_field}>
              <div>
                <label htmlFor="court_order">
                  <span className={styles.label_style}>Court Order</span>
                </label>
              </div>
              <textarea
                className={styles.input_p}
                rows="4" cols="50"
                value={formData.court_order}
                placeholder="Court Order"
                onChange={handleInputChange}
                name="court_order"
              />
            </div>


            <div className={styles.form_button}>
              <button disabled={!isFormValid} type="submit" className={styles.create_user_btn}>
                {rowDetails?.[0]?.clientId ? "Upadate Details" : "Add Details"}
              </button>
              <button
                onClick={(e) => clickedCancelInside(e)}
                className={styles.cancel_btn}
              >
                Cancel
              </button>
            </div>

            <div style={{ zIndex: "2", display: 'flex', justifyContent: 'center' }}>
              {showLoader ? (
                <>
                  <div className={styles.loader}>
                    <BeatLoader color="#1B1833" loading={true} cssOverride={override} size={25} aria-label="Loading Spinner" data-testid="loader" />
                  </div>
                </>
              ) : null}
            </div>

          </form>
        </div>
      </div>
    </div>
  );
};

export default HearingForm;
