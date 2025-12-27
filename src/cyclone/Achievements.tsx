import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Award, Trophy } from 'lucide-react';
import { useState } from 'react';

const achievements = [
  {
    title: "Coderally 6.0 2nd Runner Up",
    description: "2nd Runner up of Coderally 6.0 organized by IIT",
    icon: Trophy,
    link: "https://www.eng.ruh.ac.lk/deie/cyclone-x-emerged-as-the-2nd-runners-up-at-coderally-6-0/",
    hoverImage: "/Cyclone/7.jpg"
  },
  {
    title: "Code Night 2025 Championship",
    description: "Champions of Code Night 2025 Sponsored by BotCalm and Certix in Faculty of Engineering University of Ruhuna",
    icon: Trophy,
    link: "https://web.facebook.com/share/p/1AS3ax93Jc/",
    hoverImage: "/Cyclone/6.jpg"
  },
  {
    title: "Top 5 in HaXtreme 4.0",
    description: "Top 10 team with 5th place in HaXtreme 4.0 by IEEE Computer Society of Faculty of Engineering, University of Ruhuna",
    icon: Award,
    link: "https://www.haxtreme.live/leaderboard",
    hoverImage: "/Cyclone/2.jpg"
  }
];

export default function CycloneAchievements() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [hoveredImage, setHoveredImage] = useState<string | null>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section className="py-20 bg-[#eaf6ff] dark:bg-[#0a1c17]" id="achievements">
      <div className="container mx-auto px-4">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-4 text-[#0b132b] dark:text-[#d2ffee]">Cyclone Achievements</h2>
          <p className="text-lg text-[#1c2f4a] dark:text-[#c2ffe7] max-w-3xl mx-auto">
            Highlights that prove Cyclone-grade delivery when it matters most.
          </p>
        </motion.div>

        <div className="relative">
          <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-[#00b8ff]/35 dark:bg-[#16f2b4]/35"></div>

          {hoveredImage && hoveredIndex !== null && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.3 }}
              className={`absolute z-20 pointer-events-none ${
                hoveredIndex % 2 === 0 ? 'left-1/2 ml-8' : 'right-1/2 mr-8'
              }`}
              style={{ top: `${hoveredIndex * 180 + 30}px` }}
            >
              <img
                src={hoveredImage}
                alt="Achievement"
                className="w-56 h-40 object-cover rounded-xl shadow-2xl border-4 border-[#00b8ff]"
              />
            </motion.div>
          )}

          {achievements.map((achievement, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              className={`relative flex items-center mb-12 ${index % 2 === 0 ? 'justify-start' : 'justify-end'}`}
            >
              <div className={`w-1/2 flex ${index % 2 === 0 ? 'justify-end pr-8' : 'justify-start pl-8'}`}>
                <div
                  className="bg-white dark:bg-[#0f2620] p-6 rounded-xl shadow-lg max-w-md cursor-pointer hover:shadow-xl transition-all duration-300 border border-[#00b8ff]/30 dark:border-[#16f2b4]/35"
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
                    <achievement.icon className="w-8 h-8 text-[#00b8ff] dark:text-[#16f2b4] mr-3" />
                    <h3 className="text-xl font-bold text-[#0b132b] dark:text-[#d2ffee]">
                      {achievement.title}
                    </h3>
                  </div>
                  <p className="text-[#1f3a56] dark:text-[#c2ffe7]">
                    {achievement.description}
                  </p>
                </div>
              </div>
              <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-[#16f2b4] rounded-full border-4 border-white dark:border-[#0a1c17]"></div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
