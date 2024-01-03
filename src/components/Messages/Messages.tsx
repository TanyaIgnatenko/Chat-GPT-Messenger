import { useLiveQuery } from 'dexie-react-hooks';

import Message from '../Message/Message';
import { db } from '../../models/db';
import AddPrompt from '../AddPrompt/AddPrompt';

import './Messages.css';

interface Props {
    chatId: number;
}

function Messages({chatId}: Props) {
    const messages = useLiveQuery(() => db.messages.where({chatId}).toArray(), [chatId], []);

    return (
        <div className="messages-panel">
            <div className="messages">
                {
                    messages.map(m => (
                        <Message key={m.id} message={m} />
                    ))
                }
            </div>
            <AddPrompt chatId={chatId} className="bottom-part"/>
        </div>
    );
}

export default Messages;