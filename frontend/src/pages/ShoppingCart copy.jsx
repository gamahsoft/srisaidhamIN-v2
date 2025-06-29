import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { LockClosedIcon } from "@heroicons/react/24/solid";
import { toast } from "react-hot-toast";

function ShoppingCart() {
  const navigate = useNavigate();
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  const checkoutHandler = () => {
    navigate("/login?redirect=/payment");
  };

  return (
    <>
      <h1 className="mb-10 text-center text-2xl font-bold pt-10">Cart Items</h1>
      <div className="mx-auto max-w-5xl justify-center px-6 md:flex md:space-x-6 xl:px-0">
        {/* Loop through cartItems */}
        <div className="rounded-lg md:w-2/3">
          {/* Loop through cartItems */}
          {cartItems.length === 0 ? (
            <Link to="/">Go Back</Link>
          ) : (
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
                        <span className="cursor-pointer rounded-l bg-gray-100 py-1 px-3.5 duration-100 hover:bg-slate-700 hover:text-blue-50">
                          -{" "}
                        </span>
                        <input
                          className="h-8 w-8 border bg-white text-center text-xs outline-none"
                          type="number"
                          value="2"
                          min="1"
                        />
                        <span className="cursor-pointer rounded-r bg-gray-100 py-1 px-3 duration-100 hover:bg-slate-700 hover:text-blue-50">
                          +{" "}
                        </span>
                      </div>
                      <div className="flex items-center space-x-4">
                        <p className="text-sm">${item.price}</p>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth="1.5"
                          stroke="currentColor"
                          className="h-5 w-5 cursor-pointer duration-150 hover:text-red-500"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M6 18L18 6M6 6l12 12"
                          />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
          {/* Loop through cartItems */}
        </div>
        {/* <!-- Sub total --> */}
        {/* Loop through cartItems */}
        <div className="rounded-lg border bg-white p-6 shadow-md md:mt-0 md:w-1/3 lg:w-2/5 lg:ml-10 xl:ml-14 md:ml-6 h-full md:sticky lg:sticky top-28">
          {/* <div className="mt-6 h-full rounded-lg border bg-white p-6 shadow-md md:mt-0 md:w-1/3"> */}
          <div className="mb-2 flex justify-between">
            <p className="text-gray-700 text-2xl">Total items in cart: </p>
            <p className="text-gray-700 text-2xl">
              {cartItems.reduce((acc, item) => {
                acc + item.cartQty, 0;
              })}
            </p>
          </div>
          <div className="flex justify-between">
            <p className="text-gray-700">Taxes</p>
            <p className="text-gray-700">$0.00</p>
          </div>
          <hr className="my-4" />
          <div className="flex justify-between">
            <p className="text-lg font-bold">Total Amount</p>

            <p className="mb-4 text-lg font-bold">
              {cartItems.reduce((acc, item) => {
                acc + item.cartQty * item.price, 0;
              })}
            </p>
          </div>
          {/* {isLoading ? (
            <SpinnerMini />
          ) : ( */}
          <button
            type="submit"
            disabled={cartItems.length === 0}
            onClick={checkoutHandler}
            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-slate-700 hover:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
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
