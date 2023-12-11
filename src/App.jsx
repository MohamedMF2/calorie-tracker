import { useState } from "react";
import styles from "./App.module.css";
import ListingSection from "./components/calorieRecordsSection/ListingSection";
import CaloriesRecordEdit from "./components/common/edit/CaloriesRecordEdit";
import Modal from "react-modal";

function App() {
  const INTIAL_RECORDS = [
    {
      id: 1,
      meal: "Breakfast",
      date: new Date(2023, 10, 20),
      content: "Egges ",
      calories: 400,
    },
    {
      id: 2,
      meal: "Lunch",
      date: new Date(2023, 10, 28),
      content: "Pizza",
      calories: 490,
    },
    {
      id: 3,
      meal: "Dinner",
      date: new Date(2023, 10, 25),
      content: "Cheese",
      calories: 200,
    },
    {
      id: 4,
      meal: "Snacks",
      date: new Date(2023, 10, 21),
      content: "fruits ",
      calories: 125,
    },
  ];
  const [calorieRecords, setCalorieRecords] = useState(INTIAL_RECORDS);
  const [nextId, setNextId] = useState(5);
  const [isModelOpen, setIsModelOpen] = useState(false);

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

  const handleFormSubmit = (event) => {
    event.preventDefault();
    // form handling logic
  };

  const formSubmitHandle = (record) => {
    const formattedRecord = {
      ...record,
      date: new Date(record.date),
      id: nextId,
    };
    setNextId((lastValue) => lastValue + 1);
    setCalorieRecords([formattedRecord, ...calorieRecords]);
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
        <CaloriesRecordEdit
          onFormSubmit={formSubmitHandle}
          onCancel={handleCloseModel}
        />
      </Modal>
      <ListingSection allRecords={calorieRecords} />
      <button onClick={handleOpenModel} className={styles["open-model-btn"]}>
        {" "}
        Track Food
      </button>
    </>
  );
}

export default App;
