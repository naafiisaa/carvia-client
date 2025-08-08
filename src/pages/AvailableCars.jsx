import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FiSearch, FiMapPin, FiList, FiGrid } from "react-icons/fi";
import useScrollToTop from "../Utils/UseScrollToTop";

const AvailableCars = () => {
  useScrollToTop();

  const [allCars, setAllCars] = useState([]);
  const [availableCars, setAvailableCars] = useState([]);
  const [view, setView] = useState("grid");
  const [sortBy, setSortBy] = useState("newest");
  const [sortAsc, setSortAsc] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  // Fix infinite re-render: update sortAsc ONLY when sortBy changes
  useEffect(() => {
    if (sortBy === "newest" || sortBy === "high-price") {
      setSortAsc(false);
    } else {
      setSortAsc(true);
    }
  }, [sortBy]);

  useEffect(() => {
    fetch("https://cars-omega-two.vercel.app/available-cars")
      .then((res) => res.json())
      .then((data) => {
        const available = data.filter((car) => car.status === "available");
        setAllCars(data);
        setAvailableCars(available);
      })
      .catch((err) => console.error("Fetch cars error:", err));
  }, []);

  const sortCars = (cars) => {
    const sorted = [...cars];
    switch (sortBy) {
      case "newest":
        return sorted.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      case "oldest":
        return sorted.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
      case "low-price":
        return sorted.sort((a, b) => parseFloat(a.pricePerDay) - parseFloat(b.pricePerDay));
      case "high-price":
        return sorted.sort((a, b) => parseFloat(b.pricePerDay) - parseFloat(a.pricePerDay));
      default:
        return sorted;
    }
  };

  const filteredCars = availableCars.filter((car) => {
    const search = searchTerm.toLowerCase();
    return (
      car.carModel.toLowerCase().includes(search) ||
      (car.location && car.location.toLowerCase().includes(search))
    );
  });

  const sortedCars = sortCars(filteredCars);

  // Animation variants
  const cardVariants = {
    hidden: { opacity: 0, y: 25 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
    exit: { opacity: 0, y: 20, transition: { duration: 0.25 } },
  };

  const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.1 } },
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="p-6 max-w-7xl mx-auto min-h-screen"
    >
      {/* Header & Filters */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-8">
        <div>
          <h1 className="text-4xl font-extrabold text-gray-800">Available Cars</h1>
          <div className="mt-2 inline-flex items-center gap-2 text-blue-600 font-semibold bg-blue-100 px-3 py-1 rounded-full">
            <span className="w-3 h-3 rounded-full bg-blue-600 animate-ping inline-block"></span>
            {availableCars.length} / {allCars.length} Cars Available
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
          <div className="relative w-full md:w-64">
            <FiSearch className="absolute top-3 left-3 text-gray-400" />
            <input
              type="text"
              placeholder="Search by model or location"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="input input-bordered w-full pl-10"
            />
          </div>

          <select
            className="select select-bordered w-full md:w-auto"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="newest">Date Added (Newest)</option>
            <option value="oldest">Date Added (Oldest)</option>
            <option value="low-price">Price (Lowest)</option>
            <option value="high-price">Price (Highest)</option>
          </select>

          <div className="flex items-center gap-3 bg-base-200 p-2 rounded-md border border-gray-300 select-none">
            <FiList
              className={`cursor-pointer w-6 h-6 ${view === "list" ? "text-blue-600" : "text-gray-400"}`}
              onClick={() => setView("list")}
              title="List View"
            />
            <FiGrid
              className={`cursor-pointer w-6 h-6 ${view === "grid" ? "text-blue-600" : "text-gray-400"}`}
              onClick={() => setView("grid")}
              title="Grid View"
            />
          </div>
        </div>
      </div>

      {/* Cars Grid or List */}
      {view === "grid" ? (
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <AnimatePresence>
            {sortedCars.map((car) => (
              <motion.div
                key={car._id}
                layout
                variants={cardVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                whileHover={{ scale: 1.05, boxShadow: "0 6px 15px rgba(59,130,246,0.3)" }}
                className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer"
              >
                <div className="relative h-44 overflow-hidden">
                  <img
                    src={car.imageUrl || car.image}
                    alt={car.carModel}
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                    loading="lazy"
                  />
                  <span className="absolute top-2 right-2 bg-blue-600 text-white px-2 py-1 rounded text-xs font-semibold">
                    ${parseFloat(car.pricePerDay).toFixed(2)}/day
                  </span>
                </div>

                <div className="p-4">
                  <h2 className="text-lg font-semibold text-gray-800 truncate">{car.carModel}</h2>
                  <p className="flex items-center text-gray-600 mt-1">
                    <FiMapPin className="mr-1" /> {car.location || "Unknown location"}
                  </p>
                  <Link
                    to={`/car-details/${car._id}`}
                    className="mt-3 inline-block bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
                  >
                    View Details
                  </Link>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      ) : (
        <motion.div
          className="flex flex-col space-y-5"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <AnimatePresence>
            {sortedCars.map((car) => (
              <motion.div
                key={car._id}
                layout
                variants={cardVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                whileHover={{ scale: 1.02, boxShadow: "0 4px 12px rgba(59,130,246,0.15)" }}
                className="flex items-center bg-white rounded-lg shadow-md overflow-hidden p-4 cursor-pointer"
              >
                <img
                  src={car.imageUrl || car.image}
                  alt={car.carModel}
                  className="w-36 h-24 object-cover rounded-lg flex-shrink-0"
                  loading="lazy"
                />
                <div className="flex-1 ml-5">
                  <h3 className="text-2xl font-semibold text-gray-800">{car.carModel}</h3>
                  <p className="flex items-center text-gray-700 mt-1">
                    <FiMapPin className="mr-2" /> {car.location || "Unknown location"}
                  </p>
                  <p className="text-lg font-medium text-blue-600 mt-2">
                    ${parseFloat(car.pricePerDay).toFixed(2)} / day
                  </p>
                </div>
                <Link
                  to={`/car-details/${car._id}`}
                  className="btn btn-primary ml-6 px-5 py-2 text-base"
                >
                  View Details
                </Link>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      )}
    </motion.div>
  );
};

export default AvailableCars;

