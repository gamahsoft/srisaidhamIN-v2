// import { FiHome, FiUser, FiShoppingCart, FiAlignLeft } from "react-icons/fi";
// import { Link } from "react-router-dom";
// import { useSelector } from "react-redux";

// function MobileFooter() {
//   const { userInfo } = useSelector((state) => state.auth || {});
//   const { cartItems } = useSelector((state) => state.cart || {});

//   const cartCount =
//     cartItems?.reduce((acc, item) => acc + item.cartQty, 0) ?? 0;

//   return (
//     <>
//       <footer className="md:hidden fixed z-30 bottom-0 bg-orange-400 flex items-center justify-between w-full h-16 px-3 sm:px-10">
//         <button
//           aria-label="Bar"
//           onClick={() => console.log("Why did you click me!")}
//           className="flex items-center justify-center flex-shrink-0 h-auto relative focus:outline-none"
//         >
//           <span className="text-xl text-white">
//             <FiAlignLeft className="w-6 h-6 drop-shadow-xl" />
//           </span>
//         </button>
//         <Link href="/">
//           <a className="text-xl text-white" rel="noreferrer" aria-label="Home">
//             {" "}
//             <FiHome className="w-6 h-6 drop-shadow-xl" />
//           </a>
//         </Link>

//         <button
//           onClick={() => console.log("Why did you click me again!")}
//           className="h-9 w-9 relative whitespace-nowrap inline-flex items-center justify-center text-white text-lg"
//         >
//           <span className="absolute z-10 top-0 right-0 inline-flex items-center justify-center p-1 h-5 w-5 text-xs font-bold leading-none text-red-100 transform translate-x-1/2 bg-red-500 rounded-full">
//             00
//           </span>
//           <FiShoppingCart className="w-6 h-6 drop-shadow-xl" />
//         </button>
//         {/* <button
//           aria-label="User"
//           type="button"
//           className="text-xl text-white indicator justify-center"
//         >
//           {userInfo?.image ? (
//             <Link href="/user/dashboard">
//               <a className="relative top-1 w-6 h-6">
//                 <img
//                   width={29}
//                   height={29}
//                   src={userInfo.image}
//                   alt="user"
//                   className="rounded-full"
//                 />
//               </a>
//             </Link>
//           ) : userInfo?.name ? (
//             <Link href="/user/dashboard">
//               <a className="leading-none font-bold font-serif block">
//                 {userInfo?.name[0]}
//               </a>
//             </Link>
//           ) : (
//             <span onClick={() => setModalOpen(!modalOpen)}>
//               <FiUser className="w-6 h-6 drop-shadow-xl" />
//             </span>
//           )}
//         </button> */}
//       </footer>
//     </>
//   );
// }

// export default MobileFooter;

// import { FiHome, FiUser, FiShoppingCart, FiAlignLeft } from "react-icons/fi";
// import { Link } from "react-router-dom";
// import { useSelector } from "react-redux";

// function MobileFooter() {
//   const { userInfo } = useSelector((state) => state.auth || {});
//   const { cartItems } = useSelector((state) => state.cart || {});

//   const cartCount =
//     cartItems?.reduce((acc, item) => acc + item.cartQty, 0) ?? 0;

//   return (
//     <footer className="md:hidden fixed bottom-0 z-30 w-full bg-orange-400 h-16 px-6 flex items-center justify-between shadow-inner">
//       {/* Menu Button */}
//       <Link
//         to="/menu"
//         className="flex flex-col items-center text-white"
//         aria-label="Menu"
//       >
//         <FiAlignLeft className="w-6 h-6" />
//         <span className="text-xs mt-1">Menu</span>
//       </Link>

//       {/* Home Button */}
//       <Link
//         to="/"
//         className="flex flex-col items-center text-white"
//         aria-label="Home"
//       >
//         <FiHome className="w-6 h-6" />
//         <span className="text-xs mt-1">Home</span>
//       </Link>

//       {/* Cart Button with badge */}
//       <Link
//         to="/cart"
//         className="relative flex flex-col items-center text-white"
//         aria-label="Cart"
//       >
//         <FiShoppingCart className="w-6 h-6" />
//         {cartCount > 0 && (
//           <span className="absolute -top-1 -right-2 bg-red-600 text-xs font-bold text-white rounded-full h-5 w-5 flex items-center justify-center">
//             {cartCount}
//           </span>
//         )}
//         <span className="text-xs mt-1">Cart</span>
//       </Link>

