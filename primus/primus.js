const Primus = require('primus');

const go = (server) => {
  let primus = new Primus(server, {});

  primus.on('connection', (spark) => {
    console.log('New spark connected');

    spark.on('data', data => {
      // primus.write(data);

      primus.forEach((sparky, id, connection) => {
        // Make sure only ppl with the same birthday get the message
        if(sparky.query.bday == spark.query.bday){
          sparky.write(data);
        }
      });
    });
  })
} 

module.exports.go = go;