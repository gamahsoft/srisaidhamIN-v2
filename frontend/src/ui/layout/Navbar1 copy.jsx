import { Fragment } from "react";
import { Link } from "react-router-dom";
import { HiOutlineChevronDown } from "react-icons/hi2";
import { FiShoppingCart } from "react-icons/fi";

import { Transition, Popover } from "@headlessui/react";

//internal import
import { poojaServices } from "../../utils/data";
import SaiLogo from "../../assets/saidhamlogo.png";
import SaiDham from "../../assets/saidham.jpg";
import SignInButton from "../buttons/SignInButton";

function Navbar1() {
  return (
    <>
      <div className="hidden md:block bg-orange-400 sticky top-0 z-20 px-2 rounded-xl">
        <div className="max-w-screen-2xl mx-auto px-3 sm:px-10 h-16 flex justify-between items-center">
          <div className="inline-flex">
            <Popover className="relative">
              <div className="max-w-17xl mx-auto">
                <div className="flex justify-between items-center md:justify-start md:space-x-10">
                  <Popover.Group
                    as="nav"
                    className="md:flex space-x-10 items-center"
                  >
                    {/* <Popover className="relative font-serif">
                      <Popover.Button className="group inline-flex items-center py-2 hover:text-orange-400 focus:outline-none">
                        <span className="font-serif text-sm font-medium">
                          Categories
                        </span>
                        <HiOutlineChevronDown
                          className="ml-1 h-3 w-3 group-hover:text-orange-400"
                          aria-hidden="true"
                        />
                      </Popover.Button>

                      <Transition
                        as={Fragment}
                        enter="transition ease-out duration-200"
                        enterFrom="opacity-0 translate-y-1"
                        enterTo="opacity-100 translate-y-0"
                        leave="transition ease-in duration-150"
                        leaveFrom="opacity-100 translate-y-0"
                        leaveTo="opacity-0 translate-y-1"
                      >
                        <Popover.Panel className="absolute z-10 -ml-1 mt-1 transform w-screen max-w-xs c-h-65vh bg-white">
                          <div className="rounded-md shadow-lg ring-1 ring-black ring-opacity-5 overflow-y-scroll flex-grow scrollbar-hide w-full h-full">
                            <Category />
                          </div>
                        </Popover.Panel>
                      </Transition>
                    </Popover> */}

                    <Link to="/">
                      <img
                        // className="w-screen"
                        // width={1600}
                        // height={180}
                        style={{
                          width: 65,
                        }}
                        src={SaiLogo}
                        alt="logo"
                      />

                      {/* Sai{" "}
                      <span
                        style={{
                          color: "#e67e22",
                          // fontSize: '2.5rem',
                        }}
                      >
                        ✡
                      </span>{" "}
                      Dham */}
                    </Link>

                    <Link
                    // to="/about-us"
                    // className="space-x-10"
                    >
                      <img
                        // className="w-screen"
                        // width={1600}
                        // height={180}
                        style={{
                          width: 100,
                        }}
                        src={SaiDham}
                        alt="logo"
                      />
                    </Link>
                    <Link
                      to="/home"
                      className="font-serif mx-4 text-lg font-medium hover:text-white"
                    >
                      Home
                    </Link>
                    <Link
                      to="/contact-us"
                      className="font-serif mx-4 py-2 text-lg font-medium hover:text-white"
                    >
                      About
                    </Link>

                    <Popover className="relative font-serif">
                      {({ open }) => (
                        <>
                          <Popover.Button className="group inline-flex items-center py-2 text-lg font-medium hover:text-white focus:outline-none">
                            <span>Pooja</span>
                            <HiOutlineChevronDown
                              className={
                                open
                                  ? "rotate-180 transform"
                                  : "h-5 w-5 group-hover:text-white"
                              }
                              aria-hidden="true"
                            />
                          </Popover.Button>
                          <Transition
                            as={Fragment}
                            enter="transition ease-out duration-200"
                            enterFrom="opacity-0 translate-y-1"
                            enterTo="opacity-100 translate-y-0"
                            leave="transition ease-in duration-150"
                            leaveFrom="opacity-100 translate-y-0"
                            leaveTo="opacity-0 translate-y-1"
                          >
                            <Popover.Panel className="absolute z-10 -ml-1 transform w-screen max-w-xs bg-white">
                              <div className="shadow-lg ring-1 ring-black ring-opacity-5 overflow-y-auto flex-grow scrollbar-hide w-full h-full">
                                <div className="relative grid gap-2 px-6 py-6">
                                  {poojaServices.map((item) => (
                                    <span
                                      key={item.title}
                                      className="p-2 flex font-serif items-centerhover:bg-gray-50 w-full hover:text-orange-400"
                                    >
                                      <item.icon
                                        className="flex-shrink-0 h-4 w-4"
                                        aria-hidden="true"
                                      />
                                      <Link
                                        to={item.to}
                                        className="inline-flex items-center justify-between ml-2 text-base font-medium w-full hover:text-orange-400"
                                      >
                                        {item.title}
                                      </Link>
                                    </span>
                                  ))}
                                </div>
                              </div>
                            </Popover.Panel>
                          </Transition>
                        </>
                      )}
                    </Popover>

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
          {/* Code Starts Here */}

          {/* Code Ends Here */}

          <div className="flex">
            <Link
              to="/sign-in"
              className="font-serif mx-4 py-2 text-sm font-medium hover:text-emerald-600"
            >
              <SignInButton />
            </Link>
            <button
              aria-label="Total"
              // onClick={toggleCartDrawer}
              className="relative px-5 text-white text-2xl font-bold -py-2"
            >
              <span className="absolute z-10 top-5 right-0 inline-flex items-center justify-center p-1 h-4 w-4 text-xs font-medium leading-none text-red-100 transform -translate-x-1/2 -translate-y-1/2 bg-slate-800 rounded-full">
                {/* {totalItems} */}
              </span>
              <FiShoppingCart className="w-7 h-7 drop-shadow-xl" />
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Navbar1;
