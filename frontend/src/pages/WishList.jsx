// import { useParams } from "react-router-dom";
import ServicesCard from "../ui/poojaservices/ServicesCard";
import { useGetServicesQuery } from "../features/slices/poojaServicesApiSlice";
import Loading from "../ui/preloader/Loading";

const WishList = () => {
  // const { pageNumber, keyword } = useParams();
  const keyword = "wishlist";
  const pageNumber = 1;

  const {
    data: wishListServices,
    isLoading,
    error,
  } = useGetServicesQuery({ pageNumber, keyword });

  if (isLoading)
    return (
      <div className="flex items-center justify-center py-10">
        <Loading />
      </div>
    );

  if (error)
    return (
      <div className="flex items-center justify-center py-10">
        <h1 className="text-center text-red-600">
          {error?.data?.message || error.error}
        </h1>
      </div>
    );

  const products = wishListServices?.products || [];

  return (
    <section className="py-8 sm:py-10 lg:py-12">
      <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Title */}
        <h1 className="text-center text-xl sm:text-2xl lg:text-3xl font-bold">
          WISH LIST ITEMS
        </h1>
        <h4 className="mt-3 text-center text-sm sm:text-base lg:text-lg max-w-2xl mx-auto">
          🙏 We are looking for your help to sponsor the wish list items below
          🙏
        </h4>

        {/* Empty state */}
        {products.length === 0 && (
          <p className="mt-8 text-center text-sm sm:text-base text-gray-600">
            No wish list items available at the moment. Please check back later.
          </p>
        )}

        {/* Responsive grid */}
        {products.length > 0 && (
          <div
            className="
              mt-8 sm:mt-10 mb-8
              grid
              grid-cols-1
              sm:grid-cols-2
              lg:grid-cols-3
              xl:grid-cols-4
              gap-y-8 sm:gap-y-10
              gap-x-6 sm:gap-x-8
            "
          >
            {products.map((wishlistservice) => (
              <div
                key={wishlistservice._id}
                className="w-full flex justify-center"
              >
                <ServicesCard services={wishlistservice} />
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default WishList;
