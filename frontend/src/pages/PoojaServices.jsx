import ServicesCard from "../ui/poojaservices/ServicesCard";
import { useGetSaiServicesQuery } from "../features/slices/poojaServicesApiSlice";
import Loading from "../ui/preloader/Loading";

const PoojaServices = () => {
  const {
    data: priestservices = [],
    isLoading,
    error,
  } = useGetSaiServicesQuery();

  if (isLoading)
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <Loading />
      </div>
    );

  if (error)
    return (
      <h1 className="mt-6 text-center text-red-600">
        {error?.data?.message || error.error}
      </h1>
    );

  return (
    <section className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <h1 className="text-center text-xl sm:text-2xl font-bold">
        💐 BABA POOJA SERVICES 💐
      </h1>

      {/* FORCE 4 columns at lg & above */}
      <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 gap-y-8 gap-x-6">
        {priestservices.map((priestservice) => (
          <ServicesCard services={priestservice} key={priestservice._id} />
        ))}
      </div>

      {!priestservices.length && (
        <p className="mt-6 text-center text-sm text-gray-500">
          No services available at the moment. Please check back later.
        </p>
      )}
    </section>
  );
};

export default PoojaServices;
