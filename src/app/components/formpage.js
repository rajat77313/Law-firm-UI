"use client";
import styles from "../styles/formpage.module.css";
import { useState } from "react";

const Formpage = ({ clickedOk, clickedCancel }) => {
  const [formData, setFormData] = useState({
    name: "",
    father_name: "",
    dob: "",
    address: "",
    file_no: "",
    case_title: "",
    role: "Defendant", // Default value
    phone_no: "",
    email: "",
    password: "",
  });

  const role_array = ["Defendant", "Plaintiff"];
  const isFormValid = Object.values(formData).every((value) => value.trim() !== ""
  );

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const submitForm = (e) => {
    e.preventDefault();
    clickedOk(formData);
  };

  const clickedCancelInside = (e) => {
    e.preventDefault();
    console.log("Cancel inside");
    clickedCancel();
  };

  const generatePassword = () => {
    const { phone_no, dob } = formData;
    if (phone_no.length < 4 || !dob) return alert("Enter valid phone and DOB.");
    setFormData({
      ...formData,
      password: phone_no.slice(0, 4) + dob.slice(0, 4),
    });
  };

  return (
    <div className={styles.form_overlay_parent}>
      <div className={styles.form_overlay}>
        <div className={styles.form_parent}>
          <div className={styles.form_title}>
            <span className={styles.form_title_span}>Add New Client</span>
          </div>

          <form
            style={{
              padding: "15px",
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              columnGap: "35px",
            }}
            onSubmit={(e) => submitForm(e)}
          >
            <div className={styles.input_field}>
              <label htmlFor="case_title">
                <span className={styles.label_style}>Case Title</span>
              </label>
              <input
                className={styles.input_p}
                type="text"
                value={formData.case_title}
                onChange={handleInputChange}
                placeholder="Case Title"
                name="case_title"
              />
            </div>

            <div className={styles.input_field}>
              <label htmlFor="name">
                <span className={styles.label_style}>Full Name</span>
              </label>
              <input
                className={styles.input_p}
                type="text"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Full Name"
                name="name"
              />
            </div>

            <div className={styles.input_field}>
              <label htmlFor="father_name">
                <span className={styles.label_style}>
                  Parent Name/ Spouse Name
                </span>
              </label>
              <input
                className={styles.input_p}
                type="text"
                value={formData.father_name}
                onChange={handleInputChange}
                placeholder="Parent Name/ Spouse Name"
                name="father_name"
              />
            </div>

            <div className={styles.input_field}>
              <label htmlFor="father_name">
                <span className={styles.label_style}>Date Of Birth</span>
              </label>
              <input
                className={styles.input_p}
                type="date"
                value={formData.dob}
                onChange={handleInputChange}
                name="dob"
              />
            </div>

            <div className={styles.input_field}>
              <label htmlFor="address">
                <span className={styles.label_style}>Address</span>
              </label>
              <input
                className={styles.input_p}
                type="text"
                value={formData.address}
                onChange={handleInputChange}
                placeholder="Address"
                name="address"
              />
            </div>

            <div className={styles.input_field}>
              <label htmlFor="file_no">
                <span className={styles.label_style}>File No.</span>
              </label>
              <input
                className={styles.input_p}
                type="text"
                value={formData.file_no}
                onChange={handleInputChange}
                placeholder="File No."
                name="file_no"
              />
            </div>

            <div className={styles.input_field}>
              <label htmlFor="role">
                <span className={styles.label_style}>Role</span>
              </label>
              <select
                className={styles.input_p}
                name="role"
                id="role"
                value={formData.role}
                onChange={handleInputChange}
              >
                {role_array.map((e) => (
                  <option key={e} value={e}>
                    {e}
                  </option>
                ))}
              </select>
            </div>

            <div className={styles.input_field}>
              <label htmlFor="phone_no">
                <span className={styles.label_style}>Phone Number</span>
              </label>
              <input
                className={styles.input_p}
                type="text"
                value={formData.phone_no}
                onChange={handleInputChange}
                placeholder="Phone No."
                name="phone_no"
              />
            </div>

            <div className={styles.input_field}>
              <label htmlFor="email">
                <span className={styles.label_style}>Email</span>
              </label>
              <input
                className={styles.input_p}
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Email"
                name="email"
              />
            </div>
            <div></div>

            <div className={styles.input_field}>
              <label htmlFor="password">
                <span className={styles.label_style}>Password</span>
              </label>
              <input
                className={styles.input_p}
                type="password"
                readOnly
                value={formData.password}
                onChange={handleInputChange}
                placeholder="Password"
                name="password"
              />
              <button
                type="button"
                style={{ cursor: "pointer" }}
                onClick={generatePassword}
              >
                Generate Password
              </button>
            </div>

            <div className={styles.form_button}>
              <button disabled={!isFormValid} type="submit" className={styles.create_user_btn}>
                Create User
              </button>
              <button
                onClick={(e) => clickedCancelInside(e)}
                className={styles.cancel_btn}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Formpage;
