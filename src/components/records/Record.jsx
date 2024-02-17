import { useContext, useEffect } from "react";

import { AppContext } from "@root/app-context";
import { StyledRecordCell } from "@common/StyledRecordCell";
import { RecordDate } from "./RecordDate";

import styles from "./Record.module.css";

export function Record(props) {
  const { setTotalCalories: addCalories } = useContext(AppContext);

  if (props.calories < 0) {
    return null;
  }

  useEffect(() => {
    addCalories((prevTotal) => prevTotal + props.calories);

    return () => {
      addCalories((prevTotal) => prevTotal - props.calories);
    };
  }, []);

  return (
    <ul className={styles.record}>
      <li>
        <RecordDate date={props.date} />
      </li>
      <li>{props.meal}</li>
      <li>{props.content}</li>
      <li className={styles["record-calories"]}>
        <StyledRecordCell>{props.calories}</StyledRecordCell>
      </li>
    </ul>
  );
}
