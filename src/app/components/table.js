"use client";
import React, { useEffect } from "react";
import { useState, useMemo } from "react";
import { AgGridReact } from "ag-grid-react";
import { AllCommunityModule, ModuleRegistry } from "ag-grid-community";
import styles from "../styles/adminpanel.module.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import Paymentform from "./paymentform";
import HearingForm from "./hearingform";
import { FaEdit } from "react-icons/fa";
import Snackbar from "./snackbar";

ModuleRegistry.registerModules([AllCommunityModule]);

const ButtonComponent = ({ onClick }) => {
  return (
    <button className={styles.button_component} onClick={onClick}>
      Read Court Order
    </button>
  );
};

const IconComponent = ({ onClick }) => { return (<FaEdit className={styles.icons_design} size={20} onClick={onClick} />) };

const TableView = ({ users }) => {

  const [paymentForm, paymentFormVisibilityFn] = useState(false);
  const [paymentRowData, setPaymentRow] = useState([])

  const [hearingForm, hearingFormVisibilityFn] = useState(false);
  const [hearingRowData, setHearingRow] = useState([])

  const [strToForm, setStrToForm] = useState('')
  const [selectedRow, selectedRowFn] = useState([]);
  const [selectedRow_payment, selectedRowFn_payment] = useState([]);
  const [selectedRow_hearing, selectedRowFn_hearing] = useState([]);

  const [showSnackbar, showSnackbarFn] = useState({message: '', color: '', show: false})


  const [readCourtOrder, courtOrderFn] = useState({
    value: "",
    show: false,
  });

  const [columnDefs, setColumnDefs] = useState([
    { field: "", filter: false, flex: 0.2, checkboxSelection: true },
    { headerName: "Case Title", field: "case_title" },
    { headerName: "File No.", field: "file_no" },
    { headerName: "Full Name", field: "name" },
    { headerName: "Phone Number", field: "phone_no" },
    { headerName: "Next Hearing", field: "next_hearing" },
    { headerName: "Active", field: "isActive", flex: 0.5 },
  ]);

  const colDef2 = useMemo(() => [
    {
      field: '', flex: 0.3, filter: false, cellRenderer: (params) => selectedRow_payment.length > 0 ? <IconComponent /> : null
    },
    { field: "payment_date", headerName: 'Payment Date' },
    { field: "payment_amount", headerName: 'Payment Amount', valueFormatter: (p) => "Rs " + p.value.toLocaleString() },
    { field: "payment_via", headerName: 'Payment Via' },
  ], [selectedRow_payment]);

  const colDef3 = useMemo(() => [
    { field: '', flex: 0.3, filter: false, cellRenderer: (params) => selectedRow_hearing.length > 0 ? <IconComponent /> : null },
    { field: "hearing_date", headerName: 'Hearing Date' },
    { field: "next_date", headerName: 'Next Date' },
    { field: "court_order", headerName: 'Court Order', filter: false, cellRenderer: (params) => (<ButtonComponent onClick={(e) => openDialog(params)} />) },
  ], [selectedRow_hearing]);

  const defaultColDef = useMemo(() => {
    return {
      flex: 1,
      filter: true,
      floatingFilter: true,
    };
  }, []);

  const editHearing = (event) => {
    selectedRowFn_hearing([event.data])
    if (event.column.colId == '0') {
      setStrToForm('Edit Hearing Details');
      hearingFormVisibilityFn(true);
    }
  }

  const editPayment = (event) => {
    selectedRowFn_payment([event.data]);
    if (event.column.colId == '0') {
      setStrToForm('Edit Payment Details');
      paymentFormVisibilityFn(true);
    }
  }

  const onRowSelected = (event) => {
    selectedRowFn(event.api.getSelectedRows());
  };

  const onRowSelected_payment = (event) => {
    selectedRowFn_payment(event.api.getSelectedRows());
  };
  const onRowSelected_hearing = (event) => {
    selectedRowFn_hearing(event.api.getSelectedRows());
  };

  const getBottomTableData = async (postfix, identifier) => {
    const url = `https:/law-firm-be.vercel.app/admin/${postfix}?clientId=${selectedRow[0]._id}`;
    try {
      const response = await fetch(url, {
        method: "GET", headers: { "Content-Type": "application/json" }
      });

      const result = await response.json();
      if (response.ok) {
        if (result.identifier == 'P') {
          setPaymentRow(result.paymentDetails)
        } else {
          setHearingRow(result.hearingDetails)
        }
      } else {
        alert('Something went wrong.')
      }
    } catch (error) {
      alert('Something Went Wrong')
    }
  };

  const openForm = (e, title) => {
    setStrToForm(title)
    if (title === 'Add Payment') {
      paymentFormVisibilityFn(true)
    } else {
      hearingFormVisibilityFn(true)
    }
  }

  //Add snackbar here
  const messageForm = (res) => {
    paymentFormVisibilityFn(false)
    hearingFormVisibilityFn(false)
    if (res.message === 'Payment Successfully Added' || res.message === 'Payment Successfully Updated') {
      showSnackbarFn({message: res.message, color: 'G', show: true})
      getBottomTableData('getpayment', 'P')
    } else {
      showSnackbarFn({message: res.message, color: 'G', show: true})
      getBottomTableData('gethearing', 'H')
    }
    setTimeout(() => {
      showSnackbarFn({show: false})
    }, 2000);

  }

  useEffect(() => {
    if (selectedRow.length > 0) {
      console.log('this is called')
      getBottomTableData("getpayment", "P");
      getBottomTableData("gethearing", "H");
    }
  }, [selectedRow]);

  const openDialog = (params) => {
    courtOrderFn({ value: "", show: false });
    setTimeout(() => {
      courtOrderFn({ value: params.value, show: true });
    }, 200);
  };

  const closeDialog = () => courtOrderFn({ value: "", show: false });

  return (

    <>

{showSnackbar.show ? 
      <>
      <Snackbar message = {showSnackbar.message} color={showSnackbar.color}/>
      </> : null
    }

      {paymentForm ? (
        <>
          <Paymentform title={strToForm} parentRow={selectedRow} rowDetails={selectedRow_payment} clickedOk={messageForm} clickedCancel={() => paymentFormVisibilityFn(false)} />
        </>
      ) : null}

      {hearingForm ? (
        <>
          <HearingForm title={strToForm} parentRow={selectedRow} rowDetails={selectedRow_hearing} clickedOk={messageForm} clickedCancel={() => hearingFormVisibilityFn(false)} />
        </>
      ) : null}


      {readCourtOrder.show ? (
        <>
          <div className={styles.div_overlay}>
            <div className={styles.overlay_inner}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                  padding: "10px",
                }}
              >
                <button
                  onClick={closeDialog}
                  className={styles.button_component}
                >
                  <span style={{ color: "#383838" }}>X</span>
                </button>
              </div>
              <br />
              <hr />
              <br />
              <h4 style={{ margin: "30px 0px" }}>{readCourtOrder.value}</h4>
            </div>
          </div>
        </>
      ) : null}


      <div
        className="ag-theme-alpine"
        style={{ width: "100%", height: "40vh", overflow: 'auto', resize: 'vertical' }}
      >
        <AgGridReact
          rowData={users}
          columnDefs={columnDefs}
          rowSelection={"single"}
          enableFilters={true}
          onRowSelected={onRowSelected}
          defaultColDef={defaultColDef}
          className={styles.custom_grid}
        />
      </div>
      <br /> <br />

      {selectedRow.length ? (
        <>
          <div className={styles.bottom_grids}>
            <div style={{ flex: "1" }} className={styles.two_table}>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <h2>Payment History</h2>
                <button className={styles.button} onClick={(e) => openForm(e, "Add Payment")}>Add Payment</button>
              </div>
              <br />
              <div
                className="ag-theme-alpine"
                style={{ width: "100%", height: "40vh" }}
              >
                <AgGridReact
                  rowData={paymentRowData}
                  columnDefs={colDef2}
                  rowSelection={"single"}
                  enableFilters={true}
                  onCellClicked={editPayment}
                  onRowSelected={onRowSelected_payment}
                  defaultColDef={defaultColDef}
                  className={styles.custom_grid}
                />
              </div>
            </div>

            <div style={{ flex: "1" }} className={styles.two_table}>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <h2>Hearing Details</h2>
                <button className={styles.button} onClick={(e) => openForm(e, "Add Hearing Detail")}>Add Detail</button>
              </div>
              <br />
              <div
                className="ag-theme-alpine"
                style={{ width: "100%", height: "40vh" }}
              >
                <AgGridReact
                  rowData={hearingRowData}
                  columnDefs={colDef3}
                  rowSelection={"single"}
                  enableFilters={true}
                  onCellClicked={editHearing}
                  onRowSelected={onRowSelected_hearing}
                  defaultColDef={defaultColDef}
                />
              </div>
            </div>
          </div>
        </>
      ) : (
        <></>
      )}
    </>
  );
};

export default TableView;
