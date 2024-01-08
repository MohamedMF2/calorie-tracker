import { useContext } from "react";
import styles from "./ListingSection.module.css";
import RecordList from "./RecordList";
import { AppContext } from "../../app-context";

function ListingSection(props) {
  const { allRecords } = props;

  const { currentDate, currentDateStr, setCurrentDate } =
    useContext(AppContext);

  const dateChangeHandle = (event) => {
    setCurrentDate(event.target.value);
  };

  const dateFilter = (record) =>
    record.date.getFullYear() === currentDate.getFullYear() &&
    record.date.getMonth() === currentDate.getMonth() &&
    record.date.getDate() === currentDate.getDate();

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
        value={currentDateStr}
        onChange={dateChangeHandle}
      />
      <RecordList records={allRecords.filter(dateFilter)}></RecordList>
    </>
  );
}
export default ListingSection;
