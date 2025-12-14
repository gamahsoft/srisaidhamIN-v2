import ServicesCard from "../ui/poojaservices/ServicesCard";
import { useGetAllPoojaServicesQuery } from "../features/slices/poojaServicesApiSlice";
import Loading from "../ui/preloader/Loading";

const AllPoojaServices = () => {
  const { data, isLoading, error } = useGetAllPoojaServicesQuery();

  if (isLoading)
    return (
      <div className="flex min-h-[50vh] flex-col items-center justify-center">
        <Loading />
      </div>
    );

  if (error) return <h1>{error?.data?.message || error.error}</h1>;

  const allservices = data?.products ?? [];

  return (
    <section className="mt-6 mb-10">
      <h1 className="text-center text-xl font-bold tracking-wide sm:text-2xl">
        💐 ALL POOJA SERVICES 💐
      </h1>

      <div className="mt-8 max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className="
            grid 
            grid-cols-1 
            gap-6 
            sm:grid-cols-2 
            lg:grid-cols-3 
            xl:grid-cols-4
            justify-items-center
          "
        >
          {allservices.map((service) => (
            <ServicesCard services={service} key={service._id} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default AllPoojaServices;
