import { useState, useEffect } from "react";
import { Link, useLocation, Navigate, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { FiLock, FiMail } from "react-icons/fi";
import { LockClosedIcon } from "@heroicons/react/24/solid";

import { useForgotpassMutation } from "../features/slices/usersApiSlice";
import Loading from "../ui/preloader/Loading";
import { toast } from "react-hot-toast";
import SpinnerMini from "../ui/preloader/SpinnerMini";

// import { useLogin } from "../features/authentication/useLogin";
import forgotpass from "/background-images/forgotpass-min.jpg";

// import loginbg from "../assets/backgroundImage.jpg";
const backgroundImageStyle = {
  backgroundImage: `url("${forgotpass}")`,
  backgroundSize: "cover",
};

function ForgotPass() {
  const navigate = useNavigate();
  // const { login, isLoading } = useLogin();
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm();

  // function onSubmit({ email, password }) {
  //   login({ email, password }, { onSettled: () => reset() });
  // }

  const [forgotpass, { isLoading }, error] = useForgotpassMutation();
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
      const res = await forgotpass({
        email: data.email,
      }).unwrap();
      toast.success(res.message);
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
      <div className="mt-4 text-white" style={backgroundImageStyle}>
        <div className="flex flex-col justify-center items-center px-8 py-16">
          {/* <!-- This is an example component --> */}
          <div className="max-w-2xl mx-auto">
            <div className="bg-white shadow-md border border-gray-200 rounded-lg max-w-md p-4 sm:p-6 lg:p-8 dark:bg-gray-800 dark:border-gray-700">
              <form
                className="space-y-6 md:px-10"
                onSubmit={handleSubmit(onSubmit)}
              >
                <h3 className="text-xl font-medium text-gray-900 dark:text-white">
                  Forgot your password? 🙂
                </h3>

                <div>
                  {/* <svg className="absolute ml-3" width="24" viewBox="0 0 24 24">
                    <path d="M20.822 18.096c-3.439-.794-6.64-1.49-5.09-4.418 4.72-8.912 1.251-13.678-3.732-13.678-5.082 0-8.464 4.949-3.732 13.678 1.597 2.945-1.725 3.641-5.09 4.418-3.073.71-3.188 2.236-3.178 4.904l.004 1h23.99l.004-.969c.012-2.688-.092-4.222-3.176-4.935z" />
                  </svg> */}
                  <p className="required-field-red-asterisk">
                    <label
                      htmlFor="email"
                      className="text-sm font-medium text-gray-900 block mb-2 mt-10 dark:text-gray-300"
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
                {/* <div className="flex items-start">
                  <div className="flex items-start"> */}
                {/* <div className="flex items-center h-5">
                      <input
                        id="remember"
                        aria-describedby="remember"
                        type="checkbox"
                        className="bg-gray-50 border border-gray-300 focus:ring-3 focus:ring-blue-300 h-4 w-4 rounded dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800"
                        required=""
                      />
                    </div> */}
                {/* <div className="text-sm ml-3">
                      <label
                        htmlFor="remember"
                        className="font-medium text-gray-900 dark:text-gray-300"
                      >
                        Remember me
                      </label>
                    </div> */}
                {/* </div> */}
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
                {/* </div> */}

                {isLoading ? (
                  <SpinnerMini />
                ) : (
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-slate-700 hover:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                      <LockClosedIcon
                        className="h-5 w-5 text-orange-400 group-hover:text-orange-400"
                        aria-hidden="true"
                      />
                    </span>
                    Password Reset
                  </button>
                )}

                <div className="text-sm font-medium text-gray-500 dark:text-gray-300">
                  Not registered?{" "}
                  <Link
                    to="/signup"
                    className="text-blue-700 hover:underline dark:text-blue-500"
                  >
                    Create account
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

export default ForgotPass;
