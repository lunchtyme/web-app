import React,{useState} from 'react';
import Sidebar from './SideBar';
import TopNav from './TopNav';
import MainContent from './MainContent';

const MainDashboard = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(true);

  const toggleSidebar = () => setSidebarOpen(!isSidebarOpen);
  const closeSidebar = () => setSidebarOpen(false);

  return (
    <div className="flex h-screen">
      <Sidebar isOpen={isSidebarOpen} onClose={closeSidebar} />
      <div className="flex-1 flex flex-col transition-all duration-500 ease-in-out">
        <TopNav onToggleSidebar={toggleSidebar} />
        <MainContent />
      </div>
    </div>
  );
};

export default MainDashboard;
