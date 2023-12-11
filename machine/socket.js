const io = require('socket.io-client');
const { URL } = process.env;

const socket = class {

    constructor() {

        this.socket = io.connect(URL, {reconnect: true});
        
        this.socket.on('connect', (socket) => {
            console.log('Connected!');
        });
        
        this.socket.on('document', (data) => {
            console.log(data);
        });
    }

    getDocument(code) {
        this.socket.emit('document', code);
    }

}

module.exports = new socket();
