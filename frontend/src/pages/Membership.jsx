import ServicesCard from "../ui/poojaservices/ServicesCard";
import { useGetServicesQuery } from "../features/slices/poojaServicesApiSlice";
import Loading from "../ui/preloader/Loading";

const Membership = () => {
  const keyword = "member";
  const pageNumber = 1;

  const {
    data: memberships,
    isLoading,
    error,
  } = useGetServicesQuery({ pageNumber, keyword });

  if (isLoading)
    return (
      <div className="flex min-h-[200px] items-center justify-center">
        <Loading />
      </div>
    );

  if (error)
    return (
      <div className="flex min-h-[200px] items-center justify-center px-4">
        <p className="text-center text-sm sm:text-base text-red-600">
          {error?.data?.message || error.error}
        </p>
      </div>
    );

  return (
    <section className="bg-white">
      <div className="mx-auto max-w-screen-xl px-4 py-6 sm:py-10">
        {/* Heading */}
        <h1 className="text-center text-xl font-bold sm:text-2xl md:text-3xl">
          YEARLY MEMBERSHIP
        </h1>

        <h4 className="mt-2 text-center text-base sm:text-lg md:text-xl">
          🙏 Become a member today 🪷 Help grow our community 🙏
        </h4>

        {/* Benefits */}
        <div className="mt-4 space-y-1 text-center text-sm sm:text-base">
          <p>Member benefits include ✅</p>
          <p>(1) Monthly Gotra namacharana (free for members)</p>
          <p>(2) 10% discount on all services</p>
        </div>

        {/* Responsive Grid — 2 columns on lg devices */}
        <div className="mt-8 grid w-full gap-6 sm:grid-cols-2 lg:grid-cols-2">
          {memberships?.products?.map((membership) => (
            <ServicesCard services={membership} key={membership._id} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Membership;
