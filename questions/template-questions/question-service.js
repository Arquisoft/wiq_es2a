const express = require('express');
const bodyParser = require('body-parser');
const Wikidata = require('./wikidata-query');

const app = express();
const port = 8004;

const jsonPreg={
  text:'¿Cuál es la capital de',
  queryCorrect:'SELECT ?countryLabel ?capitalLabel WHERE {' + 
    '?country wdt:P31 wd:Q6256. ?country wdt:P36 ?capital. SERVICE wikibase:label { bd:serviceParam wikibase:language "[AUTO_LANGUAGE],es".}}',
  queryIncorrect:'SELECT ?capitalLabel WHERE { ?capital wdt:P31 wd:Q5119. SERVICE wikibase:label { bd:serviceParam wikibase:language "[AUTO_LANGUAGE],es". }}'
};

//const json = JSON.parse(jsonPreg);

const wiki = new Wikidata();


// Middleware to parse JSON in request body
app.use(bodyParser.json());

app.post("/questions", async (req, res) => {
  try {
    let resultadosGuardados;
    console.log("entra post random questions");
    wiki.ejecutarConsultaSPARQL(jsonPreg.queryCorrect)
      .then((resultados) => {
        let size = resultados.results.bindings.length;
        let random = Math.floor(Math.random() * size);
              let randoms = [];
              while (randoms.length < 3) {
                let numero = Math.floor(Math.random() * size);
                if (!randoms.includes(numero) && numero!=random) {
                  randoms.push(numero);
                }
              }
              resultadosGuardados = {
                pregunta: jsonPreg.text + ' ' +resultados.results.bindings[random].countryLabel.value + '?',
                correcta: resultados.results.bindings[random].capitalLabel.value,
                incorrectas: [
                  resultados.results.bindings[randoms[0]].capitalLabel.value,
                  resultados.results.bindings[randoms[1]].capitalLabel.value,
                  resultados.results.bindings[randoms[2]].capitalLabel.value
                ]
              }
            
              console.log(resultadosGuardados.incorrectas);
              console.log(resultados.results.bindings[randoms[0]].capitalLabel.value);
              console.log(resultados.results.bindings[randoms[1]].capitalLabel.value);
              console.log(resultados.results.bindings[randoms[2]].capitalLabel.value);
          
        res.send(resultadosGuardados);
   })
    .catch((error) => {
      console.error('Error al ejecutar la consulta:', error);
  });
    
  } catch (error) {
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