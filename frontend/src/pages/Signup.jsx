import { useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { LockClosedIcon } from "@heroicons/react/24/solid";

import { useSignupMutation } from "../features/slices/usersApiSlice";
import { setCredentials } from "../features/slices/authSlice";
import Loading from "../ui/preloader/Loading";
import { toast } from "react-hot-toast";
import SpinnerMini from "../ui/preloader/SpinnerMini";

// import { useLogin } from "../features/authentication/useLogin";
import signupbg from "../assets/signupbg.jpg";

// import loginbg from "../assets/backgroundImage.jpg";
const backgroundImageStyle = {
  backgroundImage: `url("${signupbg}")`,
  backgroundSize: "cover",
};

function Signup() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // const { login, isLoading } = useLogin();
  const {
    register,
    formState: { errors },
    handleSubmit,
    getValues,
    reset,
  } = useForm();

  // function onSubmit({ email, password }) {
  //   login({ email, password }, { onSettled: () => reset() });
  // }

  const [signup, { isLoading }, error] = useSignupMutation();
  const { userInfo } = useSelector((state) => state.auth);

  const { search } = useLocation();
  const sp = new URLSearchParams(search);
  const redirect = sp.get("redirect") || "/";

  useEffect(
    function () {
      if (userInfo) {
        navigate(redirect);
      }
    },
    [navigate, redirect, userInfo]
  );

  async function onSubmit(data) {
    try {
      const res = await signup({
        name: data.name,
        phone: data.phone,
        email: data.email,
        password: data.password,
        gotra: data.gotra,
        nakshatra: data.nakshatra,
        newsletter: data.newsletter,
      }).unwrap();
      dispatch(setCredentials({ ...res }));
      navigate(redirect);
      toast.success("Account created and your are logged in!");
      reset();
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  }

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
    <>
      <div
        className="min-h-screen w-full bg-cover bg-center text-white flex items-center justify-center"
        style={backgroundImageStyle}
      >
        {/* Overlay to improve contrast on any device */}
        <div className="w-full min-h-screen bg-gradient-to-r from-slate-800/70 to-slate-900/70 flex items-center justify-center px-4 sm:px-6 lg:px-8 py-8">
          <div className="w-full max-w-md">
            <div className="bg-white shadow-md border border-gray-200 rounded-lg w-full p-4 sm:p-6 lg:p-8 dark:bg-gray-800 dark:border-gray-700">
              <form
                className="space-y-4 md:space-y-5"
                onSubmit={handleSubmit(onSubmit)}
              >
                <h3 className="text-xl sm:text-2xl font-medium text-gray-900 dark:text-white -mt-2">
                  Use your <span className="text-blue-600">Email</span> to
                  create account
                </h3>

                {/* Name */}
                <div>
                  <p className="required-field-red-asterisk">
                    <label
                      htmlFor="name"
                      className="text-sm font-medium text-gray-900 block mb-2 dark:text-gray-300"
                    >
                      Your first and last name
                    </label>
                  </p>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    disabled={isLoading}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:hover:bg-slate-600"
                    placeholder="Enter your first and last name"
                    {...register("name", {
                      required: "Name is required",
                    })}
                  />
                  <span className="text-red-500 text-xs font-bold">
                    {errors?.name?.message}
                  </span>
                </div>

                {/* Phone */}
                <div>
                  <p className="required-field-red-asterisk">
                    <label
                      htmlFor="phone"
                      className="text-sm font-medium text-gray-900 block mb-2 dark:text-gray-300"
                    >
                      Your mobile phone
                    </label>
                  </p>
                  <input
                    type="text"
                    name="phone"
                    id="phone"
                    disabled={isLoading}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:hover:bg-slate-600"
                    placeholder="Enter your mobile phone number"
                    {...register("phone", {
                      required: "Mobile phone is required",
                    })}
                  />
                  <span className="text-red-500 text-xs font-bold">
                    {errors?.phone?.message}
                  </span>
                </div>

                {/* Email */}
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
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:hover:bg-slate-600"
                    placeholder="name@gmail.com"
                    {...register("email", {
                      required: "Email is required",
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

                {/* Password */}
                <div>
                  <p className="required-field-red-asterisk">
                    <label
                      htmlFor="password"
                      className="text-sm font-medium text-gray-900 block mb-2 dark:text-gray-300"
                    >
                      Your password
                    </label>
                  </p>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    placeholder="••••••••"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                    disabled={isLoading}
                    {...register("password", {
                      required: "Password is required",
                      minLength: {
                        value: 8,
                        message: "Password needs a minimum of 8 characters",
                      },
                    })}
                  />
                  <span className="text-red-500 text-xs font-bold">
                    {errors?.password?.message}
                  </span>
                </div>

                {/* Confirm Password */}
                <div>
                  <p className="required-field-red-asterisk">
                    <label
                      htmlFor="confirmpassword"
                      className="text-sm font-medium text-gray-900 block mb-2 dark:text-gray-300"
                    >
                      Confirm your password
                    </label>
                  </p>
                  <input
                    type="password"
                    name="confirmpassword"
                    id="confirmpassword"
                    placeholder="••••••••"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                    disabled={isLoading}
                    {...register("confirmpassword", {
                      required: "Confirm password is required",
                      validate: (value) =>
                        getValues().password === value ||
                        "The passwords do NOT match",
                    })}
                  />
                  <span className="text-red-500 text-xs font-bold">
                    {errors?.confirmpassword?.message}
                  </span>
                </div>

                {/* Gotra */}
                <div>
                  <label
                    htmlFor="gotra"
                    className="text-sm font-medium text-gray-900 block mb-2 dark:text-gray-300"
                  >
                    Family gotra
                  </label>
                  <input
                    type="text"
                    name="gotra"
                    id="gotra"
                    placeholder="Enter your family gotra"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                    disabled={isLoading}
                    {...register("gotra")}
                  />
                </div>

                {/* Nakshatra */}
                <div>
                  <label
                    htmlFor="nakshatra"
                    className="text-sm font-medium text-gray-900 block mb-2 dark:text-gray-300"
                  >
                    Your birth nakshatra
                  </label>
                  <input
                    type="text"
                    name="nakshatra"
                    id="nakshatra"
                    placeholder="Enter your birth nakshatra"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                    disabled={isLoading}
                    {...register("nakshatra")}
                  />
                </div>

                {/* Newsletter checkbox */}
                <div className="flex items-center">
                  <label className="flex items-center text-gray-500 font-bold">
                    <input
                      type="checkbox"
                      name="newsletter"
                      id="newsletter"
                      className="mr-2 leading-tight"
                      {...register("newsletter")}
                    />
                    <span className="text-sm">Sign up for newsletter!</span>
                  </label>
                </div>

                {/* Submit button */}
                {isLoading ? (
                  <SpinnerMini />
                ) : (
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="group relative w-full flex justify-center py-2.5 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-slate-700 hover:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                      <LockClosedIcon
                        className="h-5 w-5 text-orange-400 group-hover:text-orange-400"
                        aria-hidden="true"
                      />
                    </span>
                    Sign up
                  </button>
                )}

                {/* Sign in link */}
                <div className="text-sm font-medium text-gray-500 dark:text-gray-300 text-center">
                  <span className="mr-1">Already registered?</span>
                  <Link
                    to="/login"
                    className="text-blue-700 hover:underline dark:text-blue-500"
                  >
                    Sign in
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Signup;
