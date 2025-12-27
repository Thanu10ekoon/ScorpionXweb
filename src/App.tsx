import { useEffect, useRef, useState } from 'react';
import { Sun, Moon } from 'lucide-react';
import Hero from './components/Hero';
import About from './components/About';
import Achievements from './components/Achievements';
import Gallery from './components/Gallery';
import Team from './components/Team';

function App() {
  const [darkMode, setDarkMode] = useState(true);
  const [loading, setLoading] = useState(true);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const playCount = useRef(0);
  const midTimer = useRef<number | null>(null);

  useEffect(() => {
    // Set initial dark mode
    document.documentElement.classList.add('dark');
    
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  useEffect(() => {
    const favicon = document.querySelector<HTMLLinkElement>('link[rel="icon"]');
    if (favicon) {
      favicon.href = '/logo.png';
      favicon.type = 'image/png';
    }
  }, []);

  // Fallback guard so the overlay never sticks
  useEffect(() => {
    const fallback = window.setTimeout(() => setLoading(false), 15000);
    return () => clearTimeout(fallback);
  }, []);

  // Kick off intro video playback
  useEffect(() => {
    if (!loading) return;
    const video = videoRef.current;
    if (video) {
      video.currentTime = 0;
      video.play().catch(() => {
        // If autoplay fails, drop loader
        setLoading(false);
      });
    }
  }, [loading]);

  // Clean up timer on unmount
  useEffect(() => {
    return () => {
      if (midTimer.current) clearTimeout(midTimer.current);
    };
  }, []);

  const handleLoadedMetadata = () => {
    // No-op here; duration is available on video
  };

  const scheduleSecondPlayStop = () => {
    const video = videoRef.current;
    if (!video) return;
    const durationMs = (video.duration || 8) * 1000;
    const cutoff = Math.min(3000, durationMs);
    if (midTimer.current) clearTimeout(midTimer.current);
    midTimer.current = window.setTimeout(() => {
      video.pause();
      setLoading(false);
    }, cutoff);
  };

  const handleEnded = () => {
    playCount.current += 1;
    if (playCount.current === 1) {
      // Start second play and schedule mid-hide
      const video = videoRef.current;
      if (video) {
        video.currentTime = 0;
        video.play().catch(() => setLoading(false));
        scheduleSecondPlayStop();
      } else {
        setLoading(false);
      }
    } else {
      setLoading(false);
    }
  };

  const handleError = () => {
    setLoading(false);
  };

  return (
    <div className={`min-h-screen ${darkMode ? 'dark' : ''}`}>
      {loading && (
        <div className="fixed inset-0 z-[60] bg-black">
          <div className="relative w-full h-full">
            <video
              ref={videoRef}
              src="/bite.mp4"
              className="absolute inset-0 w-full h-full object-cover"
              autoPlay
              muted
              playsInline
              onLoadedMetadata={handleLoadedMetadata}
              onEnded={handleEnded}
              onError={handleError}
            />
            <div className="absolute bottom-4 right-6 text-sm font-mono text-[#00b8ff] drop-shadow-[0_0_6px_rgba(0,184,255,0.6)]">
              <span className="animate-pulse">Scorpion X is Loading...</span>
            </div>
          </div>
        </div>
      )}

      {!loading && (
        <nav className="fixed w-full z-40 bg-[#eaf6ff]/85 dark:bg-[#0a1224]/90 backdrop-blur-sm border-b border-[#00b8ff]/30 dark:border-[#15c6d5]/30">
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
      )}

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
