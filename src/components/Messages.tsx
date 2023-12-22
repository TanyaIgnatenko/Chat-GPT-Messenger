import { useState, useCallback } from 'react';
import { useLiveQuery } from 'dexie-react-hooks';
import Alert from '@mui/material/Alert';

import Message from './Message';
import API from '../api';
import { db } from '../models/db';

import './Messages.css';

interface Props {
    chatId: number;
}

function resizeTextarea(textarea) {
    textarea.style.height = 0;
    textarea.style.height = textarea.scrollHeight + 'px';
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

    const handlePromptChange = useCallback((e) => {
        setPrompt(e.target.value);
        resizeTextarea(e.target);
    })

    return (
        <div className="messages-panel">
            <div className="messages">
                {
                    messages.map(m => (
                        <Message key={m.id} message={m} />
                    ))
                }
            </div>
            <div className="bottom-part">
                {isFetchError && <Alert severity="error">Failed to fetch</Alert>}
                <div className="add-prompt-container">
                    <textarea 
                        placeholder="Write a prompt..."
                        value={prompt}
                        onChange={handlePromptChange}
                        className="add-prompt-textarea"
                        rows={1}
                    />
                    <button onClick={handleSendPrompt} className="send-button" aria-label="Send prompt" />
                </div>
            </div>
        </div>
    );
}

export default Messages;