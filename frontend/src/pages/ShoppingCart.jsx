import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { FiPlus, FiMinus, FiTrash2 } from "react-icons/fi";
import SpinnerMini from "../ui/preloader/SpinnerMini";
import { LockClosedIcon } from "@heroicons/react/24/solid";
import { toast } from "react-hot-toast";

import {
  removeFromCart,
  increaseCart,
  decreaseCart,
  savePaymentMethod,
} from "../features/slices/cartSlice";

function ShoppingCart() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [paymentMethod, setPaymentMethod] = useState("");

  // Get cart items
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  const checkoutHandler = () => {
    setPaymentMethod("card");
    dispatch(savePaymentMethod(paymentMethod));
    navigate("/login?redirect=/payment");
  };

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id));
  };
  const incrementCartHandler = (id) => {
    dispatch(increaseCart(id));
  };
  const decrementCartHandler = (id) => {
    dispatch(decreaseCart(id));
  };

  if (cartItems.length <= 0) {
    toast.error("Your Cart is Empty!");
    // return (
    //   <h1 className="flex flex-col items-center justify-center font-3xl">
    //     Your cart is empty!
    //   </h1>
    // );
  }

  return (
    <>
      <h1 className="mb-6 text-center text-2xl font-bold pt-5">Cart Items</h1>

      <div className="mx-auto max-w-5xl justify-center px-6 md:flex md:space-x-6 xl:px-0 mb-8">
        {cartItems.length === 0 ? (
          <div className="rounded-lg md:w-2/3">
            <h1 className="justify-between mb-6 rounded-lg bg-white p-6 shadow-md sm:flex sm:justify-start text-lg">
              Your cart is empty! go to pooja services
              <Link
                className="group relative w-1/5 flex justify-center py-2 px-2 border border-transparent text-sm font-medium rounded-md text-white bg-slate-700 hover:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 -mt-1 ml-4"
                aria-hidden="true"
                to="/saibaba-services"
              >
                👈 Go back
              </Link>
            </h1>
          </div>
        ) : (
          <div className="rounded-lg md:w-2/3">
            <div>
              {cartItems.map((item) => (
                <div
                  key={item._id}
                  className="justify-between mb-6 rounded-lg bg-white p-6 shadow-md sm:flex sm:justify-start"
                >
                  <img
                    src={item.image}
                    alt="service-image"
                    className="w-full rounded-lg sm:w-40"
                  />
                  <div className="sm:ml-4 sm:flex sm:w-full sm:justify-between">
                    <div className="mt-5 sm:mt-4">
                      <h2 className="text-base font-bold text-gray-900">
                        Seva details:
                      </h2>
                      <h2 className="text-lg font-bold text-gray-900">
                        {item.name}
                      </h2>
                      {/* <p className="mt-1 text-xs text-gray-700">36EU - 4US</p> */}
                    </div>
                    <div className="mt-4 flex justify-between im sm:space-y-6 sm:mt-0 sm:block sm:space-x-6">
                      <div className="flex items-center border-gray-100">
                        <button
                          onClick={() => decrementCartHandler(item._id)}
                          className="cursor-pointer rounded-md bg-gray-300 py-1 px-3.5 duration-100 hover:bg-slate-700 hover:text-blue-50"
                        >
                          -
                        </button>
                        <input
                          className="h-7 w-8 border bg-white text-center text-xs outline-none rounded-md"
                          type="number"
                          value={item.cartQty}
                          min="1"
                          disabled
                        />
                        <button
                          onClick={() => incrementCartHandler(item._id)}
                          className="cursor-pointer rounded-md bg-gray-300 py-1 px-3.5 duration-100 hover:bg-slate-700 hover:text-blue-50"
                        >
                          +
                        </button>
                      </div>
                      <div className="flex items-center space-x-4">
                        <p className="text-sm">${item.price}</p>
                        <button
                          type="button"
                          onClick={() => removeFromCartHandler(item._id)}
                        >
                          {/* <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth="1.5"
                              stroke="currentColor"
                              className="h-5 w-5 cursor-pointer duration-150 hover:text-red-600"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M6 18L18 6M6 6l12 12"
                              />
                            </svg> */}
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5 mr-2 cursor-pointer duration-150 hover:text-red-600"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                            />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        {/* <!-- Sub total --> */}
        {/* Loop through cartItems */}
        <div className="rounded-lg border bg-white p-6 shadow-md md:mt-0 md:w-1/3 lg:w-2/5 lg:ml-10 xl:ml-14 md:ml-6 h-full md:sticky lg:sticky top-28">
          {/* <div className="mt-6 h-full rounded-lg border bg-white p-6 shadow-md md:mt-0 md:w-1/3"> */}
          <div className="mb-4 flex justify-between">
            <p className="text-gray-700 text-xl">Total items in cart: </p>
            <p className="text-gray-700 text-xl">
              ({cartItems.reduce((acc, item) => acc + item.cartQty, 0)})
            </p>
          </div>
          <div className="flex justify-between">
            <p className="text-gray-700">Taxes:</p>
            <p className="text-gray-700">$0.00</p>
          </div>
          <hr className="my-4" />
          <div className="flex justify-between">
            <p className="text-lg font-bold">Total Amount:</p>

            <p className="mb-4 text-lg font-bold">
              $
              {cartItems
                .reduce((acc, item) => acc + item.cartQty * item.price, 0)
                .toFixed(2)}
            </p>
          </div>
          {/* {isLoading ? (
            <SpinnerMini />
          ) : ( */}
          <button
            type="button"
            disabled={cartItems.length === 0}
            onClick={checkoutHandler}
            className="mt-6 group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-slate-700 hover:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <span className="absolute left-0 inset-y-0 flex items-center pl-3">
              <LockClosedIcon
                className="h-5 w-5 text-orange-400 group-hover:text-orange-400"
                aria-hidden="true"
              />
            </span>
            Proceed To Checkout
          </button>
          {/* )} */}
        </div>
      </div>
    </>
  );
}

export default ShoppingCart;
