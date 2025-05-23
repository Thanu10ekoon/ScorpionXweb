import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const teamMembers = [
  {
    name: "Thanujaya Tennekoon",
    role: "Lead Developer and AI Enthusiast",
    bio: "Full-stack developer with expertise in modern web technologies and competitive programming. Machine learning enthusiast focused on developing innovative AI solutions and algorithms.",
    image: "/Thanujaya.jpg",
    social: {
      github: "https://github.com/Thanu10ekoon",
      linkedin: "https://linkedin.com/in/thanujaya-tennekoon-b9a155271"
    }
  },
  {
    name: "Ramishka Thennakoon",
    role: "Full-stack Developer",
    bio: "Full-stack developer with expertise in backend development",
    image: "/Ramishka.jpg",
    social: {
      github: "https://github.com/ramishka-devx",
      facebook: "https://facebook.com/ramishka.geenath.7"
    }
  },
  {
    name: "Pathum Vimukthi",
    role: "Cybersecurity Enthusiast",
    bio: "Cybersecurity enthusiast with expertise in ethical hacking and penetration testing",
    image: "/Pathum.jpg",
    social: {
      github: "https://github.com/Pathum-Vimukthi-Kumara",
      facebook: "https://facebook.com/pathum.vimukthi.75"
    }
  },
  {
    name: "Dineth Keragala",
    role: "Frontend Developer",
    bio: "Frontend developer with an eye for design and user experience",
    image: "/Keragala.jpg",
    social: {
      github: "https://github.com/Pathum-Vimukthi-Kumara",
      facebook: "https://facebook.com/pathum.vimukthi.75"
    }
  }
];

export default function Team() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section className="py-20 bg-gray-50 dark:bg-gray-900" id="team">
      <div className="container mx-auto px-4">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-4 dark:text-white">Our Team</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Meet the brilliant minds behind Scorpion X's success
          </p>
        </motion.div>

        <div className="flex flex-col items-center gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 w-full max-w-md"
          >
            <div className="text-center">
              <img src={teamMembers[0].image} alt={teamMembers[0].name} className="w-32 h-32 mx-auto mb-4 rounded-full object-cover border-4 border-purple-500" />
              <h3 className="text-xl font-semibold mb-2 dark:text-white">{teamMembers[0].name}</h3>
              <p className="text-purple-600 dark:text-purple-400 mb-3">{teamMembers[0].role}</p>
              <p className="text-gray-600 dark:text-gray-300 mb-4">{teamMembers[0].bio}</p>
            </div>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {teamMembers.slice(1).map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6"
              >
                <div className="text-center">
                  <img src={member.image} alt={member.name} className="w-32 h-32 mx-auto mb-4 rounded-full object-cover border-4 border-purple-500" />
                  <h3 className="text-xl font-semibold mb-2 dark:text-white">{member.name}</h3>
                  <p className="text-purple-600 dark:text-purple-400 mb-3">{member.role}</p>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">{member.bio}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}