import { useState } from "react";
import styles from "./ListingSection.module.css";
import RecordList from "./RecordList";

function ListingSection(props) {
  const { allRecords } = props;
  const [currentDate, setCurrentDate] = useState(new Date());
  const dateChangeHandle = (e) => {
    setCurrentDate(new Date(e.target.value));
  };

  const dateFilter = (record) =>
    (record.date.getFullYear() === currentDate.getFullYear()) &
    (record.date.getMonth() === currentDate.getMonth()) &
    (record.date.getDate() === currentDate.getDate());

  return (
    <>
      <label htmlFor="listingDate" className={styles["listing-picker-label"]}>
        {" "}
        Select Date :{" "}
      </label>
      <input
        className={styles["listing-picker-input"]}
        type="date"
        id="listingDate"
        value={currentDate.toISOString().split("T")[0]}
        onChange={dateChangeHandle}
      />
      <RecordList>{allRecords.filter(dateFilter)}</RecordList>
    </>
  );
}
export default ListingSection;
