const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const { Double } = require('bson');
const { any } = require('prop-types');

const app = express();
app.use(cors());
const port = 8000;

// Connect to MongoDB (replace 'your_database_url' with your actual MongoDB URL)
mongoose.connect('mongodb+srv://traveller:Manoj1999@traveller.ots9ysb.mongodb.net/test', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

// Define a schema and model for the data
const DataSchema = new mongoose.Schema({
  accountHolderName: String,
  banks: String,
  accountNumber: {type: Number, required: true},
  ifscCode: String
});

const DataModel = mongoose.model('Data', DataSchema);

// Middleware to parse incoming JSON data
app.use(bodyParser.json());

// POST route to store data in the database
app.post('/paymentMethods', async (req, res) => {
  try {
    const datapayment = req.body;
    if (!datapayment.accountNumber) {
      return res.status(400).json({ error: 'accountNumber is required' });
    }

    // Create a new data document
    const newData = new DataModel(datapayment);
    
    // Save the document to the database
    await newData.save();
    
    console.log(newData); // You can choose to log the saved data if needed
    
    res.status(201).json({ message: 'Data stored successfully' });
  } catch (error) {
    console.error(error); // Log the error for debugging purposes
    res.status(500).json({ error: 'Error storing data' });
  }
});

app.get('/paymentMethods', async (req, res) => {
  try {
    // Retrieve all data documents from the database
    const data = await DataModel.find();
    res.status(200).json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error fetching data' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
