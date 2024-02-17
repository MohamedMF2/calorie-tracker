import { Link, useNavigate } from "react-router-dom";
import React, { useState, useEffect, useRef } from "react";

const REDIRECT_COUNT = 3;
const COUNT_DOWN_INTERVAL = 1000;
const HOME_LINK = "/";

export function ErrorPage() {
  const [counter, setCounter] = useState(REDIRECT_COUNT); // Initial countdown value
  const intervalHandler = useRef();
  const navigate = useNavigate();
  useEffect(() => {
    if (counter === 0) {
      clearInterval(intervalHandler.current);
      navigate(HOME_LINK);
    }
  }, [counter]);

  useEffect(() => {
    intervalHandler.current = setInterval(() => {
      setCounter((prev) => prev - 1);
    }, COUNT_DOWN_INTERVAL);

    return () => {
      clearInterval(intervalHandler.current);
    };
  }, []);

  return (
    <>
      <h1> something went wrong... </h1>
      <p>
        return to <Link to={HOME_LINK}>Home page</Link> again.
      </p>
      <h1>Countdown: {counter}</h1>
      <p>Navigating to destination after countdown...</p>
    </>
  );
}
