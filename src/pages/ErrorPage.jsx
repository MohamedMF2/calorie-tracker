import { NavLink } from "react-router-dom";

export function ErrorPage() {
  return (
    <>
      <h1> something went wrong... </h1>
      <p>
        return to <NavLink>Home page</NavLink> again.
      </p>
    </>
  );
}
