import { useState, useEffect, useReducer, useContext, useRef } from "react";
import styles from "./CaloriesRecordEdit.module.css";
import { AppContext } from "../../../app-context";
import Forminput from "../Forminput";

const DEFAULT_VALUE = {
  meal: true,
  content: false,
  calories: true,
};

function formReducer(state, action) {
  const { key, value, auxValue } = action;

  let valid = false;

  switch (key) {
    case "content":
      valid =
        (value === "sport" && auxValue < 0) ||
        (value !== "sport" && auxValue >= 0);

      return {
        ...state,
        content: !!value,
        calories: valid,
      };

    case "calories":
      valid =
        (auxValue === "sport" && value < 0) ||
        (auxValue !== "sport" && value >= 0);

      return {
        ...state,
        calories: valid,
      };

    default:
      return {
        ...state,
        meal: !!value,
      };
  }
}

function CaloriesRecordEdit(props) {
  const [isFormValid, setIsFormValid] = useState(false);
  const {
    currentDate,
    currentDateStr,
    isValidDate,
    setCurrentDate,
    totalCalories,
  } = useContext(AppContext);

  const [formState, dispatchFn] = useReducer(formReducer, DEFAULT_VALUE);

  const contentRef = useRef();
  const mealRef = useRef();
  const caloriesRef = useRef();

  const { content: isContentValid, calories: isCaloriesValid } = formState;

  useEffect(() => {
    if (!isContentValid) {
      contentRef.current.focus();
    } else if (!isCaloriesValid) {
      caloriesRef.current.focus();
    }
    setIsFormValid(isValidDate && isContentValid && isCaloriesValid);
  }, [isValidDate, isContentValid, isCaloriesValid]);

  const onDateChangeHandler = (event) => {
    setCurrentDate(event.target.value);
  };

  const onMealBlurHandler = (event) => {
    dispatchFn({
      key: "meal",
      value: event.target.value,
    });
  };

  const onContentBlurHandler = (event) => {
    dispatchFn({
      key: "content",
      value: event.target.value,
      auxValue: Number(caloriesRef.current.value),
    });
  };

  const onCaloriesBlurHandler = (event) => {
    dispatchFn({
      key: "calories",
      value: Number(event.target.value),
      auxValue: Number(contentRef.current.value),
    });
  };

  const onSubmitHandler = (event) => {
    event.preventDefault();
    props.onFormSubmit({
      date: currentDate,
      meal: mealRef.current.value,
      content: contentRef.current.value,
      calories: Number(caloriesRef.current.value),
    });
  };

  const onCancelHandle = () => {
    props.onCancel();
  };

  return (
    <form className={styles.form} onSubmit={onSubmitHandler}>
      <p className={styles.warning}>You spent {totalCalories || 0} calories</p>

      <Forminput
        label="Date"
        id="date"
        type="date"
        onChange={onDateChangeHandler}
        isValid={isValidDate}
      />
      <Forminput
        label="Meal"
        id="meal"
        type="select"
        onBlur={onMealBlurHandler}
        ref={mealRef}
        isValid
      >
        <option value="Breakfast">BreakFast</option>
        <option value="Lunch">Lunch</option>
        <option value="Dinner">Dinner</option>
        <option value="Snack">Snack</option>
      </Forminput>

      <Forminput
        label="Content"
        id="content"
        type="text"
        onBlur={onContentBlurHandler}
        isValid={isContentValid}
        ref={contentRef}
      />
      <Forminput
        label="Calories"
        id="calories"
        type="number"
        onBlur={onCaloriesBlurHandler}
        isValid={isCaloriesValid}
        ref={caloriesRef}
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
