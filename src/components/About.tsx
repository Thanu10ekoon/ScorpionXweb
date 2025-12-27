import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Code, Brain, Trophy } from 'lucide-react';

const features = [
  {
    icon: Code,
    title: "Software Development",
    description: "Building cutting-edge solutions with modern technologies",
    action: () => window.open("https://www.linkedin.com/posts/thanujaya-tennekoon-b9a155271_launched-the-maintenance-complaint-management-activity-7348911008561713152-4Zfa?utm_source=share&utm_medium=member_desktop&rcm=ACoAAEJoWWYB-le4TFfH2prq-kEX6-DJwlbmxwM", "_blank")
  },
  {
    icon: Brain,
    title: "AI Solutions",
    description: "Leveraging artificial intelligence to solve complex problems",
    action: () => window.open("https://github.com/Thanu10ekoon/Nexora", "_blank")
  },
  {
    icon: Trophy,
    title: "Competitions",
    description: "Excelling in National, Inter-University and Intra-University tech competitions",
    action: () => {
      const gallerySection = document.getElementById('gallery');
      if (gallerySection) {
        window.open("https://www.eng.ruh.ac.lk/deie/scorpion-x-triumphs-at-codex-in-codejam-by-uom-cse/", "_blank");
      }
    }
  }
];

export default function About() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  return (
    <section className="py-20 bg-[#eaf6ff] dark:bg-[#0d1b2a]" id="about">
      <div className="container mx-auto px-4">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-4 text-[#0b132b] dark:text-white">About Scorpion X</h2>
          <p className="text-lg text-[#1c2f4a] dark:text-gray-200 max-w-3xl mx-auto">
            We are a dynamic team of innovators, developers, and problem solvers dedicated to pushing the boundaries of technology. Our mission is to create impactful solutions that drive the future of digital transformation.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              className="p-6 bg-white dark:bg-[#111d33] rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer hover:scale-105 hover:bg-[#f4fbff] dark:hover:bg-[#0f2842] border border-[#00b8ff]/30 dark:border-[#15c6d5]/25"
              onClick={feature.action}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <feature.icon className="w-12 h-12 text-[#00b8ff] mb-4 mx-auto" />
              <h3 className="text-xl font-semibold mb-2 text-[#0b132b] dark:text-white">{feature.title}</h3>
              <p className="text-[#1f3a56] dark:text-gray-200">{feature.description}</p>
              <div className="mt-4 text-[#ff9f1c] dark:text-[#f7b733] text-sm font-medium opacity-90">
                Click to explore →
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
