import { forwardRef } from "react";
import styles from "./Forminput.module.css";

const Forminput = forwardRef((props, ref) => {
  const { label, id, type, isValid, children, ...rest } = props;
  const inputElement =
    type === "select" ? (
      <select
        className={`${styles["form-input"]} ${!isValid ? styles.error : ""}`}
        id={id}
        ref={ref}
        {...rest}
      >
        {children}
      </select>
    ) : (
      <input
        type={type}
        className={`${styles["form-input"]} ${!isValid ? styles.error : ""}`}
        id={id}
        ref={ref}
        {...rest}
      />
    );

  return (
    <>
      <label htmlFor={id}>{label}:</label>
      {inputElement}
    </>
  );
});
export default Forminput;
