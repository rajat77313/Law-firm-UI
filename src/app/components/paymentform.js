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

const Paymentform = ({
  title,
  parentRow,
  rowDetails,
  clickedCancel,
  clickedOk,
}) => {
  console.log(rowDetails);
  const payment_via_array = ["Cash", "UPI", "Cheque"];
  const [showLoader, showLoaderFn] = useState(false);
  const [formData, setFormData] = useState({
    clientId: parentRow?.[0]?._id || "",
    payment_date: rowDetails.length ? rowDetails?.[0]?.payment_date : new Date().toISOString().split("T")[0],
    payment_amount: rowDetails.length ? rowDetails?.[0]?.payment_amount : "",
    payment_via: rowDetails.length ? rowDetails?.[0]?.payment_via : "",
    row_id: rowDetails.length ? rowDetails?.[0]._id : "-",
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
    let identifier = "";
    if (title === "Edit Payment Details") {
      identifier = "E";
      url += "updatepayment";
    } else {
      identifier = "A";
      url += "addpayment";
    }

    try {
      const response = await fetch(url, {
        method: identifier == "A" ? "POST" : "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ formData }),
      });
      const result = await response.json();
      showLoaderFn(false);
      if (response.ok) {
        clickedOk({ message: `Payment Successfully ${identifier === 'A' ? 'Added' : 'Updated'}` });
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
                <label htmlFor="payment_date">
                  <span className={styles.label_style}>Payment Date</span>
                </label>
              </div>
              <input
                className={styles.input_p}
                type="date"
                value={formData.payment_date}
                onChange={handleInputChange}
                name="payment_date"
              />
            </div>

            <div className={styles.input_field}>
              <div>
                <label htmlFor="payment_amount">
                  <span className={styles.label_style}>Payment Amount</span>
                </label>
              </div>
              <input
                className={styles.input_p}
                type="text"
                value={formData.payment_amount}
                onChange={handleInputChange}
                placeholder="Payment Amount"
                name="payment_amount"
              />
            </div>

            <div className={styles.input_field}>
              <div>
                <label htmlFor="payment_via">
                  <span className={styles.label_style}>Payment Via</span>
                </label>
              </div>
              <select
                className={styles.input_p}
                name="payment_via"
                id="payment_via"
                value={formData.payment_via}
                onChange={handleInputChange}
              >
                <option value="" hidden disabled></option>
                {payment_via_array.map((e) => (
                  <option key={e} value={e}>
                    {e}
                  </option>
                ))}
              </select>
            </div>

            <div className={styles.form_button}>
              <button
                disabled={!isFormValid}
                type="submit"
                className={styles.create_user_btn}
              >
                {rowDetails?.[0]?.clientId ? "Upadate Payment" : "Add Payment"}
              </button>
              <button
                onClick={(e) => clickedCancelInside(e)}
                className={styles.cancel_btn}
              >
                Cancel
              </button>
            </div>
            <div style={{ zIndex: "2", paddingBottom: '20px', display: 'flex', justifyContent: 'center' }}>
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

export default Paymentform;
