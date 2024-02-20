import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const LotteryScreen = () => {
  // State to hold the selected date
  const [selectedDate, setSelectedDate] = useState(new Date());
  
  // Sample lottery data (replace this with your actual data)
  const lotteryData = [
    { id: 1, date: new Date('2023-09-25'), number: '12345' },
    { id: 2, date: new Date('2023-09-23'), number: '67890' },
    { id: 3, date: new Date('2023-10-05'), number: '54564' },
    { id: 4, date: new Date('2023-10-07'), number: '57823' },
    // Add more lottery data here...
  ];

  // Function to filter lottery data for the current week
  const filterLotteryData = () => {
    const currentDate = selectedDate;
    const startOfWeek = new Date(currentDate);
    startOfWeek.setHours(0, 0, 0, 0);
    startOfWeek.setDate(currentDate.getDate() - currentDate.getDay());
    
    const endOfWeek = new Date(currentDate);
    endOfWeek.setHours(23, 59, 59, 999);
    endOfWeek.setDate(currentDate.getDate() + (6 - currentDate.getDay()));
    
    return lotteryData.filter(item => item.date >= startOfWeek && item.date <= endOfWeek);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-semibold mb-4">Lottery Data for the Current Week</h1>
      <div className="mb-4">
        <DatePicker
          selected={selectedDate}
          onChange={date => setSelectedDate(date)}
          dateFormat="dd/MM/yyyy"
          className="border rounded px-2 py-1"
        />
      </div>
      <div>
        <h2 className="text-xl font-semibold mb-2">Lottery Data:</h2>
        <ul>
          {filterLotteryData().map(item => (
            <li key={item.id} className="mb-2">
              <span className="font-semibold">Date:</span> {item.date.toDateString()}, <span className="font-semibold">Number:</span> {item.number}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default LotteryScreen;

