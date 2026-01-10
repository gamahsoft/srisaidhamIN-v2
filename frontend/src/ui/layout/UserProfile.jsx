import { useState, useEffect, useRef } from "react";
import { jsPDF } from "jspdf";
import { autoTable } from "jspdf-autotable";
// import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import Loading from "../../ui/preloader/Loading";
import { toast } from "react-hot-toast";
import SpinnerMini from "../../ui/preloader/SpinnerMini";
import { LockClosedIcon } from "@heroicons/react/24/solid";

import { useProfileMutation } from "../../features/slices/usersApiSlice";
import { useGetMyOrdersQuery } from "../../features/slices/ordersApiSlice";
import { setCredentials } from "../../features/slices/authSlice";

function UserProfile() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [gotra, setGotra] = useState("");
  const [nakshatra, setNakshatra] = useState("");
  const printRef = useRef(null);

  // const [password, setPassword] = useState("");
  // const [confirmPassword, setConfirmPassword] = useState("");

  const { userInfo } = useSelector((state) => state.auth);

  const [updateProfile, { isLoading: loadingUpdateProfile }, error] =
    useProfileMutation();

  const { data: orders, isLoading } = useGetMyOrdersQuery();

  // console.log("Order details: ", orders);

  const dispatch = useDispatch();
  const {
    register,
    getValues,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm();

  useEffect(() => {
    setName(userInfo.name);
    setEmail(userInfo.email);
    setPhone(userInfo.phone);
    setGotra(userInfo.gotra);
    setNakshatra(userInfo.nakshatra);
  }, [
    userInfo.email,
    userInfo.name,
    userInfo.phone,
    userInfo.gotra,
    userInfo.nakshatra,
  ]);

  async function onSubmit(data) {
    try {
      const res = await updateProfile({
        email: data.email,
        phone: data.phone,
        gotra: data.gotra,
        nakshatra: data.nakshatra,
        password: data.password,
      }).unwrap();
      dispatch(setCredentials({ ...res }));
      // navigate(redirect);
      toast.success("Profile updated successfully 😎");
      reset();
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  }

  //   // const submitHandler = async (e) => {
  //   //   e.preventDefault();
  //   //   if (password !== confirmPassword) {
  //   //     toast.error("Passwords do not match");
  //   //   } else {
  //   //     try {
  //   //       const res = await updateProfile({
  //   //         _id: userInfo._id,
  //   //         name,
  //   //         email,
  //   //         password,
  //   //       }).unwrap();
  //   //       dispatch(setCredentials({ ...res }));
  //   //       toast.success("Profile updated successfully");
  //   //     } catch (err) {
  //   //       toast.error(err?.data?.message || err.error);
  //   //     }
  //   //   }
  //   // };

  // Generate PDF
  const downloadPDF = async () => {
    const taxYear = new Date().getFullYear() - 1;
    // const taxYear = new Date().getFullYear();
    const taxYearData = orders.filter((item) =>
      // item.name.toLowerCase().includes(taxYear.toLowerCase())
      item.createdAt.substring(0, 10).includes(taxYear)
    );

    console.log("tax year data: ", taxYearData);

    try {
      const doc = new jsPDF();
      // const imageUrl = "/images/pooja/AlankaraSeva.jpg";
      const imageUrl = "/images/pooja/sai-bannerpdf.png";
      doc.setProperties({
        title: "Your donations for the year -",
        taxYear,
      });
      doc.addImage(imageUrl, "JPEG", 10, 5, 190, 30);
      // doc.setFontSize(10);
      // doc.text(
      //   `federal tax exemption 501(c)(3) status TaxID: 46-0797629`,
      //   45,
      //   41
      // );

      doc.setFontSize(14);
      doc.text(`Your donations for the tax year - ${taxYear}`, 60, 50);

      // doc.text(taxYear, 14, 15);

      // doc.setFontSize(40);
      // doc.setFont('custom', 'bold');
      // doc.text("Octonyan loves jsPDF", 35, 25);
      // doc.addImage("examples/images/Octonyan.jpg", "JPEG", 15, 40, 180, 180);

      const tableColumn = ["DONATION", "DATE", "PAYMENT TYPE", "TOTAL"];
      const tableRows = [];

      if (taxYearData) {
        taxYearData.forEach((order) => {
          tableRows.push([
            order._id,
            order.createdAt.substring(0, 10),
            order.paymentMethod,
            order.totalPrice,
          ]);
        });
      }

      // Add table to PDF
      autoTable(doc, {
        head: [tableColumn],
        body: tableRows,
        startY: 54,
      });

      // if no donations found
      if (taxYearData.length === 0) {
        doc.setFontSize(14);
        doc.text(`NO donations found for the tax year - ${taxYear}`, 60, 80);
      }

      // 4. Save the PDF
      doc.save(`TaxYear - ${taxYear}.pdf`);
    } catch (err) {
      // console.error("Error downloading PDF:", err);
      alert("Failed to generate PDF. Please try again.");
    }
  };

  if (isLoading)
    return (
      <h1 className="flex flex-col items-center justify-center">
        <Loading />
      </h1>
    );

  // if (error) return <h1>{error?.data?.message || error.error}</h1>;

  return (
    <>
      <h1 className="mb-6 text-center text-2xl font-bold pt-5">
        {/* 🎑 User Profile & Donation details 🪷🎑🏁 */}
        User Profile & Donation details
      </h1>
      <div className="min-h-screen bg-gray-100 p-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-6 items-start">
          {/* Left Column (2/3) */}
          <div className="bg-white p-6 rounded-2xl shadow w-full md:w-1/3 self-start">
            <h2 className="text-2xl font-bold mb-4">👤 User profile</h2>

            <form
              className="space-y-6 md:px-10"
              onSubmit={handleSubmit(onSubmit)}
            >
              <div>
                <p className="required-field-red-asterisk">
                  <label
                    htmlFor="name"
                    className="text-sm font-medium text-gray-900 block mb-1 dark:text-gray-300"
                  >
                    Your name
                  </label>
                </p>
                <input
                  type="text"
                  name="name"
                  id="name"
                  disabled="false"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:hover:bg-slate-600"
                  placeholder={name}
                  {...register("name")}
                />
                <span className="text-red-500 text-xs font-bold">
                  {errors?.name?.message}
                </span>
              </div>

              <div>
                <p className="required-field-red-asterisk">
                  <label
                    htmlFor="email"
                    className="text-sm font-medium text-gray-900 block mb-1 dark:text-gray-300"
                  >
                    Your email
                  </label>
                </p>
                <input
                  type="email"
                  name="email"
                  id="email"
                  disabled="true"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:hover:bg-slate-600"
                  placeholder={email}
                  {...register("email")}
                />
                <span className="text-red-500 text-xs font-bold">
                  {errors?.email?.message}
                </span>
              </div>

              <div>
                <p className="required-field-red-asterisk">
                  <label
                    htmlFor="phone"
                    className="text-sm font-medium text-gray-900 block mb-1 dark:text-gray-300 required-field-red-asterisk"
                  >
                    Mobile phone number
                  </label>
                </p>
                <input
                  type="text"
                  name="phone"
                  id="phone"
                  placeholder={phone}
                  // icon={FiLock}
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                  disabled={isLoading}
                  {...register("phone", {
                    required: "Mobile phone is required",
                  })}
                />
                <span className="text-red-500 text-xs font-bold">
                  {errors?.phone?.message}
                </span>
              </div>

              <div>
                <p>
                  <label
                    htmlFor="gotra"
                    className="text-sm font-medium text-gray-900 block mb-1 dark:text-gray-300 required-field-red-asterisk"
                  >
                    Family gotra
                  </label>
                </p>
                <input
                  type="text"
                  name="gotra"
                  id="gotra"
                  placeholder={gotra}
                  // icon={FiLock}
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                  disabled={isLoading}
                  {...register("gotra")}
                />
              </div>

              <div>
                <p>
                  <label
                    htmlFor="nakshatra"
                    className="text-sm font-medium text-gray-900 block mb-1 dark:text-gray-300 required-field-red-asterisk"
                  >
                    nakshatra
                  </label>
                </p>
                <input
                  type="text"
                  name="nakshatra"
                  id="nakshatra"
                  placeholder={nakshatra}
                  // icon={FiLock}
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                  disabled={isLoading}
                  {...register("nakshatra")}
                />
              </div>

              <div>
                <p className="required-field-red-asterisk">
                  <label
                    htmlFor="password"
                    className="text-sm font-medium text-gray-900 block mb-1 dark:text-gray-300 required-field-red-asterisk"
                  >
                    Password
                  </label>
                </p>
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="••••••••"
                  // icon={FiLock}
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                  disabled={isLoading}
                  {...register("password", {
                    required: "This field is required",
                    minLength: {
                      value: 8,
                      message: "Password needs a minimum of 8 characters",
                    },
                  })}
                />
                <span className="text-red-500 text-xs font-bold">
                  {errors?.password?.message}
                </span>
              </div>

              <div>
                <p className="required-field-red-asterisk">
                  <label
                    htmlFor="password"
                    className="text-sm font-medium text-gray-900 block mb-1 dark:text-gray-300 required-field-red-asterisk"
                  >
                    Confirm Password
                  </label>
                </p>
                <input
                  type="password"
                  name="confirmpassword"
                  id="confirmpassword"
                  placeholder="••••••••"
                  // icon={FiLock}
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                  disabled={isLoading}
                  {...register("confirmpassword", {
                    required: "Confirm password is required",
                    // validate: (value) =>
                    //   value === password.current ||
                    //   "The passwords do not match",
                    validate: (value) =>
                      getValues().password === value ||
                      "The passwords do NOT match",
                  })}
                />
                <span className="text-red-500 text-xs font-bold">
                  {errors?.confirmpassword?.message}
                </span>
              </div>
              {/* Button */}
              {loadingUpdateProfile ? (
                <SpinnerMini />
              ) : (
                <button
                  type="submit"
                  disabled={isLoading}
                  className="group relative w-full flex justify-center mt-4 py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-slate-700 hover:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-400"
                >
                  <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                    <LockClosedIcon
                      className="h-5 w-5 text-orange-400 group-hover:text-orange-400"
                      aria-hidden="true"
                    />
                  </span>
                  Update
                </button>
              )}
            </form>
          </div>

          {/* Right Column (1/3) */}
          <div
            ref={printRef}
            className="bg-white p-6 rounded-2xl shadow w-full md:w-2/3"
          >
            <h2 className="text-2xl font-bold">💰 All your donations</h2>
            <h2 className="ml-4 text-xl font-bold pt-5">
              {/* 🎑 User Profile & Donation details 🪷🎑🏁 */}
              Tax Year Donations {new Date().getFullYear()} - Generate PDF 👇
            </h2>
            <div className="flex justify-center">
              {/* <button
                onClick={downloadPDF}
                className="flex items-center bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition duration-300"
              >
                Download PDF
              </button> */}

              <button
                onClick={downloadPDF}
                className="group relative w-60 flex justify-center mt-4 mb-4 py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-slate-700 hover:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-400"
              >
                <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                  <LockClosedIcon
                    className="h-5 w-5 text-orange-400 group-hover:text-orange-400"
                    aria-hidden="true"
                  />
                </span>
                Download Tax (YR-{new Date().getFullYear() - 1})
              </button>
            </div>

            <div className="relative overflow-x-auto">
              <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 md:text-base font-bold"
                    >
                      Donation
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 md:text-base font-bold"
                    >
                      Date
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 md:text-base font-bold"
                    >
                      Payment Type
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 md:text-base font-bold"
                    >
                      Total
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order) => (
                    <tr
                      className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200"
                      key={order._id}
                    >
                      <td className="px-6 py-4">{order._id}</td>

                      {/* {order.orderItems.product.map((orderItem, index) => (
                        <td key={index} className="px-6 py-4">
                          {orderItem.name}
                        </td>
                      ))} */}

                      <td className="px-6 py-4">
                        {order.createdAt.substring(0, 10)}
                      </td>
                      <td className="px-6 py-4">{order.paymentMethod}</td>
                      <td className="px-6 py-4">${order.totalPrice}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default UserProfile;
