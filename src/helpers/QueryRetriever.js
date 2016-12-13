
var QueryRetriever = {};
QueryRetriever.create = function(connectionDetails){
//TODO: Create db instance using connectionDetails
}
QueryRetriever.retrieveQueries = function(queryQueue){
  var queryResults = [];
  for(var query in queryQueue){
    queryResults.push(this._processQuery(query));
  }
  return queryResults;
}
QueryRetriever._processQuery = function(query){
  //TODO: Connect to db and send query/recieve results
  return query + " Processed.";
}
QueryRetriever.destroy = function(){
  //TODO: Close db connection
}
module.exports = QueryRetriever;
