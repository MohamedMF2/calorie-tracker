import { Link } from "react-router-dom";

export function LandingPage() {
  return (
    <>
      <p>Welcome to Calorie Tracker App</p>
      <p>
        Get statrted! <Link to="/track"> start tracking</Link>
      </p>
    </>
  );
}
