import styles from "./Button.module.css";

function Button(props) {
  const { children, onClick, disabled, className } = props;

  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className={styles[`${className}`]}
    >
      {children}
    </button>
  );
}

export default Button;
