import { useContext, useState } from 'react';
import { motion } from 'framer-motion';
import Marquee from 'react-fast-marquee';
import { AuthContext } from '../providers/AuthProvider';
import useAxiosSecure from '../hooks/useAxiosSecure';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router';

export default function AddCar() {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    carModel: '',
    pricePerDay: '',
    availability: 'available',
    registrationNumber: '',
    features: '',
    description: '',
    imageUrl: '',
    location: '',
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const carData = {
      ...formData,
      features: formData.features.split(',').map((f) => f.trim()),
      ownerEmail: user?.email,
      status: 'available',
    };

    try {
      const response = await axiosSecure.post('/add-car', carData);
      toast.success('Car added successfully!');
      setTimeout(() => navigate('/my-cars'), 1500);
    } catch (error) {
      console.error('❌ Add car error:', error.message || error);
      toast.error('Failed to add car. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="max-w-5xl mx-auto py-16 px-4"
    >
      {/* 🔁 Marquee title */}
      <Marquee speed={60} gradient={false} className="mb-4">
        <h2 className="text-2xl font-bold text-cyan-500 uppercase tracking-widest">
          🚗 Add Your Car to Carvia &nbsp; 🚘 Car Rental Platform &nbsp; 🚙 Make Money Renting Cars &nbsp;
        </h2>
      </Marquee>

      {/* Form container */}
      <form
        onSubmit={handleSubmit}
        className="space-y-6 bg-white/10 backdrop-blur-md p-8 rounded-3xl shadow-xl border border-white/20 hover:shadow-2xl transition duration-300"
      >
        <div className="grid md:grid-cols-2 gap-6">
          <input
            name="carModel"
            required
            type="text"
            placeholder="Car Model"
            value={formData.carModel}
            onChange={handleChange}
            className="input input-bordered w-full bg-white/80 text-gray-900"
          />
          <input
            name="pricePerDay"
            required
            type="number"
            placeholder="Daily Rental Price ($)"
            value={formData.pricePerDay}
            onChange={handleChange}
            className="input input-bordered w-full bg-white/80 text-gray-900"
          />
          <input
            name="availability"
            required
            type="text"
            placeholder="Availability"
            value={formData.availability}
            onChange={handleChange}
            className="input input-bordered w-full bg-white/80 text-gray-900"
          />
          <input
            name="registrationNumber"
            required
            type="text"
            placeholder="Registration Number"
            value={formData.registrationNumber}
            onChange={handleChange}
            className="input input-bordered w-full bg-white/80 text-gray-900"
          />
          <input
            name="features"
            type="text"
            placeholder="Features (comma-separated)"
            value={formData.features}
            onChange={handleChange}
            className="input input-bordered w-full bg-white/80 text-gray-900"
          />
          <input
            name="imageUrl"
            required
            type="url"
            placeholder="Image URL"
            value={formData.imageUrl}
            onChange={handleChange}
            className="input input-bordered w-full bg-white/80 text-gray-900"
          />
          <input
            name="location"
            required
            type="text"
            placeholder="Location"
            value={formData.location}
            onChange={handleChange}
            className="input input-bordered w-full bg-white/80 text-gray-900"
          />
          <input
            type="number"
            value={0}
            readOnly
            className="input input-bordered w-full bg-white/80 text-gray-400"
            placeholder="Booking Count (Default 0)"
          />
        </div>

        <textarea
          name="description"
          required
          rows="4"
          placeholder="Car Description"
          value={formData.description}
          onChange={handleChange}
          className="textarea textarea-bordered w-full bg-white/80 text-gray-900"
        ></textarea>

        <button
          type="submit"
          disabled={loading}
          className="btn w-full bg-cyan-600 hover:bg-cyan-700 text-white font-semibold tracking-wide text-lg"
        >
          {loading ? 'Adding Car...' : 'Add Car'}
        </button>
      </form>
    </motion.div>
  );
}


