import React from 'react';

interface ConversationListProps {
  conversations: { id: string; problem: string }[];
  onSelectConversation: (id: string) => void;
  onNewConversation?: () => void;
}

const ConversationList: React.FC<ConversationListProps> = ({
  conversations,
  onSelectConversation,
  onNewConversation,
}) => {
  return (
    <div className="conversation-list flex flex-col h-full">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Conversation History</h2>
      <ul className="flex-1 overflow-auto">
        {conversations.map((conv) => (
          <li
            key={conv.id}
            onClick={() => onSelectConversation(conv.id)}
            className="p-3 bg-gray-100 rounded-lg mb-2 cursor-pointer hover:bg-gray-200"
          >
            {conv.problem}
          </li>
        ))}
      </ul>
      {onNewConversation && (
        <button
          className="mt-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
          onClick={onNewConversation}
        >
          New Conversation
        </button>
      )}
    </div>
  );
};

export default ConversationList;
