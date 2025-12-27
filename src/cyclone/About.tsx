import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Code, Brain, Trophy } from 'lucide-react';

const features = [
  {
    icon: Code,
    title: "Rapid Engineering",
    description: "Building resilient, high-speed solutions that scale",
    action: () => window.open("https://github.com/Thanu10ekoon/AnimaRepelWYOLO", "_blank")
  },
  {
    icon: Brain,
    title: "Predictive AI",
    description: "Cyclone-grade intelligence for real-time decisions",
    action: () => window.open("https://theicore.org/projects/view/cf333668-1a84-4827-a883-f85f42202664", "_blank")
  },
  {
    icon: Trophy,
    title: "Competition DNA",
    description: "Optimized for performance under pressure and tight deadlines",
    action: () => {
      const gallerySection = document.getElementById('cyclone-gallery');
      if (gallerySection) {
        gallerySection.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  }
];

export default function CycloneAbout() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section className="py-20 bg-[#eaf6ff] dark:bg-[#0a1c17]" id="about">
      <div className="container mx-auto px-4">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-4 text-[#0b132b] dark:text-[#d2ffee]">About Cyclone X</h2>
          <p className="text-lg text-[#1c2f4a] dark:text-[#c2ffe7] max-w-3xl mx-auto">
            Cyclone X brings lightning-fast execution, robust engineering, and AI-driven insight to every project.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              className="p-6 bg-white dark:bg-[#0f2620] rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer hover:scale-105 hover:bg-[#f4fbff] dark:hover:bg-[#123229] border border-[#00b8ff]/30 dark:border-[#16f2b4]/35"
              onClick={feature.action}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <feature.icon className="w-12 h-12 text-[#00b8ff] mb-4 mx-auto dark:text-[#16f2b4]" />
              <h3 className="text-xl font-semibold mb-2 text-[#0b132b] dark:text-[#d2ffee]">{feature.title}</h3>
              <p className="text-[#1f3a56] dark:text-[#c2ffe7]">{feature.description}</p>
              <div className="mt-4 text-[#ff9f1c] dark:text-[#9ef01a] text-sm font-medium opacity-90">
                Click to explore →
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
