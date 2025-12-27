import { useEffect, useState } from 'react';
import { Sun, Moon } from 'lucide-react';
import CycloneHero from './cyclone/Hero';
import CycloneAbout from './cyclone/About';
import CycloneAchievements from './cyclone/Achievements';
import CycloneGallery from './cyclone/Gallery';
import CycloneTeam from './cyclone/Team';

function CycloneApp() {
  const [darkMode, setDarkMode] = useState(true);

  useEffect(() => {
    // Align root class with Cyclone mode
    document.documentElement.classList.add('dark');
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  return (
    <div className={`min-h-screen ${darkMode ? 'dark' : ''}`}>
      <nav className="fixed w-full z-50 bg-[#eaf6ff]/85 dark:bg-[#0a1c17]/92 backdrop-blur-sm border-b border-[#00b8ff]/30 dark:border-[#16f2b4]/35">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <img src="/Cyclone/logo.jpg" alt="Cyclone X Logo" className="h-10 w-auto mr-2 rounded-lg" />
              <span className="text-2xl font-bold text-[#00b8ff] dark:text-[#16f2b4]">
                Cyclone X
              </span>
            </div>
            <div className="flex items-center space-x-4">
              <a
                href="/"
                className="text-sm font-semibold text-[#0b132b] dark:text-[#e1fff5] hover:text-[#ff9f1c] dark:hover:text-[#16f2b4] transition-colors"
              >
                Back to Scorpion X
              </a>
              <button
                onClick={() => setDarkMode(!darkMode)}
                className="p-2 rounded-lg hover:bg-[#00b8ff]/10 dark:hover:bg-[#16f2b4]/15 transition-colors"
              >
                {darkMode ? (
                  <Sun className="w-5 h-5 text-[#b6ff7a]" />
                ) : (
                  <Moon className="w-5 h-5 text-[#0a1c17]" />
                )}
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main>
        <CycloneHero />
        <CycloneAbout />
        <CycloneAchievements />
        <CycloneGallery />
        <CycloneTeam />
      </main>
    </div>
  );
}

export default CycloneApp;
