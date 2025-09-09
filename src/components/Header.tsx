import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ChevronDown, User, LogOut, Bookmark, Globe, Moon, Sun, Contrast } from 'lucide-react';
import { useI18n } from '../i18n/i18n';
import { getUser, logout } from '../lib/auth';

interface HeaderProps {
  onToggleTheme?: () => void;
  onToggleContrast?: () => void;
  isDark?: boolean;
  isHighContrast?: boolean;
}

const Header: React.FC<HeaderProps> = ({ onToggleTheme, onToggleContrast, isDark, isHighContrast }) => {
  const { t, language, setLanguage } = useI18n();
  const navigate = useNavigate();
  const user = getUser();
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showLangMenu, setShowLangMenu] = useState(false);

  const handleLogout = () => {
    logout();
    setShowUserMenu(false);
    navigate('/');
  };

  return (
    <header className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-2 border border-gray-100 dark:border-gray-700">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-orange-500 rounded flex items-center justify-center">
                <span className="text-white font-bold text-sm">YS</span>
              </div>
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900 dark:text-white">YuvaSetu.AI</h1>
            </div>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 transition-colors font-medium">
              {t('nav.home')}
            </Link>
            <Link to="/saved" className="text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 transition-colors font-medium">
              {t('nav.saved')}
            </Link>
            <Link to="/learn" className="text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 transition-colors font-medium">
              {t('nav.learn')}
            </Link>
          </nav>

          {/* Right side actions */}
          <div className="flex items-center space-x-2 sm:space-x-4">
            {/* Theme Toggle */}
            <button
              onClick={onToggleTheme}
              className="p-2 rounded-md border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800"
              aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>
            {/* High Contrast Toggle */}
            <button
              onClick={onToggleContrast}
              className={`p-2 rounded-md border ${isHighContrast ? 'border-orange-500 text-orange-600' : 'border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-200'} hover:bg-gray-50 dark:hover:bg-gray-800`}
              aria-label={isHighContrast ? 'Disable high contrast' : 'Enable high contrast'}
            >
              <Contrast className="w-4 h-4" />
            </button>
            {/* Language Toggle */}
            <div className="relative">
              <button
                onClick={() => setShowLangMenu(!showLangMenu)}
                className="flex items-center space-x-1 text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                aria-label={t('nav.language')}
              >
                <Globe className="w-4 h-4" />
                <span className="text-sm font-medium">{language.toUpperCase()}</span>
                <ChevronDown className="w-3 h-3" />
              </button>
              {showLangMenu && (
                <div className="absolute right-0 mt-2 w-40 bg-white dark:bg-gray-800 rounded-md shadow-lg border border-gray-200 dark:border-gray-700 py-1 z-10">
                  {[
                    { code: 'en', label: 'English' },
                    { code: 'hi', label: 'हिंदी' },
                    { code: 'bn', label: 'বাংলা' },
                    { code: 'ta', label: 'தமிழ்' },
                    { code: 'te', label: 'తెలుగు' },
                    { code: 'mr', label: 'मराठी' },
                    { code: 'gu', label: 'ગુજરાતી' },
                    { code: 'kn', label: 'ಕನ್ನಡ' },
                    { code: 'ml', label: 'മലയാളം' },
                    { code: 'pa', label: 'ਪੰਜਾਬੀ' },
                  ].map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => {
                        setLanguage(lang.code as any);
                        setShowLangMenu(false);
                      }}
                      className={`block w-full text-left px-4 py-2 text-sm transition-colors ${
                        language === lang.code ? 'bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-300' : 'text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700'
                      }`}
                    >
                      {lang.label}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* User Menu */}
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="flex items-center space-x-2 text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                >
                  <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
                    <User className="w-4 h-4 text-blue-600 dark:text-blue-300" />
                  </div>
                  <span className="hidden sm:block font-medium">{user.name}</span>
                  <ChevronDown className="w-3 h-3" />
                </button>
                {showUserMenu && (
                  <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg border border-gray-200 dark:border-gray-700 py-1 z-10">
                    <Link
                      to="/saved"
                      className="flex items-center space-x-2 px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                      onClick={() => setShowUserMenu(false)}
                    >
                      <Bookmark className="w-4 h-4" />
                      <span>{t('nav.saved')}</span>
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="flex items-center space-x-2 w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>{t('nav.logout')}</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link
                to="/login"
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium"
              >
                {t('nav.login')}
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;