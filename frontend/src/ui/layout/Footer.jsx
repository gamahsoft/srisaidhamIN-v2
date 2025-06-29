import { useForm } from "react-hook-form";
import { useNewsletterMutation } from "../../features/slices/usersApiSlice";
import Loading from "../../ui/preloader/Loading";
import { toast } from "react-hot-toast";
import SpinnerMini from "../../ui/preloader/SpinnerMini";
import SubscribeButton from "../buttons/SubscribeButton";

function Footer() {
  const {
    register,
    formState: { errors },
    handleSubmit,
    // reset,
  } = useForm();

  const [newsletter, { isLoading }, error] = useNewsletterMutation();

  async function onSubmit(data) {
    try {
      const res = await newsletter({
        newsletteremail: data.newsletteremail,
      }).unwrap();

      toast.success(res.message);
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
      {/* <div className="w-full mt-4 bg-slate-900 text-gray-300 py-8 px-2 rounded-xl"> */}
      <div className="w-full mt-4 bg-slate-900 custom-colors py-8 px-2 rounded-xl">
        <div className="max-w-[1240px] mx-auto grid grid-cols-2 md:grid-cols-6 border-b-2 border-gray-600 py-3">
          <div>
            <h6 className="font-bold uppercase pt-2">About Saidham</h6>
            <ul>
              <li className="py-1">Mission and Vision</li>
              <li className="py-1">Contact us</li>
              <li className="py-1">Temple Timings</li>
            </ul>
          </div>
          <div>
            <h6 className="font-bold uppercase pt-2">Resources</h6>
            <ul>
              <li className="py-1">Books & Lyrics</li>
              <li className="py-1">Sai Satcharitra</li>
              <li className="py-1">SSP Calendar</li>
            </ul>
          </div>
          <div>
            <h6 className="font-bold uppercase pt-2">Donate</h6>
            <ul>
              <li className="py-1">Annual Drive</li>
              <li className="py-1">Mortgage Bearer</li>
              <li className="py-1">Stocks</li>
            </ul>
          </div>
          <div>
            <h6 className="font-bold uppercase pt-2">Facilities</h6>
            <ul>
              <li className="py-1">Classroom</li>
              <li className="py-1">Multipurpose room</li>
              <li className="py-1">Rental FAQ</li>
            </ul>
          </div>

          <div className="col-span-2 pt-8 md:pt-2">
            <p className="font-bold uppercase">
              Subscribe to temple weekly newsletter
            </p>

            <ul>
              <li className="py-1">Delivered to your email inbox</li>
            </ul>

            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-col sm:flex-row"
            >
              <input
                type="email"
                name="newsletteremail"
                id="newsletteremail"
                required
                disabled={isLoading}
                // className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm sm: mb-2 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:hover:bg-slate-600"
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:hover:bg-slate-600 text-center"
                placeholder="Enter your email id"
                // icon={FiMail}
                {...register("newsletteremail", {
                  pattern: {
                    value: /\S+@\S+\.\S+/,
                    message: "Please provide a valid email address",
                  },
                })}
              />
              <span className="text-red-500 text-xs font-bold ml-3">
                {errors?.newsletteremail?.message}
              </span>
              {isLoading ? <SpinnerMini /> : <SubscribeButton />}
            </form>
          </div>
        </div>
        {/*  */}
        <div className="px-2 py-2 mx-auto justify-center content-center sm:flex-row text-center text-gray-200">
          <p className="py-1">
            Sri Saidham is an NPO with 501(C)(3) status. Your donations to Sri
            Saidham are tax deductible
          </p>
          <div>
            <p>
              6299 Oak Grove Rd | Newburgh | IN 47630 USA | Phone:{" "}
              <span>
                <a href="tel:+18124900021">(812) 490-0021</a>
              </span>
            </p>
          </div>
        </div>
        {/*  */}

        <div className="flex flex-col max-w-[1240px] px-2 py-2 mx-auto justify-between sm:flex-row text-center text-gray-200">
          <p className="py-2">
            srisaidham.org © 2013 - {new Date().getFullYear()} all rights
            reserved.{" "}
          </p>
          <p className="py-2"> BOW TO SHRI SAI - PEACE AND BLESSINGS TO ALL </p>
          <div className="flex justify-between sm:w-[300px] pt-4 text-2xl">
            {/* <FaFacebook
              className="hover:cursor-pointer hover:bg-sky-700"
              onClick={() =>
                window.open(
                  "https://www.facebook.com/shirdisaiparivaar.milpitas",
                  "_blank"
                )
              }
            /> */}
            {/* :FACEBOOK */}
            <a
              href="#facebook"
              className="-m-1.5 w-8 h-8 inline-flex justify-center items-center shadow-sm rounded-full bg-[#4267B2] text-white filter hover:brightness-125"
              style={{ backgroundColor: "#4267B2" }}
              onClick={() =>
                window.open(
                  "https://www.facebook.com/shirdisaiparivaar.milpitas",
                  "_blank"
                )
              }
            >
              {/* ::facebook svg */}
              <svg
                className="w-5 h-5 fill-current"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <path d="M16.403,9H14V7c0-1.032,0.084-1.682,1.563-1.682h0.868c0.552,0,1-0.448,1-1V3.064c0-0.523-0.401-0.97-0.923-1.005C15.904,2.018,15.299,1.999,14.693,2C11.98,2,10,3.657,10,6.699V9H8c-0.552,0-1,0.448-1,1v2c0,0.552,0.448,1,1,1l2-0.001V21c0,0.552,0.448,1,1,1h2c0.552,0,1-0.448,1-1v-8.003l2.174-0.001c0.508,0,0.935-0.381,0.993-0.886l0.229-1.996C17.465,9.521,17.001,9,16.403,9z" />
              </svg>
            </a>

            {/* <FaInstagram
              className="hover:cursor-pointer"
              onClick={() =>
                window.open("https://shirdisaiparivaar.org", "_blank")
              }
            /> */}
            {/* :Instagram */}
            <a
              href="#instagrap"
              className="-m-1.5 w-8 h-8 inline-flex justify-center align-middle items-center shadow-sm rounded-full bg-gradient-to-tr from-yellow-400 via-red-500 to-purple-500 text-white filter hover:brightness-125"
              onClick={() =>
                window.open("https://shirdisaiparivaar.org", "_blank")
              }
            >
              {/* ::instagram svg */}
              <svg
                className="w-4 h-4 fill-current"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
              </svg>
            </a>
            {/* <FaTwitter
              className="hover:cursor-pointer"
              onClick={() =>
                window.open("https://shirdisaiparivaar.org", "_blank")
              }
            /> */}
            {/* :Twitter */}
            <a
              href="#twitter"
              className="-m-1.5 w-8 h-8 inline-flex justify-center items-center shadow-sm rounded-full bg-[#1DA1F2] text-white filter hover:brightness-125"
              style={{ backgroundColor: "#1DA1F2" }}
              onClick={() =>
                window.open("https://shirdisaiparivaar.org", "_blank")
              }
            >
              {/* ::twitter svg */}
              <svg
                className="w-4 h-4 fill-current"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
              </svg>
            </a>
            {/* <FaYoutube
              className="hover:cursor-pointer"
              onClick={() =>
                window.open("https://www.youtube.com/user/SSPBayArea", "_blank")
              }
            /> */}
            {/* :Youtube */}
            <a
              href="#youtube"
              className="-m-1.5 w-8 h-8 inline-flex justify-center items-center shadow-sm rounded-full bg-zinc-200 text-white filter hover:brightness-200"
              onClick={() =>
                window.open("https://www.youtube.com/user/SSPBayArea", "_blank")
              }
            >
              {/* ::youtube svg */}
              <svg
                className="w-10 h-10 fill-current"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 333333 333333"
                shapeRendering="geometricPrecision"
                textRendering="geometricPrecision"
                imageRendering="optimizeQuality"
                fillRule="evenodd"
                clipRule="evenodd"
              >
                <path
                  d="M166667 0c92048 0 166667 74619 166667 166667s-74619 166667-166667 166667S0 258715 0 166667 74619 0 166667 0zm84195 132297s-1678-11849-6843-17052c-6545-6843-13873-6887-17223-7283-24036-1751-60138-1751-60138-1751h-63s-36085 0-60135 1751c-3363 409-10681 437-17223 7283-5168 5203-6811 17052-6811 17052s-1711 13904-1711 27838v13029c0 13905 1709 27837 1709 27837s1678 11849 6811 17061c6542 6843 15139 6621 18977 7350 13761 1314 58457 1710 58457 1710s36133-64 60169-1783c3363-397 10678-438 17223-7284 5168-5202 6843-17065 6843-17065s1711-13904 1711-27837v-13028c-35-13905-1745-27837-1745-27837l-9 9-1-1zm-102010 56674v-48312l46437 24237-46437 24075z"
                  fill="red"
                />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </>
  );
}

export default Footer;
