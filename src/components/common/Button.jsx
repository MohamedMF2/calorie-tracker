import { memo } from "react";
import styles from "./Button.module.css";

function Button(props) {
  const { children, onClick, disabled, varient } = props;
  console.log("rendered button " + varient);
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className={styles[`${varient}`]}
    >
      {children}
    </button>
  );
}

export default memo (Button);
