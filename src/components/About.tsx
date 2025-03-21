import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Code, Brain, Trophy } from 'lucide-react';

const features = [
  {
    icon: Code,
    title: "Software Development",
    description: "Building cutting-edge solutions with modern technologies"
  },
  {
    icon: Brain,
    title: "AI Solutions",
    description: "Leveraging artificial intelligence to solve complex problems"
  },
  {
    icon: Trophy,
    title: "Competitions",
    description: "Excelling in National, Inter-Unviversity and Intra-University tech competitions"
  }
];

export default function About() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  return (
    <section className="py-20 bg-white" id="about">
      <div className="container mx-auto px-4">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-4">About Scorpion X</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
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
              className="p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <feature.icon className="w-12 h-12 text-purple-600 mb-4 mx-auto" />
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}