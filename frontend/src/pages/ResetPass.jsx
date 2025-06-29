import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { LockClosedIcon } from "@heroicons/react/24/solid";

import { useResetpassMutation } from "../features/slices/usersApiSlice";
import Loading from "../ui/preloader/Loading";
import { toast } from "react-hot-toast";
import SpinnerMini from "../ui/preloader/SpinnerMini";
import { setCredentials } from "../features/slices/authSlice";

// import { useLogin } from "../features/authentication/useLogin";
import forgotpass from "/background-images/ResetPassbgImage.jpg";

// import loginbg from "../assets/backgroundImage.jpg";
const backgroundImageStyle = {
  backgroundImage: `url("${forgotpass}")`,
  backgroundSize: "cover",
};

function ResetPass() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
    getValues,
  } = useForm();

  const [resetpass, { isLoading }, error] = useResetpassMutation();
  const { userInfo } = useSelector((state) => state.auth);

  const { search } = useLocation();
  const sp = new URLSearchParams(search);
  const token = sp.get("token");
  const redirect = sp.get("redirect") || "/";

  // const { id } = useParams();

  console.log("token: ", token);

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
      const res = await resetpass({
        newPassword: data.password,
        token: token,
      }).unwrap();
      dispatch(setCredentials({ ...res }));
      navigate(redirect);
      toast.success(res.message);
      reset();
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  }

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
                  Reset your password? 😎
                </h3>

                <div>
                  <p className="required-field-red-asterisk">
                    <label
                      htmlFor="password"
                      className="text-sm font-medium text-gray-900 block mb-2 dark:text-gray-300 required-field-red-asterisk"
                    >
                      Your new password
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
                <div>
                  <p className="required-field-red-asterisk">
                    <label
                      htmlFor="Confirmpassword"
                      className="text-sm font-medium text-gray-900 block mb-2 dark:text-gray-300 required-field-red-asterisk"
                    >
                      Confirm your new password
                    </label>
                  </p>
                  <input
                    type="password"
                    name="confirmpassword"
                    id="confirmpassword"
                    placeholder="••••••••"
                    // icon={FiLock}
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
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

export default ResetPass;
