const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const bodyParser = require('body-parser');
const Question = require('./question-model');
const fs = require('fs');

const app = express();
const port = 8001;

// Middleware to parse JSON in request body
//app.use(bodyParser.json());

// Connect to MongoDB
const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/questiondb';
mongoose.connect(mongoUri);

// fs.readFile('baseQuestions.json', 'utf-8', (err, file) => {
//   if (err) {
//     console.error('Error al leer el archivo:', err);
//     return;
//   }
//   const json = JSON.parse(file);

questions =["cual es la capital de:"]

  for (const question of questions) {

    app.post("/questions", async (req, res) => {
      try {
        const newQuestion = new Question({
          id: question.id,  
          text: question.test,
          answers: question.answers
        });
        await newQuestion.save();
        console.log('Pregunta guardada correctamente:', newQuestion);
      } catch (error) {
        console.error('Error al guardar la pregunta:', err);
      }
    });
  }
//});








const server = app.listen(port, () => {
    console.log(`User Service listening at http://localhost:${port}`);
  });
  
  // Listen for the 'close' event on the Express.js server
  server.on('close', () => {
      // Close the Mongoose connection
      mongoose.connection.close();
    });
  
  module.exports = server