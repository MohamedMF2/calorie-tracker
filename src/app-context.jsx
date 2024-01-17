import { createContext, useState } from "react";
import { getDateFromString } from "./utils/getDateFromString";

export const AppContext = createContext({
  currentDate: new Date(),
  setCurrentDate: (val) => {},
  totalCalories: 0,
  setTotalCalories: (val) => {},
  currentDateStr: "",
  isValidDate: false,
});

function AppContextProvider(props) {
  const { children } = props;
  const [totalCalories, setTotalCalories] = useState(0);
  const [currentDate, setCurrentDate] = useState(new Date());

  //transform the string value to date value
  const updateCurrentDate = (val) => {
    setCurrentDate(getDateFromString(val));
  };

  let currentDateStr;
  const options = { month: "2-digit", day: "2-digit", year: "numeric" };
  if (!!currentDate) {
    let currentDateArr = currentDate
      .toLocaleDateString("en-US", options)
      .split("/");
    currentDateStr = `${currentDateArr[2]}-${currentDateArr[0]}-${currentDateArr[1]}`;

    console.log(currentDateArr);
  } else {
    currentDateStr = "";
  }

  return (
    <AppContext.Provider
      value={{
        currentDate,
        setCurrentDate: updateCurrentDate,
        totalCalories,
        setTotalCalories,
        currentDateStr,
        isValidDate: !!currentDateStr,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export default AppContextProvider;
