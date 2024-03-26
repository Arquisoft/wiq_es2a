
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