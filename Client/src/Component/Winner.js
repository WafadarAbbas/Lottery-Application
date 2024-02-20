import React, { useState, useEffect } from 'react';
import Header from './Header';
import axios from 'axios';

function Winner() {
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [usersData, setUsersData] = useState([]); // State to store data from Firestore
  const [currentDate, setCurrentDate] = useState('');

  useEffect(() => {
    // Fetch data from the server when the component mounts
    axios
      .get('http://localhost:5000/getusers')
      .then((response) => {
        setUsersData(response.data);
        // Set the current date when data is fetched
        setCurrentDate(new Date().toISOString());
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []); // Empty dependency array ensures this effect runs only once

  const toggleUserSelection = (userId) => {
    if (selectedUsers.includes(userId)) {
      setSelectedUsers(selectedUsers.filter((id) => id !== userId));
    } else {
      setSelectedUsers([...selectedUsers, userId]);
    }
  };

  const saveData = () => {
    const selectedData = usersData.filter((user) =>
      selectedUsers.includes(user.uid) // Filter based on uid
    );

    const dataToSave = {
      currentDate, // Include the current date in the data to be saved
      selectedData,
    };

    axios
      .post('http://localhost:5000/saveWinnerData', dataToSave)
      .then((response) => {
        alert('Data saved successfully:');
        console.log('Data saved successfully:', response.data);
      })
      .catch((error) => {
        alert('Error saving data:');
        console.error('Error saving data:', error);
      });
  };

  

  return (
    <div>
      <Header />
      <h2 className="text-2xl font-bold mb-4 text-center mt-7">Winner Screen</h2>
      <button
        onClick={saveData}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4 ml-4"
      >
        Save Selected Data
      </button>
      <div className="bg-white shadow-md rounded my-6">
        <table className="w-full table-auto">
          <thead>
            <tr className="bg-gray-200 uppercase text-sm leading-normal">
              <th className="py-3 px-6 text-left text-lg">User ID</th>
              <th className="py-3 px-6 text-left text-lg">Username</th>
              <th className="py-3 px-6 text-left text-lg">Address</th>
              <th className="py-3 px-6 text-left text-lg">Phone</th>
              <th className="py-3 px-6 text-left text-lg">Lottery Purchases</th>
              <th className="py-3 px-6 text-left text-lg">Select</th>
            </tr>
          </thead>
          <tbody className="text-gray-600 text-sm font-light">
            {usersData.map((user) => (
              <tr
                key={user.uid}
                className={`border-b border-gray-200 hover:bg-gray-100 ${
                  selectedUsers.includes(user.uid) ? 'bg-blue-100' : ''
                }`}
              >
                <td className="py-3 px-6 text-left font-semibold text-md">{user.uid}</td>
                <td className="py-3 px-6 text-left font-semibold text-md">{user.username}</td>
                <td className="py-3 px-6 text-left font-semibold text-md">{user.address}</td>
                <td className="py-3 px-6 text-left font-semibold text-md">{user.phone}</td>
                <td className="py-3 px-6 text-left font-semibold text-md">
                {user.lotteryPurchased.map((lottery, index) => {
  const purchaseDate = new Date(lottery.lotteryBoughtOn._seconds * 1000);
  const currentDate = new Date();
  currentDate.setHours(0, 0, 0, 0); // Set to the beginning of the current day

  // Calculate the start and end dates of the current week
  const currentWeekStartDate = new Date(currentDate);
  currentWeekStartDate.setDate(currentDate.getDate() - currentDate.getDay());
  const currentWeekEndDate = new Date(currentWeekStartDate);
  currentWeekEndDate.setDate(currentWeekStartDate.getDate() + 6);

  if (
    purchaseDate >= currentWeekStartDate && 
    purchaseDate <= currentWeekEndDate
  ) {
    return (
      <div key={index}>
        <p className="font-semibold text-md">
          Lottery Bought On: {purchaseDate.toLocaleString()}
        </p>
        <p className="font-semibold text-md">Lottery Number: {lottery.lotteryNumber}</p>
        <br />
      </div>
    );
  }
  return null;
})}

</td>

                <td className="py-3 px-6 text-left text-md">
                  <input
                    type="checkbox"
                    checked={selectedUsers.includes(user.uid)}
                    onChange={() => toggleUserSelection(user.uid)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Winner;
