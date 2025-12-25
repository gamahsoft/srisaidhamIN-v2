import { Fragment } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { HiOutlineChevronDown } from "react-icons/hi2";
import { FiShoppingCart } from "react-icons/fi";
import { Transition, Popover, Menu } from "@headlessui/react";

import { poojaServices } from "../../utils/data";
import SaiDham from "../../assets/saidham.jpg";
import SignInButton from "../buttons/SignInButton";
import UserMenu from "./UserMenu";

function Navbar1() {
  const { userInfo } = useSelector((state) => state.auth || {});
  const { cartItems } = useSelector((state) => state.cart || {});

  const cartCount =
    cartItems?.reduce((acc, item) => acc + item.cartQty, 0) ?? 0;

  return (
    //--------
    <header className="bg-orange-400 px-1 sm:py-2 md:py-4">
      <div className="max-w-screen-2xl mx-auto px-3 sm:px-6 lg:px-10 min-h-16 md:min-h-20 flex items-center justify-between">
        {/* 1. Left side: Logo only */}
        <div className="flex-shrink-0">
          <Link to="/">
            <img
              src={SaiDham}
              alt="logo"
              className="w-24 sm:w-28 md:w-40 h-auto rounded-md"
            />
          </Link>
        </div>

        {/* 2. Middle: Navigation Links (Centered) */}
        <nav className="hidden md:flex flex-1 justify-center items-center space-x-6 lg:space-x-10">
          {/* Home */}
          <Link
            to="/home"
            className="font-serif text-sm sm:text-base md:text-xl font-medium hover:text-white"
          >
            Home
          </Link>

          {/* Pooja services dropdown */}
          <Menu as="div" className="relative inline-block text-left">
            {({ open }) => (
              <>
                <Menu.Button className="group inline-flex items-center py-1 sm:py-2 text-sm sm:text-base md:text-xl font-normal hover:text-white focus:outline-none">
                  Pooja services
                  <HiOutlineChevronDown
                    className={
                      open
                        ? "ml-1 h-4 w-4 rotate-180 transform"
                        : "ml-1 h-4 w-4"
                    }
                    aria-hidden="true"
                  />
                </Menu.Button>
                <Transition
                  as={
                    Fragment
                  } /* ... keep your existing transition props ... */
                >
                  <Menu.Items className="absolute left-0 mt-2 w-56 origin-top-left bg-white shadow-lg rounded-md z-50">
                    {/* ... keep your existing menu items ... */}
                    <div className="px-1 py-1">
                      <Menu.Item>
                        {({ close }) => (
                          <div className="relative grid gap-2 px-2 py-2">
                            {poojaServices.map((item) => (
                              <span
                                key={item.id}
                                className="p-2 flex items-center font-serif w-full hover:bg-slate-700 hover:text-white rounded-md cursor-pointer"
                              >
                                <item.icon
                                  className="flex-shrink-0 h-4 w-4"
                                  aria-hidden="true"
                                />
                                <Link
                                  to={item.to}
                                  onClick={close}
                                  className="inline-flex items-center justify-between ml-2 text-sm sm:text-base font-medium w-full"
                                >
                                  {item.title}
                                </Link>
                              </span>
                            ))}
                          </div>
                        )}
                      </Menu.Item>
                    </div>
                  </Menu.Items>
                </Transition>
              </>
            )}
          </Menu>

          {/* About */}
          <Link
            to="/about"
            className="font-serif text-sm sm:text-base md:text-xl font-medium hover:text-white"
          >
            About
          </Link>

          {/* Contact */}
          <Link
            to="/contact-us"
            className="font-serif text-sm sm:text-base md:text-xl font-medium hover:text-white"
          >
            Contact us
          </Link>
        </nav>

        {/* 3. Right side: Auth + Cart */}
        <div className="flex items-center space-x-3 sm:space-x-4 flex-shrink-0">
          {userInfo ? (
            <UserMenu />
          ) : (
            <Link to="/login">
              <SignInButton />
            </Link>
          )}

          {/* Cart Icon */}
          <Link to="/shopping-cart" className="relative px-2 text-white">
            <span className="absolute -top-1 -right-1 z-10 flex items-center justify-center h-5 w-5 text-[0.6rem] text-red-100 bg-slate-800 rounded-full">
              {cartCount}
            </span>
            <FiShoppingCart className="w-6 h-6 sm:w-7 sm:h-7" />
          </Link>
        </div>
      </div>
    </header>
  );
}

export default Navbar1;
