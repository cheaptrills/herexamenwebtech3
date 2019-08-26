const Primus = require('primus');


const go = (server) => {
  let primus = new Primus(server, {});

  primus.on('connection', (spark) => {
    console.log('New spark connected');
  })
} 

module.exports.go = go;