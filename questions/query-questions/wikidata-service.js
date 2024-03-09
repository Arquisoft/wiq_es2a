const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const bodyParser = require('body-parser');
const fs = require('fs');
const Wikidata = require('./wikidata-query');

const app = express();
const port = 8005;

const jsonPreg={
  text:'¿Cual es la capital de',
  queryCorrect:'SELECT ?countryLabel ?capitalLabel WHERE {' + 
    '?country wdt:P31 wd:Q6256. ?country wdt:P36 ?capital. SERVICE wikibase:label { bd:serviceParam wikibase:language "[AUTO_LANGUAGE],es".}}',
  queryIncorrect:'SELECT ?capitalLabel WHERE { ?capital wdt:P31 wd:Q5119. SERVICE wikibase:label { bd:serviceParam wikibase:language "[AUTO_LANGUAGE],es". }}'
};

//const json = JSON.parse(jsonPreg);

const wiki = new Wikidata();


// Middleware to parse JSON in request body
app.use(bodyParser.json());

// Connect to MongoDB
const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/questiondb';
mongoose.connect(mongoUri);

// fs.readFile('baseQuestions.json', 'utf-8', (err, file) => {
//   if (err) {
//     console.error('Error al leer el archivo:', err);
//     return;
//   }
//   const json = JSON.parse(file);
// });

app.post("/randomQuest", async (req, res) => {
  // try {
  //   const newQuestion = new Question({ 
  //     text: "hola",
  //   });
  //   await newQuestion.save();
  //   res.json(newQuestion);
  //   console.log('Pregunta guardada correctamente:', newQuestion);
  // } catch (error) {
  //   console.error('Error al guardar la pregunta:', err);
  // }
  wiki.query(jsonPreg.queryCorrect).then( function (value) {
    console.log(value.results.bindings[random]); // Success!
  },
  function (reason) {
    console.log(reason); // Error!
  },
  );
  // let response ={
  //   pais: results.value.results.bindings[random],
  //   respuestas: value.results.bindings[random]
  // }

  // res.render("lapagina", response)
});





const server = app.listen(port, () => {
    console.log(`User Service listening at http://localhost:${port}`);
  });
  
  // Listen for the 'close' event on the Express.js server
  server.on('close', () => {
      // Close the Mongoose connection
      mongoose.connection.close();
    });
  
  module.exports = server