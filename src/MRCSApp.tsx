import { useEffect, useRef, useState } from 'react';
import { Sun, Moon, Download, ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

function MRCSApp() {
  const [darkMode, setDarkMode] = useState(true);
  const [loading, setLoading] = useState(true);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const playCount = useRef(0);
  const midTimer = useRef<number | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
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
      video.play().catch(() => setLoading(false));
    }
  }, [loading]);

  // Clean up timer on unmount
  useEffect(() => {
    return () => {
      if (midTimer.current) clearTimeout(midTimer.current);
    };
  }, []);

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

  const downloadUrl =
    'https://universityofruhuna-my.sharepoint.com/:u:/g/personal/thanujaya_eg20225364_foe_ruh_ac_lk/IQCgWUpFQHCHR6TxVNgsgtmbARFYkInG0PeLTSeIEjSEZpI?e=E7rWBA&download=1';

  return (
    <div className={`min-h-screen ${darkMode ? 'dark' : ''}`}>
      {/* ── Intro video overlay ── */}
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
              onEnded={handleEnded}
              onError={handleError}
            />
            <div className="absolute bottom-4 right-6 text-sm font-mono text-[#00b8ff] drop-shadow-[0_0_6px_rgba(0,184,255,0.6)]">
              <span className="animate-pulse">Scorpion X is Loading...</span>
            </div>
          </div>
        </div>
      )}

      {/* ── Navbar ── */}
      {!loading && (
        <nav className="fixed w-full z-40 bg-[#eaf6ff]/85 dark:bg-[#0a1224]/90 backdrop-blur-sm border-b border-[#00b8ff]/30 dark:border-[#15c6d5]/30">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center">
                <img
                  src="/logo.png"
                  alt="Scorpion X Logo"
                  className="h-10 w-auto mr-2 rounded-lg"
                />
                <span className="text-2xl font-bold text-[#00b8ff] dark:text-[#15c6d5]">
                  Scorpion X
                </span>
              </div>
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => navigate('/')}
                  className="flex items-center gap-1 text-sm font-semibold text-[#0b132b] dark:text-[#e6f7fa] hover:text-[#f45d48] dark:hover:text-[#f7b733] transition-colors"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Back to Scorpion X
                </button>
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

      {/* ── Main content ── */}
      <main className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0d1b2a] via-[#0a1224] to-black text-white overflow-hidden pt-16">
        {/* Background glow */}
        <div className="absolute inset-0 opacity-20 pointer-events-none">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(21,198,213,0.18),rgba(0,0,0,0.75))]" />
        </div>

        <div className="container mx-auto px-4 py-16 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl mx-auto text-center"
          >
            {/* ── Logos ── */}
            <div className="flex items-center justify-center gap-8 mb-8">
              <motion.img
                src="/logo-eng.png"
                alt="Faculty of Engineering Logo"
                className="h-24 md:h-28 w-auto object-contain drop-shadow-[0_0_12px_rgba(21,198,213,0.3)]"
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              />
              <motion.img
                src="/logo-uor.png"
                alt="University of Ruhuna Logo"
                className="h-24 md:h-28 w-auto object-contain drop-shadow-[0_0_12px_rgba(244,93,72,0.3)]"
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              />
            </div>

            {/* ── Titles ── */}
            <motion.h2
              className="text-lg md:text-xl font-medium tracking-wide text-[#15c6d5] uppercase mb-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              Official Mobile Application of
            </motion.h2>

            <motion.h1
              className="text-3xl md:text-4xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-[#f7b733] via-[#f45d48] to-[#15c6d5] leading-tight"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              Maintenance, Requests &amp; Complaints Management System
            </motion.h1>

            {/* ── Divider ── */}
            <motion.div
              className="w-24 h-1 mx-auto rounded-full bg-gradient-to-r from-[#f45d48] to-[#15c6d5] mb-8"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            />

            {/* ── Description ── */}
            <motion.p
              className="text-base md:text-lg text-[#c4dce3] dark:text-[#c4dce3] leading-relaxed mb-12 text-justify"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.7 }}
            >
              The Maintenance, Requests &amp; Complaints Management System developed by
              ScorpionX for the Faculty of Engineering, University of Ruhuna is a
              centralized digital platform designed to streamline the reporting and
              management of maintenance issues, service requests, and complaints within
              the faculty. The system enables users to submit requests efficiently,
              track their status in real time, and maintain a transparent history of
              updates, while allowing administrators to manage, respond, and monitor
              progress through a structured workflow. By replacing manual and fragmented
              processes with a secure, organized, and user-friendly solution, the
              platform enhances communication, accountability, and operational
              efficiency across the faculty. And this is the mobile app developed for
              Android users of this system.
            </motion.p>

            {/* ── Download button ── */}
            <motion.a
              href={downloadUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 bg-gradient-to-r from-[#f45d48] via-[#f7b733] to-[#15c6d5] text-white px-10 py-4 rounded-full text-lg font-semibold hover:shadow-[0_10px_40px_rgba(21,198,213,0.35)] transition-all duration-300 group"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.9 }}
            >
              <Download className="w-6 h-6 group-hover:animate-bounce" />
              Download Mobile App
            </motion.a>

            {/* ── "Developed by" footer badge ── */}
            <motion.div
              className="mt-16 flex items-center justify-center gap-2 text-sm text-[#15c6d5]/70"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 1.1 }}
            >
              <img
                src="/logo.png"
                alt="Scorpion X"
                className="h-6 w-auto rounded"
              />
              <span>Developed by <span className="font-semibold text-[#15c6d5]">Scorpion X</span></span>
            </motion.div>
          </motion.div>
        </div>
      </main>
    </div>
  );
}

export default MRCSApp;
