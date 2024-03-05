const WBK = require('wikibase-sdk')
const wdk = WBK({
  instance: 'https://www.wikidata.org',
  sparqlEndpoint: 'https://query.wikidata.org/sparql'
})
const sparql = 'SELECT * WHERE { ?s ?p ?o } LIMIT 10'
const url = wdk.sparqlQuery(sparql)
result = request({ method: 'GET', url})

print(result);