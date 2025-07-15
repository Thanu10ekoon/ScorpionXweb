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
        gallerySection.scrollIntoView({ 
          behavior: 'smooth',
          block: 'start'
        });
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
    <section className="py-20 bg-white dark:bg-gray-900" id="about">
      <div className="container mx-auto px-4">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-4 dark:text-white">About Scorpion X</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
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
              className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer hover:scale-105 hover:bg-gray-50 dark:hover:bg-gray-700"
              onClick={feature.action}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <feature.icon className="w-12 h-12 text-purple-600 mb-4 mx-auto" />
              <h3 className="text-xl font-semibold mb-2 dark:text-white">{feature.title}</h3>
              <p className="text-gray-600 dark:text-gray-300">{feature.description}</p>
              <div className="mt-4 text-purple-600 dark:text-purple-400 text-sm font-medium opacity-70">
                Click to explore →
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
