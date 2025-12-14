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
    reset,
  } = useForm();

  const [newsletter, { isLoading }, error] = useNewsletterMutation();

  async function onSubmit(data) {
    try {
      const res = await newsletter({
        newsletteremail: data.newsletteremail,
      }).unwrap();

      toast.success(res.message);
      // clear the form fields
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
      {/* Outer container with darker background and rounded top */}
      <div className="w-full mt-2 bg-slate-900 custom-colors text-gray-300 py-8 px-4 rounded-t-xl">
        {/* Main Content Grid: Responsive from 2 columns (xs) to 6 columns (lg) */}
        <div className="max-w-[1240px] mx-auto grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 border-b-2 border-gray-600 py-6 gap-y-8">
          {/* Column 1: About Saidham */}
          <div className="col-span-1 sm:col-span-1">
            <h6 className="font-bold uppercase pt-2 custom-colors">
              About Saidham
            </h6>
            <ul className="text-sm">
              <li className="py-1 hover:text-teal-400 cursor-pointer transition">
                Mission and Vision
              </li>
              <li className="py-1 hover:text-teal-400 cursor-pointer transition">
                Contact us
              </li>
              <li className="py-1 hover:text-teal-400 cursor-pointer transition">
                Temple Timings
              </li>
            </ul>
          </div>

          {/* Column 2: Resources */}
          <div className="col-span-1 sm:col-span-1">
            <h6 className="font-bold uppercase pt-2 custom-colors">
              Resources
            </h6>
            <ul className="text-sm">
              <li className="py-1 hover:text-teal-400 cursor-pointer transition">
                Books & Lyrics
              </li>
              <li className="py-1 hover:text-teal-400 cursor-pointer transition">
                Sai Satcharitra
              </li>
              <li className="py-1 hover:text-teal-400 cursor-pointer transition">
                SSP Calendar
              </li>
            </ul>
          </div>

          {/* Column 3: Donate */}
          <div className="col-span-1 sm:col-span-1">
            <h6 className="font-bold uppercase pt-2 custom-colors">Donate</h6>
            <ul className="text-sm">
              <li className="py-1 hover:text-teal-400 cursor-pointer transition">
                Annual Drive
              </li>
              <li className="py-1 hover:text-teal-400 cursor-pointer transition">
                Mortgage Bearer
              </li>
              <li className="py-1 hover:text-teal-400 cursor-pointer transition">
                Stocks
              </li>
            </ul>
          </div>

          {/* Column 4: Facilities */}
          <div className="col-span-1 sm:col-span-1">
            <h6 className="font-bold uppercase pt-2 custom-colors">
              Facilities
            </h6>
            <ul className="text-sm">
              <li className="py-1 hover:text-teal-400 cursor-pointer transition">
                Classroom
              </li>
              <li className="py-1 hover:text-teal-400 cursor-pointer transition">
                Multipurpose room
              </li>
              <li className="py-1 hover:text-teal-400 cursor-pointer transition">
                Rental FAQ
              </li>
            </ul>
          </div>

          {/* Column 5/6: Newsletter Subscription */}
          {/* Takes full width on smallest screen, 2 columns on sm+ */}
          <div className="col-span-full lg:col-span-2 pt-4 lg:pt-2">
            <p className="font-bold uppercase custom-colors">
              Subscribe to temple newsletters
            </p>

            <p className="py-1 text-sm text-gray-400">
              Delivered to your email inbox
            </p>

            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-col sm:flex-row mt-3 items-start sm:items-center"
            >
              <input
                type="email"
                name="newsletteremail"
                id="newsletteremail"
                required
                disabled={isLoading}
                // Added flex-grow and responsive margin for better layout
                className="flex-grow w-full sm:w-auto bg-gray-700 border border-gray-600 text-white text-sm rounded-lg focus:ring-teal-500 focus:border-teal-500 block p-2.5 mb-2 sm:mb-0 sm:mr-4 placeholder-gray-400 transition"
                placeholder="Enter your email id"
                {...register("newsletteremail", {
                  pattern: {
                    value: /\S+@\S+\.\S+/,
                    message: "Please provide a valid email address",
                  },
                })}
              />
              <span className="text-red-500 text-xs font-bold block mb-2 sm:hidden">
                {errors?.newsletteremail?.message}
              </span>
              {isLoading ? <SpinnerMini /> : <SubscribeButton />}
              <span className="text-red-500 text-xs font-bold hidden sm:block ml-3">
                {errors?.newsletteremail?.message}
              </span>
            </form>
          </div>
        </div>

        {/* Middle Info Section */}
        <div className="max-w-[1240px] mx-auto py-4 text-center text-gray-400 text-sm">
          <p className="py-1">
            Sri Saidham is an NPO with 501(C)(3) status. Your donations to Sri
            Saidham are tax deductible
          </p>
          <div>
            <p>
              6299 Oak Grove Rd | Newburgh | IN 47630 USA | Phone:{" "}
              <span className="text-teal-400 hover:text-teal-300 transition">
                <a href="tel:+18124900021">(812) 490-0021</a>
              </span>
            </p>
          </div>
        </div>

        {/* Bottom Copyright and Social Links */}
        <div className="flex flex-col max-w-[1240px] mx-auto justify-between items-center sm:flex-row text-center text-gray-400 border-t border-gray-700 pt-4">
          {/* Copyright Text */}
          <p className="py-2 text-sm custom-colors">
            srisaidham.org © 2013 - {new Date().getFullYear()} all rights
            reserved.{" "}
          </p>

          {/* Motto */}
          <p className="py-2 text-sm hidden md:block custom-colors">
            {" "}
            BOW TO SHRI SAI - PEACE AND BLESSINGS TO ALL{" "}
          </p>

          {/* Social Icons Container (Flex, Centered on Mobile) */}
          <div className="flex justify-center sm:justify-end space-x-4 pt-4 sm:pt-0">
            {/* :FACEBOOK */}
            <a
              href="#facebook"
              className="w-8 h-8 flex justify-center items-center shadow-lg rounded-full bg-[#4267B2] text-white hover:bg-opacity-90 transition transform hover:scale-105"
              style={{ backgroundColor: "#4267B2" }}
              onClick={() =>
                window.open(
                  "https://www.facebook.com/srishirdisaibabasansthanoftristate/",
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

            {/* :Instagram */}
            <a
              href="#instagrap"
              className="w-8 h-8 flex justify-center items-center shadow-lg rounded-full bg-gradient-to-tr from-yellow-400 via-red-500 to-purple-500 text-white hover:opacity-90 transition transform hover:scale-105"
              onClick={() =>
                window.open("https://www.srisaidham.org/", "_blank")
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

            {/* :Twitter */}
            <a
              href="#twitter"
              className="w-8 h-8 flex justify-center items-center shadow-lg rounded-full bg-[#1DA1F2] text-white hover:bg-opacity-90 transition transform hover:scale-105"
              style={{ backgroundColor: "#1DA1F2" }}
              onClick={() =>
                window.open("https://www.srisaidham.org/", "_blank")
              }
            >
              {/* ::twitter svg */}
              {/* <svg
                className="w-4 h-4 fill-current"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
              </svg> */}

              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="#000000"
                className="bi bi-twitter-x"
                viewBox="0 0 16 16"
                id="Twitter-X--Streamline-Bootstrap"
                height="16"
                width="16"
              >
                <desc>Twitter X Streamline Icon: https://streamlinehq.com</desc>
                <path
                  d="M12.6 0.75h2.454l-5.36 6.142L16 15.25h-4.937l-3.867 -5.07 -4.425 5.07H0.316l5.733 -6.57L0 0.75h5.063l3.495 4.633L12.601 0.75Zm-0.86 13.028h1.36L4.323 2.145H2.865z"
                  strokeWidth="1"
                ></path>
              </svg>
            </a>

            {/* :Youtube */}
            <a
              href="#youtube"
              className="w-8 h-8 flex justify-center items-center shadow-lg rounded-full bg-[#FF0000] text-white hover:bg-opacity-90 transition transform hover:scale-105"
              style={{ backgroundColor: "#FF0000" }}
              onClick={() =>
                window.open("https://www.youtube.com/user/SSPBayArea", "_blank")
              }
            >
              {/* ::youtube svg (repositioned to center better in the new w/h) */}
              <svg
                className="w-5 h-5 fill-current"
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
                  fill="white" /* Changed fill to white for contrast on red background */
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
