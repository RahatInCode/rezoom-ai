import React from 'react';
import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import Image from 'next/image';

export default function DeveloperSection() {
  const developers = [
    {
      name: "Ahmed Rahat",
      role: "Full Stack Developer",
      img: "https://i.pinimg.com/736x/ca/8a/de/ca8ade9acdf1115e9364fd30abd41754.jpg",
      github: "https://github.com",
      linkedin: "https://linkedin.com"
    },
    {
      name: "Abir Hassan",
      role: "UI/UX Designer",
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTwsAreAj5zvD_FiBeeHn-5yOAvC_ye_1-IWA&s",
      github: "https://github.com",
      linkedin: "https://linkedin.com"
    },
    {
      name: "Ibrahim",
      role: "Backend Engineer",
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSTm32O36eUVrQJyeXnHQbJM6Rk9rzSgIXqbQ&s",
      github: "https://github.com",
      linkedin: "https://linkedin.com"
    },
    {
      name: "Suprotik chowdhury",
      role: "Backend Engineer",
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSTm32O36eUVrQJyeXnHQbJM6Rk9rzSgIXqbQ&s",
      github: "https://github.com",
      linkedin: "https://linkedin.com"
    },
    {
      name: "Fouzia Islam",
      role: "Backend Engineer",
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSTm32O36eUVrQJyeXnHQbJM6Rk9rzSgIXqbQ&s",
      github: "https://github.com",
      linkedin: "https://linkedin.com"
    }
  ];

  return (
    <section className="relative py-24 px-6 bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950 text-white overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -left-20 w-72 h-72 bg-purple-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-pink-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      {/* Grid pattern overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,black,transparent)]"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 200, damping: 10 }}
            className="inline-block mb-4"
          >
            <span className="px-4 py-2 bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30 rounded-full text-sm font-medium backdrop-blur-sm">
              Our Team
            </span>
          </motion.div>
          
          <h2 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent">
            Meet Our Developers
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            The creative minds and technical wizards powering our Career Center platform
          </p>
        </motion.div>

        {/* Developer Cards */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {developers.map((dev, index) => (
            <motion.div
              key={dev.name}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ 
                delay: index * 0.15,
                type: "spring",
                stiffness: 100
              }}
              className="group relative"
            >
              {/* Glow effect on hover */}
              <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-600 to-pink-600 rounded-3xl opacity-0 group-hover:opacity-100 blur transition duration-500"></div>
              
              <motion.div
                whileHover={{ y: -8 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-3xl shadow-2xl overflow-hidden border border-white/10"
              >
                {/* Card background gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-transparent to-pink-500/10 opacity-0 group-hover:opacity-100 transition duration-500"></div>
                
                <div className="relative p-8 flex flex-col items-center">
                  {/* Image container with animated border */}
                  <motion.div
                    whileHover={{ rotate: [0, -5, 5, -5, 0] }}
                    transition={{ duration: 0.5 }}
                    className="relative mb-6"
                  >
                    <div className="absolute -inset-2 bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600 rounded-full opacity-75 blur-md group-hover:opacity-100 transition duration-500 animate-pulse"></div>
                    <Image
                      src={dev.img}
                      alt={dev.name}
                      className="relative w-32 h-32 rounded-full object-cover border-4 border-white/20 shadow-xl"
                        width={128}
                        height={128}
                    />
                    
                    {/* Status indicator */}
                    <div className="absolute bottom-2 right-2 w-5 h-5 bg-green-400 rounded-full border-4 border-slate-900 shadow-lg"></div>
                  </motion.div>

                  {/* Name and role */}
                  <h3 className="text-2xl font-bold mb-2 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                    {dev.name}
                  </h3>
                  <p className="text-purple-300 text-sm font-medium mb-6 px-3 py-1 bg-purple-500/20 rounded-full border border-purple-500/30">
                    {dev.role}
                  </p>

                  {/* Social links */}
                  <div className="flex gap-4 mt-auto">
                    <motion.a
                      href={dev.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.2, rotate: 5 }}
                      whileTap={{ scale: 0.9 }}
                      className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-gray-300 hover:text-white hover:bg-white/10 hover:border-white/20 transition-all duration-300 backdrop-blur-sm"
                    >
                      <FaGithub className="text-xl" />
                    </motion.a>
                    <motion.a
                      href={dev.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.2, rotate: -5 }}
                      whileTap={{ scale: 0.9 }}
                      className="w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-300 hover:text-blue-400 hover:bg-blue-500/20 hover:border-blue-500/30 transition-all duration-300 backdrop-blur-sm"
                    >
                      <FaLinkedin className="text-xl" />
                    </motion.a>
                  </div>

                  {/* Decorative corner elements */}
                  <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-purple-500/20 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition duration-500"></div>
                  <div className="absolute bottom-0 left-0 w-20 h-20 bg-gradient-to-tr from-pink-500/20 to-transparent rounded-tr-full opacity-0 group-hover:opacity-100 transition duration-500"></div>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* Bottom decorative line */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8, duration: 1 }}
          className="mt-20 h-px bg-gradient-to-r from-transparent via-purple-500/50 to-transparent"
        ></motion.div>
      </div>
    </section>
  );
}