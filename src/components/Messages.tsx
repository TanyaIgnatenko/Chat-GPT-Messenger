import { useState, useCallback } from 'react';
import { useLiveQuery } from 'dexie-react-hooks';
import cn from 'classnames';
import Alert from '@mui/material/Alert';

import API from '../api';

import { db } from '../models/db';

import './Messages.css';

interface Props {
    chatId: number;
}

function Messages({chatId}: Props) {
    const messages = useLiveQuery(() => db.messages.where({chatId}).toArray(), [chatId], []);
    const [prompt, setPrompt] = useState('');
    const [isFetchError, setIsFetchError] = useState(false);

    const handleSendPrompt = useCallback(async () => {
        setIsFetchError(false);

        await db.messages.add({
            chatId,
            role: 'user',
            content: {
                text: prompt,
            }
        });
        setPrompt('');

        API.sendPrompt(prompt).then(answer => {
            db.messages.add({
                chatId,
                role: 'assistant',
                content: {
                    text: answer
                }
            });
        })
        .catch(() => {
            setIsFetchError(true);
        })
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
            <div className="bottom-part">
                {isFetchError && <Alert severity="error">Failed to fetch</Alert>}
                <div className="add-prompt-container">
                    <textarea placeholder="Write a prompt..." value={prompt} onChange={(e) => setPrompt(e.target.value)} className="add-prompt-textarea" />
                    <button onClick={handleSendPrompt} className="send-button" aria-label="Send prompt" />
                </div>
            </div>
        </div>
    );
}

export default Messages;