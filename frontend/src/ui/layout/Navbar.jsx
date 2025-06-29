import { useContext, useEffect, useState } from "react";
// import Cookies from "js-cookie";
import { Link } from "react-router-dom";
import { IoSearchOutline } from "react-icons/io5";
import { FiShoppingCart, FiUser, FiBell } from "react-icons/fi";
// import SignInButton from "../../ui/SignInButton";
import saidhamlogo from "../../assets/saidhamlogo.png";
// import Dropdown from "./Dropdown";

//internal import
// import NavbarPromo from '@layout/navbar/NavbarPromo'
// import HeaderNavBar from "@layout/navbar/HeaderNavBar";

function Navbar() {
  // const [imageUrl, setImageUrl] = useState("");
  // const [searchText, setSearchText] = useState("");
  // const { toggleCartDrawer } = useContext(SidebarContext);
  // const { totalItems } = useCart();
  // const router = useRouter();

  // useEffect(() => {
  //   if (Cookies.get("userInfo")) {
  //     const user = JSON.parse(Cookies.get("userInfo"));
  //     setImageUrl(user.image);
  //   }
  // }, []);

  return (
    <main>
      <div className="max-w-screen-2xl mx-auto px-3 sm:px-10">
        <div className="bg-orange-400 max-w-screen-2xl mx-auto px-3 sm:px-10">
          {/* <div className='max-w-screen-2xl mx-auto px-3 sm:px-10'> */}
          <div className="top-bar h-16 lg:h-auto flex items-center justify-between mx-auto">
            <Link
              className="-mt-3 mr-3 lg:mr-12 xl:mr-12 hidden md:hidden lg:block md:cursor-pointer h-12 hover:scale-125"
              to="/"
            >
              <img width={60} height={60} src={saidhamlogo} alt="logo" />
            </Link>

            {/* <HeaderNavBar /> */}
            <div className="hidden md:hidden md:items-center lg:flex xl:block absolute inset-y-0 right-0 pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
              {/* <button>
                {userInfo?.name ? (
                  // <Dropdown />
                  <span>I am dropdown</span>
                ) : (
                  <span onClick={() => setModalOpen(!modalOpen)}>
                    <SignInButton />
                  </span>
                )}
              </button> */}

              {/* Cart  display on the header*/}
              <button
                aria-label="Total"
                // onClick={toggleCartDrawer}
                className="relative px-5 text-white text-2xl font-bold -py-2"
              >
                <span className="absolute z-10 top-0 right-0 inline-flex items-center justify-center p-1 h-5 w-5 text-xs font-medium leading-none text-red-100 transform -translate-x-1/2 -translate-y-1/2 bg-slate-800 rounded-full">
                  {/* {totalItems} */}
                </span>
                <FiShoppingCart className="w-6 h-6 drop-shadow-xl" />
              </button>
            </div>
          </div>
          {/* </div> */}
        </div>
      </div>
    </main>
  );
}

export default Navbar;
