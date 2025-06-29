import { useQuery } from "@tanstack/react-query";
import axios from "axios";
// import { toast } from "react-hot-toast";

import { getAnnouncements } from "../../services/apiAuth";

export function useAnnouncements() {
  // const wait = () => new Promise((resolve) => setTimeout(resolve, ms));
  return useQuery({
    queryKey: ["announcements"],
    queryFn: async () => getAnnouncements(),
    // {
    // await wait(2000);
    // const { data } = await axios.get("/api/event/announcements");
    //   const {data} = await axios.get(`/api/calendar/panchang/${date}`);
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
