import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaGithub,
  FaCarSide,
  FaLongArrowAltUp,
} from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useContext } from 'react';
import { AuthContext } from '../providers/AuthProvider';

const Footer = () => {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });
  const { user } = useContext(AuthContext);

  const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    visible: (i = 0) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.15, duration: 0.6, ease: 'easeOut' },
    }),
  };

  return (
    <motion.footer
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className="bg-gradient-to-tr from-blue-900 via-blue-800 to-blue-950 text-gray-200 relative select-none"
    >
      <div className="max-w-7xl mx-auto px-6 py-14 md:py-20 grid grid-cols-1 md:grid-cols-4 gap-12">
        {/* Brand & Description */}
        <motion.div custom={0} variants={fadeUp} className="space-y-4">
          <Link
            to="/"
            className="inline-flex items-center gap-3 text-3xl font-extrabold text-cyan-400 hover:text-cyan-300 transition"
          >
            <FaCarSide size={36} />
            <span>CarVia</span>
          </Link>
          <p className="text-gray-300 leading-relaxed">
            Reliable, stylish, and affordable car rentals tailored for every journey.
            Experience premium rides at your fingertips with CarVia.
          </p>
          <motion.button
            onClick={scrollToTop}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="mt-6 inline-flex items-center gap-2 px-4 py-2 bg-cyan-500 rounded-md shadow-lg text-white font-semibold hover:bg-cyan-400 transition"
            aria-label="Scroll to top"
          >
            <FaLongArrowAltUp size={18} />
            Back to Top
          </motion.button>
        </motion.div>

        {/* Quick Links */}
        <motion.div custom={1} variants={fadeUp} className="space-y-4">
          <h3 className="text-xl font-semibold text-cyan-400 tracking-wide uppercase">
            Quick Links
          </h3>
          <ul className="flex flex-col space-y-2 text-gray-300">
            <li>
              <Link
                to="/"
                className="hover:text-cyan-300 transition"
                tabIndex={0}
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/available-cars"
                className="hover:text-cyan-300 transition"
                tabIndex={0}
              >
                Available Cars
              </Link>
            </li>
            <li>
              <Link
                to="/add-car"
                className="hover:text-cyan-300 transition"
                tabIndex={0}
              >
                Add Car
              </Link>
            </li>
            <li>
              <Link
                to="/my-cars"
                className="hover:text-cyan-300 transition"
                tabIndex={0}
              >
                My Cars
              </Link>
            </li>
            <li>
              <Link
                to="/my-bookings"
                className="hover:text-cyan-300 transition"
                tabIndex={0}
              >
                Bookings
              </Link>
            </li>
            {!user && (
              <li>
                <Link
                  to="/login"
                  className="hover:text-cyan-300 transition"
                  tabIndex={0}
                >
                  Login
                </Link>
              </li>
            )}
          </ul>
        </motion.div>

        {/* Connect With Us */}
        <motion.div custom={2} variants={fadeUp} className="space-y-4">
          <h3 className="text-xl font-semibold text-cyan-400 tracking-wide uppercase">
            Connect With Us
          </h3>
          <p className="text-gray-300 leading-relaxed">
            Follow us for exclusive offers, updates, and premium travel tips.
          </p>
          <div className="flex space-x-5 mt-3">
            {[{
              icon: FaFacebookF,
              href: 'https://facebook.com',
              label: 'Facebook',
            }, {
              icon: FaTwitter,
              href: 'https://twitter.com',
              label: 'Twitter',
            }, {
              icon: FaInstagram,
              href: 'https://instagram.com',
              label: 'Instagram',
            }, {
              icon: FaGithub,
              href: 'https://github.com',
              label: 'Github',
            }].map(({ icon: Icon, href, label }, i) => (
              <motion.a
                key={i}
                href={href}
                target="_blank"
                rel="noreferrer"
                aria-label={`Visit our ${label} page`}
                whileHover={{ scale: 1.2, color: '#06b6d4' }}
                whileTap={{ scale: 0.95 }}
                className="text-gray-400 hover:text-cyan-400 transition text-2xl"
              >
                <Icon />
              </motion.a>
            ))}
          </div>
        </motion.div>

        {/* Newsletter Signup */}
        <motion.div custom={3} variants={fadeUp} className="space-y-4">
          <h3 className="text-xl font-semibold text-cyan-400 tracking-wide uppercase">
            Stay Updated
          </h3>
          <p className="text-gray-300 leading-relaxed">
            Subscribe to our newsletter and never miss new offers or updates.
          </p>
          <form
            onSubmit={(e) => e.preventDefault()}
            className="flex flex-col sm:flex-row gap-3 mt-4"
          >
            <input
              type="email"
              placeholder="Your email address"
              required
              className="w-full px-4 py-3 rounded-md bg-blue-900 placeholder-gray-400 text-gray-200 focus:outline-none focus:ring-2 focus:ring-cyan-400 transition"
              aria-label="Email address"
            />
            <button
              type="submit"
              className="px-5 py-3 bg-cyan-500 rounded-md font-semibold text-white hover:bg-cyan-400 transition"
            >
              Subscribe
            </button>
          </form>
        </motion.div>
      </div>

      <div className="border-t border-cyan-700 text-center text-sm text-cyan-300 py-6">
        &copy; {new Date().getFullYear()} CarVia. All rights reserved.
      </div>
    </motion.footer>
  );
};

export default Footer;


