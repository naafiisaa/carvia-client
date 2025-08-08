import { useContext } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { updateProfile } from "firebase/auth";
import useScrollToTop from "../Utils/UseScrollToTop";
import { FcGoogle } from "react-icons/fc";
import { AuthContext } from "../providers/AuthProvider";
import Swal from "sweetalert2";

const Register = () => {
  useScrollToTop();
  const navigate = useNavigate();
  const { createUser, googleSignIn, setUser } = useContext(AuthContext);

  const showError = (message) => {
    Swal.fire({
      icon: "error",
      title: message,
      toast: true,
      position: "top-end",
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      background: "#fef2f2",
      color: "#991b1b",
    });
  };

  const handleGoogleLogin = () => {
    googleSignIn()
      .then((result) => {
        Swal.fire({
          icon: "success",
          title: "Registration Successful",
          text: `Welcome ${result.user.displayName || "User"}!`,
        });
        navigate("/");
      })
      .catch((error) => {
        showError(error.message);
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const pass = form.password.value;
    const photoURL = form.photoURL.value;

    if (pass.length < 6) {
      showError("Password must be at least 6 characters long.");
      return;
    }

    createUser(email, pass)
      .then((result) => {
        updateProfile(result.user, {
          displayName: name,
          photoURL: photoURL || undefined,
        }).then(() => {
          setUser({ ...result.user, displayName: name, photoURL });
          Swal.fire({
            title: "Registration Successful!",
            icon: "success",
            toast: true,
            position: "top-end",
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            background: "#f0fdf4",
            color: "#14532d",
          });
          navigate("/");
        });
      })
      .catch((error) => {
        console.error("Registration error:", error.message);
        showError(error.message);
      });
  };

  return (
    <div className="min-h-screen bg-base-100 px-4 py-6">
      {/* ✅ Marquee Animation */}
      <div className="marquee-container bg-blue-400 mb-2">
        <p className="marquee-text">
          🚗 Join CarVia today & enjoy your first ride at 10% off! | Easy, fast, and affordable car rentals 🚙
        </p>
      </div>

      <style>{`
        .marquee-container {
          width: 100%;
          overflow: hidden;
          white-space: nowrap;
          padding: 10px 0;
        }
        .marquee-text {
          display: inline-block;
          padding-left: 100%;
          animation: marquee 15s linear infinite;
          font-weight: bold;
          color: white;
        }
        @keyframes marquee {
          0% {
            transform: translateX(0%);
          }
          100% {
            transform: translateX(-100%);
          }
        }
      `}</style>

      {/* ✅ Form Container */}
      <div className="flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md p-8 rounded-xl shadow-xl bg-base-200"
        >
          <h2 className="text-3xl font-bold text-center mb-6 text-primary">Join CarVia</h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="label">Name</label>
              <input type="text" name="name" required className="input input-bordered w-full" />
            </div>

            <div>
              <label className="label">Email</label>
              <input type="email" name="email" required className="input input-bordered w-full" />
            </div>

            <div>
              <label className="label">Password</label>
              <input type="password" name="password" required className="input input-bordered w-full" />
            </div>

            <div>
              <label className="label">Photo URL</label>
              <input type="text" name="photoURL" className="input input-bordered w-full" />
            </div>

            <button type="submit" className="btn btn-primary w-full">Register</button>
          </form>

          <div className="divider my-4">OR</div>

          <button
            onClick={handleGoogleLogin}
            className="btn btn-outline w-full flex items-center justify-center gap-2"
          >
            <FcGoogle /> Sign Up with Google
          </button>

          <p className="mt-4 text-center text-sm">
            Already have an account?{" "}
            <Link to="/login" className="text-primary font-semibold hover:underline">
              Login
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default Register;



