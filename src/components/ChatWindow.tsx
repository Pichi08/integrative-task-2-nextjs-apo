import React from 'react';
import MessageInput from './MessageInput';

interface Message {
  id: string;
  text: string;
  timestamp: string; // Fecha y hora en formato ISO 8601
  sender: 'user' | 'bot'; // Indica quién envió el mensaje
}

interface ChatWindowProps {
  conversationId: string | null;
  messages: Message[];
  onSendMessage: (message: string) => void;
}

const ChatWindow: React.FC<ChatWindowProps> = ({ conversationId, messages, onSendMessage }) => {
  if (!conversationId) {
    return <div className="chat-window p-4">Selecciona o crea una nueva conversación</div>;
  }

  return (
    <div className="chat-window flex flex-col p-4 bg-gray-100 h-full">
      <div className="messages flex-1 overflow-y-auto">
        {messages.length === 0 && (
          <p className="text-gray-500">No hay mensajes en esta conversación.</p>
        )}
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${
              msg.sender === 'user' ? 'justify-end' : 'justify-start' // Alinea el bloque completo
            }`}
          >
            <div
              className={`message max-w-lg p-3 rounded-lg mb-3 ${
                msg.sender === 'user'
                  ? 'bg-blue-500 text-white' // Mensajes del usuario (derecha)
                  : 'bg-gray-300 text-black' // Mensajes del chatbot (izquierda)
              }`}
            >
              <p className="text-sm">{msg.text}</p>
              <span className="text-xs text-black mt-1 block">
                {new Date(msg.timestamp).toLocaleString()}
              </span>
            </div>
          </div>
        ))}
      </div>
      <MessageInput onSendMessage={onSendMessage} />
    </div>
  );
};

export default ChatWindow;
