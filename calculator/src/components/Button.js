import "./Button.css";

function Button({ children, onClick }) {
  return (
    <button
      onClick={() => onClick(children)}
      className={
        children === "(" || children === ")"
          ? "button button-disabled"
          : "button"
      }
    >
      {children}
    </button>
  );
}

export default Button;
