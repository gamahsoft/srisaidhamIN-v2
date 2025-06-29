// import fevicon from "../../assets/favicon.png";
import fevicon from "../../assets/favicon.ico";
import Banner from "../../ui/layout/Banner";
// import Announcements from "../../ui/layout/Announcements";
// import Navbar from "../../ui/layout/Navbar";
// import Footer from "../../ui/layout/Footer";
// import MobileFooter from "../../ui/layout/MobileFooter";
import Navbar1 from "./Navbar1";
// import NavBarTop from "../../ui/layout/NavBarTop";

// function Header({ title, description, children }) {
function Layout({ title, description }) {
  return (
    <>
      <div className="font-sans">
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

        <div className="-mt-4 -mb-1 max-w-screen-2xl mx-auto px-3 sm:px-10">
          {/* <Announcements /> */}
        </div>

        {/* sticky navbar */}
        <div className="mt-5 w-full mx-auto sticky top-0 z-10">
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

export default Layout;
