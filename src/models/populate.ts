import { db } from "./db";

export async function populate() {
  const chatId = await db.chats.add({
    title: "New Chat"
  });
  await db.messages.bulkAdd([
    {
      chatId,
      content: {
        text: 'Enter your message to start a chat. This could be a question, a statement, a text and an image.'
      },
      role: 'assistant'
    }
  ]);
}
