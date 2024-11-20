'use client'

import Header from '@/components/Headers';
import Head from 'next/head';
import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import ConversationList from '../components/ConversationList';
import ChatWindow from '../components/ChatWindow';
import { SendMessageService } from '../services/sendMessage.service';

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

  const handleSendMessage = async (userMessage: string) => {
    if (!selectedConversation) return;

    const messageService = new SendMessageService('https://integrative-task-2-team.onrender.com'); // Cambia la URL de tu servidor

    // Crear el mensaje del usuario
    const userMessageObj: Message = {
      id: uuidv4(),
      text: userMessage,
      timestamp: new Date().toISOString(),
      sender: 'user',
    };

    // Actualiza el estado para mostrar el mensaje del usuario
    setMessagesByConversation((prev) => ({
      ...prev,
      [selectedConversation]: [...(prev[selectedConversation] || []), userMessageObj],
    }));

    try {
      // Envía el mensaje al backend y recibe la respuesta
      const response = await messageService.sendMessage(userMessage);

      // Crear el mensaje del chatbot con la respuesta
      const botMessage: Message = {
        id: response.request._id,
        text: response.request.generalDiagnosis, // Usamos el diagnóstico general como respuesta
        timestamp: response.request.createdAt,
        sender: 'bot',
      };

      // Actualiza el estado para mostrar el mensaje del chatbot
      setMessagesByConversation((prev) => ({
        ...prev,
        [selectedConversation]: [...(prev[selectedConversation] || []), botMessage],
      }));
    } catch (error) {
      // Enviar un mensaje de error al chat si ocurre un fallo
      const errorMessage: Message = {
        id: uuidv4(),
        text: 'Hubo un error al procesar tu mensaje. Inténtalo nuevamente.',
        timestamp: new Date().toISOString(),
        sender: 'bot',
      };

      setMessagesByConversation((prev) => ({
        ...prev,
        [selectedConversation]: [...(prev[selectedConversation] || []), errorMessage],
      }));
    }
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
