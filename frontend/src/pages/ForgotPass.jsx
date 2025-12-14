import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { LockClosedIcon } from "@heroicons/react/24/solid";
import { useForgotpassMutation } from "../features/slices/usersApiSlice";
import Loading from "../ui/preloader/Loading";
import { toast } from "react-hot-toast";
import SpinnerMini from "../ui/preloader/SpinnerMini";

import forgotpassBg from "/background-images/forgotpass-min.jpg";

const backgroundImageStyle = {
  backgroundImage: `url("${forgotpassBg}")`,
  backgroundSize: "cover",
  backgroundPosition: "center",
  backgroundRepeat: "no-repeat",
};

function ForgotPass() {
  const navigate = useNavigate();

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm();

  const [triggerForgotPass, { isLoading, error }] = useForgotpassMutation();
  const { userInfo } = useSelector((state) => state.auth);

  const { search } = useLocation();
  const sp = new URLSearchParams(search);
  const redirect = sp.get("redirect") || "/";

  useEffect(() => {
    if (userInfo) navigate(redirect);
  }, [navigate, redirect, userInfo]);

  async function onSubmit(data) {
    try {
      const res = await triggerForgotPass({
        email: data.email,
      }).unwrap();
      toast.success(res.message);
      reset();
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  }

  if (isLoading)
    return (
      <h1 className="flex flex-col items-center justify-center min-h-screen">
        <Loading />
      </h1>
    );

  if (error) return <h1>{error?.data?.message || error.error}</h1>;

  return (
    <div
      className="mt-4 text-white min-h-[calc(100vh-1rem)] flex items-center justify-center"
      style={backgroundImageStyle}
    >
      <div className="w-full max-w-md mx-4 sm:mx-6">
        <div className="bg-white/95 shadow-md border border-gray-200 rounded-lg p-4 sm:p-6 lg:p-8">
          <form
            className="space-y-4 sm:space-y-6"
            onSubmit={handleSubmit(onSubmit)}
          >
            <h3 className="text-xl font-medium text-gray-900">
              Forgot your password? 🙂
            </h3>

            <div>
              <p className="required-field-red-asterisk">
                <label
                  htmlFor="email"
                  className="text-sm font-medium text-gray-900 block mb-2 mt-6"
                >
                  Your email
                </label>
              </p>
              <input
                type="email"
                id="email"
                disabled={isLoading}
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder="Enter your email"
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

            {isLoading ? (
              <SpinnerMini />
            ) : (
              <button
                type="submit"
                disabled={isLoading}
                className="group relative w-full flex justify-center py-2 px-4 text-sm font-medium rounded-md text-white bg-slate-700 hover:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                  <LockClosedIcon
                    className="h-5 w-5 text-orange-400 group-hover:text-orange-400"
                    aria-hidden="true"
                  />
                </span>
                Forgot Password?
              </button>
            )}

            <div className="text-sm font-medium text-gray-600 text-center">
              Not registered?{" "}
              <Link to="/signup" className="text-blue-700 hover:underline">
                Create account
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ForgotPass;
