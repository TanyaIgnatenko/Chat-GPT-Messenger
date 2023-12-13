export interface Message {
    id?: number;
    chatId: number;
    role: 'user' | 'assistant';
    content: {
        text: string;
    }
}
  