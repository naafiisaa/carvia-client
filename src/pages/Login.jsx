// import Lottie from "lottie-react";
// import { useContext } from "react";
// import { BiEnvelope, BiKey } from "react-icons/bi";
// import Title from "../components/Title";
// import { AuthContext } from "../providers/AuthProvider";
// import { Link, useLocation, useNavigate } from "react-router-dom";
// import loginAnimation from "../assets/loginAnimation.json";
// import Swal from "sweetalert2";

// const Login = () => {
//   const { signIn, googleSignIn } = useContext(AuthContext);
//   const location = useLocation();

// console.log("Location state:", location.state);

//   const navigate = useNavigate();
// const from = location.state?.from?.pathname || "/";
//   const handleGoogleLogin = () => {
//     googleSignIn()
//       .then((result) => {
//         Swal.fire({
//           icon: "success",
//           title: "Login Successful",
//           text: `Welcome ${result.user.displayName || "User"}!`,
//         });
//        navigate(from, { replace: true });
//       })
//       .catch((error) => {
//         Swal.fire({
//           icon: "error",
//           title: "Login Failed",
//           text: error.message,
//         });
//       });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     const form = e.target;
//     const email = form.email.value;
//     const pass = form.pass.value;

//     signIn(email, pass)
//       .then((res) => {
//         form.reset();
//         Swal.fire({
//           icon: "success",
//           title: "Login Successful!",
//           showConfirmButton: false,
//           timer: 1500,
//         });
//         navigate(from, { replace: true });
//       })
//       .catch((err) => {
//         Swal.fire({
//           icon: "error",
//           title: "Login Failed",
//           text: err.message,
//         });
//       });
//   };

//   return (
//     <div className="bg-[url(/bg.png)] bg-contain min-h-screen">
//       <div className="bg-white bg-opacity-90 min-h-screen">
//         <div className="w-11/12 mx-auto py-10 px-2 sm:px-5">
//           <div className="title mt-5">
//             <Title>Login Now</Title>
//           </div>

//           <div className="flex flex-col-reverse lg:flex-row justify-between items-center gap-10 pt-8">
//             {/* Form Section */}
//             <div className="w-full lg:w-1/2">
//               <form
//                 onSubmit={handleSubmit}
//                 className="bg-white p-6 sm:p-8 flex flex-col gap-6 backdrop-blur-sm bg-opacity-10 shadow-xl border border-base-200 rounded-lg"
//               >
//                 <div className="flex items-center border-b-2">
//                   <BiEnvelope className="text-2xl text-slate-500" />
//                   <input
//                     className="outline-none flex-1 p-2 bg-transparent focus:border-orange-400"
//                     type="email"
//                     name="email"
//                     placeholder="Enter email"
//                     required
//                   />
//                 </div>

//                 <div className="space-y-2">
//                   <div className="flex items-center border-b-2">
//                     <BiKey className="text-2xl text-slate-500" />
//                     <input
//                       className="outline-none flex-1 p-2 bg-transparent focus:border-orange-400"
//                       type="password"
//                       name="pass"
//                       placeholder="Enter password"
//                       required
//                     />
//                   </div>
//                   <p className="text-end text-[13px] text-slate-500">
//                     Forgot password?
//                   </p>
//                 </div>

//                 <input
//                   type="submit"
//                   value="Login Now"
//                   className="btn cursor-pointer"
//                 />

//                 {/* Google Button */}
//                 <button
//                   onClick={handleGoogleLogin}
//                   type="button"
//                   className="flex items-center justify-center gap-3 bg-amber-500 hover:bg-amber-600 text-white px-4 py-2 rounded-full transition duration-300"
//                 >
//                   <img
//                     className="w-6 h-6"
//                     src="https://img.icons8.com/?size=96&id=17949&format=png"
//                     alt="Google Icon"
//                   />
//                   <span>Continue with Google</span>
//                 </button>

//                 <p className="mt-4 text-center text-sm">
//                   Don&apos;t have an account?{" "}
//                   <Link
//                     to="/register"
//                     className="text-primary font-semibold hover:underline"
//                   >
//                     Register
//                   </Link>
//                 </p>
//               </form>
//             </div>

