var connect = require('connect');
var serveStatic = require('serve-static');
connect().use(serveStatic(__dirname)).listen(8080, function() {
  console.log('Directory = ' + __dirname);
  console.log('*************************');
  console.log('** My Portfolio Site **');
  console.log('*************************');
  console.log('Listening on port 8080...');

});