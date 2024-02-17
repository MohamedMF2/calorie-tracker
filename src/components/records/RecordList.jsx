import { useContext } from "react";
import { Link } from "react-router-dom";

import { AppContext } from "@root/app-context";
import { Record } from "./Record";
import styles from "./RecordList.module.css";

export function RecordList(props) {
  const { totalCalories } = useContext(AppContext);
  const { records } = props;
  const resultsElement =
    records?.length > 0 ? (
      <ul className={styles["record-list"]}>
        {records.map((record) => {
          return (
            <li key={record.id} className={styles["list-item"]}>
              <Link to={`/track/${record.id}`}>
                <Record {...record} />
              </Link>
            </li>
          );
        })}
      </ul>
    ) : (
      <div className={styles.wrapper}>
        <p className={styles.title}>{"No records found for this date"} </p>
      </div>
    );

  return (
    <>
      {resultsElement}
      <label> Total Calories: {totalCalories}</label>
    </>
  );
}