//             {/* Animation Section */}
//             <div className="w-full lg:w-1/2 max-w-md">
//               <Lottie animationData={loginAnimation} loop={true} />
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Login;

import Lottie from "lottie-react";
import { useContext, useEffect } from "react";
import { BiEnvelope, BiKey } from "react-icons/bi";
import Title from "../components/Title";
import { AuthContext } from "../providers/AuthProvider";
import { Link, useLocation, useNavigate } from "react-router-dom";
import loginAnimation from "../assets/loginAnimation.json";
import Swal from "sweetalert2";

const Login = () => {
  const { signIn, googleSignIn, user } = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();

  const from = location.state?.from?.pathname || "/";

  // ✅ Navigate after user is available (post-auth)
  useEffect(() => {
    if (user?.email) {
      navigate(from, { replace: true });
    }
  }, [user, from, navigate]);

  const handleGoogleLogin = () => {
    googleSignIn()
      .then((result) => {
        Swal.fire({
          icon: "success",
          title: "Login Successful",
          text: `Welcome ${result.user.displayName || "User"}!`,
        });
        // ❌ Removed navigate here
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: "Login Failed",
          text: error.message,
        });
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const pass = form.pass.value;

    signIn(email, pass)
      .then(() => {
        form.reset();
        Swal.fire({
          icon: "success",
          title: "Login Successful!",
          showConfirmButton: false,
          timer: 1500,
        });
        // ❌ Removed navigate here
      })
      .catch((err) => {
        Swal.fire({
          icon: "error",
          title: "Login Failed",
          text: err.message,
        });
      });
  };

  return (
    <div className="bg-[url(/bg.png)] bg-contain min-h-screen">
      <div className="bg-white bg-opacity-90 min-h-screen">
        <div className="w-11/12 mx-auto py-10 px-2 sm:px-5">
          <div className="title mt-5">
            <Title>Login Now</Title>
          </div>

          <div className="flex flex-col-reverse lg:flex-row justify-between items-center gap-10 pt-8">
            {/* Form Section */}
            <div className="w-full lg:w-1/2">
              <form
                onSubmit={handleSubmit}
                className="bg-white p-6 sm:p-8 flex flex-col gap-6 backdrop-blur-sm bg-opacity-10 shadow-xl border border-base-200 rounded-lg"
              >
                <div className="flex items-center border-b-2">
                  <BiEnvelope className="text-2xl text-slate-500" />
                  <input
                    className="outline-none flex-1 p-2 bg-transparent focus:border-orange-400"
                    type="email"
                    name="email"
                    placeholder="Enter email"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex items-center border-b-2">
                    <BiKey className="text-2xl text-slate-500" />
                    <input
                      className="outline-none flex-1 p-2 bg-transparent focus:border-orange-400"
                      type="password"
                      name="pass"
                      placeholder="Enter password"
                      required
                    />
                  </div>
                  <p className="text-end text-[13px] text-slate-500">
                    Forgot password?
                  </p>
                </div>

                <input
                  type="submit"
                  value="Login Now"
                  className="btn cursor-pointer"
                />

                {/* Google Button */}
                <button
                  onClick={handleGoogleLogin}
                  type="button"
                  className="flex items-center justify-center gap-3 bg-amber-500 hover:bg-amber-600 text-white px-4 py-2 rounded-full transition duration-300"
                >
                  <img
                    className="w-6 h-6"
                    src="https://img.icons8.com/?size=96&id=17949&format=png"
                    alt="Google Icon"
                  />
                  <span>Continue with Google</span>
                </button>

                <p className="mt-4 text-center text-sm">
                  Don&apos;t have an account?{" "}
                  <Link
                    to="/register"
                    className="text-primary font-semibold hover:underline"
                  >
                    Register
                  </Link>
                </p>
              </form>
            </div>

            {/* Animation Section */}
            <div className="w-full lg:w-1/2 max-w-md">
              <Lottie animationData={loginAnimation} loop={true} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
