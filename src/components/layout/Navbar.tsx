import React, { useState, useEffect } from 'react';
import { Link, NavLink as RouterNavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { Menu, X, User, LogOut, BookOpen, Map, Calendar, BarChart2, Bot } from 'lucide-react';

// Custom NavLink component for better active state handling
const NavLink = ({ to, children }: { to: string; children: React.ReactNode }) => (
  <RouterNavLink
    to={to}
    className={({ isActive }) =>
      `flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
        isActive
          ? 'bg-white/20 text-white'
          : 'text-white/90 hover:bg-white/10 hover:text-white'
      }`
    }
  >
    {children}
  </RouterNavLink>
);

const Navbar: React.FC = () => {
  const { currentUser, logout } = useAuth();
  const user = currentUser;
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/');
    setIsMenuOpen(false);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 bg-primary-600 text-white shadow-lg`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to="/" className="flex items-center group">
              <BookOpen className="h-8 w-8 text-white transition-transform duration-200 group-hover:scale-110" />
              <span className="ml-2 text-2xl font-bold bg-gradient-to-r from-white to-gray-200 bg-clip-text text-transparent">
                Nexora
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            <NavLink to="/careers">
              <BookOpen className="h-4 w-4 mr-2" />
              Careers
            </NavLink>
            <NavLink to="/colleges">
              <Map className="h-4 w-4 mr-2" />
              Colleges
            </NavLink>
            <NavLink to="/roadmap">
              <Calendar className="h-4 w-4 mr-2" />
              Roadmap
            </NavLink>
            <NavLink to="/ai-career-quiz" className="bg-primary-700/50 hover:bg-primary-600">
              <Bot className="h-4 w-4 mr-2" />
              AI Career Quiz
            </NavLink>
            <NavLink to="/timeline">
              <Calendar className="h-4 w-4 mr-2" />
              Timeline
            </NavLink>

            {user ? (
              <div className="hidden md:flex items-center space-x-3 ml-6">
                {user.isAdmin && (
                  <Link
                    to="/admin/metrics"
                    className="flex items-center space-x-1 px-3 py-2 rounded-lg text-white/90 hover:bg-white/10 transition-all duration-200"
                    title="Admin Dashboard"
                  >
                    <BarChart2 className="h-4 w-4" />
                  </Link>
                )}
                <Link 
                  to="/profile" 
                  className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 transition-all duration-200 group"
                >
                  <div className="h-8 w-8 rounded-full bg-white/20 flex items-center justify-center">
                    <User className="h-4 w-4 text-white" />
                  </div>
                  <span className="font-medium">{user.name.split(' ')[0]}</span>
                </Link>
                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-1 text-white/90 hover:text-white hover:bg-red-500/20 px-3 py-2 rounded-lg transition-all duration-200"
                >
                  <LogOut className="h-4 w-4" />
                  <span className="text-sm font-medium">Logout</span>
                </button>
              </div>
            ) : (
              <div className="hidden md:flex items-center space-x-3 ml-6">
                <Link 
                  to="/login" 
                  className="px-4 py-2 text-sm font-medium text-white hover:text-primary-100 transition-colors"
                >
                  Login
                </Link>
                <Link 
                  to="/signin" 
                  className="px-5 py-2.5 rounded-lg bg-white text-primary-600 hover:bg-gray-100 font-medium text-sm transition-all duration-200 shadow-sm hover:shadow-md"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-20 left-0 right-0 bg-primary-700 shadow-lg rounded-b-lg overflow-hidden transition-all duration-200">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <MobileNavLink to="/careers" icon={BookOpen} onClick={() => setIsMenuOpen(false)}>
              Careers
            </MobileNavLink>
            <MobileNavLink to="/colleges" icon={Map} onClick={() => setIsMenuOpen(false)}>
              Colleges
            </MobileNavLink>
            <MobileNavLink to="/roadmap" icon={Calendar} onClick={() => setIsMenuOpen(false)}>
              Career Roadmap
            </MobileNavLink>
            <MobileNavLink 
              to="/ai-career-quiz" 
              icon={Bot} 
              onClick={() => setIsMenuOpen(false)}
              className="bg-primary-800/50 hover:bg-primary-700"
            >
              AI Career Quiz
            </MobileNavLink>
            
            {user ? (
              <>
                <div className="border-t border-white/10 my-2"></div>
                <MobileNavLink to="/profile" icon={User} onClick={() => setIsMenuOpen(false)}>
                  My Profile
                </MobileNavLink>
                {user.isAdmin && (
                  <MobileNavLink to="/admin/metrics" icon={BarChart2} onClick={() => setIsMenuOpen(false)}>
                    Admin Dashboard
                  </MobileNavLink>
                )}
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center px-4 py-3 text-base font-medium rounded-lg text-white/90 hover:bg-white/10 transition-colors duration-200"
                >
                  <LogOut className="h-5 w-5 mr-3" />
                  Logout
                </button>
              </>
            ) : (
              <div className="pt-2 space-y-2">
                <Link
                  to="/login"
                  className="block w-full px-4 py-3 text-center text-base font-medium rounded-lg text-white bg-white/10 hover:bg-white/20 transition-colors duration-200"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Login
                </Link>
                <Link
                  to="/signin"
                  className="block w-full px-4 py-3 text-center text-base font-medium rounded-lg text-primary-600 bg-white hover:bg-gray-100 transition-colors duration-200"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        </div>
      )}

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-lg text-white hover:bg-white/10 focus:outline-none transition-colors duration-200"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

// Mobile NavLink component
const MobileNavLink = ({ 
  to, 
  icon: Icon, 
  children, 
  onClick, 
  className = '' 
}: { 
  to: string; 
  icon: any; 
  children: React.ReactNode; 
  onClick?: () => void;
  className?: string;
}) => (
  <RouterNavLink
    to={to}
    onClick={onClick}
    className={({ isActive }) =>
      `flex items-center px-4 py-3 text-base font-medium rounded-lg transition-colors duration-200 ${
        isActive ? 'bg-white/20 text-white' : 'text-white/90 hover:bg-white/10 hover:text-white'
      } ${className}`.trim()
    }
  >
    <Icon className="h-5 w-5 mr-3" />
    {children}
  </RouterNavLink>
);

export default Navbar;
