import { Link } from "react-router-dom";
// import NavLinks from "./NavLinks";

function HeaderNavBar() {
  return (
    <div className="flex items-center font-medium justify-around ">
      <ul className="md:flex hidden uppercase items-center gap-7 ">
        <li>
          {/* <Link to="/" className="py-4 px-3 inline-block"> */}
          Home
          {/* </Link> */}
        </li>
        {/* <NavLinks /> */}
      </ul>

      {/* BELOW IS FOR Mobile nav */}
      {/* <ul
        className={`
        md:hidden bg-white fixed w-full top-0 overflow-y-auto bottom-0 py-24 pl-4 z-50
        duration-500 ${open ? "left-0" : "left-[-100%]"}
        `}
      >
        <li>
          <Link to="/" className="py-7 px-3 inline-block">
            Home
          </Link>
        </li> */}
      {/* <NavLinks /> */}
      {/* <div className="py-5">
          <Link to="/signup">SIGN IN</Link>
        </div>
      </ul> */}
    </div>
  );
}

export default HeaderNavBar;

/* <body class="antialiased bg-gradient-to-r from-pink-300 via-purple-300 to-indigo-400"></body> */
