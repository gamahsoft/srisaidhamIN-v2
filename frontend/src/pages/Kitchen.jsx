// import { useParams } from "react-router-dom";
import ServicesCard from "../ui/poojaservices/ServicesCard";
import { useGetAllKitchenServicesQuery } from "../features/slices/kitchenServicesApiSlice";
import Loading from "../ui/preloader/Loading";

const Kitchen = () => {
  // const { pageNumber, keyword  } = useParams();
  // const { pageNumber } = useParams();
  const keyword = "";
  const pageNumber = 1;

  const {
    data: kitchenServices,
    isLoading,
    error,
  } = useGetAllKitchenServicesQuery({ pageNumber, keyword });

  // const { pageNumber, keyword } = useParams();

  if (isLoading)
    return (
      <h1 className="flex flex-col items-center justify-center">
        <Loading />
      </h1>
    );
  if (error) return <h1>{error?.data?.message || error.error}</h1>;

  return (
    <>
      <h1 className="mt-6 text-center text-lg font-bold">
        {/* 🥡🍚🍛🍜🥣☕🫖🍵🥢🍽️🍴🥄🥥KITCHEN SERVICES */}
        🥣 TEMPLE | KITCHEN SERVICES 🥣
      </h1>
      <h4 className="md:mt-4 text-center text-lg">
        🍚 Today&apos;s Food Menu 🍚
      </h4>
      <>
        <div className="w-fit mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 justify-items-center justify-center gap-y-10 gap-x-12 mt-10 mb-5">
          {kitchenServices.kitchenmenu.map((kitchenService) => (
            <ServicesCard services={kitchenService} key={kitchenService._id} />
          ))}
        </div>
      </>
    </>
  );
};

export default Kitchen;
