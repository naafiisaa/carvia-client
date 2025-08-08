
import React from 'react';
import { FaCarSide, FaDollarSign, FaHeadset, FaRegClock } from 'react-icons/fa';
import { motion } from 'framer-motion';

const features = [
  {
    icon: <FaCarSide className="text-4xl text-primary" />,
    title: 'Wide Variety of Cars',
    description: 'Choose from economy cars to premium rides tailored for every journey.',
  },
  {
    icon: <FaDollarSign className="text-4xl text-primary" />,
    title: 'Affordable Prices',
    description: 'Enjoy competitive daily rates with no hidden fees.',
  },
  {
    icon: <FaRegClock className="text-4xl text-primary" />,
    title: 'Easy Booking Process',
    description: 'Book your perfect ride in just a few effortless steps.',
  },
  {
    icon: <FaHeadset className="text-4xl text-primary" />,
    title: '24/7 Support',
    description: 'We’re here round the clock to help with all your queries.',
  },
];

const WhyChooseUs = () => {
  return (
    <section className="py-16 bg-gray-100" id="why-us">
      <div className="max-w-6xl mx-auto px-6 text-center">
        <motion.h2 
          className="text-4xl font-bold text-gray-800 mb-4"
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Why Choose <span className="text-primary">Carvia</span>?
        </motion.h2>
        <motion.p 
          className="text-gray-600 mb-12 max-w-2xl mx-auto"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          Discover the reasons drivers trust Carvia for all their car rental needs.
        </motion.p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((item, index) => (
            <motion.div
              key={index}
              className="bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition duration-300"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index, duration: 0.5 }}
            >
              <div className="flex justify-center mb-4">
                {item.icon}
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">{item.title}</h3>
              <p className="text-gray-600 text-sm">{item.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
