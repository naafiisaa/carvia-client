import { motion } from 'framer-motion';
import { FaTrash, FaEdit, FaCalendarAlt, FaDollarSign, FaMapMarkerAlt } from 'react-icons/fa';
import Swal from 'sweetalert2';
import { toast } from 'react-toastify';
import { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../providers/AuthProvider';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from 'recharts';
import Loading from './Loading';

export default function MyBookings() {
  const { user } = useContext(AuthContext);

  const [loading, setLoading] = useState(true);
  const [bookings, setBookings] = useState([]);
  const [cars, setCars] = useState({});
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  useEffect(() => {
    async function fetchBookings() {
      if (!user?.email) return;

      try {
        const token = user?.getIdToken
          ? await user.getIdToken()
          : localStorage.getItem('carvia-access-token');

        const res = await fetch(
          `https://cars-omega-two.vercel.app/bookings?email=${user.email}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!res.ok) throw new Error('Failed to fetch bookings');

        const data = await res.json();
        setBookings(data);
        setLoading(false);

        const uniqueCarIds = [...new Set(data.map((b) => b.carId))];

        Promise.all(
          uniqueCarIds.map((id) =>
            fetch(`https://cars-omega-two.vercel.app/cars/${id}`, {
              headers: { Authorization: `Bearer ${token}` },
            }).then((res) => {
              if (!res.ok) throw new Error('Failed to fetch car data');
              return res.json();
            })
          )
        )
          .then((carDataArray) => {
            const carMap = {};
            carDataArray.forEach((car) => {
              carMap[car._id] = car;
            });
            setCars(carMap);
          })
          .catch((err) => {
            console.error('Error fetching car details:', err);
          });
      } catch (err) {
        console.error('Error fetching bookings:', err);
        toast.error('Failed to load bookings.');
        setLoading(false);
      }
    }

    fetchBookings();
  }, [user]);

  if (loading) return <Loading />;

  const handleCancel = async (id) => {
    const confirm = await Swal.fire({
      title: 'Are you sure you want to cancel this booking?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, cancel it!',
      cancelButtonText: 'No',
    });

    if (confirm.isConfirmed) {
      try {
        const token = user?.getIdToken
          ? await user.getIdToken()
          : localStorage.getItem('carvia-access-token');

        const res = await fetch(
          `https://cars-omega-two.vercel.app/bookings/${id}?email=${user.email}`,
          {
            method: 'DELETE',
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!res.ok) throw new Error('Failed to cancel booking');

        setBookings(bookings.filter((b) => b._id !== id));
        toast.success('Booking cancelled successfully!');
      } catch (err) {
        console.error('Cancel failed:', err);
        toast.error('Error cancelling booking.');
      }
    }
  };

  const handleEdit = (booking) => {
    setSelectedBooking(booking);
    setStartDate(booking.startDate?.split('T')[0] || '');
    setEndDate(booking.endDate?.split('T')[0] || '');
    document.getElementById('edit_modal').showModal();
  };

  const handleUpdate = async () => {
    try {
      const token = user?.getIdToken
        ? await user.getIdToken()
        : localStorage.getItem('carvia-access-token');

      const res = await fetch(
        `https://cars-omega-two.vercel.app/bookings/${selectedBooking._id}?email=${user.email}`,
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ startDate, endDate }),
        }
      );

      if (!res.ok) throw new Error('Failed to update booking');

      const updated = bookings.map((b) =>
        b._id === selectedBooking._id ? { ...b, startDate, endDate } : b
      );
      setBookings(updated);
      toast.success('Booking updated!');
      document.getElementById('edit_modal').close();
    } catch (err) {
      console.error('Update failed:', err);
      toast.error('Failed to update booking.');
    }
  };

  // Chart data
  const chartData = Array.from(
    bookings.reduce((acc, cur) => {
      const model = cars[cur.carId]?.carModel || cur.carModel || cur.model;
      const start = new Date(cur.startDate);
      const end = new Date(cur.endDate);
      const days = Math.ceil((end - start) / (1000 * 60 * 60 * 24)) || 1;
      const pricePerDay = parseFloat(cars[cur.carId]?.pricePerDay || 0);
      const price = pricePerDay * days;
      acc.set(model, (acc.get(model) || 0) + price);
      return acc;
    }, new Map()),
    ([model, price]) => ({ model, price: Number(price.toFixed(2)) })
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="max-w-6xl mx-auto px-4 py-10"
    >
      <h2 className="text-3xl font-bold mb-6 text-center">My Bookings</h2>

      <div className="overflow-x-auto space-y-7">
        {bookings.length > 0 && (
          <div className="mt-12">
            <h3 className="text-2xl font-semibold mb-4 text-center">
              Total Rental Price by Car Model
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart
                data={chartData}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="model" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="price" fill="#3b82f6" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        )}

        <table
          className="table-auto w-full min-w-[720px] text-left text-gray-800"
          role="grid"
          aria-label="My bookings table"
        >
          <thead className="bg-blue-200 text-blue-900 text-sm uppercase tracking-wider select-none">
            <tr>
              <th className="p-4 min-w-[180px]">Model</th>
              <th className="p-4 min-w-[160px]">
                <div className="flex items-center gap-2">
                  <FaCalendarAlt aria-hidden="true" />
                  <span>Booking Date</span>
                </div>
              </th>
              <th className="p-4 min-w-[140px] text-right">
                <div className="flex items-center justify-end gap-2">
                  <FaDollarSign aria-hidden="true" />
                  <span>Total Price</span>
                </div>
              </th>
              <th className="p-4 min-w-[110px]">Status</th>
              <th className="p-4 min-w-[140px]">
                <div className="flex items-center gap-2">
                  <FaMapMarkerAlt aria-hidden="true" />
                  <span>Location</span>
                </div>
              </th>
              <th className="p-4 text-center min-w-[140px]" aria-label="Actions">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking, idx) => (
              <motion.tr
                key={booking._id}
                className={`transition-colors cursor-pointer ${
                  idx % 2 === 0 ? 'bg-blue-50' : 'bg-white'
                } hover:bg-blue-100`}
                whileHover={{ scale: 1.03 }}
                transition={{ type: 'spring', stiffness: 260 }}
              >
                <td className="p-4 font-semibold max-w-xs truncate align-middle">
                  {cars[booking.carId]?.carModel || booking.carModel || booking.model}
                </td>
                <td className="p-4 align-middle">
                  <div className="flex items-center gap-2">
                    <FaCalendarAlt className="text-blue-600" aria-hidden="true" />
                    <span>{new Date(booking.bookingDate).toLocaleString('en-GB')}</span>
                  </div>
                </td>
                <td className="p-4 text-right align-middle">
                  <div className="flex items-center justify-end gap-2">
                    <FaDollarSign className="text-green-600" aria-hidden="true" />
                    <span>
                      {(() => {
                        const start = new Date(booking.startDate);
                        const end = new Date(booking.endDate);
                        const days =
                          Math.ceil((end - start) / (1000 * 60 * 60 * 24)) || 1;
                        const pricePerDay = parseFloat(
                          cars[booking.carId]?.pricePerDay || 0
                        );
                        const total = (pricePerDay * days).toFixed(2);
                        return `$${total} (${days} day${days > 1 ? 's' : ''})`;
                      })()}
                    </span>
                  </div>
                </td>
                <td className="p-4 align-middle">
                  <span
                    className={`inline-block px-3 py-1 rounded-full font-semibold text-sm ${
                      booking.status === 'Canceled'
                        ? 'bg-red-100 text-red-700'
                        : booking.status === 'Pending'
                        ? 'bg-yellow-100 text-yellow-700'
                        : 'bg-green-100 text-green-700'
                    }`}
                    aria-label={`Booking status: ${booking.status || 'Confirmed'}`}
                  >
                    {booking.status || 'Confirmed'}
                  </span>
                </td>
                <td className="p-4 max-w-xs truncate align-middle">
                  {booking.location}
                </td>
                <td className="p-4 flex justify-center gap-3 align-middle">
                  <motion.button
                    onClick={() => handleEdit(booking)}
                    className="btn btn-sm bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-1 rounded shadow-md"
                    aria-label="Modify booking date"
                    title="Modify booking date"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <FaEdit />
                    Modify
                  </motion.button>
                  <motion.button
                    onClick={() => handleCancel(booking._id)}
                    className="btn btn-sm bg-red-600 hover:bg-red-700 text-white flex items-center gap-1 rounded shadow-md"
                    aria-label="Cancel booking"
                    title="Cancel booking"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <FaTrash />
                    Cancel
                  </motion.button>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>

        {bookings.length === 0 && (
          <p className="text-center mt-8 text-gray-500">You have no bookings yet.</p>
        )}
      </div>

      {/* Modal for editing booking dates */}
      <dialog id="edit_modal" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg mb-4">Modify Booking Dates</h3>

          <label className="label" htmlFor="startDate">
            <span className="label-text">Start Date</span>
          </label>
          <input
            id="startDate"
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="input input-bordered w-full mb-2"
          />

          <label className="label" htmlFor="endDate">
            <span className="label-text">End Date</span>
          </label>
          <input
            id="endDate"
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="input input-bordered w-full"
          />

          {/* Total price preview */}
          {startDate && endDate && selectedBooking?.pricePerDay && (
            <div className="mt-4 p-3 rounded bg-base-200 text-sm text-gray-700">
              {(() => {
                const start = new Date(startDate);
                const end = new Date(endDate);
                const days = Math.ceil((end - start) / (1000 * 60 * 60 * 24)) || 1;
                const pricePerDay = parseFloat(selectedBooking.pricePerDay || 0);
                const total = (pricePerDay * days).toFixed(2);
                return (
                  <p>
                    <strong>Total Days:</strong> {days} <br />
                    <strong>Price per Day:</strong> ${pricePerDay} <br />
                    <strong>Total Price:</strong> ${total}
                  </p>
                );
              })()}
            </div>
          )}

          <div className="modal-action">
            <button onClick={handleUpdate} className="btn btn-primary">
              Save
            </button>
            <form method="dialog">
              <button className="btn">Cancel</button>
            </form>
          </div>
        </div>
      </dialog>
    </motion.div>
  );
}

