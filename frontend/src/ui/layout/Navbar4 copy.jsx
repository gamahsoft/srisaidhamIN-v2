import { Fragment } from "react";
import { Link } from "react-router-dom";
import { HiOutlineChevronDown } from "react-icons/hi2";
import { FiShoppingCart } from "react-icons/fi";

import { Transition, Popover, Menu } from "@headlessui/react";

//internal import
import { poojaServices } from "../../utils/data";
import SaiLogo from "../../assets/saidhamlogo.png";
import SaiDham from "../../assets/saidham.jpg";
import SignInButton from "../buttons/SignInButton";

function Navbar4() {
  function EditInactiveIcon(props) {
    return (
      <svg
        {...props}
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M4 13V16H7L16 7L13 4L4 13Z"
          fill="#EDE9FE"
          stroke="#F97316"
          strokeWidth="2"
        />
      </svg>
    );
  }

  function EditActiveIcon(props) {
    return (
      <svg
        {...props}
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M4 13V16H7L16 7L13 4L4 13Z"
          fill="#8B5CF6"
          stroke="#C4B5FD"
          strokeWidth="2"
        />
      </svg>
    );
  }

  function DuplicateInactiveIcon(props) {
    return (
      <svg
        {...props}
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M4 4H12V12H4V4Z"
          fill="#EDE9FE"
          stroke="#A78BFA"
          strokeWidth="2"
        />
        <path
          d="M8 8H16V16H8V8Z"
          fill="#EDE9FE"
          stroke="#A78BFA"
          strokeWidth="2"
        />
      </svg>
    );
  }

  function DuplicateActiveIcon(props) {
    return (
      <svg
        {...props}
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M4 4H12V12H4V4Z"
          fill="#8B5CF6"
          stroke="#C4B5FD"
          strokeWidth="2"
        />
        <path
          d="M8 8H16V16H8V8Z"
          fill="#8B5CF6"
          stroke="#C4B5FD"
          strokeWidth="2"
        />
      </svg>
    );
  }

  function ArchiveInactiveIcon(props) {
    return (
      <svg
        {...props}
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect
          x="5"
          y="8"
          width="10"
          height="8"
          fill="#EDE9FE"
          stroke="#A78BFA"
          strokeWidth="2"
        />
        <rect
          x="4"
          y="4"
          width="12"
          height="4"
          fill="#EDE9FE"
          stroke="#A78BFA"
          strokeWidth="2"
        />
        <path d="M8 12H12" stroke="#A78BFA" strokeWidth="2" />
      </svg>
    );
  }

  function ArchiveActiveIcon(props) {
    return (
      <svg
        {...props}
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect
          x="5"
          y="8"
          width="10"
          height="8"
          fill="#8B5CF6"
          stroke="#C4B5FD"
          strokeWidth="2"
        />
        <rect
          x="4"
          y="4"
          width="12"
          height="4"
          fill="#8B5CF6"
          stroke="#C4B5FD"
          strokeWidth="2"
        />
        <path d="M8 12H12" stroke="#A78BFA" strokeWidth="2" />
      </svg>
    );
  }

  function MoveInactiveIcon(props) {
    return (
      <svg
        {...props}
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M10 4H16V10" stroke="#A78BFA" strokeWidth="2" />
        <path d="M16 4L8 12" stroke="#A78BFA" strokeWidth="2" />
        <path d="M8 6H4V16H14V12" stroke="#A78BFA" strokeWidth="2" />
      </svg>
    );
  }

  function MoveActiveIcon(props) {
    return (
      <svg
        {...props}
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M10 4H16V10" stroke="#C4B5FD" strokeWidth="2" />
        <path d="M16 4L8 12" stroke="#C4B5FD" strokeWidth="2" />
        <path d="M8 6H4V16H14V12" stroke="#C4B5FD" strokeWidth="2" />
      </svg>
    );
  }

  function DeleteInactiveIcon(props) {
    return (
      <svg
        {...props}
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect
          x="5"
          y="6"
          width="10"
          height="10"
          fill="#EDE9FE"
          stroke="#A78BFA"
          strokeWidth="2"
        />
        <path d="M3 6H17" stroke="#A78BFA" strokeWidth="2" />
        <path d="M8 6V4H12V6" stroke="#A78BFA" strokeWidth="2" />
      </svg>
    );
  }

  function DeleteActiveIcon(props) {
    return (
      <svg
        {...props}
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect
          x="5"
          y="6"
          width="10"
          height="10"
          fill="#8B5CF6"
          stroke="#C4B5FD"
          strokeWidth="2"
        />
        <path d="M3 6H17" stroke="#C4B5FD" strokeWidth="2" />
        <path d="M8 6V4H12V6" stroke="#C4B5FD" strokeWidth="2" />
      </svg>
    );
  }

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

                    {/* Code Starts Here */}

                    <Menu
                      as="div"
                      className="relative font-serif inline-block text-left"
                    >
                      {({ open }) => (
                        <>
                          <div>
                            <Menu.Button className="group inline-flex items-center py-2 text-lg font-medium hover:text-white focus:outline-none">
                              Pooja Services
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
                              <div className="px-1 py-1 ">
                                <Menu.Item>
                                  {({ active }) => (
                                    <Link to="/">
                                      <button
                                        className={`${
                                          active
                                            ? "bg-slate-700 text-white"
                                            : "text-gray-900"
                                        } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                                      >
                                        {active ? (
                                          <EditActiveIcon
                                            className="mr-2 h-5 w-5"
                                            aria-hidden="true"
                                          />
                                        ) : (
                                          <EditInactiveIcon
                                            className="mr-2 h-5 w-5"
                                            aria-hidden="true"
                                          />
                                        )}
                                        Edit
                                      </button>
                                    </Link>
                                  )}
                                </Menu.Item>

                                {/*  */}
                                <Menu.Item>
                                  {({ active }) => (
                                    <button
                                      className={`${
                                        active
                                          ? "bg-slate-700 text-white"
                                          : "text-gray-900"
                                      } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                                    >
                                      {active ? (
                                        <DuplicateActiveIcon
                                          className="mr-2 h-5 w-5"
                                          aria-hidden="true"
                                        />
                                      ) : (
                                        <DuplicateInactiveIcon
                                          className="mr-2 h-5 w-5"
                                          aria-hidden="true"
                                        />
                                      )}
                                      Duplicate
                                    </button>
                                  )}
                                </Menu.Item>
                              </div>
                              <div className="px-1 py-1">
                                <Menu.Item>
                                  {({ active }) => (
                                    <button
                                      className={`${
                                        active
                                          ? "bg-slate-700 text-white"
                                          : "text-gray-900"
                                      } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                                    >
                                      {active ? (
                                        <ArchiveActiveIcon
                                          className="mr-2 h-5 w-5"
                                          aria-hidden="true"
                                        />
                                      ) : (
                                        <ArchiveInactiveIcon
                                          className="mr-2 h-5 w-5"
                                          aria-hidden="true"
                                        />
                                      )}
                                      Archive
                                    </button>
                                  )}
                                </Menu.Item>
                                <Menu.Item>
                                  {({ active }) => (
                                    <button
                                      className={`${
                                        active
                                          ? "bg-slate-700 text-white"
                                          : "text-gray-900"
                                      } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                                    >
                                      {active ? (
                                        <MoveActiveIcon
                                          className="mr-2 h-5 w-5"
                                          aria-hidden="true"
                                        />
                                      ) : (
                                        <MoveInactiveIcon
                                          className="mr-2 h-5 w-5"
                                          aria-hidden="true"
                                        />
                                      )}
                                      Move
                                    </button>
                                  )}
                                </Menu.Item>
                              </div>
                              <div className="px-1 py-1">
                                <Menu.Item>
                                  {({ active }) => (
                                    <button
                                      className={`${
                                        active
                                          ? "bg-slate-700 text-white"
                                          : "text-gray-900"
                                      } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                                    >
                                      {active ? (
                                        <DeleteActiveIcon
                                          className="mr-2 h-5 w-5 text-violet-400"
                                          aria-hidden="true"
                                        />
                                      ) : (
                                        <DeleteInactiveIcon
                                          className="mr-2 h-5 w-5 text-violet-400"
                                          aria-hidden="true"
                                        />
                                      )}
                                      Delete
                                    </button>
                                  )}
                                </Menu.Item>
                              </div>
                            </Menu.Items>
                          </Transition>
                        </>
                      )}
                    </Menu>

                    {/* Code Ends Here */}

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

export default Navbar4;
