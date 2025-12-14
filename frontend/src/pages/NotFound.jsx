import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <main className="min-h-screen bg-emerald-50">
      {/* In a real app, use react-helmet or similar for <title> & meta tags */}
      <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-10 flex items-center">
        <div className="w-full py-10 lg:py-20 flex flex-col items-center text-center">
          <img
            src="/404.svg"
            alt="Page not found"
            className="w-full max-w-md sm:max-w-lg lg:max-w-xl h-auto mx-auto mb-6"
          />

          <h2 className="font-serif font-bold text-2xl sm:text-3xl lg:text-4xl leading-tight mb-4">
            Page not found!
          </h2>

          <p className="text-sm sm:text-base text-gray-600 max-w-md mx-auto">
            Sorry, the page you are looking for doesn’t exist or has been moved.
            Please check the URL or return to the homepage.
          </p>

          <Link
            to="/"
            className="mt-6 inline-flex w-full sm:w-auto items-center justify-center cursor-pointer 
                       transition duration-300 ease-in-out font-semibold text-center rounded-md
                       bg-orange-400 text-white px-5 md:px-6 lg:px-8 py-3 md:py-3.5 lg:py-3
                       text-sm lg:text-base hover:bg-slate-700 focus-visible:outline-none 
                       focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-orange-400"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </main>
  );
};

export default NotFound;
