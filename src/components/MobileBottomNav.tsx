import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Bookmark, BookOpenCheck } from 'lucide-react';

const MobileBottomNav: React.FC = () => {
  const location = useLocation();
  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="fixed bottom-0 inset-x-0 z-40 bg-white/95 dark:bg-gray-900/95 backdrop-blur border-t border-gray-200 dark:border-gray-800 md:hidden" aria-label="Primary">
      <ul className="grid grid-cols-3">
        <li>
          <Link
            to="/"
            className={`flex flex-col items-center justify-center py-2 ${isActive('/') ? 'text-blue-600' : 'text-gray-700 dark:text-gray-200'}`}
            aria-current={isActive('/') ? 'page' : undefined}
          >
            <Home className="w-5 h-5" />
            <span className="text-xs">Home</span>
          </Link>
        </li>
        <li>
          <Link
            to="/saved"
            className={`flex flex-col items-center justify-center py-2 ${isActive('/saved') ? 'text-blue-600' : 'text-gray-700 dark:text-gray-200'}`}
            aria-current={isActive('/saved') ? 'page' : undefined}
          >
            <Bookmark className="w-5 h-5" />
            <span className="text-xs">Saved</span>
          </Link>
        </li>
        <li>
          <Link
            to="/learn"
            className={`flex flex-col items-center justify-center py-2 ${isActive('/learn') ? 'text-blue-600' : 'text-gray-700 dark:text-gray-200'}`}
            aria-current={isActive('/learn') ? 'page' : undefined}
          >
            <BookOpenCheck className="w-5 h-5" />
            <span className="text-xs">Learn</span>
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default MobileBottomNav;

