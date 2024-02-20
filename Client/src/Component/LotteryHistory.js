import React, { useEffect, useState } from 'react';
import axios from 'axios';

import Header from './Header';
// import moment from 'moment';
import { toast } from 'react-toastify';




function LotteryHistory() {
  const calculateRemainingTime = (endingDate) => {
  //   const now = moment();
  //   const end = moment(endingDate);
  //   const duration = moment.duration(end.diff(now));
  
  //   const days = Math.floor(duration.asDays());
  //   const hours = duration.hours();
  //   const minutes = duration.minutes();
  
  //   return `${days} days ${hours} hours ${minutes} minutes `;
   };

  


  const [historyData, setHistoryData] = useState([]);


  useEffect(() => {

    axios.get('http://localhost:5000/getLotteryData')
      .then((response) => {
        setHistoryData(response.data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);







  const handleCheckboxChange = (index) => {
    // const updatedData = [...historyData];
    // updatedData[index].completed = !updatedData[index].completed;
    // setHistoryData(updatedData);


    // if (updatedData[index].completed) {
    //   const endingDate = updatedData[index].endingDate;
    //   const now = moment();
    //   const end = moment(endingDate);
      
    //   if (now.isAfter(end)) {
 
    //     toast.info("The ending time has completed!", {
    //       position: toast.POSITION.TOP_CENTER,
    //       autoClose: 2000,
    //     });
    //   }
    // }
  };

  const handleDeleteClick = (index) => {
    const lotteryIdToDelete = historyData[index].id;
  
    axios.delete(`http://localhost:5000/lotteryHistory/${lotteryIdToDelete}`)
      .then(() => {

        const updatedData = [...historyData];
        updatedData.splice(index, 1);
        setHistoryData(updatedData);
      })
      .catch((error) => {
        console.error(error);
      });
  };
  
  return (
    <div>
      <Header />
      <div className="m-20">
        <h2 className="text-2xl font-bold mb-4 text-center">Lottery History</h2>
        <hr />
        <hr />
        <table className="w-full table-auto">
          <thead>
            <tr>
              <th className="px-4 py-2">Lottery ID</th>
              <th className="px-4 py-2">Starting Date</th>
              <th className="px-4 py-2">Ending Date</th>
              <th className="px-4 py-2">Completed IN</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {historyData.map((lottery, index) => (
              <tr key={index}>
                <td className="border px-4 py-2 text-center">{lottery.id}</td>
                <td className="border px-4 py-2 text-center">{lottery.startingDate}</td>
                <td className="border px-4 py-2 text-center">{lottery.endingDate}</td>
                <td className="border px-4 py-2 text-center">
                  {calculateRemainingTime(lottery.endingDate)}
                </td>
                <td className="border px-4 py-2 text-center">
                  <input
                    type="checkbox"
                    checked={lottery.completed}
                    onChange={() => handleCheckboxChange(index)}
                  />
                  <label> Is completed</label>
                </td>
                <td className="border px-4 py-2 text-center">
                  {lottery.completed && (
                    <button
                      onClick={() => handleDeleteClick(index)}
                      className="text-white bg-red-600 p-1 rounded-xl"
                    >
                      Delete
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default LotteryHistory;
