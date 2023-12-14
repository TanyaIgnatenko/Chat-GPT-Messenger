import {useCallback, useMemo} from 'react';
import AddIcon from '@mui/icons-material/Add';

import ChatView from './ChatView';
import { Chat } from '../models/Chat'; 
import { db } from '../models/db';

import './ChatsList.css';

interface Props {
    chats: Chat[];
    activeChatId: number;
    onActiveChatChange: (id: number) => void;
}

function ChatsList({
    chats,
    activeChatId,
    onActiveChatChange,
}: Props) {
    const handleCreateNewChat = useCallback(() => {
        db.chats.add({ title: `New chat ${(chats.length) ? chats.length : ''}`});
    }, [chats]);

    const sortedChats = useMemo(() => {
        return chats.toReversed();
    }, [chats]);

    return (
        <div className="chats-panel">
            <button 
                onClick={handleCreateNewChat} 
                className="new-chat-button"
            >
                <AddIcon sx={{ color: '#272727', fontSize: 16, marginRight: '7px', }}/> 
                New Chat
            </button>
            {
                sortedChats.map(chat => (
                        <ChatView key={chat.id} chat={chat} isActive={chat.id === activeChatId} onClick={onActiveChatChange} />
                    )
                )
            }
        </div>
    )
}

export default ChatsList;