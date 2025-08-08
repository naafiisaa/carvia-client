import { useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";
import { useNavigate, useLocation } from "react-router-dom";
import Swal from "sweetalert2";

const Social = () => {
  const { googleSignIn } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location?.state?.from?.pathname || "/";

  const handleGoogleSignIn = () => {
    googleSignIn()
      .then(result => {
        // Optional: show success alert
        Swal.fire({
          icon: "success",
          title: "Login Successful",
          text: `Welcome ${result.user.displayName || "User"}!`,
        });
        navigate(from);
      })
      .catch(error => {
        Swal.fire({
          icon: "error",
          title: "Login Failed",
          text: error.message,
        });
      });
  };

  return (
    <div className="bg-white shadow py-3 rounded-full flex flex-col items-center">
      <div>
        <img
          onClick={handleGoogleSignIn}
          className="w-[64px] cursor-pointer"
          src="https://img.icons8.com/?size=96&id=17949&format=png"
          alt="Google"
        />
      </div>
      <div>
        <img
          className="w-[64px]"
          src="https://img.icons8.com/?size=96&id=118497&format=png"
          alt="Facebook"
        />
      </div>
      <div>
        <img
          className="w-[64px]"
          src="https://img.icons8.com/?size=96&id=bUGbDbW2XLqs&format=png"
          alt="Github"
        />
      </div>
      <div>
        <img
          className="w-[64px]"
          src="https://img.icons8.com/?size=128&id=3tC9EQumUAuq&format=png"
          alt="LinkedIn"
        />
      </div>
    </div>
  );
};

export default Social;
