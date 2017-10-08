var dyson = require('../node_modules/dyson/lib/dyson');

dyson.bootstrap({
  configDir: __dirname + '/services',
  port: 4000
});

// Provided dyson is installed globally,
// the equivalent for this script from the CLI would be: `dyson services`
// http://83.212.101.170:8080/swagger-ui.html DOCS
