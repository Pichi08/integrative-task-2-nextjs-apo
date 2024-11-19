'use client'

import Header from '@/components/Headers';
import Head from 'next/head';
import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import ConversationList from '../components/ConversationList';
import ChatWindow from '../components/ChatWindow';

interface Conversation {
  id: string;
  name: string;
}

interface Message {
  id: string;
  text: string;
  timestamp: string; // Fecha y hora en formato ISO 8601
  sender: 'user' | 'bot'; // Indica quién envió el mensaje
}

interface MessagesByConversation {
  [conversationId: string]: Message[];
}

// Simula una llamada al backend
const sendMessageToBackend = async (text: string): Promise<Message> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        id: uuidv4(),
        text,
        timestamp: new Date().toISOString(), // Fecha generada en el "backend"
        sender: 'user',
      });
    }, 500); // Simula un retraso en la respuesta
  });
};

export default function Home() {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [selectedConversation, setSelectedConversation] = useState<string | null>(null);
  const [messagesByConversation, setMessagesByConversation] = useState<MessagesByConversation>({});

  const handleNewConversation = () => {
    const newId = uuidv4();
    const newConversation: Conversation = {
      id: newId,
      name: `Conversación ${conversations.length + 1}`,
    };
    setConversations([...conversations, newConversation]);
    setMessagesByConversation({ ...messagesByConversation, [newId]: [] });
    setSelectedConversation(newId);
  };

  const handleSendMessage = async (text: string) => {
    if (!selectedConversation) return;

    // Mensaje del usuario
    const userMessage: Message = {
      id: uuidv4(),
      text,
      timestamp: new Date().toISOString(),
      sender: 'user', // Tipo literal explícito
    };
    setMessagesByConversation((prev) => ({
      ...prev,
      [selectedConversation]: [...(prev[selectedConversation] || []), userMessage],
    }));

    // Simula una respuesta del chatbot
    setTimeout(() => {
      const botMessage: Message = {
        id: uuidv4(),
        text: `Hola, soy el chatbot. Recibí tu mensaje: "${text}"`,
        timestamp: new Date().toISOString(),
        sender: 'bot', // Tipo literal explícito
      };
      setMessagesByConversation((prev) => ({
        ...prev,
        [selectedConversation]: [...(prev[selectedConversation] || []), botMessage],
      }));
    }, 1000); // Retraso de 1 segundo para simular una respuesta del bot
  };

  return (
    <>
      <Head>
        <title>Chatbot Messenger</title>
        <meta name="description" content="Página de mensajería interactiva con chatbot" />
      </Head>
      <div className="messaging-app flex h-screen">
        <aside className="sidebar bg-gray-200 w-1/4 p-4">
          <ConversationList
            conversations={conversations}
            onSelectConversation={setSelectedConversation}
            onNewConversation={handleNewConversation}
          />
        </aside>
        <main className="chat-container flex-1 flex flex-col">
          <Header />
          <ChatWindow
            conversationId={selectedConversation}
            messages={selectedConversation ? messagesByConversation[selectedConversation] : []}
            onSendMessage={handleSendMessage}
          />
        </main>
      </div>
    </>
  );
}
