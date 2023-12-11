const reciptModel = require('../models/recipt.model');
const referralModel = require('../models/referral.model');

module.exports = (server) => {
    const io = require('socket.io')(server);
    io.on('connection', (socket) => {
        console.log('Connected');
        
        socket.on('document', async (code) => {
          console.log(`Machine try got document for code: ${code}`);

          const tryGetRecipt = await reciptModel.findOne({ code });

          if(tryGetRecipt !== null || tryGetRecipt?.length > 0 )
            return io.emit('document', tryGetRecipt);

          const referral = await referralModel.findOne({ code });
          return io.emit('document', referral);
        });

    });
}