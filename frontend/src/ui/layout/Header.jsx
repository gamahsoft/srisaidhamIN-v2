// import fevicon from "../../assets/favicon.png";
import fevicon from "../../assets/favicon.ico";
import Banner from "../../ui/layout/Banner";
import Announcements from "../../ui/layout/Announcements";
// import Announcements1 from "../../ui/layout/Announcements1";
// import Navbar from "../../ui/layout/Navbar";
// import Footer from "../../ui/layout/Footer";
// import MobileFooter from "../../ui/layout/MobileFooter";
import Navbar1 from "./Navbar1";
// import NavBarTop from "../../ui/layout/NavBarTop";

// function Header({ title, description, children }) {
function Header({ title, description }) {
  return (
    <>
      {/* scrolling full screen */}
      <div className="font-sans rounded-md bg-custom">
        <header>
          <title>
            {title
              ? `Sri Saidham Newburgh IN | {title}`
              : "Sri Saidham | Newburgh IN"}
          </title>
          {description && <meta name="description" content={description} />}
          <link href={fevicon} />
        </header>
        {/* <NavBarTop /> */}
        {/* Banner - Top of Home page */}
        <span>
          <Banner />
        </span>

        <div className="max-w-screen-2xl mx-auto px-3 sm:px-10">
          <Announcements />
        </div>

        {/* sticky navbar */}

        <div className="mx-auto max-w-screen-2xl px-3 sm:px-10">
          {/* <div className="mt-1"> */}
          <Navbar1 />
        </div>
        {/* All the page will have the same content except for the children */}
        {/* <div>{children}</div> */}
        {/* Mobilefooter */}
        {/* <MobileFooter /> */}

        {/* <div className="w-full -mt-6">
          <Footer />
        </div> */}
      </div>
    </>
  );
}

export default Header;
