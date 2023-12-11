import React, { useState } from 'react';

const DateFilter = ({onFilter }) => {
  const [selectedDate, setSelectedDate] = useState('');

  const handleDateChange = (e) => {
    const newDate = e.target.value;
    setSelectedDate(newDate);
    onFilter(newDate);
  };

  return (
    <div>
      <label htmlFor="datePicker">Filter by Date: </label>
      <input
        type="date"
        id="datePicker"
        value={selectedDate}
        onChange={handleDateChange}
      />
      <button onClick={() => onFilter('')}>Clear Filter</button>
    </div>
  );
};

export default DateFilter;
