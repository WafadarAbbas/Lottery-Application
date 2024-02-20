const express = require('express');
const bodyParser = require('body-parser');
const admin = require('firebase-admin');
const cors = require('cors');
const serviceAccount = require('../Server/JeetkJeo.json'); 

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());



admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://console.firebase.google.com/u/0/project/jeetkjeo-a23d3/firestore/data/~2F', 
 });

// --------------------FireBase--------------------------

const db = admin.firestore(); // Initialize Firestore

app.delete('/lotteryHistory/:id', async (req, res) => {
  const lotteryIdToDelete = req.params.id;

  try {
    // Delete the document with the specified ID from the "createlottery" collection
    const lotteryDataCollection = db.collection('createlottery');
    const snapshot = await lotteryDataCollection.where('id', '==', lotteryIdToDelete).get();

    if (snapshot.empty) {
      res.status(404).json({ message: 'Lottery entry not found' });
      return;
    }

    // Assuming there is only one document with the same ID
    const docToDelete = snapshot.docs[0];
    await docToDelete.ref.delete();

    res.status(200).json({ message: 'Lottery entry deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error deleting lottery entry from Firestore' });
  }
});



app.post('/saveWinnerData', async (req, res) => {
  try {
    const { currentDate, selectedData } = req.body;

    // Create a new document in the "Winnerdata" collection
    const winnerDataCollection = db.collection('Winnerdata');
    await winnerDataCollection.add({
      currentDate,
      selectedData,
    });

    res.status(200).json({ message: 'Data saved to Firestore successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error saving data to Firestore' });
});

app.get('/getWinnerData', async (req, res) => {
  try {
    const winnerDataCollection = db.collection('Winnerdata');
    const snapshot = await winnerDataCollection.get();

    const winnerData = [];
    snapshot.forEach((doc) => {
      const data = doc.data();
      winnerData.push(data);
    });

    res.status(200).json(winnerData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching winner data from Firestore' });
  }
});




app.get('/getusers', async (req, res) => {
  try {
    const pracDataCollection = db.collection('users');
    const snapshot = await pracDataCollection.get();

    const pracData = [];
    snapshot.forEach((doc) => {
      const data = doc.data();
      pracData.push(data);
    });

    res.status(200).json(pracData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching pracData from Firestore' });
  }
});


app.post('/saveGiftData', async (req, res) => {
  try {
    const { selectedData, selectedGift } = req.body;

    // Create a new document in the "SelectedData" collection (you can replace this with your actual collection name)
    const selectedDataCollection = db.collection('userGift'); // Replace with your collection name
    await selectedDataCollection.add({
      selectedData,
      selectedGift, // Save the selected gift
      timestamp: admin.firestore.FieldValue.serverTimestamp(), // Optionally, add a timestamp
    });

    res.status(200).json({ message: 'Selected data and gift saved to Firestore successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error saving selected data and gift to Firestore' });
  }
});







app.listen(5000, () => {
  console.log(`Backend Running At Port 5000`);
});
