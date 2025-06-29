const DeleteButton = () => {
  return (
    <>
      <div>
        {/* <button className="group relative md:px-20 md:mr-8 py-2 border-transparent text-sm font-medium rounded-md text-gray-900 bg-gradient-to-r from-green-400 to-blue-500 hover:from-pink-500 hover:to-yellow-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-800 hover:text-white">
          DONATE
        </button> */}
        <button className="inline-flex items-center px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-sm font-medium rounded-md">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 mr-2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
            />
          </svg>
          Delete
        </button>
        ;
      </div>
    </>
  );
};

export default DeleteButton;
