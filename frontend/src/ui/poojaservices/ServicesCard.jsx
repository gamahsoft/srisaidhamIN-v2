import { useState } from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "../../features/slices/cartSlice";
import { toast } from "react-hot-toast";

function ServicesCard({ services }) {
  const [cartQty, setCartQty] = useState(1);
  const dispatch = useDispatch();

  const addToCartHandler = (services) => {
    setCartQty(cartQty + 1);
    dispatch(addToCart({ ...services, cartQty }));
    let message = "";
    message = services.name.concat(", added to cart!");
    toast.success(message);
  };
  return (
    <div className="w-72 bg-white shadow-lg p-4 rounded-xl duration-500 hover:scale-105 hover:shadow-xl">
      <div className="relative overflow-hidden">
        <img
          className="object-cover w-full h-full"
          src={services.image}
          alt="sai services"
        />
        {/* <div className="absolute inset-0 bg-black opacity-40"></div> */}
        {/* <div className="absolute inset-0 flex items-center justify-center">
          <button className="bg-white text-gray-900 py-2 px-6 rounded-full font-bold hover:bg-gray-300">
            View Product
          </button>
        </div> */}
        <h3 className="md:text-lg font-bold text-gray-900 mt-4">
          {services.name}
        </h3>
        {/* <p className="text-gray-500 text-sm mt-2">{services.name}</p> */}
        <div className="flex items-center justify-between mt-4">
          <span className="text-gray-900 font-bold">${services.price}</span>
          <button
            onClick={() => addToCartHandler(services)}
            className="bg-orange-400 text-white text-center text-md py-2 px-4 rounded-full font-bold hover:bg-gray-800"
          >
            DONATE
          </button>
        </div>
      </div>
    </div>
  );
}

export default ServicesCard;
