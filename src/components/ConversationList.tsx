interface Conversation {
    id: string;
    name: string;
  }
  
  interface ConversationListProps {
    conversations: Conversation[];
    onSelectConversation: (id: string) => void;
    onNewConversation: () => void;
  }
  
  const ConversationList: React.FC<ConversationListProps> = ({
    conversations,
    onSelectConversation,
    onNewConversation,
  }) => {
    return (
      <div className="conversation-list flex flex-col h-full">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Historial de Conversaciones</h2>
        <ul className="flex-1 overflow-auto">
          {conversations.map((conv) => (
            <li
              key={conv.id}
              onClick={() => onSelectConversation(conv.id)}
              className="p-3 bg-gray-100 rounded-lg mb-2 cursor-pointer hover:bg-gray-200"
            >
              {conv.name}
            </li>
          ))}
        </ul>
        <button
          onClick={onNewConversation}
          className="mt-4 py-2 px-4 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Nueva Conversación
        </button>
      </div>
    );
  };
  
  export default ConversationList;
  