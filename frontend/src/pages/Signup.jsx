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
      <div className="mt-4 text-white" style={backgroundImageStyle}>
        <div className="flex flex-col justify-center items-center bg-gradient-to-r from-slate-700 px-8 py-4">
          {/* <!-- This is an example component --> */}
          <div className="max-w-2xl mx-auto">
            <div className="bg-white shadow-md border border-gray-200 rounded-lg max-w-md p-4 sm:p-6 lg:p-8 dark:bg-gray-800 dark:border-gray-700">
              <form
                className="space-y-4 md:px-10"
                onSubmit={handleSubmit(onSubmit)}
              >
                <h3 className="text-xl font-medium text-gray-900 dark:text-white -mt-3">
                  Use your <span className="text-blue-600">email</span> to
                  create account
                </h3>

                <div>
                  {/* <svg className="absolute ml-3" width="24" viewBox="0 0 24 24">
                    <path d="M20.822 18.096c-3.439-.794-6.64-1.49-5.09-4.418 4.72-8.912 1.251-13.678-3.732-13.678-5.082 0-8.464 4.949-3.732 13.678 1.597 2.945-1.725 3.641-5.09 4.418-3.073.71-3.188 2.236-3.178 4.904l.004 1h23.99l.004-.969c.012-2.688-.092-4.222-3.176-4.935z" />
                  </svg> */}
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
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:hover:bg-slate-600"
                    placeholder="Enter your first and last name"
                    // icon={FiMail}
                    {...register("name", {
                      required: "Name is required",
                    })}
                  />
                  <span className="text-red-500 text-xs font-bold">
                    {errors?.name?.message}
                  </span>
                </div>
                <div>
                  {/* <svg className="absolute ml-3" width="24" viewBox="0 0 24 24">
                    <path d="M20.822 18.096c-3.439-.794-6.64-1.49-5.09-4.418 4.72-8.912 1.251-13.678-3.732-13.678-5.082 0-8.464 4.949-3.732 13.678 1.597 2.945-1.725 3.641-5.09 4.418-3.073.71-3.188 2.236-3.178 4.904l.004 1h23.99l.004-.969c.012-2.688-.092-4.222-3.176-4.935z" />
                  </svg> */}
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
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:hover:bg-slate-600"
                    placeholder="Enter your mobile phone number"
                    // icon={FiMail}
                    {...register("phone", {
                      required: "Mobile phone is required",
                    })}
                  />
                  <span className="text-red-500 text-xs font-bold">
                    {errors?.phone?.message}
                  </span>
                </div>
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
                    placeholder="name@gmail.com"
                    // icon={FiMail}
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
                      Confirm your password
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
                      // validate: (value) =>
                      //   value === password.current ||
                      //   "The passwords do not match",
                      validate: (value) =>
                        getValues().password === value ||
                        "The passwords do NOT match",
                    })}
                  />
                  <span className="text-red-500 text-xs font-bold">
                    {errors?.confirmpassword?.message}
                  </span>
                </div>
                <div>
                  <p className="">
                    <label
                      htmlFor="gotra"
                      className="text-sm font-medium text-gray-900 block mb-2 dark:text-gray-300 required-field-red-asterisk"
                    >
                      Family gotra
                    </label>
                  </p>
                  <input
                    type="text"
                    name="gotra"
                    id="gotra"
                    placeholder="Enter your family gotra"
                    // icon={FiLock}
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                    disabled={isLoading}
                    {...register("gotra")}
                  />
                </div>
                <div>
                  <p className="">
                    <label
                      htmlFor="nakshatra"
                      className="text-sm font-medium text-gray-900 block mb-2 dark:text-gray-300 required-field-red-asterisk"
                    >
                      Your birth nakshatra
                    </label>
                  </p>
                  <input
                    type="text"
                    name="nakshatra"
                    id="nakshatra"
                    placeholder="Enter your family gotra"
                    // icon={FiLock}
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                    disabled={isLoading}
                    {...register("nakshatra")}
                  />
                </div>
                {/*sign up for newsletter  */}
                <div className="md:flex md:items-center">
                  {/* <div className="md:w-1/3"></div> */}
                  <label className="md:w-2/3 block text-gray-500 font-bold">
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
                    Sign up
                  </button>
                )}

                <div className="text-sm font-medium text-gray-500 dark:text-gray-300">
                  <span className="mr-1 leading-tight">
                    Already registered?{" "}
                  </span>
                  <Link
                    to="/login"
                    className="text-blue-700 hover:underline dark:text-blue-500 space-y-4"
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
