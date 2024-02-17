import { useEffect, useState } from "react";
import {} from "react-router-dom";
import Modal from "react-modal";

import { ListSection } from "@components/records/ListSection";
import { Form } from "@components/edit/Form";

import styles from "./TrackPage.module.css";

const LOCAL_STORAGE_KEY = "calorieRecords";

export function TrackPage() {
  const [records, setRecords] = useState();
  const [isModelOpen, setIsModelOpen] = useState(false);

  function save() {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(records));
  }

  function loadRecords() {
    const storageRecords = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (storageRecords != null && storageRecords !== "undefined") {
      setRecords(
        JSON.parse(storageRecords).map((record) => ({
          ...record,
          date: new Date(record.date),
          calories: Number(record.calories),
        }))
      );
    } else {
      setRecords([]);
    }
  }

  useEffect(() => {
    if (!records) {
      loadRecords();
    } else {
      save();
    }
  }, [records]);

  const modalStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      border: "none",
      padding: "0px",
      borderRadius: "var(--theme-border-radius-smooth)",
    },
    overlay: {
      backgroundColor: "var(--theme-background-modal-overlay)",
    },
  };
  // Remove padding
  const handleOpenModel = () => {
    setIsModelOpen(true);
  };

  const handleCloseModel = () => {
    setIsModelOpen(false);
  };

  const formSubmitHandle = (record) => {
    const formattedRecord = {
      ...record,
      date: record.date,
      id: crypto.randomUUID(),
    };
    setRecords((prevRecords) => [formattedRecord, ...prevRecords]);

    handleCloseModel();
  };
  return (
    <>
      <h1 className={styles.title}>Calories Tracker</h1>
      <Modal
        isOpen={isModelOpen}
        onRequestClose={handleCloseModel}
        contentLabel="Modal"
        style={modalStyles}
      >
        <Form onFormSubmit={formSubmitHandle} onCancel={handleCloseModel} />
      </Modal>
      {records && <ListSection allRecords={records} />}{" "}
      <button onClick={handleOpenModel} className={styles["open-model-btn"]}>
        {" "}
        Track Food
      </button>
    </>
  );
}
