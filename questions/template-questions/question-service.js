const express = require('express');
const bodyParser = require('body-parser');
const Wikidata = require('./wikidata-query');

const app = express();
const port = 8004;

const jsonPreg = [
  {
    textStart: '¿Cuál es la capital de ',
    textEnd: '?',
    queryCorrect: 'SELECT ?preguntaLabel ?respuestaLabel WHERE {' +
      '?pregunta wdt:P31 wd:Q6256. ?pregunta wdt:P36 ?respuesta. SERVICE wikibase:label { bd:serviceParam wikibase:language "[AUTO_LANGUAGE],es,en".}}'
  },
  {
    textStart: '¿Quién es el director de la película ',
    textEnd: '?',
    queryCorrect: 'SELECT DISTINCT ?preguntaLabel ?respuestaLabel WHERE {' +
      '?pregunta wdt:P31 wd:Q11424.' +
      '?pregunta wdt:P57 ?respuesta.' +
      'SERVICE wikibase:label { bd:serviceParam wikibase:language "[AUTO_LANGUAGE],es,en". }' +
      '} LIMIT 100'
  },
  {
    textStart: '¿Quién es el autor del libro ',
    textEnd: '?',
    queryCorrect: 'SELECT ?preguntaLabel ?respuestaLabel WHERE {' +
      '?pregunta wdt:P31 wd:Q7725634.' +
      '?pregunta wdt:P50 ?respuesta.' +
      'SERVICE wikibase:label { bd:serviceParam wikibase:language "[AUTO_LANGUAGE],es,en". }' +
      '} LIMIT 100'
  },
  {
    textStart: '¿Quién interpreta la canción ',
    textEnd: '?',
    queryCorrect: 'SELECT ?preguntaLabel ?respuestaLabel WHERE {' +
      '?pregunta wdt:P31 wd:Q134556.' +
      '?pregunta wdt:P175 ?respuesta.' +
      'SERVICE wikibase:label { bd:serviceParam wikibase:language "[AUTO_LANGUAGE],es,en". }' +
      '} LIMIT 100'
  },
  {
    textStart: '¿Dónde se encuentra el monumento ',
    textEnd: '?',
    queryCorrect: 'SELECT ?preguntaLabel ?respuestaLabel WHERE {' +
      '?pregunta wdt:P31 wd:Q570116.' +
      '?pregunta wdt:P17 ?respuesta.' +
      'SERVICE wikibase:label { bd:serviceParam wikibase:language "[AUTO_LANGUAGE],es,en". }' +
      '} LIMIT 100'
  },
  {
    textStart: '¿Cuál es la población de ',
    textEnd: '?',
    queryCorrect: 'SELECT DISTINCT ?preguntaLabel ' +
      '(CONCAT(REPLACE(STR((ROUND(?respuesta / 1000) * 1000)), "(\\\\d)(?=(\\\\d{3})+$)", "$1."), "") AS ?respuestaLabel) WHERE {' +
      '?pregunta wdt:P31 wd:Q6256.' +
      '?pregunta wdt:P1082 ?respuesta.' +
      'SERVICE wikibase:label { bd:serviceParam wikibase:language "[AUTO_LANGUAGE],es,en". }}'
  }
  ,
  {
    textStart: '¿Cuál es el gentilicio de ',
    textEnd: '?',
    queryCorrect: 'SELECT DISTINCT ?preguntaLabel ?respuestaLabel WHERE {'+
      '?pregunta wdt:P31 wd:Q2074737; '+
                 'wdt:P17 wd:Q29; '+
                 'wdt:P1549 ?respuesta.'+
      'OPTIONAL { ?respuesta rdfs:label ?respuestaLabel. FILTER(LANG(?respuestaLabel) = "es") }'+
      'SERVICE wikibase:label { bd:serviceParam wikibase:language "[AUTO_LANGUAGE],es,en". }}'
  }
  ,
  {
    textStart: '¿A qué grupo pertenece ',
    textEnd: '?',
    queryCorrect: 'SELECT DISTINCT ?preguntaLabel ?respuestaLabel WHERE {'+
      '?pregunta wdt:P106 wd:Q177220;'+
              ' wdt:P463 ?respuesta.'+
      'SERVICE wikibase:label { '+
        'bd:serviceParam wikibase:language "[AUTO_LANGUAGE],es,en". }} LIMIT 100'
  }
  ,
  {
    textStart: '¿Dónde nació el compositor ',
    textEnd: '?',
    queryCorrect: 'SELECT ?preguntaLabel ?respuestaLabel WHERE {' +
      '?pregunta wdt:P106 wd:Q36834;'+
           ' wdt:P19 ?respuesta.' +
      'SERVICE wikibase:label { bd:serviceParam wikibase:language "es,en" } '+
    '} LIMIT 100'
  }
  ,
  {
    textStart: '¿En qué país se encuentra la atracción turística ',
    textEnd: '?',
    queryCorrect: 'SELECT ?preguntaLabel ?respuestaLabel WHERE {'+
      '?pregunta wdt:P31 wd:Q570116; wdt:P17 ?respuesta.'+
      'SERVICE wikibase:label { bd:serviceParam wikibase:language "[AUTO_LANGUAGE],es,en". }} LIMIT 200'
  }
  ,
  {
    textStart: '¿Cuándo nació ',
    textEnd: '?',
    queryCorrect: 'SELECT ?preguntaLabel ?respuesta WHERE {'+
      '?pregunta wdt:P106 wd:Q33999;'+
             'wdt:P569 ?respuesta .'+
      'SERVICE wikibase:label { bd:serviceParam wikibase:language "[AUTO_LANGUAGE],en". }'+
    '} LIMIT 100'
  }
];

