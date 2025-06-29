import { FiHome, FiUser, FiShoppingCart, FiAlignLeft } from "react-icons/fi";
import { Link } from "react-router-dom";

function MobileFooter() {
  return (
    <>
      <footer className="md:hidden fixed z-30 bottom-0 bg-orange-400 flex items-center justify-between w-full h-16 px-3 sm:px-10">
        <button
          aria-label="Bar"
          onClick={() => console.log("Why did you click me!")}
          className="flex items-center justify-center flex-shrink-0 h-auto relative focus:outline-none"
        >
          <span className="text-xl text-white">
            <FiAlignLeft className="w-6 h-6 drop-shadow-xl" />
          </span>
        </button>
        <Link href="/">
          <a className="text-xl text-white" rel="noreferrer" aria-label="Home">
            {" "}
            <FiHome className="w-6 h-6 drop-shadow-xl" />
          </a>
        </Link>

        <button
          onClick={() => console.log("Why did you click me again!")}
          className="h-9 w-9 relative whitespace-nowrap inline-flex items-center justify-center text-white text-lg"
        >
          <span className="absolute z-10 top-0 right-0 inline-flex items-center justify-center p-1 h-5 w-5 text-xs font-bold leading-none text-red-100 transform translate-x-1/2 bg-red-500 rounded-full">
            00
          </span>
          <FiShoppingCart className="w-6 h-6 drop-shadow-xl" />
        </button>
        {/* <button
          aria-label="User"
          type="button"
          className="text-xl text-white indicator justify-center"
        >
          {userInfo?.image ? (
            <Link href="/user/dashboard">
              <a className="relative top-1 w-6 h-6">
                <img
                  width={29}
                  height={29}
                  src={userInfo.image}
                  alt="user"
                  className="rounded-full"
                />
              </a>
            </Link>
          ) : userInfo?.name ? (
            <Link href="/user/dashboard">
              <a className="leading-none font-bold font-serif block">
                {userInfo?.name[0]}
              </a>
            </Link>
          ) : (
            <span onClick={() => setModalOpen(!modalOpen)}>
              <FiUser className="w-6 h-6 drop-shadow-xl" />
            </span>
          )}
        </button> */}
      </footer>
    </>
  );
}

export default MobileFooter;
