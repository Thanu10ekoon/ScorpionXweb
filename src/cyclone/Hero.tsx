import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

export default function CycloneHero() {
  return (
    <section className="relative h-screen flex items-center justify-center bg-gradient-to-br from-[#0a1c17] via-[#0f2d25] to-[#081610] text-white overflow-hidden">
      <div className="absolute inset-0 opacity-25">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(22,242,180,0.25),rgba(0,0,0,0.7))]"></div>
      </div>

      <div className="container mx-auto px-4 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <img src="/Cyclone/logo.jpg" alt="Cyclone X Logo" className="mx-auto mb-4 w-60 h-50 rounded-lg" />
          <h1 className="text-6xl md:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-[#16f2b4] via-[#5bff9f] to-[#b6ff7a]">
            Cyclone X
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-[#d2ffee] max-w-2xl mx-auto">
            Velocity, precision, and innovation converging to power the next wave of technology
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-gradient-to-r from-[#16f2b4] via-[#5bff9f] to-[#b6ff7a] text-[#0a1c17] px-8 py-3 rounded-full text-lg font-semibold hover:shadow-[0_10px_40px_rgba(22,242,180,0.35)] transition-all duration-300"
            onClick={() => window.location.href = '/'}
          >
            Go to Scorpion X
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
        <ChevronDown className="w-8 h-8 text-[#b6ff7a] opacity-80" />
      </motion.div>
    </section>
  );
}
