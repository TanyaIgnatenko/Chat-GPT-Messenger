import {useState, useEffect, useCallback} from 'react';
import { useLiveQuery } from 'dexie-react-hooks';

import ChatsList from './components/ChatsList';
import Messages from './components/Messages';
import { db } from './models/db';
import { Chat } from './models/Chat';
import ReactGA from './analytics';

import './App.css';

function App() {
  useEffect(() => {
    ReactGA.send('pageview');
  }, []);

  const [activeChatId, setActiveChatId] = useState<number>(0);
  const chats = (useLiveQuery(() => db.chats.toArray(), [], []));

  useEffect(() => {
    if (chats.length) {
      setActiveChatId(chats[chats.length - 1].id!!);
    }
  }, [chats]);

  const handleActiveChatChange = useCallback((id: number) => {
    setActiveChatId(id);
  }, []);

  return (
    <div className="container">
      <ChatsList chats={chats} activeChatId={activeChatId} onActiveChatChange={handleActiveChatChange} />
      <Messages chatId={activeChatId} />
    </div>
  );
}

export default App;
