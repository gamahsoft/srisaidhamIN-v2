import { Fragment } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { HiOutlineChevronDown } from "react-icons/hi2";
import { FiShoppingCart } from "react-icons/fi";

import { Transition, Popover, Menu } from "@headlessui/react";

//internal import
import { poojaServices } from "../../utils/data";
import SaiLogo from "../../assets/saidhamlogo.png";
import SaiDham from "../../assets/saidham.jpg";
import SignInButton from "../buttons/SignInButton";
import UserMenu from "./UserMenu";

function Navbar1() {
  const { userInfo } = useSelector((state) => state.auth || {});
  const { cartItems } = useSelector((state) => state.cart || {});
  // const { email, name } = userInfo

  // let cartQty = cartItems.reduce((acc, item) => acc + item.cartQty, 0);

  return (
    <>
      <div className="hidden md:block bg-orange-400 px-1 rounded-md">
        {/* <div className="max-w-screen-2xl mx-auto px-3 sm:px-10 h-16 flex justify-between items-center"> */}
        <div className="max-w-screen-2xl mx-auto px-3 sm:px-10 h-20 flex justify-between items-center">
          <div className="inline-flex">
            <Popover className="relative">
              <div className="max-w-17xl mx-auto">
                <div className="flex justify-between items-center md:justify-start md:space-x-10">
                  <Popover.Group
                    as="nav"
                    className="md:flex space-x-10 items-center"
                  >
                    <Link to="/">
                      <img
                        style={{
                          width: 65,
                        }}
                        src={SaiLogo}
                        alt="logo"
                      />
                    </Link>

                    <Link>
                      <img
                        style={{
                          width: 150,
                        }}
                        src={SaiDham}
                        alt="logo"
                      />
                    </Link>

                    <Link
                      to="/home"
                      className="font-serif mx-4 md:text-xl font-medium hover:text-white"
                    >
                      Home
                    </Link>

                    {/* Code Starts Here */}

                    <Menu
                      as="div"
                      className="relative font-serif inline-block text-left"
                    >
                      {({ open }) => (
                        <>
                          <div>
                            <Menu.Button className="group inline-flex items-center py-2 md:text-xl font-medium hover:text-white focus:outline-none">
                              Pooja services
                              <HiOutlineChevronDown
                                className={
                                  open
                                    ? "ml-1 rotate-180 transform"
                                    : "ml-1 h-5 w-5 group-hover:text-white"
                                }
                                aria-hidden="true"
                              />
                            </Menu.Button>
                          </div>

                          <Transition
                            as={Fragment}
                            enter="transition ease-out duration-100"
                            enterFrom="transform opacity-0 scale-95"
                            enterTo="transform opacity-100 scale-100"
                            leave="transition ease-in duration-75"
                            leaveFrom="transform opacity-100 scale-100"
                            leaveTo="transform opacity-0 scale-95"
                          >
                            <Menu.Items className="absolute left-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none">
                              <div className="px-1 py-1">
                                <Menu.Item>
                                  {({ close }) => (
                                    <div className="relative grid gap-2 px-6 py-6">
                                      {poojaServices.map((item) => (
                                        <span
                                          key={item.id}
                                          className="p-2 flex font-serif items-centerhover:bg-gray-50 w-full hover:text-white hover:bg-slate-700"
                                        >
                                          <item.icon
                                            className="flex-shrink-0 h-4 w-4"
                                            aria-hidden="true"
                                          />
                                          <Link
                                            to={item.to}
                                            onClick={close}
                                            className="inline-flex items-center
                                            justify-between ml-2 text-base
                                            font-medium w-full
                                            hover:text-orange-400"
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

                    {/* Code Ends Here */}
                    <Link
                      to="/about"
                      className="font-serif mx-4 py-2 md:text-xl font-medium hover:text-white"
                    >
                      About
                    </Link>

                    <Link
                      to="/contact-us"
                      className="font-serif mx-4 py-2 md:text-xl font-medium hover:text-white"
                    >
                      Contact us
                    </Link>
                    {/* <Link
                      to="/offer"
                      className="relative inline-flex items-center h-6 bg-red-100 font-serif ml-4 py-0 px-2 rounded text-sm font-medium text-red-500 hover:text-emerald-600"
                    >
                      Offers
                      <div className="absolute flex w-2 h-2 left-auto -right-1 -top-1">
                        <span className="animate-ping absolute inline-flex h-2 w-2 rounded-full bg-red-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
                      </div>
                    </Link> */}
                  </Popover.Group>
                </div>
              </div>
            </Popover>
          </div>

          <div className="flex">
            {/* <Link
              to="/login"
              className="font-serif mx-4 py-2 text-sm font-medium hover:text-emerald-600"
            >
              <SignInButton />
            </Link> */}
            {userInfo ? (
              <UserMenu />
            ) : (
              <Link
                to="/login"
                className="font-serif mx-4 py-2 text-sm font-medium hover:text-emerald-600"
              >
                <SignInButton />
              </Link>
            )}

            <Link
              to="/shopping-cart"
              aria-label="Total"
              // onClick={toggleCartDrawer}
              className="relative px-5 text-white text-2xl font-bold -py-2"
            >
              <span className="absolute z-10 top-4 right-0 inline-flex items-center justify-center p-1 h-5 w-5 text-xs font-medium leading-none text-red-100 transform -translate-x-1/2 -translate-y-1/2 bg-slate-800 rounded-full">
                {cartItems?.length >= 0 &&
                  cartItems.reduce((acc, item) => acc + item.cartQty, 0)}
              </span>
              <FiShoppingCart className="w-7 h-7 drop-shadow-xl mt-4" />
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default Navbar1;
