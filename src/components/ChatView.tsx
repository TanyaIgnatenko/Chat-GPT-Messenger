import { useCallback } from 'react';
import cn from 'classnames'

import { Chat } from '../models/Chat';
import { db } from '../models/db';

import './ChatView.css';

interface Props {
    chat: Chat;
    isActive: boolean;
    onClick: (id: number) => void;
};

function ChatView({chat, isActive, onClick}: Props) {
    const handleClick = useCallback(() => {
        onClick(chat.id);
    }, []);

    const handleDelete = useCallback(() => {
        db.chats.delete(chat.id);
    }, []);

    return (
        <button 
            onClick={handleClick} 
            className={cn('chat-button', {active: isActive})}
        >
            {chat.title}
            {isActive && (<button onClick={handleDelete} className="delete-button">x</button>)}
        </button>
    );    
}

export default ChatView;