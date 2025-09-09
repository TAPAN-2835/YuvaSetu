import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { I18nProvider } from './i18n/i18n';
import Header from './components/Header';
import Footer from './components/Footer';
import MobileBottomNav from './components/MobileBottomNav';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Saved from './pages/Saved';
import Learn from './pages/Learn';
import InternshipDetails from './pages/InternshipDetails';
import NotFound from './pages/NotFound';

function App() {
  const [isDark, setIsDark] = useState<boolean>(false);
  const [isHighContrast, setIsHighContrast] = useState<boolean>(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem('ys_theme');
    const savedContrast = localStorage.getItem('ys_contrast');
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    const dark = savedTheme ? savedTheme === 'dark' : prefersDark;
    const hc = savedContrast ? savedContrast === 'high' : false;
    setIsDark(dark);
    setIsHighContrast(hc);
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    if (isDark) root.classList.add('dark'); else root.classList.remove('dark');
    if (isHighContrast) root.classList.add('hc'); else root.classList.remove('hc');
  }, [isDark, isHighContrast]);

  return (
    <I18nProvider>
      <Router>
        <div className="min-h-screen bg-white dark:bg-gray-900 flex flex-col">
          <Header onToggleTheme={() => {
            const next = !isDark; setIsDark(next); localStorage.setItem('ys_theme', next ? 'dark' : 'light');
          }} onToggleContrast={() => {
            const next = !isHighContrast; setIsHighContrast(next); localStorage.setItem('ys_contrast', next ? 'high' : 'normal');
          }} isDark={isDark} isHighContrast={isHighContrast} />
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/saved" element={<Saved />} />
              <Route path="/learn" element={<Learn />} />
              <Route path="/details/:id" element={<InternshipDetails />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
          <Footer />
          <MobileBottomNav />
        </div>
      </Router>
    </I18nProvider>
  );
}

export default App;