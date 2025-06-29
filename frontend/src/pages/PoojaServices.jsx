// import ServiceCard from "../ui/services/ServiceCard";
import ServicesCard from "../ui/poojaservices/ServicesCard";
import { useGetSaiServicesQuery } from "../features/slices/poojaServicesApiSlice";
import Loading from "../ui/preloader/Loading";

const PoojaServices = () => {
  const { data: priestservices, isLoading, error } = useGetSaiServicesQuery();

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
        BABA POOJA SERVICES
      </h1>
      <>
        <div className="w-fit mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 justify-items-center justify-center gap-y-10 gap-x-12 mt-10 mb-5">
          {priestservices.map((priestservice) => (
            <ServicesCard services={priestservice} key={priestservice._id} />
          ))}
        </div>
      </>
    </>
  );
};

export default PoojaServices;
