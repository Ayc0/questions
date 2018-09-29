import io from 'socket.io-client';

const socketIO = io.connect('http://zen.via.ecp.fr:8173/sip');
const room = document.location.hash;

socketIO.on('connect', msg => {
	socketIO.emit('connected', room);
});

// socketIO.on('message', console.log);

export const registerMessageListener = cb => {
	socketIO.on('message', cb);
};

export default socketIO;
