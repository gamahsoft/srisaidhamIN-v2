import fevicon from "../../assets/favicon.ico";
import Banner from "../../ui/layout/Banner";
// import Announcements from "../../ui/layout/Announcements";
// import Footer from "../../ui/layout/Footer";
import MobileFooter from "../../ui/layout/MobileFooter";
import Navbar1 from "./Navbar1";

function Layout({ title, description, children }) {
  return (
    <>
      {/* Head-like content – ideally move to react-helmet in future */}
      <title>
        {title
          ? `Sri Saidham Newburgh IN | ${title}`
          : "Sri Saidham | Newburgh IN"}
      </title>
      {description && <meta name="description" content={description} />}
      <link rel="icon" type="image/x-icon" href={fevicon} />

      <div className="font-sans min-h-screen bg-white flex flex-col">
        {/* Banner - Top of Home page */}
        <Banner />

        {/* Announcements or other strip under banner */}
        {/* If you want overlap with the banner, reintroduce -mt-4 here but test on mobile */}
        {/* <div className="max-w-screen-2xl mx-auto px-3 sm:px-6 lg:px-10">
          <Announcements />
        </div> */}

        {/* Sticky navbar */}
        <div className="w-full sticky top-0 z-20 bg-white shadow">
          <Navbar1 />
        </div>

        {/* Main content */}
        <main className="flex-1 max-w-screen-2xl mx-auto w-full px-3 sm:px-6 lg:px-10 pt-4 pb-10">
          {children}
        </main>

        {/* Optional footers */}
        <MobileFooter />
        {/* <div className="w-full">
          <Footer />
        </div> */}
      </div>
    </>
  );
}

export default Layout;
