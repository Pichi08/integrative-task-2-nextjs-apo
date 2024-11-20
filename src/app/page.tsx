'use client';

import Header from '@/components/Headers';
import Head from 'next/head';
import { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import ConversationList from '../components/ConversationList';
import ChatWindow from '../components/ChatWindow';
import { SendMessageService } from '../services/sendMessage.service';
import { ChatHistoryService } from '../services/chatHistory.service';
import { GetChatService } from '../services/getChat.service';
import { useCurrentUser } from '@/hooks/auth/useCurrentUser';

interface Conversation {
  id: string;
  problem: string; // Usaremos el campo "problem" en lugar de "name"
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

interface ConversationListProps {
  conversations: { id: string; problem: string }[];
  onSelectConversation: (id: string) => void;
  onNewConversation?: () => void; // Agregar esta prop
}


export default function Home() {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [selectedConversation, setSelectedConversation] = useState<string | null>(null);
  const [messagesByConversation, setMessagesByConversation] = useState<MessagesByConversation>({});
  const { user: currentUser } = useCurrentUser();

  useEffect(() => {
    const fetchConversations = async () => {
      if (!currentUser?.token) return;

      const chatHistoryService = new ChatHistoryService('http://localhost:8000/');

      try {
        const history = await chatHistoryService.getAllHistory(currentUser.token);

        console.log('History:', history.requests);

        const formattedConversations = history.requests.map((req: any) => ({
          id: req._id,
          problem: req.generalProblem,
        }));

        setConversations(formattedConversations);
      } catch (error) {
        console.error('Error fetching conversation history:', error);
      }
    };

    fetchConversations();
  }, [currentUser]);

  const handleSelectConversation = async (conversationId: string) => {
    setSelectedConversation(conversationId);
  
    if (!currentUser?.token) return;
  
    const getChatService = new GetChatService('http://localhost:8000/');
  
    try {
      const chatDetails = await getChatService.getChat(currentUser.token, conversationId);

      const roundProbability = Math.round(chatDetails.probability * 100) / 100;
  
      const messages: Message[] = [
        {
          id: chatDetails._id,
          text: `Question: ${chatDetails.inputQuestion}\n` +
                `Likely general problem: ${chatDetails.generalProblem} with a probability of ${roundProbability}\n` +
                `General Diagnosis: ${chatDetails.generalDiagnosis}\n` +
                `Specific problem: ${chatDetails.speceficproblem}\n`, 
          // text: `Input: ${chatDetails.inputQuestion}\nDiagnosis: ${chatDetails.diagnosis}\nProbability: ${chatDetails.probability}`,
          timestamp: new Date().toISOString(),
          sender: 'bot', // Asegúrate de que sea 'bot'
        },
      ];
  
      setMessagesByConversation((prev) => ({
        ...prev,
        [conversationId]: messages, // Asegúrate de que messages sea un array de tipo Message[]
      }));
    } catch (error) {
      console.error('Error fetching conversation details:', error);
    }
  };
  

  const handleNewConversation = () => {
    const newId = uuidv4();
    const newConversation: Conversation = {
      id: newId,
      problem: `Nueva Conversación ${conversations.length + 1}`,
    };
    setConversations([...conversations, newConversation]);
    setMessagesByConversation({ ...messagesByConversation, [newId]: [] });
    setSelectedConversation(newId);
  };

  const handleSendMessage = async (userMessage: string) => {
    if (!selectedConversation) return;

    const messageService = new SendMessageService('http://localhost:8000/');

    const userMessageObj: Message = {
      id: uuidv4(),
      text: userMessage,
      timestamp: new Date().toISOString(),
      sender: 'user',
    };

    setMessagesByConversation((prev) => ({
      ...prev,
      [selectedConversation]: [...(prev[selectedConversation] || []), userMessageObj],
    }));

    try {
      if (currentUser?.token) {
        const response = await messageService.sendMessage(currentUser.token, userMessage);

        const roundProbability = Math.round(response.request.probability * 100) / 100;

        const botMessage: Message = {
          id: response.request._id,
          text: `Likely general problem: ${response.request.generalProblem} with a probability of ${roundProbability}\n` +
                `General Diagnosis: ${response.request.generalDiagnosis}\n` +
                `Specific problem: ${response.request.speceficproblem}\n`,
          timestamp: response.request.createdAt,
          sender: 'bot',
        };

        setMessagesByConversation((prev) => ({
          ...prev,
          [selectedConversation]: [...(prev[selectedConversation] || []), botMessage],
        }));
      }
    } catch (error) {
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
            onSelectConversation={handleSelectConversation}
            onNewConversation={handleNewConversation}
          />
        </aside>
        <main className="chat-container flex-1 flex flex-col">
          <Header />
          <ChatWindow
            conversationId={selectedConversation}
            messages={selectedConversation ? messagesByConversation[selectedConversation] || [] : []}
            onSendMessage={handleSendMessage}
          />
        </main>
      </div>
    </>
  );
}
