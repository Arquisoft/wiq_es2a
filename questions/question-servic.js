import { readFile } from 'fs/promises'

// leemos el archivo usando top-level await y con
// codificación utf-8
const file = await readFile('./baseQuestions.json', 'utf-8')

const json = JSON.parse(file)

const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const bodyParser = require('body-parser');
const Question = require('./question-model')

const app = express();
const port = 8001;

// Middleware to parse JSON in request body
app.use(bodyParser.json());

// Connect to MongoDB
const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/userdb';
mongoose.connect(mongoUri);

for (const question of json.questions) {
    const newQuestion = new Question({
      id: question.id,  
      text: question.test,
      answers: question.answers
    });
    newQuestion.save((err) => {
      if (err) {
        console.error('Error al guardar la pregunta:', err);
      } else {
        console.log('Pregunta guardada correctamente:', newQuestion);
      }
    });
  }


const server = app.listen(port, () => {
    console.log(`User Service listening at http://localhost:${port}`);
  });
  
  // Listen for the 'close' event on the Express.js server
  server.on('close', () => {
      // Close the Mongoose connection
      mongoose.connection.close();
    });
  
  module.exports = server