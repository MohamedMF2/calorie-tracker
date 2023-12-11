import styles from "./CalorieRecordDate.module.css";
import CalorieRecordCell from "../common/StyledRecordCell";

function CalorieRecordDate(props) {
  const MONTHS = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const month = MONTHS[props.date.getUTCMonth()];
  const day = props.date.getUTCDate() + 1;
  console.log({ day, month });
  const year = props.date.getUTCFullYear();
  return (
    <CalorieRecordCell>
      <div className={styles["record-date-month"]}>{month}</div>
      <div className={styles["record-date-day"]}>{day}</div>
      <div className={styles["record-date-year"]}>{year}</div>
    </CalorieRecordCell>
  );
}

export default CalorieRecordDate;
