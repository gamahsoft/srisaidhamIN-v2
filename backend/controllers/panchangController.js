import axios from "axios";
// import dotenv from "dotenv";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc.js";
import tz from "dayjs/plugin/timezone.js";
import Panchang from "../models/panchangModel.js";

//make sure you have the config before calling the variables from .env
// dotenv.config();
if (process.env.NODE_ENV !== "production") {
  // Load .env only in local dev
  const { default: dotenv } = await import("dotenv");
  dotenv.config();
}

dayjs.extend(utc);
dayjs.extend(tz);

let CentralTime = dayjs().tz("America/Chicago");

const data = {
  name: "Sri Saidham",
  place: {
    name: "Newburgh, US",
    longitude: -87.36489,
    latitude: 37.98971,
    timeZoneId: "America/Chicago",
  },
  year: CentralTime.year(),
  month: CentralTime.month() + 1, // month is 0-based in Day.js
  date: CentralTime.date(),
  hour: CentralTime.hour(),
  minutes: CentralTime.minute(),
  seconds: CentralTime.second(),
  options: {
    Ayanamsa: "LAHARI",
  },
};

const addPanchang = async (req, res) => {
  try {
    const newPanchang = new Panchang(req.body);
    await newPanchang.save();
    res.send({ message: "Panchang Added Successfully!" });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

const getPanchangByDate = async (todayDate) => {
  console.log("getPanchangByDate: ", todayDate);
  try {
    // console.log("todayDate: ", todayDate);
    // const isAdded = await User.findOne({ email: email });
    const todayPanchang = await Panchang.findOne({ date: todayDate });
    if (todayPanchang) {
      console.log("todayPanchang: ", { todayPanchang });
      return {
        todayPanchang,
      };
    } else {
      console.log("Matching data is not found in the database!");
      return null;
    }
  } catch (err) {
    console.log("Error retreiving from the database!");
  }
};

const updatePanchang = async ({ panchangData }) => {
  try {
    // console.log("I am in updatePanchang: ", { panchangData });

    const panchang = await Panchang.findOne({});
    if (panchang) {
      panchang.date = panchangData.date;
      panchang.sunrise = panchangData.sunrise;
      panchang.sunset = panchangData.sunset;
      panchang.nakshathra = panchangData.nakshathra;
      panchang.thithi = panchangData.thithi;
      panchang.paksha = panchangData.paksha;
      panchang.rahuKala = panchangData.rahuKala;
      panchang.yamaKanda = panchangData.yamaKanda;
      panchang.auspiciousTime = panchangData.auspiciousTime;
      await panchang.save();
      // res.send({ message: "Panchang Updated Successfully!" });
    }
  } catch (err) {
    res.status(404).send({ message: "Panchang not found!" });
  }
};

const deletePanchang = (req, res) => {
  Panchang.deleteMany({}, (err) => {
    if (err) {
      res.status(500).send({
        message: err.message,
      });
    } else {
      res.status(200).send({
        message: "Panchang Deleted Successfully!",
      });
    }
  });
};

// Daily panchang API
const dailyPanchang = async (req, res) => {
  // const currDate = dayjs();
  // const todayDate = `${CentralTime.year()}-${
  //   CentralTime.month() + 1
  // }-${CentralTime.date()}`;
  // const formatTodayDate = currDate.format("MMM DD YYYY", todayDate);
  const todayCentral = dayjs().tz("America/Chicago").format("MMM DD YYYY");

  console.log("formatTodayDate: ", todayCentral);

  // const isAdded = await User.findOne({ email: req.body.email });
  const todayPanchang = await Panchang.findOne({ date: todayCentral });
  console.log("DateStoredMongoDB:", todayPanchang);

  if (todayPanchang) {
    // console.log("Today Panchang from database: ", todayPanchang);
    res.send({
      date: todayPanchang.date,
      sunrise: todayPanchang.sunrise,
      sunset: todayPanchang.sunset,
      nakshathra: todayPanchang.nakshathra,
      thithi: todayPanchang.thithi,
      paksha: todayPanchang.paksha,
      rahuKala: todayPanchang.rahuKala,
      yamaKanda: todayPanchang.yamaKanda,
      auspiciousTime: todayPanchang.auspiciousTime,
    });
  } else {
    console.log("Date and data passed to innovativeastro integ call: ", data);
    const headers = {
      "Content-Type": "application/json",
      "x-api-key": "sY3Wm6vdDL3wmNRUElewX9HSy2Ixb6dw10Dc0w8e",
    };

    try {
      const response = await axios.post(
        `https://api.innovativeastrosolutions.com/v0/panchang`,
        data,
        {
          headers: headers,
        }
      );

      if (response.status === 200) {
        console.log(
          "Called Innovative Astro Solutions and today date is: ",
          response?.data?.date
        );
        //save today panchang data to avoid API calls
        const yesterdayPanchang = await Panchang.findOne({});

        console.log("Yesterday Panchang", yesterdayPanchang);

        //
        if (yesterdayPanchang && response?.data) {
          const updateData = {
            date: response.data.date,
            sunrise: response.data.sunrise,
            sunset: response.data.sunset,
            nakshathra: response.data?.nakshathra?.name,
            thithi: response.data?.thithi?.name,
            paksha: response.data.paksha,
            rahuKala: response.data.rahuKala,
            yamaKanda: response.data.yamaKanda,
            auspiciousTime: response.data.auspiciousTime,
          };

          await Panchang.findByIdAndUpdate(
            yesterdayPanchang._id,
            { $set: updateData },
            { new: true, runValidators: true }
          );
        }

        console.log(
          "Innovative Astro Solutions Response Date",
          response.data.date
        );
        res.send({
          date: response.data.date,
          sunrise: response.data.sunrise,
          sunset: response.data.sunset,
          nakshathra: response.data.nakshathra.name,
          thithi: response.data.thithi.name,
          paksha: response.data.paksha,
          rahuKala: response.data.rahuKala,
          yamaKanda: response.data.yamaKanda,
          auspiciousTime: response.data.auspiciousTime,
        });
      } else {
        res.status(401).send({
          message: "Something went wrong, please try again Latter!",
        });
      }
    } catch (error) {
      console.error(error);
    }
  }

  // if (todayPanchang) {
  //   res.send({
  //     date: todayPanchang.date,
  //     sunrise: todayPanchang.sunrise,
  //     sunset: todayPanchang.sunset,
  //     nakshathra: todayPanchang.nakshathra,
  //     thithi: todayPanchang.thithi,
  //     paksha: todayPanchang.paksha,
  //     rahuKala: todayPanchang.rahuKala,
  //     yamaKanda: todayPanchang.yamaKanda,
  //     auspiciousTime: todayPanchang.auspiciousTime,
  //   });

  //   if (!todayPanchang) {
  //     const headers = {
  //       "Content-Type": "application/json",
  //       "x-api-key": "sY3Wm6vdDL3wmNRUElewX9HSy2Ixb6dw10Dc0w8e",
  //     };

  //     console.log("Not todayPanchang: ", todayPanchang);

  //     try {
  //       const response = await axios.post(
  //         `https://api.innovativeastrosolutions.com/v0/panchang`,
  //         data,
  //         {
  //           headers: headers,
  //         }
  //       );

  //       console.log("response.data: ", response.data);

  //       if (response.status === 200) {
  //         console.log("Innovative Astro Solutions: ", response);
  //         //Delete all panchangs and save today panchang data to avoid API calls
  //         await Panchang.deleteMany({});
  //         const newPanchang = new Panchang(response.data);
  //         await newPanchang.save();

  //         res.send({
  //           date: response.data.date,
  //           sunrise: response.data.sunrise,
  //           sunset: response.data.sunset,
  //           nakshathra: response.data.nakshathra.name,
  //           thithi: response.data.thithi.name,
  //           paksha: response.data.paksha,
  //           rahuKala: response.data.rahuKala,
  //           yamaKanda: response.data.yamaKanda,
  //           auspiciousTime: response.data.auspiciousTime,
  //         });
  //       } else {
  //         res.status(401).send({
  //           message: "Something went wrong, please try again Latter!",
  //         });
  //       }
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   }
  // }
};

export {
  addPanchang,
  getPanchangByDate,
  updatePanchang,
  deletePanchang,
  dailyPanchang,
};
