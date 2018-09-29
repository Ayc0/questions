import { h, Component, Fragment } from 'preact';
import produce from 'immer';

import Input from '../components/Input';

import { registerMessageListener } from '../utils/socket';

class Thread extends Component {
	constructor(props) {
		super(props);

		this.state = { messages: [] };

		registerMessageListener(({ message, replyTo }) => {
			if (replyTo === this.props.threadId) {
				this.setState(
					produce(draft => {
						draft.messages.push(message);
					})
				);
			}
		});
	}
	render({}, { messages }) {
		return (
			<Fragment>
				{(messages.length || null) && (
					<ul>
						{messages.map(message => (
							<li key={message}>{message}</li>
						))}
					</ul>
				)}

				<Input />
			</Fragment>
		);
	}
}

export default Thread;
