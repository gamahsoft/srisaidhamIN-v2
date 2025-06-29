import { useState } from "react";
import { Tab } from "@headlessui/react";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export const TempleTimings = () => {
  let [categories] = useState({
    TempleTimings: [
      {
        id: 1,
        timing: "temple",
        dayhead: "Day of the Week",
        hours: "Open - Close",
        day1: "Monday",
        time1: "7:00 am - 8:00 am",
        day2: "Tuesday",
        time2: "7:00 am - 8:00 am",
        day3: "Wednesday",
        time3: "7:00 am - 8:00 am",
        day4: "Thursday",
        time4: "7:00 am - 8:00 am",
        day5: "Friday",
        time5: "7:00 am - 8:00 am",
        day6: "Saturday",
        time6: "7:00 am - 8:00 pm",
        day7: "Sunday",
        time7: "7:00 am - 8:00 pm",
      },
    ],
    AratiTimings: [
      {
        id: 1,
        timing: "arati",
        dayhead: "Daily Aarati & Bhajan Hours",
        hours: "Time (CST)",
        day1: "Kakad Aarati & Bhajan (Morning ritual)",
        time1: "7:00 am - 8:00 am",
        day2: "Madhyan (noon ritual)",
        time2: "12:00 pm - 1:00 pm",
        day3: "Dhoop (evening ritual)",
        time3: "6:00 pm - 6:30 pm",
        day4: "Shej (night ritual)",
        time4: "7:30 pm - 8:30 pm",
        day5: "Every Saturday & Sunday (Baba Abhishekam)",
        time5: "9:00 am - 10:00 am",
        day6: "Sai Bhajans on Thurdays",
        time6: "7:00 pm - 8:00 pm",
        day7: "Sai Pallaki Seva on Thurdays",
        time8: "7:30 pm - 8:00 pm",
      },
    ],
  });

  return (
    // <div className="w-full max-w-md px-2 py-16 sm:px-0">
    <div className="w-full group py-1">
      <Tab.Group>
        <Tab.List className="flex space-x-1 rounded-lg bg-blue-900/20 p-1 mb-4">
          {Object.keys(categories).map((category) => (
            <Tab
              key={category}
              className={({ selected }) =>
                classNames(
                  "w-full rounded-lg py-2.5 text-base font-medium leading-5 text-blue-700",
                  "ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2",
                  selected
                    ? "bg-white shadow"
                    : "text-slate-900 hover:bg-white/[0.12] hover:text-white text-base"
                )
              }
            >
              {/* {category === "TempleTimings" ? "Temple Hours (CST)" : ""}
              {category === "AratiTimings" ? "Arati Hours (CST)" : ""} */}
              {category === "TempleTimings"
                ? "Temple Hours (CST)"
                : category === "AratiTimings"
                ? "Arati Hours (CST)"
                : ""}
            </Tab>
          ))}
        </Tab.List>
        <Tab.Panels className="mt-1">
          {Object.values(categories).map((posts, idx) => (
            <Tab.Panel
              key={idx}
              className={classNames(
                "rounded-md bg-gradient-to-tl from-green-400 to-indigo-900 p-0",
                "ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2"
              )}
            >
              <div>
                <h1 className="md:text-xl p-6 text-center text-white">
                  🕒 Temple is OPEN 7 days a week 🕘
                </h1>

                {categories.AratiTimings.timing === "arati" && (
                  <h1 className="text-xl mb-3 mt-3 text-center text-white">
                    🕒 Daily Saibaba Arati Hours 🕘
                  </h1>
                )}

                <div className="text-white">
                  {posts.map((post) => (
                    <table
                      className="table-auto mt-2 border-collapse border w-full"
                      key={post.id}
                    >
                      <thead>
                        <tr className="bg-orange-400">
                          <th className="text-lg border">{post.dayhead}</th>
                          <th className="text-lg border">{post.hours}</th>
                        </tr>
                      </thead>
                      <tbody className="text-center">
                        <tr>
                          <td className="text-lg border">{post.day1}</td>
                          <td className="text-lg border">{post.time1}</td>
                        </tr>
                        <tr>
                          <td className="text-lg border">{post.day2}</td>
                          <td className="text-lg border">{post.time2}</td>
                        </tr>
                        <tr>
                          <td className="text-lg border">{post.day3}</td>
                          <td className="text-lg border">{post.time3}</td>
                        </tr>
                        <tr>
                          <td className="text-lg border">{post.day4}</td>
                          <td className="text-lg border">{post.time4}</td>
                        </tr>

                        <tr>
                          <td className="text-lg border">{post.day5}</td>
                          <td className="text-lg border">{post.time5}</td>
                        </tr>
                        <tr>
                          <td className="text-lg border">{post.day6}</td>
                          <td className="text-lg border">{post.time6}</td>
                        </tr>
                        <tr>
                          <td className="text-lg border">{post.day7}</td>
                          <td className="text-lg border">{post.time7}</td>
                        </tr>
                      </tbody>
                      {post.timing === "arati" ? (
                        <h2 className="mb-0"></h2>
                      ) : (
                        ""
                      )}
                    </table>
                  ))}
                </div>
              </div>
            </Tab.Panel>
          ))}
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
};
