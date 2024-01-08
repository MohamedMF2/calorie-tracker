import { useState, useEffect, useReducer, useContext } from "react";
import styles from "./CaloriesRecordEdit.module.css";
import { AppContext } from "../../../app-context";

const DEFAULT_VALUE = {
  date: { value: "", valid: false },
  meal: { value: "Breakfast", valid: true },
  content: { value: "", valid: false },
  calories: { value: 0, valid: true },
};

function formReducer(state, action) {              
  const { type, key, value } = action;

  if (type === "RESET") return DEFAULT_VALUE;

  let valid = false;

  switch (key) {
    case "content":
      valid =
        (value === "sport" && state.calories.value < 0) ||
        (value !== "sport" && state.calories.value >= 0);

      return {
        ...state,
        content: { value, valid: !!value },
        calories: { ...state.calories, valid },
      };

    case "calories":
      valid =
        (state.content.value === "sport" && value < 0) ||
        (state.content.value !== "sport" && value >= 0);

      return {
        ...state,
        calories: { value, valid },
      };

    default:
      return {
        ...state,
        [key]: { value, valid: !!value },
      };
  }
}

function CaloriesRecordEdit(props) {
  const {
    currentDate,
    currentDateStr,
    isValidDate,
    setCurrentDate,
    totalCalories,
  } = useContext(AppContext);

  const [isFormValid, setIsFormValid] = useState(false);

  const [formState, dispatchFn] = useReducer(
    formReducer,
    DEFAULT_VALUE,
    (initialState) => ({
      ...initialState,
      date: { value: currentDate, valid: !!currentDate },
    })
  );

  const {
    content: { valid: isContentValid },
    calories: { valid: isCaloriesValid },
  } = formState;

  useEffect(() => {
    setIsFormValid(isValidDate && isContentValid && isCaloriesValid);
  }, [isValidDate, isContentValid, isCaloriesValid]);

  const onDateChangeHandler = (event) => {
    setCurrentDate(event.target.value);
  };

  const onMealChangeHandler = (event) => {
    dispatchFn({
      type: "UPDATE_FIELD",
      key: "meal",
      value: event.target.value,
    });
  };

  const onContentChangeHandler = (event) => {
    dispatchFn({
      type: "UPDATE_FIELD",
      key: "content",
      value: event.target.value,
    });
  };

  const onCaloriesChangeHandler = (event) => {
    dispatchFn({
      type: "UPDATE_FIELD",
      key: "calories",
      value: Number(event.target.value),
    });
  };

  const onRecordSubmit = (event) => {
    event.preventDefault();
    props.onFormSubmit({
      date: currentDate,
      ...Object.keys(formState).reduce((aggr, cur) => {
        aggr[cur] = formState[cur].value;
        return aggr;
      }, {}),
    });
    dispatchFn({ type: "RESET" });
  };

  const onCancelHandle = () => {
    dispatchFn({ type: "RESET" });
    props.onCancel();
  };

  return (
    <form className={styles.form} onSubmit={onRecordSubmit}>
      <p className={styles.warning}>You spent {totalCalories || 0} calories</p>

      <label htmlFor="date">Date: </label>
      <input
        type="date"
        id="date"
        value={currentDateStr}
        onChange={onDateChangeHandler}
        className={`${styles["form-input"]} ${
          !isValidDate ? styles.error : ""
        }`}
      />

      <label htmlFor="meal">Meal: </label>
      <select
        id="meal"
        value={formState.meal.value}
        onChange={onMealChangeHandler}
        className={styles["form-input"]}
      >
        <option value="Breakfast">BreakFast</option>
        <option value="Lunch">Lunch</option>
        <option value="Dinner">Dinner</option>
        <option value="Snack">Snack</option>
      </select>

      <label htmlFor="content">Content:</label>
      <input
        type="text"
        id="content"
        value={formState.content.value}
        onChange={onContentChangeHandler}
        className={`${styles["form-input"]} ${
          !isContentValid ? styles.error : ""
        }`}
      />

      <label htmlFor="calories">Calories:</label>
      <input
        type="number"
        id="calories"
        value={formState.calories.value}
        onChange={onCaloriesChangeHandler}
        className={`${styles["form-input"]} ${
          !isCaloriesValid ? styles.error : ""
        }`}
      />

      <div className={styles.footer}>
        <button disabled={!isFormValid}>add Record</button>

        <button type="button" onClick={onCancelHandle}>
          cancel
        </button>
      </div>
    </form>
  );
}

export default CaloriesRecordEdit;
