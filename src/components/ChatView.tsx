import { useCallback, useRef, useState } from 'react';
import cn from 'classnames'
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import {useClickAway} from 'react-use';

import { Chat } from '../models/Chat';
import { db } from '../models/db';

import './ChatView.css';

interface Props {
    chat: Chat;
    isActive: boolean;
    onClick: (id: number) => void;
};

function ChatView({chat, isActive, onClick}: Props) {
    const [chatTitle, setChatTitle] = useState(chat.title);
    const [isEditMode, setIsEditMode] = useState(false);
    const handleClick = useCallback(() => {
        onClick(chat.id);
    }, []);

    const handleEdit = useCallback(() => {
        setIsEditMode(true);
    }, []);

    const handleDelete = useCallback(() => {
        db.chats.delete(chat.id);
    }, []);

    const chatButtonRef = useRef(null);
    useClickAway(chatButtonRef, () => {
        db.chats.update(chat.id, {title: chatTitle});
        setIsEditMode(false);
    });

    return (
        <button 
            onClick={handleClick} 
            className={cn('chat-button', {active: isActive})}
            ref={chatButtonRef}
        >
            <input 
                value={chatTitle} 
                readOnly={!isEditMode}
                onChange={(e) => setChatTitle(e.target.value)}
                className="title-input"
            />
            {isActive && (
                <div className="actions">
                    <button onClick={handleEdit} className="edit-button"><EditIcon sx={{ color: '#676767', fontSize: 16 }} /></button>
                    <button onClick={handleDelete} className="delete-button"><DeleteIcon sx={{ color: '#676767', fontSize: 16 }} /></button>
                </div>
            )}
        </button>
    );    
}

export default ChatView;
