
import React from 'react';
import { Plus, MessageSquare, Trash2 } from 'lucide-react';
import { cn } from '../utils/cn';
import { ChatSession } from '../types/chat';

interface SidebarProps {
  sessions: ChatSession[];
  currentSessionId: string;
  onNewChat: () => void;
  onSelectSession: (id: string) => void;
  onDeleteSession: (id: string) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  sessions,
  currentSessionId,
  onNewChat,
  onSelectSession,
  onDeleteSession,
}) => {
  return (
    <div className="flex flex-col h-full w-64 bg-[#050505] text-white border-r border-white/10">
      <div className="p-4">
        <button
          onClick={onNewChat}
          className="w-full flex items-center gap-3 px-4 py-2 rounded-lg border border-white/20 hover:bg-white/5 transition-colors duration-200 text-sm font-medium"
        >
          <Plus size={18} />
          New Chat
        </button>
      </div>

      <div className="flex-1 overflow-y-auto px-2 space-y-1">
        {sessions.map((session) => (
          <div
            key={session.id}
            onClick={() => onSelectSession(session.id)}
            className={cn(
              "group flex items-center gap-3 px-3 py-2 rounded-lg cursor-pointer transition-all duration-200 text-sm",
              currentSessionId === session.id 
                ? "bg-white/10 text-white" 
                : "text-gray-400 hover:bg-white/5 hover:text-white"
            )}
          >
            <MessageSquare size={16} />
            <span className="flex-1 truncate">{session.title}</span>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onDeleteSession(session.id);
              }}
              className="opacity-0 group-hover:opacity-100 p-1 hover:text-red-400 transition-opacity"
            >
              <Trash2 size={14} />
            </button>
          </div>
        ))}
      </div>


    </div>
  );
};
