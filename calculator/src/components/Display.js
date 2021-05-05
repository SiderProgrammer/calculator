import "./Display.css";

function Display({ value }) {
  return (
    <div className="display">
      <span>{value}</span>
    </div>
  );
}

export default Display;
