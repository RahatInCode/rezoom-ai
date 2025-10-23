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
      name: "Suprotik Chowdhury",
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
    // Updated: Light background with emerald gradient
    <section className="relative py-32 px-6 bg-gradient-to-br from-white via-emerald-50 to-slate-50 overflow-hidden">
      {/* Updated: Animated background elements with emerald colors */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -left-20 w-72 h-72 bg-emerald-400/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-emerald-500/15 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-emerald-300/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      {/* Updated: Grid pattern overlay with light theme */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(16,185,129,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(16,185,129,0.03)_1px,transparent_1px)] bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,black,transparent)]"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Updated: Header with emerald styling */}
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
            className="inline-block mb-6"
          >
            {/* Updated: Emerald badge */}
            <span className="px-6 py-3 bg-gradient-to-r from-emerald-100 to-emerald-200 border-2 border-emerald-300 rounded-full text-sm font-bold text-emerald-800 backdrop-blur-sm shadow-lg">
              Our Team
            </span>
          </motion.div>
          
          {/* Updated: Emerald gradient heading */}
          <h2 
            className="text-5xl md:text-6xl lg:text-7xl font-extrabold mb-6 bg-gradient-to-r from-slate-900 via-emerald-800 to-emerald-900 bg-clip-text text-transparent leading-tight"
            style={{ fontFamily: 'Inter, sans-serif' }}
          >
            Meet Our Developers
          </h2>
          <p className="text-slate-600 text-xl md:text-2xl max-w-3xl mx-auto font-medium leading-relaxed" style={{ fontFamily: 'Inter, sans-serif' }}>
            The creative minds and technical wizards powering our Career Center platform
          </p>
        </motion.div>

        {/* Updated: Developer Cards with emerald theme */}
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
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
              {/* Updated: Emerald glow effect on hover */}
              <div className="absolute -inset-0.5 bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-3xl opacity-0 group-hover:opacity-75 blur-lg transition duration-500"></div>
              
              <motion.div
                whileHover={{ y: -10 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="relative bg-white rounded-3xl shadow-2xl overflow-hidden border-2 border-emerald-100 group-hover:border-emerald-300 transition-all duration-500"
              >
                {/* Updated: Emerald card background gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-50/50 via-transparent to-emerald-100/30 opacity-0 group-hover:opacity-100 transition duration-500"></div>
                
                <div className="relative p-10 flex flex-col items-center">
                  {/* Updated: Image container with emerald animated border */}
                  <motion.div
                    whileHover={{ rotate: [0, -5, 5, -5, 0] }}
                    transition={{ duration: 0.5 }}
                    className="relative mb-8"
                  >
                    {/* Updated: Emerald glow */}
                    <div className="absolute -inset-3 bg-gradient-to-r from-emerald-500 via-emerald-600 to-emerald-500 rounded-full opacity-60 blur-lg group-hover:opacity-100 transition duration-500 animate-pulse"></div>
                    <Image
                      src={dev.img}
                      alt={dev.name}
                      className="relative w-36 h-36 rounded-full object-cover border-4 border-white shadow-2xl ring-4 ring-emerald-200 group-hover:ring-emerald-400 transition-all duration-500"
                      width={144}
                      height={144}
                    />
                    
                    {/* Updated: Emerald status indicator */}
                    <div className="absolute bottom-2 right-2 w-6 h-6 bg-emerald-400 rounded-full border-4 border-white shadow-xl animate-pulse"></div>
                  </motion.div>

                  {/* Updated: Name and role with emerald styling */}
                  <h3 
                    className="text-2xl md:text-3xl font-bold mb-3 text-slate-900 text-center"
                    style={{ fontFamily: 'Inter, sans-serif' }}
                  >
                    {dev.name}
                  </h3>
                  {/* Updated: Emerald role badge */}
                  <p 
                    className="text-emerald-700 text-sm font-bold mb-8 px-5 py-2 bg-emerald-100 rounded-full border-2 border-emerald-300 shadow-md"
                    style={{ fontFamily: 'Inter, sans-serif' }}
                  >
                    {dev.role}
                  </p>

                  {/* Updated: Social links with emerald accents */}
                  <div className="flex gap-5 mt-auto">
                    <motion.a
                      href={dev.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.15, rotate: 5 }}
                      whileTap={{ scale: 0.95 }}
                      className="w-14 h-14 rounded-xl bg-slate-100 border-2 border-slate-200 flex items-center justify-center text-slate-700 hover:text-slate-900 hover:bg-slate-200 hover:border-emerald-400 hover:shadow-lg transition-all duration-300"
                    >
                      <FaGithub className="text-2xl" />
                    </motion.a>
                    <motion.a
                      href={dev.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.15, rotate: -5 }}
                      whileTap={{ scale: 0.95 }}
                      className="w-14 h-14 rounded-xl bg-blue-50 border-2 border-blue-200 flex items-center justify-center text-blue-600 hover:text-blue-700 hover:bg-blue-100 hover:border-blue-400 hover:shadow-lg transition-all duration-300"
                    >
                      <FaLinkedin className="text-2xl" />
                    </motion.a>
                  </div>

                  {/* Updated: Emerald decorative corner elements */}
                  <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-emerald-400/20 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition duration-500"></div>
                  <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-emerald-500/20 to-transparent rounded-tr-full opacity-0 group-hover:opacity-100 transition duration-500"></div>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* Updated: Emerald bottom decorative line */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8, duration: 1 }}
          className="mt-24 h-1 bg-gradient-to-r from-transparent via-emerald-500/50 to-transparent rounded-full shadow-lg"
        ></motion.div>
      </div>
    </section>
  );
}