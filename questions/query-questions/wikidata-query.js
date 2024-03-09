
class Wikidata {
	constructor( ) {
		this.endpoint = 'https://query.wikidata.org/sparql';
	}

	query( sparqlQuery ) {
		const fullUrl = this.endpoint + '?query=' + encodeURIComponent( sparqlQuery );
		const headers = { 'Accept': 'application/sparql-results+json' };

		return fetch( fullUrl, { headers } ).then( body => body.json() );
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