import { useQuery } from "@tanstack/react-query";
import axios from "axios";

function login({ email, password }) {
  const { isLoading, error, data } = useQuery({
    queryKey: ["userlogin"],
    queryFn: async () => {
      const response = await axios.get("/api/users/login");
      const data = await response.data;
      return data;
    },
  });

  if (error) throw new Error(error.message);

  return data;
}
