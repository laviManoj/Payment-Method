const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

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
  name: String,
  email: String
});

const DataModel = mongoose.model('Data', DataSchema);

// Middleware to parse incoming JSON data
app.use(bodyParser.json());

// POST route to store data in the database
app.post('/add-data', async (req, res) => {
  try {
    const { name, email } = req.body;

    // Create a new data document
    const newData = new DataModel({ name, email });
    
    console.log(newData);
    // Save the document to the database
    await newData.save();
    
    res.status(201).json({ message: 'Data stored successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Error storing data' });
  }
});

app.get('/get-data',async(req,res)=>{

    const manoj =  await DataModel.find(); 
        console.log(manoj);
})

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
