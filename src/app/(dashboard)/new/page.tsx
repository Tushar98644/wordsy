'use client'

import { Home, Settings, Users, FileText } from 'lucide-react';

export default function App() {
  const menuItems = [
    {
      title: "Dashboard",
      icon: Home,
      href: "/dashboard",
      isActive: true
    },
    {
      title: "Projects",
      icon: FileText,
      items: [
        { title: "All Projects", href: "/projects" },
        { title: "Recent", href: "/projects/recent" },
        { title: "Favorites", href: "/projects/favorites" }
      ]
    },
    {
      title: "Team",
      icon: Users,
      href: "/team"
    },
    {
      title: "Settings",
      icon: Settings,
      href: "/settings"
    }
  ];

  const user = {
    name: "John Doe",
    email: "john@example.com",
    avatar: "/avatar.jpg"
  };

  return (
    // <SimpleSidebar />
    <div>App</div>
  );
}
