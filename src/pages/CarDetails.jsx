import { useNavigate, useParams } from "react-router";
import { useContext, useEffect, useState } from "react";
import { motion } from "framer-motion";
import Swal from "sweetalert2";
import useScrollToTop from "../Utils/UseScrollToTop";

import { AuthContext } from "../providers/AuthProvider";
import useAxiosSecure from "../hooks/useAxiosSecure";
import useAxiosPublic from "../hooks/axiosPublic";

const CarDetails = () => {
  useScrollToTop();
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const { id } = useParams();
  const [car, setCar] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userBookings, setUserBookings] = useState([]);

  const axiosSecure = useAxiosSecure();
  const axiosPublic = useAxiosPublic();

  // Check if user already booked this car
  const alreadyBooked = userBookings.some((booking) => booking.carId === id);


  // Fetch user bookings (authenticated)
  useEffect(() => {
    if (user?.email) {
      axiosSecure.get(`bookings?email=${user.email}`)
.then((res) => setUserBookings(res.data))
        .catch((err) => console.error("Failed to load bookings", err));
    }
  }, [user, axiosSecure]);

  // Fetch car details (public)
  useEffect(() => {
    axiosPublic
      .get(`/cars/${id}`)
      .then((res) => {
        setCar(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to load car details", err);
        setLoading(false);
      });
  }, [id, axiosPublic]);

  const handleBooking = async (car) => {
    const result = await Swal.fire({
      title: "Confirm Booking",
      html: `
        <p><strong>Car:</strong> ${car.carModel}</p>
        <p><strong>Price/Day:</strong> $${car.pricePerDay}</p>
        <p><strong>Location:</strong> ${car.location}</p>
      `,
      icon: "info",
      showCancelButton: true,
      confirmButtonText: "Confirm",
    });

    if (result.isConfirmed) {
      try {
        // POST booking to backend
      await axiosSecure.post("/bookings", {
  carId: car._id,
  location: car.location,
  bookingDate: new Date().toISOString(),
});


        Swal.fire("Booked!", "Your booking has been confirmed.", "success");
        navigate("/my-bookings");
      } catch (error) {
        console.error("Booking failed:", error);
        Swal.fire("Error!", "Something went wrong while booking.", "error");
      }
    }
  };

  if (loading) {
    return <div className="text-center py-20">Loading...</div>;
  }

  if (!car) {
    return <div className="text-center py-20">Car not found.</div>;
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="p-6 max-w-5xl mx-auto"
    >
      <div className="grid md:grid-cols-2 gap-6">
        <motion.img
          src={car.imageUrl || car.image} // adjust your field accordingly
          alt={car.carModel}
          className="w-full h-72 object-cover rounded shadow"
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        />

        <motion.div
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5, ease: "easeOut", delay: 0.2 }}
        >
          <h2 className="text-3xl font-bold mb-4">{car.carModel}</h2>
          <p className="text-lg mb-2">
            <strong>Price Per Day:</strong> ${car.pricePerDay}
          </p>
          <p className="text-lg mb-2">
            <strong>Availability:</strong> {car.availability}
          </p>
          <p className="text-lg mb-2">
            <strong>Location:</strong> {car.location}
          </p>
          <p className="text-lg mb-2">
            <strong>Registration Number:</strong> {car.registrationNumber}
          </p>
          <p className="text-sm text-gray-600 mt-2">
            <strong>Listed by:</strong> {car.ownerEmail}
          </p>

          <div className="mt-4">
            <h4 className="font-semibold mb-1">Features:</h4>
            <ul className="list-disc list-inside text-gray-700">
              {Array.isArray(car.features) &&
                car.features.map((feature, index) => (
                  <li key={index}>{feature}</li>
                ))}
            </ul>
          </div>

          <div className="mt-6">
            <h4 className="font-semibold mb-1">Description:</h4>
            <p className="text-gray-700">{car.description}</p>
          </div>

          {user ? (
            <button
              onClick={() => handleBooking(car)}
              className="btn btn-primary mt-6"
              disabled={alreadyBooked}
            >
              {alreadyBooked ? "Already Booked" : "Book Now"}
            </button>
          ) : (
            <p className="mt-6 text-red-600 font-semibold">
              Please{" "}
              <a href="/login" className="link link-primary">
                Login
              </a>{" "}
              to book this car.
            </p>
          )}
        </motion.div>
      </div>
    </motion.div>
  );
};

export default CarDetails;

