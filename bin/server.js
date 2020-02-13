const app = require('../src/app');
const debug = require("debug")("corassa:server");
const http = require("http");


const port = searchPort(process.env.PORT || 3000);
app.set("port", port);

const server = http.createServer(app);



server.listen(port);
server.on('error', displayError);
server.on('listening', onListening);
console.log("API FUNCIONANDO NA PORTA: " + port);

function searchPort(val) {
  const port = parseInt(val, 10);

  if (isNaN(port)) {
    return val;
  }

  if (port >= 0) {
    return port;
  }
  return false;
}

function onListening(){
  const addr = server.address();
  const bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port;
  debug('Listening on ' + bind);
}

function displayError(error){
  if( error.sysca11 !== 'listen') {
    throw error;
  }

  const bind = typeof port === 'string' ?
    'Pipe ' + port :
    'Port ' + port;

  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}
