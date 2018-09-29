import { h } from 'preact';

import socket from '../utils/socket';

const room = document.location.hash;

const onSend = replyTo => event => {
	event.preventDefault();
	const textNode = document.getElementById('input');
	const message = textNode.value;
	textNode.value = '';
	socket.emit('message', {
		sentAt: Date.now(),
		room,
		replyTo,
		message
	});
};

const Input = ({ replyTo }) => (
	<form onSubmit={onSend(replyTo)}>
		<input type="text" id="input" autocomplete="off" />
		<button type="submit">Send</button>
	</form>
);

export default Input;
