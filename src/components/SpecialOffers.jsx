import React from 'react';
import { motion } from 'framer-motion';
import { FaCarSide, FaTags, FaCalendarAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';  // <-- use 'react-router-dom'

const offers = [
  {
    id: 1,
    icon: <FaTags className="text-4xl text-white" />,
    title: "Get 15% Off!",
    description: "Enjoy a 15% discount on all weekend rentals. Limited time only!",
    buttonText: "Book Now",
    bg: "bg-gradient-to-r from-pink-500 to-red-500",
  },
  {
    id: 2,
    icon: <FaCarSide className="text-4xl text-white" />,
    title: "Luxury at $99/day!",
    description: "Drive premium vehicles this holiday season for just $99/day!",
    buttonText: "Learn More",
    bg: "bg-gradient-to-r from-blue-500 to-indigo-500",
  },
  {
    id: 3,
    icon: <FaCalendarAlt className="text-4xl text-white" />,
    title: "Extended Rentals Deal!",
    description: "Book 5 days, get 1 day free on all sedan rentals.",
    buttonText: "Book Now",
    bg: "bg-gradient-to-r from-green-500 to-emerald-500",
  },
];

const SpecialOffers = () => {
  return (
    <div className="py-12 bg-gray-50">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold text-gray-800"> Special Offers at Carvia</h2>
        <p className="text-gray-600 mt-2">Don’t miss out on these exclusive deals!</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto px-4">
        {offers.map((offer, index) => {
          // Determine destination based on button text
          const linkTo = offer.buttonText === "Learn More" ? "/holiday-deal" : "/available-cars";

          return (
            <motion.div
              key={offer.id}
              initial={{ opacity: 0, x: index % 2 === 0 ? -100 : 100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              whileHover={{ scale: 1.05 }}
              className={`rounded-2xl shadow-lg p-6 text-white ${offer.bg} hover:shadow-2xl transform transition-all`}
            >
              <div className="mb-4 flex items-center justify-center">
                {offer.icon}
              </div>
              <h3 className="text-2xl font-semibold mb-2 text-center">{offer.title}</h3>
              <p className="mb-4 text-center">{offer.description}</p>
              <div className="flex justify-center">
                <Link
                  to={linkTo}
                  className="inline-block bg-white text-gray-800 px-4 py-2 rounded-lg font-semibold hover:bg-gray-200 transition"
                >
                  {offer.buttonText}
                </Link>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default SpecialOffers;

