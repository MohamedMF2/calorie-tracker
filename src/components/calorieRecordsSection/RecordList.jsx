import CalorieRecord from "./CalorieRecord";
import styles from "./RecordList.module.css";

function RecordList(props) {
  const records = props.children;

  return records?.length > 0 ? (
    <ul className={styles["record-list"]}>
      {records.map((record) => {
        return (
          <li key={record.id} className={styles["list-item"]}>
            <CalorieRecord
              date={record.date}
              meal={record.meal}
              content={record.content}
              calories={record.calories}
            />
          </li>
        );
      })}
    </ul>
  ) : (
    <div className={styles.wrapper}>
      <p className={styles.title}>{"No records found for this date"} </p>
    </div>
  );
}

export default RecordList;
