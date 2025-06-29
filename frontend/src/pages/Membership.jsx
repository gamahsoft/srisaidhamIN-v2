// import { useParams } from "react-router-dom";
import ServicesCard from "../ui/poojaservices/ServicesCard";
import { useGetServicesQuery } from "../features/slices/poojaServicesApiSlice";
import Loading from "../ui/preloader/Loading";

const Membership = () => {
  // const { pageNumber, keyword  } = useParams();
  // const { pageNumber } = useParams();
  const keyword = "member";
  const pageNumber = 1;

  const {
    data: memberships,
    isLoading,
    error,
  } = useGetServicesQuery({ pageNumber, keyword });

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
      <h1 className="mt-6 text-center text-lg font-bold">YEARLY MEMBERSHIP</h1>
      <h4 className="mt-2 text-center text-lg">
        🙏 Become a member today 🪷 Help grow our communicty 🙏
      </h4>
      <div className="mt-2 text-center text-lg">
        <p>Member benefits include ✅ </p>
        <p>(1)Monthly Gotra namacharana (free for members) </p>
        <p>(2)10% discount on all services </p>
      </div>
      <>
        <div className="w-fit mx-auto grid justify-items-center justify-center gap-y-10 gap-x-12 mt-6 mb-6">
          {memberships.products.map((membership) => (
            <ServicesCard services={membership} key={membership._id} />
          ))}
        </div>
      </>
    </>
  );
};

export default Membership;
