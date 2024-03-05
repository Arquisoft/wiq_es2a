class SPARQLQueryDispatcher {
	constructor( endpoint ) {
		this.endpoint = endpoint;
	}

	query( sparqlQuery ) {
		const fullUrl = this.endpoint + '?query=' + encodeURIComponent( sparqlQuery );
		const headers = { 'Accept': 'application/sparql-results+json' };

		return fetch( fullUrl, { headers } ).then( body => body.json() );
	}
}

const endpointUrl = 'https://query.wikidata.org/sparql';
const sparqlQuery = `
SELECT ?directorLabel WHERE {
  ?director wdt:P31 wd:Q2526255;
  SERVICE wikibase:label { bd:serviceParam wikibase:language "[AUTO_LANGUAGE],es". }
} LIMIT 100
`;

const queryDispatcher = new SPARQLQueryDispatcher( endpointUrl );
queryDispatcher.query( sparqlQuery ).then( console.log );