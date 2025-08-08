// import { motion } from 'framer-motion'; // For animation effects
// import { FaRegGem, FaRegClock, FaStar } from 'react-icons/fa'; // Icons for features

// // List of features to display in the section
// const features = [
//   {
//     icon: <FaRegGem className="text-4xl text-primary" />, // Luxury gem icon
//     title: 'Luxury Experience',
//     description: 'Drive the most elegant and prestigious cars to make every journey unforgettable.',
//   },
//   {
//     icon: <FaRegClock className="text-4xl text-primary" />, // Clock icon for 24/7 access
//     title: '24/7 Access',
//     description: 'Book anytime, from anywhere. We’re always ready to deliver your ride.',
//   },
//   {
//     icon: <FaStar className="text-4xl text-primary" />, // Star icon for top-rated service
//     title: 'Top-rated Service',
//     description: 'Thousands of satisfied customers rate CarVia as the best rental service.',
//   },
// ];

// const LuxuryExperienceSection = () => {
//   return (
//     <section className="py-16 px-4 bg-base-200 text-center">
//       {/* Container with fade-in and slide-up animation */}
//       <motion.div
//         initial={{ opacity: 0, y: 40 }}          // Start hidden and moved down
//         whileInView={{ opacity: 1, y: 0 }}      // Animate to visible and original position
//         transition={{ duration: 0.6 }}           // Smooth transition over 0.6 seconds
//         viewport={{ once: false }}                // Animate every time it scrolls into view
//         className="max-w-5xl mx-auto"
//       >
//         {/* Section heading */}
//         <h2 className="text-4xl md:text-5xl font-bold mb-10 text-primary">
//           Luxury, Comfort & Convenience
//         </h2>

//         {/* Section description */}
//         <p className="text-base-content text-lg mb-12">
//           At CarVia, we believe in more than just getting you from point A to B.
//           We offer a premium experience designed for travelers, adventurers, and professionals alike.
//         </p>

//         {/* Features grid */}
//         <div className="grid md:grid-cols-3 gap-8">
//           {features.map((feature, index) => (
//             <motion.div
//               key={index}
//               initial={{ opacity: 0, y: 20 }}          // Start each feature slightly down and hidden
//               whileInView={{ opacity: 1, y: 0 }}       // Animate into view
//               transition={{ duration: 0.4, delay: index * 0.2 }}  // Stagger animation by index
//               viewport={{ once: false }}
//               className="bg-base-100 p-6 rounded-xl shadow-md flex justify-center items-center flex-col"
//             >
//               {/* Feature icon */}
//               <div className="mb-4">{feature.icon}</div>
//               {/* Feature title */}
//               <h4 className="text-xl font-semibold mb-2">{feature.title}</h4>
//               {/* Feature description */}
//               <p className="text-base-content">{feature.description}</p>
//             </motion.div>
//           ))}
//         </div>
//       </motion.div>
//     </section>
//   );
// };

// export default LuxuryExperienceSection;
import React from 'react';
import { motion } from 'framer-motion';
import { FaStar, FaUserCircle } from 'react-icons/fa';

const reviews = [
  {
    id: 1,
    name: 'Sarah A.',
    rating: 5,
    comment: 'Booking a car through Carvia was so easy and smooth. Loved the customer support and car condition!',
  },
  {
    id: 2,
    name: 'John D.',
    rating: 4,
    comment: 'Affordable prices and great vehicle choices. Will definitely use Carvia again for my weekend trips!',
  },
  {
    id: 3,
    name: 'Maya R.',
    rating: 5,
    comment: 'The booking experience was top-notch. Clean cars, friendly service, and quick check-in process.',
  },
];

const CustomerReviews = () => {
  return (
    <div className="py-12 bg-white">
      <div className="text-center mb-10">
        <h2 className="text-4xl font-bold text-gray-800">🌟 What Our Customers Say</h2>
        <p className="text-gray-600 mt-2">Real feedback from happy Carvia users</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto px-6">
        {reviews.map((review, index) => (
          <motion.div
            key={review.id}
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
            className="p-6 bg-gray-50 rounded-2xl shadow hover:shadow-lg transition"
          >
            <div className="flex items-center mb-4">
              <FaUserCircle className="text-4xl text-blue-600 mr-3" />
              <div>
                <h4 className="text-lg font-semibold text-gray-800">{review.name}</h4>
                <div className="flex text-yellow-400">
                  {Array(review.rating).fill().map((_, i) => (
                    <FaStar key={i} />
                  ))}
                </div>
              </div>
            </div>
            <p className="text-gray-600 italic">"{review.comment}"</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default CustomerReviews;
