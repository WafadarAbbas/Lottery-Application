import React, { useState, useEffect } from 'react';
import Header from './Header';
import axios from 'axios';


function GiftOptions() {
  return (
    <>
      <option value="">Select a gift</option>
      <option value="Alto car">Alto car</option>
      <option value="Honda 125 Bike">Honda 125 Bike</option>
      <option value="Jaheez Package">Jaheez Package</option>
      <option value="Honda 70">Honda 70</option>
      <option value="Umrah Ticket">Umrah Ticket</option>
      <option value="Dubai Ticket">Dubai Ticket</option>
      <option value="Fridge">Fridge</option>
      <option value="LCD">LCD</option>
      <option value="Vivo Mobile">Vivo Mobile</option>
      <option value="Iphone Airbuds">Iphone Airbuds</option>
      <option value="Dinner Set">Dinner Set</option>
      <option value="Juicer Machine">Juicer Machine</option>
      <option value="Other">Other</option>
    </>
  );
}

function AnnounceWinners() {
  const [winnerData, setWinnerData] = useState([]);
  const [customGift, setCustomGift] = useState(''); // Initialize with an empty string
  const [selectedGift, setSelectedGift] = useState('');


  useEffect(() => {
    // Fetch data from Firestore when the component mounts
    axios
      .get('http://localhost:5000/getWinnerData') // Replace with the correct endpoint for fetching Winnerdata
      .then((response) => {
        setWinnerData(response.data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  const handleCheckboxChange = (winnerIndex, userIndex) => {

    const updatedWinnerData = [...winnerData];

    updatedWinnerData[winnerIndex].selectedData[userIndex].selected = !updatedWinnerData[winnerIndex].selectedData[userIndex].selected;

    setWinnerData(updatedWinnerData);
  };

  const handleActionButtonClick = () => {
 
    const selectedDataToSave = winnerData.flatMap((winner) =>
      winner.selectedData.filter((user) => user.selected)
    );
  
   
    axios
      .post('http://localhost:5000/saveGiftData', {
        selectedData: selectedDataToSave,
        selectedGift: customGift,
      })
      .then((response) => {
        console.log('Data saved successfully:', response.data);
        alert('Data saved successfully');
      })
      .catch((error) => {
        console.error('Error saving data:', error);
      });
  };
  
  const handleGiftSelectChange = (event, winnerIndex, userIndex) => {
    const selectedGiftValue = event.target.value;
  
  
    const updatedWinnerData = [...winnerData];
    updatedWinnerData[winnerIndex].selectedData[userIndex].selectedGift = selectedGiftValue;
    setWinnerData(updatedWinnerData);
  };
  

  const isDateInCurrentWeek = (date) => {
    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);
  
    const startOfWeek = new Date(currentDate);
    startOfWeek.setDate(currentDate.getDate() - currentDate.getDay());
  
    const endOfWeek = new Date(currentDate);
    endOfWeek.setDate(currentDate.getDate() + (6 - currentDate.getDay()));
  
    return date >= startOfWeek && date <= endOfWeek;
  };
  

  return (
    <div>
      <Header />
      <h2 className="text-2xl font-bold mb-4 text-center mt-7">Announce Winners</h2>
      <button
        onClick={handleActionButtonClick}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded m-4"
      >
        Save data
      </button>
      <div className="bg-white shadow-md rounded my-6">
        <table className="w-full table-auto">
          <thead>
            <tr className="bg-gray-200 uppercase text-sm leading-normal">
              <th className="py-3 px-6 text-left text-lg">Current Date</th>
              <th className="py-3 px-6 text-left text-lg">Selected Data</th>
            </tr>
          </thead>
          <tbody className="text-gray-600 text-sm font-light">
            {winnerData.map((winner, index) => (
              <tr key={index} className="border-b border-gray-200">
                <td className=" text-left font-semibold text-sm">{winner.currentDate}</td>
                <td className="py-3 px-6 text-left font-semibold text-md">
               
                  <table className="w-full">
                    <thead>
                      <tr className="bg-gray-200">
                        <th className="py-2 px-4 text-left font-semibold">User ID</th>
                        <th className="py-2 px-4 text-left font-semibold">Username</th>
                        <th className="py-2 px-4 text-left font-semibold">Address</th>
                        <th className="py-2 px-4 text-left font-semibold">Phone</th>
                        <th className="py-2 px-4 text-left font-semibold">Lottery Purchases</th>
                        <th className="py-2 px-4 text-left font-semibold">Gift</th>
                        <th className="py-2 px-4 text-left font-semibold">Action</th>
                     
                      </tr>
                   
                    </thead>
                    <tbody>
                      {winner.selectedData.map((user, userIndex) => (
                        <tr key={userIndex} className="bg-gray-100">
                          <td className="py-2 px-4">{user.uid}</td>
                          <td className="py-2 px-4">{user.username}</td>
                          <td className="py-2 px-4">{user.address}</td>
                          <td className="py-2 px-4">{user.phone}</td>
                          <td className="py-3 px-6 text-left font-semibold text-md">
                          {user.lotteryPurchased.map((lottery, index) => {
                const purchaseDate = new Date(lottery.lotteryBoughtOn._seconds * 1000);

              
                if (isDateInCurrentWeek(purchaseDate)) {
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
                          <td className="py-2 px-4">
 
    <select
      value={user.selectedGift || selectedGift}
      onChange={(event) => handleGiftSelectChange(event, index, userIndex)}
    >
      <GiftOptions />
    </select>

</td>


                          <td className="py-2 px-4">
                            <input
                              type="checkbox"
                              checked={user.selected}
                              onChange={() => handleCheckboxChange(index, userIndex)}
                            />
                        
                          </td>
                      

                        </tr>
                        

                      ))}
                
                    </tbody>
                    
                  </table>
                 
                </td>
              </tr>
            ))}
            
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AnnounceWinners;