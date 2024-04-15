// record-service.js
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const Record = require('./record-model')

const app = express();
const port = 8003;

// Middleware to parse JSON in request body
app.use(bodyParser.json());

// Connect to MongoDB
const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/recorddb';
mongoose.connect(mongoUri);


// Function to validate required fields in the request body
function validateRequiredFields(req, requiredFields) {
    for (const field of requiredFields) {
      if (!(field in req.body)) {
        throw new Error(`Missing required field: ${field}`);
      }
    }
}

app.post('/addRecord', async (req, res) => {
    try {
        // Check if required fields are present in the request body
        validateRequiredFields(req, ['user_id', 'correctQuestions','totalQuestions', 'totalTime']);

        const newRecord = new Record({
            user_id: req.body.user_id,
            correctQuestions: req.body.correctQuestions,
            totalQuestions: req.body.totalQuestions,
            totalTime: req.body.totalTime
        });

        await newRecord.save();
        res.json(newRecord);
    } catch (error) {
        res.status(400).json({ error: error.message }); 
    }});

  app.post('/getRecords', async (req, res) => {
    try {
        const username = req.body.username;
        const records = await Record.find({ user_id: username }).sort({doneAt: -1});
        
        res.json(records);
    } catch (error) {
        res.status(400).json({ error: error.message }); 
    }});

const server = app.listen(port, () => {
  console.log(`User Service listening at http://localhost:${port}`);
});


server.on('close', () => {
    mongoose.connection.close();
  });

module.exports = server