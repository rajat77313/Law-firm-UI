"use client";

import { useSearchParams } from "next/navigation";
import { useRef, useEffect } from "react";

const Dialog = ({ title, onClose, children }) => {
  const searchParams = useSearchParams();
  const dialogRef = useRef(null);
  const showDialog = searchParams.get("showDialog");

  useEffect(() => {
    if (showDialog == "y") {
      dialogRef.current?.showDialog();
    } else {
      dialogRef.current?.close();
    }
  }, [showDialog]);

  const closeDialog = () => {
    dialogRef.current?.close();
    onClose();
  };

  const dialog =
    showDialog == "y" ? (
      <dialog ref={dialogRef}>
        <div>
          <h1>{title}</h1>
          <button onClick={closeDialog}>X</button>
        </div>
        <div>{children}</div>
      </dialog>
    ) : null;

  return dialog
};

export default Dialog;
