import {useState, useEffect, useCallback} from 'react';
import { useLiveQuery } from 'dexie-react-hooks';

import ChatsList from './components/ChatsList';
import { db } from './models/db';

import './App.css';

function App() {
  const [activeChatId, setActiveChatId] = useState<number>(0);
  const chats = useLiveQuery(() => db.chats.toArray());

  useEffect(() => {
    if (chats) {
      setActiveChatId(chats[chats.length - 1].id);
    }
  }, [chats]);

  const handleActiveChatChange = useCallback((id: number) => {
    setActiveChatId(id);
  }, []);

  return (
    <div>
      <ChatsList chats={chats || []} activeChatId={activeChatId} onActiveChatChange={handleActiveChatChange} />
    </div>
  );
}

export default App;
