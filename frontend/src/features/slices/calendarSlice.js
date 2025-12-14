// /src/api/events.js
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

// const API = "http://localhost:5000/api";
const API = "https://srisaidhamin-v2.onrender.com/api";
//   import.meta.env.VITE_REACT_PUBLIC_API_BASE_URL || "http://localhost:5000/api";

export const useEvents = (range) =>
  useQuery({
    queryKey: ["events", range?.start, range?.end],
    queryFn: async () => {
      const params = range ? { params: range } : {};
      const { data } = await axios.get(`${API}/calendar/all-events`, params);
      return data; // array of events
    },
    staleTime: 60_000,
  });

export const useCreateEvent = () => {
  console.log("I am in useCreateEvent of calendarSlice.js");
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (payload) => {
      const { data } = await axios.post(`${API}/calendar/add-event`, payload);
      return data;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["events"] }),
  });
};

export const useUpdateEvent = () => {
  console.log("I am in useUpdateEvent of calendarSlice.js");
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, updates }) => {
      const { data } = await axios.put(
        `${API}/calendar/update-event/${id}`,
        updates
      );
      return data;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["events"] }),
  });
};

export const useDeleteEvent = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id) =>
      axios.delete(`${API}/calendar/delete-event/${id}`),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["events"] }),
  });
};
