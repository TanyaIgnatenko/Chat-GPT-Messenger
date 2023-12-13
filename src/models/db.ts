import Dexie, { Table } from 'dexie';
import { populate } from './populate';
import { Chat } from './Chat';
import { Message } from './Message';

export class MessengerDB extends Dexie {
  chats!: Table<Chat, number>;
  messages!: Table<Message, number>;
  constructor() {
    super('MessengerDB');
    this.version(1).stores({
      chats: '++id',
      messages: '++id, chatId'
    });
  }

  deleteChat(chatId: number) {
    return this.transaction('rw', this.messages, this.chats, () => {
      this.messages.where({ chatId }).delete();
      this.chats.delete(chatId);
    });
  }
}

export const db = new MessengerDB();

db.on('populate', populate);

export function resetDatabase() {
  return db.transaction('rw', db.chats, db.messages, async () => {
    await Promise.all(db.tables.map(table => table.clear()));
    await populate();
  });
}
