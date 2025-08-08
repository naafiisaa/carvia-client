import React from "react";
import { FaCarSide } from "react-icons/fa"; // Font Awesome car icon
import { motion } from "framer-motion";
import { Link } from "react-router";

const HolidayDeal = () => {
  return (
    <section className="bg-gradient-to-r from-blue-100 via-white to-blue-100 py-12 px-6">
      <div className="max-w-5xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="bg-white rounded-2xl shadow-xl p-8 border-2 border-blue-300 hover:shadow-blue-200 hover:scale-[1.02] transition-transform duration-300"
        >
          <div className="flex items-center justify-center mb-4">
            <FaCarSide className="text-blue-700 text-4xl animate-pulse" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-blue-900 mb-2">
            Exclusive Holiday Deal!
          </h2>
          <p className="text-gray-600 text-lg mb-4 max-w-2xl mx-auto">
            This holiday season, drive in style and comfort. Book your car now and enjoy up to <span className="text-blue-600 font-semibold">25% OFF</span> on select rentals!
          </p>
          <Link to={"/available-cars"} className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-full shadow-md transition duration-300">
            Book Now
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default HolidayDeal;
