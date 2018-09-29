import { h, Component, Fragment } from 'preact';
import produce from 'immer';

import Input from '../components/Input';

import { registerMessageListener } from '../utils/socket';

class App extends Component {
	constructor(props) {
		super(props);

		this.state = { messages: [] };

		registerMessageListener(({ message, replyTo, sentAt }) => {
			if (!replyTo) {
				this.setState(
					produce(draft => {
						draft.messages.push({ message, sentAt });
					})
				);
			}
		});
	}
	render({}, { messages }) {
		return (
			<Fragment>
				<Input />

				{(messages.length || null) && (
					<ul>
						{messages.map(({ message, sentAt }) => (
							<li key={`${sentAt}${message.substring(0, 10)}`}>{message}</li>
						))}
					</ul>
				)}
			</Fragment>
		);
	}
}

export default App;
