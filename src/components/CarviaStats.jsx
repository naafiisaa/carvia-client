import React from 'react';
import CountUp from 'react-countup';
import { motion } from 'framer-motion';
import { FaUsers, FaCar, FaCity, FaSmile } from 'react-icons/fa';

const stats = [
  {
    icon: <FaUsers className="text-4xl text-blue-600" />,
    label: "Happy Customers",
    end: 25000,
    suffix: "+",
  },
  {
    icon: <FaCar className="text-4xl text-green-600" />,
    label: "Cars Rented",
    end: 50000,
    suffix: "+",
  },
  {
    icon: <FaCity className="text-4xl text-purple-600" />,
    label: "Cities Served",
    end: 120,
    suffix: "+",
  },
  {
    icon: <FaSmile className="text-4xl text-pink-600" />,
    label: "Customer Satisfaction",
    end: 98,
    suffix: "%",
  },
];

const CarviaStats = () => {
  return (
    <div className="py-16 bg-gray-100">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold text-gray-800">📈 Carvia in Numbers</h2>
        <p className="text-gray-600 mt-2">Trusted and loved across the country</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 max-w-6xl mx-auto px-6">
        {stats.map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
            viewport={{ once: true }}
            className="text-center bg-white rounded-2xl shadow p-6 hover:shadow-lg transition"
          >
            <div className="flex justify-center mb-4">{stat.icon}</div>
            <h3 className="text-3xl font-bold text-gray-800">
              <CountUp end={stat.end} duration={2.5} suffix={stat.suffix} />
            </h3>
            <p className="text-gray-600 mt-1">{stat.label}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default CarviaStats;



