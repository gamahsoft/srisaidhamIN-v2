import { useQuery } from "@tanstack/react-query";
// import { toast } from "react-hot-toast";

import { getPanchang } from "../../services/apiAuth";

export function usePanchang() {
  // const wait = () => new Promise((resolve) => setTimeout(resolve, ms));
  return useQuery({
    queryKey: ["panchang"],
    queryFn: async () => getPanchang(),
    // {
    // await wait(2000);
    // const { data } = await axios.get("/api/calendar/panchang");
    // //   const {data} = await axios.get(`/api/calendar/panchang/${date}`);
    // return data;
    // },
    // onSuccess: () => {
    //   toast.success("Login is Successful!");
    // },
    // onError: () => {
    //   toast.error("Error Logging in");
    // },
  });
}