const wiki = new Wikidata();


// Middleware to parse JSON in request body
app.use(bodyParser.json());

app.post("/questions", async (req, res) => {
  try {
    let resultadosGuardados;

    //Escoge un valor aleatorio para escoger la pregunta
    let sizeJson = jsonPreg.length;
    let randQuery= Math.floor(Math.random() * sizeJson);
    wiki.ejecutarConsultaSPARQL(jsonPreg[randQuery].queryCorrect)
      .then((resultados) => {
        //Escoge un valor aleatorio de la consulta para la respuesta correcta
        let size = resultados.results.bindings.length;
        let random = Math.floor(Math.random() * size);

        let incorrectas = [];

        let respuestaCorrecta = resultados.results.bindings[random].respuestaLabel.value;

        // Mientras que el tamaño del array de incorrectas sea menor que 3, sigue añadiendo respuestas incorrectas únicas
        while (incorrectas.length < 3) {
          let randomIndex = Math.floor(Math.random() * size);
          let respuestaIncorrecta = resultados.results.bindings[randomIndex].respuestaLabel.value;
          
          // Si la respuesta incorrecta no está ya en el array de incorrectas y no es igual a la respuesta correcta, añádela
          if (respuestaIncorrecta !== respuestaCorrecta && !incorrectas.includes(respuestaIncorrecta)) {
            incorrectas.push(respuestaIncorrecta);
          }
        }

        resultadosGuardados = {
          pregunta: jsonPreg[randQuery].textStart + resultados.results.bindings[random].preguntaLabel.value + jsonPreg[randQuery].textEnd,
          correcta: respuestaCorrecta,
          incorrectas: incorrectas
        }

        res.send(resultadosGuardados);
      })
      .catch((error) => {
        console.error('Error al ejecutar la consulta:', error);
      });

  } catch (error) { //Catch del try
    console.error("Error:", error); // Maneja el error
    res.status(500).send(error); // Envía una respuesta de error al cliente
  }
});

const server = app.listen(port, () => {
  console.log(`User Service listening at http://localhost:${port}`);
});

// Listen for the 'close' event on the Express.js server
server.on('close', () => {
  // Close the Mongoose connection
  //mongoose.connection.close();
});

module.exports = server