//       {/* User Button */}
//       {userInfo ? (
//         <Link
//           to="/user/dashboard"
//           className="flex flex-col items-center text-white"
//           aria-label="User"
//         >
//           {userInfo.image ? (
//             <img
//               src={userInfo.image}
//               alt="User"
//               className="w-6 h-6 rounded-full object-cover"
//             />
//           ) : (
//             <FiUser className="w-6 h-6" />
//           )}
//           <span className="text-xs mt-1">Account</span>
//         </Link>
//       ) : (
//         <Link
//           to="/login"
//           className="flex flex-col items-center text-white"
//           aria-label="Login"
//         >
//           <FiUser className="w-6 h-6" />
//           <span className="text-xs mt-1">Login</span>
//         </Link>
//       )}
//     </footer>
//   );
// }

// export default MobileFooter;

import { useState } from "react";
import {
  FiHome,
  FiUser,
  FiShoppingCart,
  FiAlignLeft,
  FiChevronUp,
} from "react-icons/fi";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { poojaServices } from "../../utils/data";

function MobileFooter() {
  const [openMenu, setOpenMenu] = useState(false); // drawer toggle
  const [openPoojaMenu, setOpenPoojaMenu] = useState(false); // submenu toggle

  const { userInfo } = useSelector((state) => state.auth || {});
  const { cartItems } = useSelector((state) => state.cart || {});

  const cartCount =
    cartItems?.reduce((acc, item) => acc + item.cartQty, 0) ?? 0;

  return (
    <>
      {/* MOBILE FOOTER */}
      <footer className="md:hidden fixed bottom-0 z-40 w-full bg-orange-400 h-16 px-6 flex items-center justify-between shadow-inner">
        {/* MENU BUTTON */}
        <button
          onClick={() => setOpenMenu(true)}
          className="flex flex-col items-center text-white"
        >
          <FiAlignLeft className="w-6 h-6" />
          <span className="text-xs mt-1">Menu</span>
        </button>

        {/* HOME */}
        <Link to="/" className="flex flex-col items-center text-white">
          <FiHome className="w-6 h-6" />
          <span className="text-xs mt-1">Home</span>
        </Link>

        {/* CART */}
        <Link
          to="/shopping-cart"
          className="relative flex flex-col items-center text-white"
        >
          <FiShoppingCart className="w-6 h-6" />
          {cartCount > 0 && (
            <span className="absolute -top-1 -right-2 bg-red-600 text-white text-xs font-bold h-5 w-5 rounded-full flex items-center justify-center">
              {cartCount}
            </span>
          )}
          <span className="text-xs mt-1">Cart</span>
        </Link>

        {/* ACCOUNT */}
        {userInfo ? (
          <Link
            to="/user/dashboard"
            className="flex flex-col items-center text-white"
          >
            <FiUser className="w-6 h-6" />
            <span className="text-xs mt-1">Account</span>
          </Link>
        ) : (
          <Link to="/login" className="flex flex-col items-center text-white">
            <FiUser className="w-6 h-6" />
            <span className="text-xs mt-1">Login</span>
          </Link>
        )}
      </footer>

      {/* SLIDE-UP MENU DRAWER */}
      {openMenu && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-40 flex justify-center items-end">
          <div className="w-full bg-white rounded-t-xl p-4 max-h-[70vh] overflow-y-auto">
            {/* CLOSE AREA */}
            <div className="flex justify-center mb-2">
              <button
                onClick={() => setOpenMenu(false)}
                className="text-gray-500 text-lg"
              >
                Close ✕
              </button>
            </div>

            {/* MENU OPTIONS */}
            <div className="space-y-4">
              {/* HOME */}
              <Link
                to="/home"
                onClick={() => setOpenMenu(false)}
                className="block p-3 rounded-md bg-gray-100 font-serif text-lg"
              >
                Home
              </Link>

              {/* POOJA SERVICES WITH MOBILE SUBMENU */}
              <div className="bg-gray-100 p-3 rounded-md">
                <button
                  className="w-full flex justify-between items-center font-serif text-lg"
                  onClick={() => setOpenPoojaMenu(!openPoojaMenu)}
                >
                  Pooja Services
                  <FiChevronUp
                    className={`transition-transform ${
                      openPoojaMenu ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {openPoojaMenu && (
                  <div className="mt-3 space-y-2 pl-3">
                    {poojaServices.map((item) => (
                      <Link
                        key={item.id}
                        to={item.to}
                        onClick={() => {
                          setOpenPoojaMenu(false);
                          setOpenMenu(false);
                        }}
                        className="block p-2 rounded bg-white hover:bg-orange-200 font-serif"
                      >
                        {item.title}
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              {/* ABOUT */}
              <Link
                to="/about"
                onClick={() => setOpenMenu(false)}
                className="block p-3 rounded-md bg-gray-100 font-serif text-lg"
              >
                About
              </Link>

              {/* CONTACT */}
              <Link
                to="/contact-us"
                onClick={() => setOpenMenu(false)}
                className="block p-3 rounded-md bg-gray-100 font-serif text-lg"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default MobileFooter;
