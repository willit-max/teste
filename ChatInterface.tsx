
import { useState, useEffect } from 'react';
import { Sidebar } from './components/Sidebar';
import { ChatInterface } from './components/ChatInterface';
import { ChatSession, Message } from './types/chat';
import { Menu, X } from 'lucide-react';

const STORAGE_KEY = 'nexus_ai_chats';

const INITIAL_SESSIONS: ChatSession[] = [
  {
    id: '1',
    title: 'New Conversation',
    messages: [],
    createdAt: new Date(),
  }
];

function App() {
  const [sessions, setSessions] = useState<ChatSession[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        // Revive dates
        return parsed.map((session: any) => ({
          ...session,
          createdAt: new Date(session.createdAt),
          messages: session.messages.map((m: any) => ({
            ...m,
            timestamp: new Date(m.timestamp)
          }))
        }));
      } catch (e) {
        console.error("Failed to parse saved sessions", e);
        return INITIAL_SESSIONS;
      }
    }
    return INITIAL_SESSIONS;
  });

  const [currentSessionId, setCurrentSessionId] = useState<string>(() => {
    return sessions[0]?.id || INITIAL_SESSIONS[0].id;
  });
  
  const [isLoading, setIsLoading] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(sessions));
  }, [sessions]);

  const currentSession = sessions.find(s => s.id === currentSessionId) || sessions[0] || INITIAL_SESSIONS[0];

  const handleNewChat = () => {
    const newId = Date.now().toString();
    const newSession: ChatSession = {
      id: newId,
      title: 'New Conversation',
      messages: [],
      createdAt: new Date(),
    };
    setSessions([newSession, ...sessions]);
    setCurrentSessionId(newId);
  };

  const handleSelectSession = (id: string) => {
    setCurrentSessionId(id);
  };

  const handleDeleteSession = (id: string) => {
    const updated = sessions.filter(s => s.id !== id);
    if (updated.length === 0) {
      handleNewChat();
    } else {
      setSessions(updated);
      if (currentSessionId === id) {
        setCurrentSessionId(updated[0].id);
      }
    }
  };

  const handleSendMessage = async (content: string) => {
    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content,
      timestamp: new Date(),
    };

    // Update session title if it's the first message
    let updatedSessions = [...sessions];
    const sessionIndex = updatedSessions.findIndex(s => s.id === currentSessionId);
    
    if (sessionIndex !== -1) {
      const session = updatedSessions[sessionIndex];
      const isFirstMessage = session.messages.length === 0;
      
      const updatedMessages = [...session.messages, userMessage];
      updatedSessions[sessionIndex] = {
        ...session,
        messages: updatedMessages,
        title: isFirstMessage ? content.slice(0, 30) + (content.length > 30 ? '...' : '') : session.title
      };
      
      setSessions(updatedSessions);
      setIsLoading(true);

      // Simulate API call
      setTimeout(() => {
        const assistantMessage: Message = {
          id: (Date.now() + 1).toString(),
          role: 'assistant',
          content: `Ceci est une réponse simulée. Vous avez dit : "${content}".\n\nConnectez votre API dans \`App.tsx\` pour des réponses réelles.`,
          timestamp: new Date(),
        };

        setSessions(prev => prev.map(s => 
          s.id === currentSessionId 
            ? { ...s, messages: [...s.messages, assistantMessage] }
            : s
        ));
        setIsLoading(false);
      }, 1500);
    }
  };

  return (
    <div className="flex h-screen bg-[#050505] overflow-hidden font-sans selection:bg-indigo-500/30">
      {/* Mobile Sidebar Toggle */}
      {!isSidebarOpen && (
        <button 
          onClick={() => setIsSidebarOpen(true)}
          className="fixed bottom-6 left-6 z-50 p-3 bg-white text-black rounded-full shadow-2xl hover:scale-110 transition-transform md:hidden"
        >
          <Menu size={24} />
        </button>
      )}

      {/* Sidebar Container */}
      <aside className={`
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} 
        transition-all duration-300 fixed md:relative z-40 h-full w-64
        ${!isSidebarOpen && 'pointer-events-none'}
      `}>
        <Sidebar
          sessions={sessions}
          currentSessionId={currentSessionId}
          onNewChat={handleNewChat}
          onSelectSession={handleSelectSession}
          onDeleteSession={handleDeleteSession}
        />
        {isSidebarOpen && (
          <button 
            onClick={() => setIsSidebarOpen(false)}
            className="absolute -right-12 top-4 p-2 bg-white/5 text-white rounded-lg md:hidden"
          >
            <X size={20} />
          </button>
        )}
      </aside>

      {/* Main Content */}
      <main className="flex-1 relative overflow-hidden">
        <ChatInterface
          messages={currentSession.messages}
          onSendMessage={handleSendMessage}
          isLoading={isLoading}
        />
      </main>
    </div>
  );
}

export default App;
