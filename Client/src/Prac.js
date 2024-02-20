import React, { useState } from 'react';

function Prac() {
  const [userInput, setUserInput] = useState('');
  const [message, setMessage] = useState('');

  const handleDateChange = (e) => {
    setUserInput(e.target.value);
  };

  const checkIfInCurrentWeek = () => {
    const currentDate = new Date();
    const inputDate = new Date(userInput);

    // Calculate the start and end dates of the current week
    const currentWeekStartDate = new Date(currentDate);
    currentWeekStartDate.setDate(currentDate.getDate() - currentDate.getDay());
    const currentWeekEndDate = new Date(currentWeekStartDate);
    currentWeekEndDate.setDate(currentWeekStartDate.getDate() + 6);

    if (
      inputDate >= currentWeekStartDate &&
      inputDate <= currentWeekEndDate
    ) {
      setMessage(`The date ${userInput} is in the current week.`);
    } else {
      setMessage(`The date ${userInput} is not in the current week.`);
    }
  };

  return (
    <div className="bg-gray-200 p-4 rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-4">Check if a Date is in the Current Week</h1>
      <input
        type="date"
        value={userInput}
        onChange={handleDateChange}
        className="border rounded-md p-2 mb-2"
      />
      <button
        onClick={checkIfInCurrentWeek}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Check
      </button>
      <p className="mt-4">{message}</p>
    </div>
  );
}

export default Prac;
