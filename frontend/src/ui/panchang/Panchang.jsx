// import { useQuery } from "@tanstack/react-query";
// import axios from "axios";

import Loading from "../preloader/Loading";
// import { usePanchang } from "../../features/panchang/usePanchang";
import { useGetDailyPanchangQuery } from "../../features/slices/eventsSlice";
function Panchang() {
  // const wait = () => new Promise((resolve) => setTimeout(resolve, ms));
  // const { isLoading, error, data: panchang } = usePanchang();
  // const {
  //   isLoading,
  //   error,
  //   data: panchang,
  // } = useQuery({
  //   queryKey: ["panchang"],
  //   queryFn: async () => {
  // await wait(2000);
  //     const response = await axios.get("/api/calendar/panchang");
  //     const data = await response.data;
  //     return data;
  //   },
  // });

  const { data: panchang, isLoading, error } = useGetDailyPanchangQuery();
  if (error) return <h1>{error?.data?.message}</h1>;

  if (isLoading)
    return (
      <h1 className="flex flex-col items-center justify-center">
        <Loading />
      </h1>
    );
  if (error) return <h1>Error fetching panchang data</h1>;

  return (
    <>
      {/* <div className="bg-gradient-to-r from-teal-400 to-yellow-200 text-slate-900 m-4 p-6 rounded-xl shadow-2xl relative py-8"> */}
      <div className="bg-gradient-to-r from-amber-200 to-yellow-500 text-slate-900 m-4 p-6 rounded-xl shadow-2xl relative py-8">
        {/* <div className="bg-gradient-to-r from-red-500 to-orange-500 text-slate-900 m-4 p-6 rounded-xl shadow-2xl relative py-8"> */}
        <h3 className="sm:text-xl md:text-2xl font-bold text-slate-900 -mt-6 text-center">
          Daily Panchang
        </h3>

        <table className="table-auto mt-2 border-collapse border mb-4 w-full">
          <thead>
            <tr className="bg-orange-400">
              <th className="md:text-lg border">Date</th>
              <th className="md:text-lg border">{panchang?.date}</th>
            </tr>
          </thead>
          <tbody className="text-center">
            <tr>
              <td className="md:text-lg border">Sunrise</td>
              <td className="md:text-lg border">{panchang?.sunrise}</td>
            </tr>
            <tr>
              <td className="md:text-lg border">Sunset</td>
              <td className="md:text-lg border">{panchang?.sunset}</td>
            </tr>
            <tr>
              <td className="md:text-lg border">Nakshathra</td>
              <td className="md:text-lg border">{panchang?.nakshathra}</td>
            </tr>
            <tr>
              <td className="md:text-lg border">Thithi</td>
              <td className="md:text-lg border">{panchang?.thithi}</td>
            </tr>

            <tr>
              <td className="md:text-lg border">Paksha</td>
              <td className="md:text-lg border">{panchang?.paksha}</td>
            </tr>
            <tr>
              <td className="md:text-lg border">Rahu Kala</td>
              <td className="md:text-lg border">{panchang?.rahuKala}</td>
            </tr>
            <tr>
              <td className="md:text-lg border">Yama Kanda</td>
              <td className="md:text-lg border">{panchang?.yamaKanda}</td>
            </tr>
            <tr>
              <td className="md:text-lg border">Auspicious Time</td>
              <td className="md:text-base border">
                {panchang?.auspiciousTime[0]}, {panchang?.auspiciousTime[1]},
                {panchang?.auspiciousTime[3]}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
}

export default Panchang;
