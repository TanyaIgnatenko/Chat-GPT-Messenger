import { useState, useCallback } from 'react';
import { useLiveQuery } from 'dexie-react-hooks';
import cn from 'classnames';

import { db } from '../models/db';

import './Messages.css';

interface Props {
    chatId: number;
}

function Messages({chatId}: Props) {
    const messages = useLiveQuery(() => db.messages.where({chatId}).toArray(), [chatId], []);
    const [prompt, setPrompt] = useState('');

    const handleSendPrompt = useCallback(async () => {
        await db.messages.add({
            chatId,
            role: 'user',
            content: {
                text: prompt,
            }
        });
        setPrompt('');
    }, [prompt]);

    return (
        <div className="messages-panel">
            <div className="messages">
                {
                    messages.map(m => (
                        <div className={cn('message', {
                            'user-message': m.role === 'user',
                        })}>
                            {m.content.text}
                        </div>
                    ))
                }
            </div>
            <div className="add-prompt-container">
                <textarea placeholder="Write a prompt..." value={prompt} onChange={(e) => setPrompt(e.target.value)} className="add-prompt-textarea" />
                <button onClick={handleSendPrompt} className="send-button" aria-label="Send prompt" />
            </div>
        </div>
    );
}

export default Messages;