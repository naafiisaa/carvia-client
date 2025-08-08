import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../providers/AuthProvider";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FaEdit, FaTrash, FaCarSide, FaSortAmountDown, FaSortAmountUp } from "react-icons/fa";

export default function MyCars() {
  const { user } = useContext(AuthContext);
  const [cars, setCars] = useState([]);
  const [sortedCars, setSortedCars] = useState([]);
  const [sortOption, setSortOption] = useState("date-desc");
  const [editingCar, setEditingCar] = useState(null);
  const [formData, setFormData] = useState({
    carModel: "",
    pricePerDay: "",
    registrationNumber: "",
    features: "",
    location: "",
    imageUrl: "",
    description: "",
    availability: "available",
  });

  // Fetch user's cars
  const fetchMyCars = async () => {
    try {
      const res = await axios.get("https://cars-omega-two.vercel.app/my-cars", {
        headers: { Authorization: `Bearer ${user?.accessToken}` },
      });
      setCars(res.data);
    } catch (err) {
      console.error("Error fetching cars:", err);
    }
  };

  useEffect(() => {
    if (user?.accessToken) fetchMyCars();
  }, [user]);

  // Sort cars based on selection
  useEffect(() => {
    let sorted = [...cars];
    switch (sortOption) {
      case "date-desc":
        sorted.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        break;
      case "date-asc":
        sorted.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
        break;
      case "price-asc":
        sorted.sort((a, b) => a.pricePerDay - b.pricePerDay);
        break;
      case "price-desc":
        sorted.sort((a, b) => b.pricePerDay - a.pricePerDay);
        break;
      default:
        break;
    }
    setSortedCars(sorted);
  }, [sortOption, cars]);

  const handleEditClick = (car) => {
    setEditingCar(car);
    setFormData({
      carModel: car.carModel || "",
      pricePerDay: car.pricePerDay || "",
      registrationNumber: car.registrationNumber || "",
      features: car.features?.join(", ") || "",
      location: car.location || "",
      imageUrl: car.imageUrl || "",
      description: car.description || "",
      availability: car.availability || "available",
    });
  };

  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    try {
      const updatedCar = {
        ...formData,
        features: formData.features.split(",").map((f) => f.trim()),
      };

      await axios.put(
        `https://cars-omega-two.vercel.app/update-car/${editingCar._id}`,
        updatedCar,
        {
          headers: { Authorization: `Bearer ${user?.accessToken}` },
        }
      );

      Swal.fire("Updated!", "Car info updated successfully.", "success");
      setEditingCar(null);
      fetchMyCars();
    } catch (error) {
      console.error("Error updating car:", error);
      Swal.fire("Error", "Failed to update car", "error");
    }
  };

  const handleDelete = async (id) => {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "This car will be permanently deleted!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
      reverseButtons: true,
    });

    if (confirm.isConfirmed) {
      try {
        await axios.delete(`https://cars-omega-two.vercel.app/delete-car/${id}`, {
          headers: { Authorization: `Bearer ${user?.accessToken}` },
        });
        Swal.fire("Deleted!", "Your car has been removed.", "success");
        fetchMyCars();
      } catch (err) {
        console.error("Error deleting car:", err);
        Swal.fire("Error", "Failed to delete car", "error");
      }
    }
  };

  if (!cars.length) {
    return (
      <div className="text-center mt-16 px-4">
        <FaCarSide className="mx-auto mb-4 text-6xl text-cyan-600 animate-bounce" />
        <h2 className="text-3xl font-semibold mb-3">No Cars Added Yet</h2>
        <Link
          to="/add-car"
          className="inline-block px-6 py-3 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700 transition"
        >
          Add a Car Now
        </Link>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h2 className="text-3xl font-bold mb-6 flex items-center gap-3 text-cyan-700">
        <FaCarSide /> My Cars
      </h2>

      {/* Sorting */}
      <div className="mb-6 flex flex-col sm:flex-row items-center gap-4 justify-between">
        <div className="flex items-center gap-2 font-semibold text-gray-700">
          Sort by:
          <select
            className="select select-bordered w-48"
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
          >
            <option value="date-desc">Date Added (Newest First)</option>
            <option value="date-asc">Date Added (Oldest First)</option>
            <option value="price-asc">Price (Lowest First)</option>
            <option value="price-desc">Price (Highest First)</option>
          </select>
        </div>
      </div>

      {/* Cars Table */}
      <div className="overflow-x-auto rounded-lg border border-gray-300 shadow-sm">
        <table className="table-auto w-full min-w-[700px] border-collapse">
          <thead className="bg-cyan-600 text-white">
            <tr>
              <th className="p-3 text-left">Image</th>
              <th className="p-3 text-left">Model</th>
              <th className="p-3 text-left">Price/Day</th>
              <th className="p-3 text-left">Bookings</th>
              <th className="p-3 text-left">Status</th>
              <th className="p-3 text-left">Date Added</th>
              <th className="p-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            <AnimatePresence>
              {sortedCars.map((car) => (
                <motion.tr
                  key={car._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className="border-b border-gray-200 hover:bg-cyan-50"
                >
                  <td className="p-2">
                    <img
                      src={car.imageUrl}
                      alt={car.carModel}
                      className="w-20 h-16 object-cover rounded-md"
                      loading="lazy"
                    />
                  </td>
                  <td className="p-2 font-semibold">{car.carModel}</td>
                  <td className="p-2">${car.pricePerDay}</td>
                  <td className="p-2">{car.bookingCount || 0}</td>
                  <td className="p-2 capitalize">{car.availability}</td>
                  <td className="p-2">{new Date(car.createdAt).toLocaleDateString()}</td>
                  <td className="p-2 flex flex-col sm:flex-row gap-2">
                    <button
                      onClick={() => handleEditClick(car)}
                      className="flex items-center gap-2 btn btn-sm btn-warning hover:bg-yellow-400"
                      aria-label={`Edit ${car.carModel}`}
                    >
                      <FaEdit /> Update
                    </button>
                    <button
                      onClick={() => handleDelete(car._id)}
                      className="flex items-center gap-2 btn btn-sm btn-error hover:bg-red-600"
                      aria-label={`Delete ${car.carModel}`}
                    >
                      <FaTrash /> Delete
                    </button>
                  </td>
                </motion.tr>
              ))}
            </AnimatePresence>
          </tbody>
        </table>
      </div>

      {/* Edit Modal */}
      <AnimatePresence>
        {editingCar && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.form
              onSubmit={handleUpdateSubmit}
              className="bg-white rounded-lg shadow-lg max-w-2xl w-full p-6 overflow-auto max-h-[90vh]"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
            >
              <h3 className="text-xl font-bold mb-4 text-cyan-700 flex items-center gap-2">
                <FaEdit /> Update Car Info
              </h3>

              <div className="grid gap-4 mb-4">
                <input
                  type="text"
                  placeholder="Car Model"
                  className="input input-bordered w-full"
                  value={formData.carModel}
                  onChange={(e) => setFormData({ ...formData, carModel: e.target.value })}
                  required
                />
                <input
                  type="number"
                  placeholder="Price per Day"
                  className="input input-bordered w-full"
                  value={formData.pricePerDay}
                  onChange={(e) => setFormData({ ...formData, pricePerDay: e.target.value })}
                  required
                />
                <input
                  type="text"
                  placeholder="Availability"
                  className="input input-bordered w-full"
                  value={formData.availability}
                  onChange={(e) => setFormData({ ...formData, availability: e.target.value })}
                  required
                />
                <input
                  type="text"
                  placeholder="Registration Number"
                  className="input input-bordered w-full"
                  value={formData.registrationNumber}
                  onChange={(e) => setFormData({ ...formData, registrationNumber: e.target.value })}
                />
                <input
                  type="text"
                  placeholder="Features (comma separated)"
                  className="input input-bordered w-full"
                  value={formData.features}
                  onChange={(e) => setFormData({ ...formData, features: e.target.value })}
                />
                <input
                  type="text"
                  placeholder="Location"
                  className="input input-bordered w-full"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                />
                <input
                  type="url"
                  placeholder="Image URL"
                  className="input input-bordered w-full"
                  value={formData.imageUrl}
                  onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                />
                <textarea
                  placeholder="Description"
                  className="textarea textarea-bordered w-full"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                />
              </div>

              <div className="flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setEditingCar(null)}
                  className="btn btn-ghost"
                >
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  Save Changes
                </button>
              </div>
            </motion.form>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

