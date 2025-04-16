import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Award, Trophy, Star } from 'lucide-react';

const achievements = [
  {
    title: "BitCode V5.0 2nd Runners Up",
    description: "2nd Runners up of the BitCode V5.0 Inter-University National Hackathon",
    icon: Trophy,
    link: "https://web.facebook.com/share/p/161eSHnBEf/"
  },
  {
    title: "VoltCast 1.0 2nd Runners Up",
    description: "2nd Runners up of the VoltCast 1.0 Intra-University Ideathon",
    icon: Award,
    link: "https://web.facebook.com/share/p/1B3j5SttsV/"
  },
  {
    title: "Finalists of CodeX by Codejam of CSE, UOM",
    description: "Experiencing excellence in coding competitions",
    icon: Star,
    link: "https://www.linkedin.com/posts/thanujaya-tennekoon-b9a155271_codex-scorpionx-finalists-activity-7315706641327235072-hYTM?utm_source=share&utm_medium=member_desktop&rcm=ACoAAEJoWWYB-le4TFfH2prq-kEX6-DJwlbmxwM"
  }
];

export default function Achievements() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

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
                  className="bg-white dark:bg-gray-700 p-6 rounded-xl shadow-lg max-w-md cursor-pointer"
                  onClick={() => achievement.link && window.open(achievement.link, "_blank")}
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
