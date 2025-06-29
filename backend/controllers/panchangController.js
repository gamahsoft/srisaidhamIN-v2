import axios from "axios";
import dotenv from "dotenv";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc.js";
import tz from "dayjs/plugin/timezone.js";
import Panchang from "../models/panchangModel.js";

//make sure you have the config before calling the variables from .env
dotenv.config();

// var dayjs = require("dayjs");
// var utc = require("dayjs/plugin/utc");
// var tz = require("dayjs/plugin/timezone");

dayjs.extend(utc);
dayjs.extend(tz);

let CentralTime = dayjs().tz("America/Chicago");

let year = CentralTime.year();
let month = CentralTime.month();
let date = CentralTime.date();
let hour = CentralTime.hour();
let minute = CentralTime.minute();
let second = CentralTime.second();

const data = {
  name: "Sri Saidham",
  place: {
    name: "Newburgh, US",
    longitude: -87.36489,
    latitude: 37.98971,
    timeZoneId: "America/Chicago",
  },
  year: year,
  month: month + 1,
  date: date,
  hour: hour,
  minutes: minute,
  seconds: second,
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
      // console.log("todayPanchang: ", { todayPanchang });
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
  const currDate = dayjs();
  const todayDate = `${year}-${month + 1}-${date}`;
  const formatTodayDate = currDate.format("MMM DD YYYY", todayDate);

  // console.log("todayDate: ", todayDate);
  // console.log("formatTodayDate: ", formatTodayDate);
  // const todayPanchang = getPanchangByDate(`${year}-${month + 1}-${date}`);
  // _id 64950984303758014854ace4

  //add dummy panchang data
  // const newPanchang = new Panchang({ date: todayDate });
  // await newPanchang.save();

  // const isAdded = await User.findOne({ email: req.body.email });
  const todayPanchang = await Panchang.findOne({ date: formatTodayDate });

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
        // console.log("Called Innovative Astro Solutions: ");
        //save today panchang data to avoid API calls
        const yesterdayPanchang = await Panchang.findOne({});

        // console.log("Yesterday Panchang", yesterdayPanchang);

        if (yesterdayPanchang) {
          (yesterdayPanchang.date = response.data.date),
            (yesterdayPanchang.sunrise = response.data.sunrise),
            (yesterdayPanchang.sunset = response.data.sunset),
            (yesterdayPanchang.nakshathra = response.data.nakshathra.name),
            (yesterdayPanchang.thithi = response.data.thithi.name),
            (yesterdayPanchang.paksha = response.data.paksha),
            (yesterdayPanchang.rahuKala = response.data.rahuKala),
            (yesterdayPanchang.yamaKanda = response.data.yamaKanda),
            (yesterdayPanchang.auspiciousTime = response.data.auspiciousTime),
            await yesterdayPanchang.save();
        }
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
