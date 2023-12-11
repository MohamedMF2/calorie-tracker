import { useState } from "react";
import styles from "./CaloriesRecordEdit.module.css";

function CaloriesRecordEdit(props) {
  const DEFAULT_VALUE = {
    date: "",
    meal: "",
    content: "",
    calories: 0,
  };
  const [mealRecord, setMealRecord] = useState(DEFAULT_VALUE);

  const onDateChangeHandler = (event) => {
    setMealRecord({ ...mealRecord, date: event.target.value });
  };
  const onMealChangeHandler = (event) => {
    setMealRecord({ ...mealRecord, meal: event.target.value });
  };
  const onContentChangeHandler = (event) => {
    setMealRecord({ ...mealRecord, content: event.target.value });
  };
  const onCaloriesChangeHandler = (event) => {
    setMealRecord({ ...mealRecord, calories: event.target.value });
  };

  const onRecordSubmit = (event) => {
    event.preventDefault();
    props.onFormSubmit(mealRecord);
    setMealRecord(DEFAULT_VALUE);
  };

  const onCancelHandle = () => {
    setMealRecord(DEFAULT_VALUE);
    props.onCancel();
  };

  return (
    <form className={styles.form} onSubmit={onRecordSubmit}>
      <label htmlFor="date">Date: </label>
      <input
        type="date"
        id="date"
        value={mealRecord.date}
        onChange={onDateChangeHandler}
      />

      <label htmlFor="meal">Meal: </label>
      <select id="meal" value={mealRecord.meal} onChange={onMealChangeHandler}>
        <option value="Breakfast">BreakFast</option>
        <option value="Lunch">Lunch</option>
        <option value="Dinner">Dinner</option>
        <option value="Snack">Snack</option>
      </select>

      <label htmlFor="content">Content:</label>
      <input
        type="text"
        id="content"
        value={mealRecord.content}
        onChange={onContentChangeHandler}
      />

      <label htmlFor="calories">Calories:</label>
      <input
        type="number"
        id="calories"
        value={mealRecord.calories}
        onChange={onCaloriesChangeHandler}
        className={`${styles["calories-input"]}
        ${mealRecord.calories < 0 ? styles.error : ""}
        `}
      />

      <div className={styles.footer}>
        <button>add Record</button>
        <button type="button" onClick={onCancelHandle}>
          cancel
        </button>
      </div>
    </form>
  );
}

export default CaloriesRecordEdit;
