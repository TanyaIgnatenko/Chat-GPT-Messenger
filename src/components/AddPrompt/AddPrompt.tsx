import { useCallback, useState, ChangeEvent } from 'react';
import Alert from '@mui/material/Alert';
import cn from 'classnames';

import API from '../../api';
import { db } from '../../models/db';
import { resizeTextarea } from '../../utils/textarea';

import './AddPrompt.css';

interface Props {
    chatId: number;
    className?: string;
}

export default function AddPrompt({chatId, className}: Props) {
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

    const handlePromptChange = useCallback((e: ChangeEvent<HTMLTextAreaElement>) => {
        setPrompt(e.target.value);
        resizeTextarea(e.target);
    }, []);

    return (
        <>
            <div className={cn('add-prompt-wrapper', className)}>
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
        </>
    );
}