import { Sidebar } from "@/components/layout/sidebar/sidebar";
import { useUIContext } from "@/context/ui-context";
import { useChatContext } from "@/context/chat-context";

export const MobileSidebar: React.FC = () => {
  const { mobileSidebarOpen, closeSidebar } = useUIContext();
  const { resetChat, setMessages, setChatId } = useChatContext();

  return (
    <>
      {/* Mobile Sidebar Overlay */}
      {mobileSidebarOpen && (
        <div
          className="fixed inset-0 bg-transparent z-40 lg:hidden"
          onClick={closeSidebar}
        />
      )}

      {/* Sidebar */}
      <div
        className={`
          fixed top-0 left-0 h-full w-[260px] z-50 transform transition-transform duration-300 bg-[#171717]
          ${mobileSidebarOpen ? "translate-x-0" : "-translate-x-full"} lg:relative lg:translate-x-0
        `}
      >
        <Sidebar
          resetChat={resetChat}
          setMessages={setMessages}
          setChatId={setChatId}
          isCollapsed={false}
        />
      </div>
    </>
  );
};