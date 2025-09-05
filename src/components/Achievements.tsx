import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Award, Trophy, Star } from 'lucide-react';
import { useState } from 'react';

const achievements = [
  {
    title: "CodeX by UoM Champions",
    description: "Champions (1st Place) of the CodeX by CodeJam Coding, Development and Algorithmic Challenge organized by the Department of Computer Science & Engineering(CSE), University of Moratuwa",
    icon: Trophy,
    link: "https://web.facebook.com/share/p/19HhzoSpTg/",
    hoverImage: "/gallery01.jpg"
  },
  {
    title: "BitCode V5.0 2nd Runners Up",
    description: "2nd Runners up of the BitCode V5.0 Inter-University National Hackathon",
    icon: Award,
    link: "https://web.facebook.com/share/p/161eSHnBEf/",
    hoverImage: "/gallery1.jpg"
  },
  {
    title: "{Algothon} 2nd Runners Up",
    description: "2nd Runners up of the {Algothon} in Codefest 2025 by SLIIT",
    icon: Award,
    link: "https://web.facebook.com/share/1FPCcEUrXb/",
    hoverImage: 'Algothon1.jpg'
  }
  
];

export default function Achievements() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });
  
  const [hoveredImage, setHoveredImage] = useState<string | null>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section className="py-20 bg-white dark:bg-gray-800" id="achievements">
      <div className="container mx-auto px-4">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-4 dark:text-white">Our Achievements</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Celebrating our milestones and recognition in the tech industry
          </p>
        </motion.div>

        <div className="relative">
          <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-purple-200 dark:bg-purple-900"></div>
          
          {/* Hover Image Display */}
          {hoveredImage && hoveredIndex !== null && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.3 }}
              className={`absolute z-20 pointer-events-none ${
                hoveredIndex % 2 === 0 
                  ? 'left-1/2 ml-8' 
                  : 'right-1/2 mr-8'
              }`}
              style={{ 
                top: `${hoveredIndex * 180 + 30}px`
              }}
            >
              <img 
                src={hoveredImage} 
                alt="Achievement" 
                className="w-56 h-40 object-cover rounded-xl shadow-2xl border-4 border-purple-500"
              />
            </motion.div>
          )}
          
          {achievements.map((achievement, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              className={`relative flex items-center mb-12 ${
                index % 2 === 0 ? 'justify-start' : 'justify-end'
              }`}
            >
              <div className={`w-1/2 flex ${
                index % 2 === 0 ? 'justify-end pr-8' : 'justify-start pl-8'
              }`}>
                <div
                  className="bg-white dark:bg-gray-700 p-6 rounded-xl shadow-lg max-w-md cursor-pointer hover:shadow-xl transition-all duration-300"
                  onClick={() => achievement.link && window.open(achievement.link, "_blank")}
                  onMouseEnter={() => {
                    if (achievement.hoverImage) {
                      setHoveredImage(achievement.hoverImage);
                      setHoveredIndex(index);
                    }
                  }}
                  onMouseLeave={() => {
                    setHoveredImage(null);
                    setHoveredIndex(null);
                  }}
                >
                  <div className="flex items-center mb-4">
                    <achievement.icon className="w-8 h-8 text-purple-600 dark:text-purple-400 mr-3" />
                    <h3 className="text-xl font-bold dark:text-white">
                      {achievement.title}
                    </h3>
                  </div>
                  <p className="text-gray-600 dark:text-gray-300">
                    {achievement.description}
                  </p>
                </div>
              </div>
              <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-purple-500 rounded-full border-4 border-white dark:border-gray-800"></div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
