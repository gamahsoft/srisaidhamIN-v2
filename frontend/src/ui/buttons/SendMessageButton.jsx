const SendMessageButton = () => {
  return (
    <>
      <div>
        {/* <button className="group relative w-full flex justify-center ml-3 px-8 py-2 border border-transparent text-sm font-medium rounded-md text-gray-900 bg-slate-200 hover:bg-orange-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-800 hover:text-white"> */}
        <button className="group relative md:px-20 md:mr-8 py-2 border-transparent text-sm font-medium rounded-md text-gray-900 bg-gradient-to-r from-green-400 to-blue-500 hover:from-pink-500 hover:to-yellow-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-800 hover:text-white">
          SEND MESSAGE
        </button>
      </div>
    </>
  );
};

export default SendMessageButton;
