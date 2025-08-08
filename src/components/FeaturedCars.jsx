import { useEffect, useState } from "react";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import moment from "moment";
import { motion } from "framer-motion";
import Loading from "../pages/Loading";

const FeaturedCars = () => {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const carsPerPage = 6;

  useEffect(() => {
    fetch("https://cars-omega-two.vercel.app/featured-cars/")
      .then((res) => res.json())
      .then((data) => {
        const sorted = data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        setCars(sorted);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch cars:", err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <Loading />;
  }

  const totalPages = Math.ceil(cars.length / carsPerPage);
  const startIndex = (currentPage - 1) * carsPerPage;
  const visibleCars = cars.slice(startIndex, startIndex + carsPerPage);

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.4,
        ease: "easeOut",
      },
    }),
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="px-4 py-8 my-3 w-full max-w-6xl mx-auto overflow-x-hidden min-h-screen"
    >
      <h2 className="text-4xl md:text-5xl font-bold mb-12 font-poppins text-primary text-center">
       New Arrival
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {visibleCars.map((car, i) => {
          const isAvailable =
            car.status?.toLowerCase() === "available" ||
            car.availability?.toLowerCase() === "available";

          return (
            <motion.div
              key={car._id || i}
              custom={i}
              initial="hidden"
              animate="visible"
              variants={cardVariants}
            >
              <div className="rounded-lg shadow-md overflow-hidden hover:shadow-2xl transition  duration-300">
                <img
                  src={car.imageUrl || car.image || "https://via.placeholder.com/400x300?text=No+Image"}
                  alt={car.carModel}
                  className="w-full  h-48 object-cover"
                />
                <div className="p-4 space-y-2">
                  <h3 className="text-xl font-semibold text-gray-800">
                    {car.carModel || "Unnamed Car"}
                  </h3>
                  <p className="text-gray-600">${car.pricePerDay}/day</p>
                  <p className="text-gray-500 text-sm">
                    Bookings: {car.bookingCount || 0}
                  </p>
                  <p className="text-xs text-gray-400">
                    Added {moment(car.createdAt).fromNow()}
                  </p>

                  {/* Availability Indicator */}
                  {isAvailable ? (
                    <span className="text-green-600 flex items-center gap-1 text-sm font-medium">
                      <FaCheckCircle /> Available
                    </span>
                  ) : (
                    <span className="text-red-600 flex items-center gap-1 text-sm font-medium">
                      <FaTimesCircle /> Unavailable
                    </span>
                  )}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Pagination */}
      {cars.length > carsPerPage && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="flex justify-center mt-10"
        >
          <div className="join grid grid-cols-2">
            <button
              className="join-item btn btn-outline"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            >
              Previous
            </button>
            <button
              className="join-item btn btn-outline"
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            >
              Next
            </button>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default FeaturedCars;


