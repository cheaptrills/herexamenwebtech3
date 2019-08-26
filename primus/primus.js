const Primus = require('primus');

const go = (server) => {
  let primus = new Primus(server, {});

  primus.on('connection', (spark) => {
    console.log('New spark connected');

    spark.on('data', data => {
      console.log(data);
      primus.write(data);
    });
  })
} 

module.exports.go = go;