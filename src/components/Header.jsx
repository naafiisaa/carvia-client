 import { Link, NavLink, useNavigate} from 'react-router'; 
import { AnimatePresence, motion } from 'framer-motion';
import {  FaCarSide, FaSignOutAlt } from 'react-icons/fa';
import { useContext, useState } from 'react';
import ThemeToggle from '../Utils/ThemeToggle';
import { AuthContext } from '../providers/AuthProvider';
import Swal from 'sweetalert2';
import axios from 'axios';

// Variants for animation controlling the stagger and fade-in of menu items
const listVariants = {
    initial: {},
    animate: {
        transition: {
            staggerChildren: 0.07,  
            delayChildren: 0.1,     
        },
    },
};

const itemVariants = {
    initial: { opacity: 0, y: 10 }, // start slightly down and invisible
    animate: { opacity: 1, y: 0 },  // animate to visible and original position
};

const Header = () => {
    // State to track if mobile menu is open or closed
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    // Get current user info and logout function from AuthContext
    const { user, logOut } = useContext(AuthContext);
   const navigate = useNavigate();
    // Define navigation links based on whether user is logged in
    const navItems = user
        ? [
            { name: 'Home', path: '/' },
            { name: 'Available Cars', path: '/available-cars' },
            { name: 'Add Car', path: '/add-car' },
            { name: 'My Cars', path: '/my-cars' },
            { name: 'My Bookings', path: '/my-bookings' },
        ]
        : [
            { name: 'Home', path: '/' },
            { name: 'Available Cars', path: '/available-cars' },
        ];

const handleLogout = async () => {
  const result = await Swal.fire({
    title: 'Are you sure?',
    text: 'You will be logged out!',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, log out',
  });

  if (result.isConfirmed) {
    try {
//       // backend logout (optional)
      try {
//   // await axios.post('.../logout', {}, { withCredentials: true }); 
} catch (err) {
  console.warn('Backend logout route failed or missing (ignored):', err.message);
}


      await logOut(); // firebase logout

      // Unlock scrolling immediately after logout
      document.body.style.overflow = 'auto';
      document.body.classList.remove('overflow-hidden');

      // Close any drawers
      document.getElementById('my-drawer-4')?.click();
      document.getElementById('mobile-drawer')?.click();

      Swal.fire('Logged out!', 'You have been logged out.', 'success');

      // Redirect conditionally
      const privateRoutes = ['/dashboard', '/add-car', '/my-cars', '/my-bookings'];
      if (privateRoutes.some(route => location.pathname.startsWith(route))) {
        navigate('/login');
      }
    } catch (error) {
      console.error('Logout failed:', error);
      Swal.fire('Error', 'Logout failed. Please try again.', 'error');
    }
  }
};



    return (
        // Navbar wrapper with sticky top and shadow for elevation
        <div className="bg-base-300 shadow-md  sticky top-0 z-50">
            <div className="navbar lg:w-11/12 mx-auto px-4">

                {/* Mobile menu toggle button visible only on small screens */}
                <div className="lg:hidden text-[#38bdf8] mr-3">
                    <label
                        className="btn btn-circle swap swap-rotate"
                        aria-label="Toggle navigation menu"
                        aria-expanded={isMenuOpen}
                    >
                        <input
                            type="checkbox"
                            onChange={() => setIsMenuOpen(!isMenuOpen)}
                            checked={isMenuOpen}
                        />
                        {/* Hamburger icon */}
                        <svg className="swap-off fill-[#38bdf8]" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 512 512">
                            <path d="M64,384H448V341.33H64Zm0-106.67H448V234.67H64ZM64,128v42.67H448V128Z" />
                        </svg>
                        {/* Close icon */}
                        <svg className="swap-on fill-[#38bdf8]" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 512 512">
                            <polygon points="400 145.49 366.51 112 256 222.51 145.49 112 112 145.49 
                                222.51 256 112 366.51 145.49 400 256 289.49 
                                366.51 400 400 366.51 289.49 256 400 145.49" />
                        </svg>
                    </label>
                </div>

                {/* Logo section - links to home page */}
                <div className="flex-1 flex items-center text-[#38bdf8] lg:flex-none">
                    <motion.div initial={{ x: -50, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ duration: 0.5 }}>
                        <Link to="/" className="flex items-center gap-3 text-2xl font-bold text-[#38bdf8] ">
                                                <FaCarSide className="text-3xl text-[#38bdf8]" />
                                                CarVia
                                            </Link>
                    </motion.div>
                </div>

                {/* Navigation links - visible on large screens */}
                <div className="hidden lg:flex flex-1 justify-center gap-6 items-center">
                    {navItems.map((item) => (
                        <NavLink
                            key={item.name}
                            to={item.path}
                            className={({ isActive }) =>
                                `text-base font-medium transition-colors duration-300 ${isActive ? 'text-[#38bdf8] underline' : 'text-gray-700 hover:text-primary'}`
                            }
                        >
                            {item.name}
                        </NavLink>
                    ))}
                </div>

                {/* Right side controls: theme toggle, profile drawer, and login/logout buttons */}
                <div className="hidden lg:flex items-center gap-4">
                    <ThemeToggle />
                    <div className="drawer drawer-end">
                        <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
                        <div className="drawer-content">
                            {/* Profile image button to open drawer */}
                            <label htmlFor="my-drawer-4" className="cursor-pointer">
                                <img
                                    src={user?.photoURL || 'https://i.ibb.co/5hHScZ6g/307ce493-b254-4b2d-8ba4-d12c080d6651.jpg'}
                                    alt="Profile"
                                    className="w-10 h-10 rounded-full border-2 border-[#38bdf8] hover:scale-105 transition-transform"
                                />
                            </label>
                        </div>
                        <div className="drawer-side z-50">
                            <label htmlFor="my-drawer-4" aria-label="close sidebar" className="drawer-overlay"></label>
                            <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4 space-y-3">
                                {user ? (
                                    <>
                                        {/* Show user details */}
                                        <li><span><strong>Name:</strong> {user.displayName || 'N/A'}</span></li>
                                        <li><span><strong>Email:</strong> {user.email}</span></li>
                                        {/* Logout button */}
                                        <li>
                                            <button className="btn btn-error text-white" onClick={handleLogout}>
                                                <FaSignOutAlt className="mr-2" /> Logout
                                            </button>
                                        </li>
                                    </>
                                ) : (
                                    <>
                                        {/* Message for logged out users */}
                                        <li><span className="text-center">You are not logged in</span></li>
                                        {/* Login button */}
                                        <li>
                                            <Link
                                                to="/login"
                                                className="btn btn-primary text-white"
                                                onClick={() => document.getElementById('my-drawer-4')?.click()}
                                            >
                                                Login
                                            </Link>
                                        </li>
                                    </>
                                )}
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Mobile right side: theme toggle and profile drawer */}
                <div className="lg:hidden flex items-center gap-2">
                    <ThemeToggle />
                    <div className="drawer drawer-end">
                        <input id="mobile-drawer" type="checkbox" className="drawer-toggle" />
                        <div className="drawer-content">
                            {/* Profile image button for mobile */}
                            <label htmlFor="mobile-drawer" className="cursor-pointer">
                                <img
                                    src={user?.photoURL || 'https://i.ibb.co/5hHScZ6g/307ce493-b254-4b2d-8ba4-d12c080d6651.jpg'}
                                    alt="Profile"
                                    className="w-10 h-10 rounded-full border-2 border-[#38bdf8] hover:scale-105 transition-transform"
                                />
                            </label>
                        </div>
                        <div className="drawer-side z-50">
                            <label htmlFor="mobile-drawer" aria-label="close sidebar" className="drawer-overlay"></label>
                            <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4 space-y-3">
                                {user ? (
                                    <>
                                        {/* Show user details */}
                                        <li><span><strong>Name:</strong> {user.displayName || 'N/A'}</span></li>
                                        <li><span><strong>Email:</strong> {user.email}</span></li>
                                        {/* Logout button */}
                                        <li>
                                            <button className="btn btn-error text-white" onClick={handleLogout}>
                                                <FaSignOutAlt className="mr-2" /> Logout
                                            </button>
                                        </li>
                                    </>
                                ) : (
                                    <>
                                        {/* Message when not logged in */}
                                        <li><span className="text-center">You are not logged in</span></li>
                                        {/* Login button */}
                                        <li>
                                            <Link
                                                to="/login"
                                                className="btn btn-primary text-white"
                                                onClick={() => document.getElementById('mobile-drawer')?.click()}
                                            >
                                                Login
                                            </Link>
                                        </li>
                                    </>
                                )}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            {/* Mobile dropdown menu with animation */}
            <AnimatePresence>
                {isMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.3 }}
                        className="absolute lg:hidden px-4 pb-4 backdrop-blur-sm bg-base-100/80 rounded-b-xl shadow w-full"
                    >
                        <motion.ul
                            className="menu rounded-box w-full space-y-2 mt-2"
                            variants={listVariants}
                            initial="initial"
                            animate="animate"
                        >
                            {navItems.map((item) => (
                                <motion.li key={item.name} variants={itemVariants}>
                                    <NavLink
                                        to={item.path}
                                        onClick={() => setIsMenuOpen(false)} // Close menu on link click
                                        className={({ isActive }) =>
                                            `block py-2 px-3 text-sm transition-colors duration-300 ${isActive ? 'text-[#38bdf8] font-semibold' : 'hover:text-primary'
                                            }`
                                        }
                                    >
                                        {item.name}
                                    </NavLink>
                                </motion.li>
                            ))}
                        </motion.ul>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default Header;
