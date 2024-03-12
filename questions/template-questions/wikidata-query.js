
class Wikidata {
	
	
	async ejecutarConsultaSPARQL(query) {
		try {
			const axios = require('axios');
		  // URL del punto de acceso SPARQL de Wikidata
		  const endpointUrl = 'https://query.wikidata.org/sparql';
	  
		  // Cabeceras de la solicitud HTTP
		  const headers = {
			'User-Agent': 'TuUsuario/1.0 (correo@example.com)',
			'Accept': 'application/json',
		  };
	  
		  // Parámetros de la solicitud
		  const params = {
			format: 'json',
			query: query,
		  };
	  
		  // Realizar la solicitud SPARQL a Wikidata
		  const response = await axios.get(endpointUrl, { params, headers });
	  
		  // Devolver los resultados
		  return response.data;
		} catch (error) {
		  console.error('Error al realizar la consulta SPARQL:', error);
		  throw error;
		}
	  }
}

module.exports = Wikidata;

/* const random = Math.floor(Math.random() * 100)
const endpointUrl = 'https://query.wikidata.org/sparql';
const sparqlQuery = `
SELECT ?filmLabel ?directorLabel WHERE {
  ?film wdt:P31 wd:Q11424;
    wdt:P57 ?director.
  SERVICE wikibase:label { bd:serviceParam wikibase:language "[AUTO_LANGUAGE],es". }
}
LIMIT 100
`;

const queryDispatcher = new SPARQLQueryDispatcher( endpointUrl );
const query= queryDispatcher.query( sparqlQuery ).then( function (value) {
  console.log(value.results.bindings[random]); // Success!
},
function (reason) {
  console.log(reason); // Error!
},
); */