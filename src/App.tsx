import { useState, useEffect } from 'react';
import { Sun, Moon } from 'lucide-react';
import Hero from './components/Hero';
import About from './components/About';
import Achievements from './components/Achievements';
import Gallery from './components/Gallery';
import Team from './components/Team';

function App() {
  const [darkMode, setDarkMode] = useState(true);

  useEffect(() => {
    // Set initial dark mode
    document.documentElement.classList.add('dark');
    
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  return (
    <div className={`min-h-screen ${darkMode ? 'dark' : ''}`}>
      <nav className="fixed w-full z-50 bg-[#eaf6ff]/85 dark:bg-[#0a1224]/90 backdrop-blur-sm border-b border-[#00b8ff]/30 dark:border-[#15c6d5]/30">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <img src="/logo.png" alt="Scorpion X Logo" className="h-10 w-auto mr-2 rounded-lg" />
              <span className="text-2xl font-bold text-[#00b8ff] dark:text-[#15c6d5]">
                Scorpion X
              </span>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setDarkMode(!darkMode)}
                className="p-2 rounded-lg hover:bg-[#00b8ff]/15 dark:hover:bg-[#15c6d5]/10 transition-colors"
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
