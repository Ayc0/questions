const http = require('http');
const socketIO = require('socket.io');

const server = () => {};
const app = http.createServer(server);
app.listen(8179);

const io = socketIO(app).of('/sip');

io.on('connection', socket => {
	socket.on('connected', room => {
		socket.join(room);
	});

	socket.on('message', ({ room, message, replyTo, sentAt }) => {
		io.in(room).emit('message', { message, replyTo, sentAt });
	});
});
