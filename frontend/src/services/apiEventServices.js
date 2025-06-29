import requests from "./httpServices";

// export const apiEventServices = {
//   getAnnouncements() {
//     return requests.get("/event/show");
//   },
// };
export const apiAnnouncements = {
  async getAnnouncements() {
    return await requests.get("/event/announcements");
  },
};
