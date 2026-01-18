import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { LockClosedIcon } from "@heroicons/react/24/solid";

import { useSigninMutation } from "../features/slices/usersApiSlice";
import { setCredentials } from "../features/slices/authSlice";
import Loading from "../ui/preloader/Loading";
import { toast } from "react-hot-toast";
import SpinnerMini from "../ui/preloader/SpinnerMini";

// import { useLogin } from "../features/authentication/useLogin";
import loginbg from "../assets/loginbg.jpg";
import { savePaymentMethod } from "../features/slices/cartSlice";

// import loginbg from "../assets/backgroundImage.jpg";
const backgroundImageStyle = {
  backgroundImage: `url("${loginbg}")`,
  backgroundSize: "cover",
};

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [paymentMethod, setPaymentMethod] = useState("card");
  // const { login, isLoading } = useLogin();
  const [isUserLoading, setIsUserLoading] = useState(false);
  const [isGuestLoading, setIsGuestLoading] = useState(false);
  const [guestName, setGuestName] = useState("");
  const [guestEmail, setGuestEmail] = useState("");
  const [guestPhone, setGuestPhone] = useState("");

  const {
    register,
    formState: { errors },
    handleSubmit,
    // reset,
  } = useForm();

  // function onSubmit({ email, password }) {
  //   login({ email, password }, { onSettled: () => reset() });
  // }

  const [signin, { isLoading }, error] = useSigninMutation();
  const { userInfo } = useSelector((state) => state.auth);

  const { search } = useLocation();
  const sp = new URLSearchParams(search);
  const redirect = sp.get("redirect") || "/";

  // useEffect(
  //   function () {
  //     if (userInfo) {
  //       navigate(redirect);
  //     }
  //   },
  //   [navigate, redirect, userInfo]
  // );

  async function onSubmit(data) {
    try {
      const res = await signin({
        email: data.email,
        password: data.password,
      }).unwrap();
      dispatch(setCredentials({ ...res }));
      navigate(redirect);
      toast.success("Successfully Logged in 😎");
    } catch (err) {
      toast.error("err?.data?.message" || err.error);
    }
  }

  const handleGuestLogin = (e) => {
    e.preventDefault();
    setIsGuestLoading(true);

    // Simulate an API call for guest login
    setTimeout(() => {
      setIsGuestLoading(false);
      setPaymentMethod("card");
      dispatch(savePaymentMethod(paymentMethod));
      navigate("/guest-payment", {
        state: { guestName, guestPhone, guestEmail },
      });
      // navigate("/guest-payment");
    }, 1500);
  };

  // const backgroundImageStyle = {
  //   backgroundImage: `url("${loginbg}")`,
  //   backgroundSize: "cover",
  // };

  if (isLoading)
    return (
      <h1 className="flex flex-col items-center justify-center">
        <Loading />
      </h1>
    );
  if (error) return <h1>{error?.data?.message || error.error}</h1>;

  return (
    <div
      className="min-h-screen flex items-center justify-center p-4 mt-2"
      style={backgroundImageStyle}
    >
      {/* Main container for the two-column layout */}
      <div className="bg-white rounded-xl shadow-lg flex flex-col md:flex-row w-full max-w-5xl overflow-hidden">
        {/* Left Column: User Login Form */}
        <div className="w-full md:w-1/2 p-8 md:p-8 border-b md:border-b-0 md:border-r border-gray-200">
          <form
            className="space-y-6 md:px-10"
            onSubmit={handleSubmit(onSubmit)}
          >
            <h3 className="text-3xl font-bold text-gray-800 text-center">
              👤 User Login
            </h3>

            <div>
              <p className="required-field-red-asterisk">
                <label
                  htmlFor="email"
                  className="text-sm font-medium text-gray-900 block mb-2 dark:text-gray-300"
                >
                  Your email
                </label>
              </p>
              <input
                type="email"
                name="email"
                id="email"
                disabled={isLoading}
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:hover:bg-slate-600"
                placeholder="Enter your email id"
                // icon={FiMail}
                {...register("email", {
                  required: "This field is required",
                  pattern: {
                    value: /\S+@\S+\.\S+/,
                    message: "Please provide a valid email address",
                  },
                })}
              />
              <span className="text-red-500 text-xs font-bold">
                {errors?.email?.message}
              </span>
            </div>
            <div>
              <p className="required-field-red-asterisk">
                <label
                  htmlFor="password"
                  className="text-sm font-medium text-gray-900 block mb-2 dark:text-gray-300 required-field-red-asterisk"
                >
                  Your password
                </label>
              </p>
              <input
                type="password"
                name="password"
                id="password"
                placeholder="••••••••"
                // icon={FiLock}
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                disabled={isLoading}
                {...register("password", {
                  required: "This field is required",
                  minLength: {
                    value: 8,
                    message: "Password needs a minimum of 8 characters",
                  },
                })}
              />
              <span className="text-red-500 text-xs font-bold">
                {errors?.email?.message}
              </span>
            </div>
            <div className="flex items-start">
              {/*sign up for newsletter  */}
              {/* <div className="md:flex md:items-center mb-6">
                    <div className="md:w-1/3"></div>
                    <label className="md:w-2/3 block text-gray-500 font-bold">
                      <input
                        className="mr-2 leading-tight"
                        type="checkbox"
                      ></input>
                      <span className="text-sm">Sign up for newsletter!</span>
                    </label>
                  </div> */}

              <Link
                to="/forgotpass"
                className="text-sm text-blue-700 hover:underline ml-auto dark:text-blue-500"
              >
                Forgot Password?
              </Link>
            </div>

            <div className="text-sm font-medium text-gray-500 dark:text-gray-300 text-center">
              Not registered?{" "}
              <Link
                to="/signup"
                className="text-blue-700 hover:underline dark:text-blue-500"
              >
                Create account
              </Link>
            </div>
            <div className="pt-2">
              <button
                type="submit"
                disabled={isLoading}
                className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-slate-700 hover:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                  <LockClosedIcon
                    className="h-5 w-5 text-orange-400 group-hover:text-orange-400"
                    aria-hidden="true"
                  />
                </span>
                {isLoading ? <SpinnerMini /> : "Login"}
              </button>
            </div>
          </form>
        </div>

        {/* Right Column: Guest User Form */}
        <div className="w-full md:w-1/2 p-8 md:p-8 border-b md:border-b-0 md:border-r border-gray-200">
          {/* <div className="w-full md:w-1/2 p-8 md:p-12"> */}
          <form className="space-y-6 md:px-10" onSubmit={handleGuestLogin}>
            <h3 className="text-3xl font-bold text-gray-800 text-center">
              Guest User
            </h3>
            <div>
              <label
                htmlFor="name"
                className="text-sm font-medium text-gray-900 block mb-2 dark:text-gray-300"
              >
                Your first and last name
              </label>
              <input
                type="text"
                name="name"
                id="name"
                value={guestName}
                onChange={(e) => setGuestName(e.target.value)}
                disabled={isUserLoading || isGuestLoading}
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:hover:bg-slate-600"
                placeholder="Enter your first and last name"
              />
            </div>

            <div>
              <label
                htmlFor="guestEmail"
                className="text-sm font-medium text-gray-900 block mb-2 dark:text-gray-300"
              >
                Your email
              </label>
              <input
                type="email"
                name="guestEmail"
                id="guestEmail"
                value={guestEmail}
                onChange={(e) => setGuestEmail(e.target.value)}
                disabled={isUserLoading || isGuestLoading}
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:hover:bg-slate-600"
                placeholder="name@gmail.com"
              />
            </div>

            <div>
              <label
                htmlFor="phone"
                className="text-sm font-medium text-gray-900 block mb-2 dark:text-gray-300"
              >
                Your mobile phone
              </label>
              <input
                type="text"
                name="phone"
                id="phone"
                value={guestPhone}
                onChange={(e) => setGuestPhone(e.target.value)}
                disabled={isUserLoading || isGuestLoading}
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:hover:bg-slate-600"
                placeholder="Enter your mobile phone number"
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-orange-500 hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                <LockClosedIcon
                  className="h-5 w-5 text-slate-800 group-hover:text-slate-800"
                  aria-hidden="true"
                />
              </span>
              {isLoading ? <SpinnerMini /> : "Guest User"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
