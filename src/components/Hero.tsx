import { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Hero() {
  const [showIntro, setShowIntro] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const fallbackTimer = useRef<NodeJS.Timeout | null>(null);
  const navigate = useNavigate();

  const handleCycloneClick = () => {
    setShowIntro(true);
    // Safety fallback in case we never get metadata or playback
    scheduleFallback(15000);
    // Defer play attempt until video ref is mounted
    setTimeout(() => {
      const video = videoRef.current;
      if (video) {
        video.play().catch(() => {
          // Keep overlay; rely on fallback timer
          scheduleFallback(15000);
        });
      }
    }, 20);
  };

  const scheduleFallback = (durationMs: number) => {
    if (fallbackTimer.current) clearTimeout(fallbackTimer.current);
    fallbackTimer.current = setTimeout(() => navigate('/cyclonex'), durationMs);
  };

  const handleLoaded = () => {
    const video = videoRef.current;
    if (!video) return;
    // Add small buffer beyond video duration
    const durationMs = (video.duration || 0) * 1000 + 400;
    if (durationMs > 0) {
      scheduleFallback(durationMs);
    } else {
      scheduleFallback(12000);
    }
  };

  const handleEnded = () => {
    if (fallbackTimer.current) clearTimeout(fallbackTimer.current);
    navigate('/cyclonex');
  };

  return (
    <section className="relative h-screen flex items-center justify-center bg-gradient-to-br from-[#0d1b2a] via-[#0a1224] to-black text-white overflow-hidden">
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(21,198,213,0.18),rgba(0,0,0,0.75))]"></div>
      </div>
      
      <div className="container mx-auto px-4 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <img src="/logo.png" alt="Scorpion X Logo" className="mx-auto mb-4 w-60 h-50 rounded-lg" />
          <h1 className="text-6xl md:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-[#f7b733] via-[#f45d48] to-[#15c6d5]">
            Scorpion X
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-[#e6f7fa] max-w-2xl mx-auto">
            Pioneering the future through innovation, competition, and excellence in technology
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-gradient-to-r from-[#f45d48] via-[#f7b733] to-[#15c6d5] text-white px-8 py-3 rounded-full text-lg font-semibold hover:shadow-[0_10px_40px_rgba(21,198,213,0.35)] transition-all duration-300"
            onClick={handleCycloneClick}
          >
            CycloneX Merger
          </motion.button>
        </motion.div>
      </div>

      <motion.div
        animate={{
          y: [0, 10, 0],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 cursor-pointer"
      >
        <ChevronDown className="w-8 h-8 text-[#f7b733] opacity-80" />
      </motion.div>

      {showIntro && (
        <div className="fixed inset-0 z-50 bg-black flex items-center justify-center">
          <div className="hidden md:flex flex-1 h-full items-center justify-center">
            <div className="text-2xl font-semibold tracking-wide text-[#16f2b4] animate-pulse border border-[#16f2b4]/40 px-4 py-3 rounded-lg bg-white/5">
              CycloneX is Loading…
            </div>
          </div>

          <div className="flex items-center justify-center px-4 md:flex-[0_0_auto] max-w-full">
            <video
              ref={videoRef}
              src="/Cyclone/Intro.mp4"
              className="max-w-[70vw] md:max-w-[50vw] max-h-[80vh] w-auto h-auto object-contain"
              autoPlay
              playsInline
              onLoadedMetadata={handleLoaded}
              onEnded={handleEnded}
              onError={() => scheduleFallback(15000)}
            />
          </div>

          <div className="hidden md:flex flex-1 h-full items-center justify-center">
            <div className="text-2xl font-semibold tracking-wide text-[#16f2b4] animate-pulse border border-[#16f2b4]/40 px-4 py-3 rounded-lg bg-white/5">
              CycloneX is Loading…
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
