import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-hot-toast";
import ConfettiExplosion from "react-confetti-explosion";
import { clearCartItems } from "../features/slices/cartSlice";
import { Link } from "react-router-dom";
import useScreenSize from "../utils/useScreenSize";

const PaymentSuccess = () => {
  const screenSize = useScreenSize();
  const dispatch = useDispatch();
  const [isExploding, setIsExploding] = React.useState(true);

  useEffect(() => {
    // Clear cart items from local storage or your global state
    dispatch(clearCartItems());
    toast.success("Payment Successful 😎");
  });

  return (
    <>
      <div className="mx-auto max-w-5xl justify-center px-6 md:flex md:space-x-6 xl:px-0">
        {isExploding && (
          <ConfettiExplosion
            force={0.6}
            duration={7000}
            particleCount={500}
            width={screenSize.width}
            height={screenSize.height}
            colors={["#ff577f", "#ff884b", "#ffd384", "#fff9b0"]}
          />
        )}
      </div>
      <h1 className="mb-6 text-center text-2xl font-bold pt-5">
        Thank you! 🙏 Your Payment is Successful!
      </h1>

      <div className="mx-auto max-w-5xl justify-center px-6 md:flex md:space-x-6 xl:px-0 mb-8">
        <div className="rounded-lg md:w-2/3">
          <h1 className="justify-between mb-6 rounded-lg bg-white p-6 shadow-md sm:flex sm:justify-start text-lg">
            Your Payment is Successful! go to pooja services
            <Link
              className="group relative w-1/5 flex justify-center py-2 px-2 border border-transparent text-sm font-medium rounded-md text-white bg-slate-700 hover:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 -mt-1 ml-4"
              aria-hidden="true"
              to="/saibaba-services"
            >
              👈 Go back
            </Link>
          </h1>
        </div>
      </div>
    </>
  );
};

export default PaymentSuccess;
