import { useState, useEffect } from 'react';
import { Sun, Moon } from 'lucide-react';
import Hero from './components/Hero';
import About from './components/About';
import Achievements from './components/Achievements';
import Gallery from './components/Gallery';
import Team from './components/Team';

function App() {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  return (
    <div className={`min-h-screen ${darkMode ? 'dark' : ''}`}>
      <nav className="fixed w-full z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <img src="/logo.png" alt="Scorpion X Logo" className="h-10 w-auto mr-2 rounded-lg" />
              <span className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                Scorpion X
              </span>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setDarkMode(!darkMode)}
                className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              >
                {darkMode ? (
                  <Sun className="w-5 h-5 text-yellow-500" />
                ) : (
                  <Moon className="w-5 h-5 text-gray-600" />
                )}
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main>
        <Hero />
        <About />
        <Achievements />
        <Gallery />
        <Team />
      </main>
    </div>
  );
}

export default App;
