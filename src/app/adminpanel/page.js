"use client";
import styles from "@/app/styles/adminpanel.module.css";
import { useEffect, useState } from "react";
import { users } from "../../../public/userdata";
import TableView from "../components/table";
import Formpage from "../components/formpage";
import Snackbar from "../components/snackbar";

const AdminPanel = () => {
  const [listOfusers, listUserFn] = useState();
  const [strToForm, setStrToForm] = useState('')
  const [showSnackbar, showSnackbarFn] = useState({message: '', color: '', show: false})
  const [showForm, formVisibilityFn] = useState(false);

  const getUsers = async () => {
    const url = "https:/law-firm-be.vercel.app/admin/getclients";
    try {
      const response = await fetch(url, { method: "GET", headers: { "Content-Type": "application/json" }
      });
      const result = await response.json();
      if (response.ok) {
        listUserFn(result.client_list)
      } else if (response.status === 401 || response.status === 500) {
        alert('Something went wrong.')
      }
    } catch (error) {
      alert('Something Went Wrong')
    }
  }

  const createNewUser = async (formData) => {
    console.log('Form data in admin', formData)
    const url = "https:/law-firm-be.vercel.app/admin/createclient";
    try {
      const response = await fetch(url, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ formData }),
      });
      const result = await response.json();
      if (response.ok) {
        formVisibilityFn(false)
        showSnackbarFn({message: 'User Successfully Created', show: true, color: 'G'})
        getUsers()
      } else if (response.status === 401 || response.status === 500) {
        showSnackbarFn({message: 'Something Went Wrong', show: true, color: 'R'})
      }
      setTimeout(() => {
        showSnackbarFn({show: false})
      }, 2000);
    } catch (error) {
      alert('Something Went Wrong')
    }
  }

  const openForm = (e, title) => {
    setStrToForm(title)
    formVisibilityFn(true);
  };

  useEffect(() => {
    getUsers()
  },[])

  return (
    <>

    {showSnackbar.show ? 
      <>
      <Snackbar message = {showSnackbar.message} color={showSnackbar.color}/>
      </> : null
    }


      {showForm ? (
        <>
          <Formpage clickedOk = {createNewUser} clickedCancel = {() => formVisibilityFn(false)}  />
        </>
      ) : null}

      <div className={styles.main_panel}>
        <div className={styles.intro_panel}>
          <h2>Welcome User1</h2>
          <button
            className={styles.button}
            onClick={(e) => openForm(e, "Add New Client")}
          >
            Add New Client
          </button>
        </div>

        <div className={styles.card_panel}>
          <div>
            {/* <input
              className={styles.search_input}
              type="text"
              placeholder="Search For Client"
              onChange={(e) => filterList(e.target.value)}
            /> */}
            <div className={styles.card_box}>
              <div style={{ width: "100%" }}>
                <TableView users={listOfusers} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminPanel;
