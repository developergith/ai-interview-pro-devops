import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, LayoutDashboard, Zap, History, LogOut } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import Button from './Button';
import ThemeToggle from './ThemeToggle';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { logout } = useAuth();

  const menuItems = [
    { path: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { path: '/generate', label: 'Generate Interview', icon: Zap },
    { path: '/history', label: 'History', icon: History },
  ];

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const isActive = (path) => location.pathname === path;

  const NavLinks = () => (
    <>
      {menuItems.map((item) => {
        const Icon = item.icon;
        return (
          <Link
            key={item.path}
            to={item.path}
            className={`
              flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-300
              ${isActive(item.path)
                ? 'bg-primary/20 text-primary font-medium'
                : 'text-foreground hover:bg-primary/10'
              }
            `}
            onClick={() => setIsOpen(false)}
          >
            <Icon size={20} />
            <span>{item.label}</span>
          </Link>
        );
      })}
      <Button
        variant="ghost"
        className="w-full justify-start gap-3 px-4 py-3 text-accent hover:bg-accent/10"
        onClick={handleLogout}
      >
        <LogOut size={20} />
        <span>Logout</span>
      </Button>
    </>
  );

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden fixed top-4 left-4 z-50 p-2 bg-primary rounded-lg text-white"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Desktop Sidebar */}
      <aside className="hidden md:flex fixed left-0 top-0 h-screen w-64 bg-background border-r border-primary/10 flex-col p-6 gap-6">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-primary to-secondary flex items-center justify-center">
            <Zap size={24} className="text-white" />
          </div>
          <div>
            <h1 className="font-bold text-lg text-foreground">AI-Interview</h1>
            <p className="text-xs text-muted">Pro</p>
          </div>
        </div>

        <nav className="flex-1 flex flex-col gap-2">
          <NavLinks />
        </nav>

        <div className="pt-6 border-t border-primary/10">
          <ThemeToggle />
        </div>
      </aside>

      {/* Mobile Sidebar */}
      {isOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black/50 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}

      <aside
        className={`
          md:hidden fixed left-0 top-0 h-screen w-64 bg-background border-r border-primary/10
          flex flex-col p-6 gap-6 transition-transform duration-300 z-40
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        `}
      >
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-primary to-secondary flex items-center justify-center">
            <Zap size={24} className="text-white" />
          </div>
          <div>
            <h1 className="font-bold text-lg text-foreground">AI-Interview</h1>
            <p className="text-xs text-muted">Pro</p>
          </div>
        </div>

        <nav className="flex-1 flex flex-col gap-2">
          <NavLinks />
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;
