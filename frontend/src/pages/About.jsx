import lordParvathi from "/images/pooja/Parvathi.jpg";
import lordSrikrishna from "/images/pooja/Srikrishna.jpg";

function About() {
  return (
    <>
      {/* This class gives the ability not occupy the full screen */}
      <div className="max-w-screen-2xl mx-auto px-3 sm:px-10 mt-2">
        <div className="bg-gradient-to-tl from-teal-100 via-gray-100 to-zinc-400 py-2 px-4 ">
          <div>
            <h2 className="py-2 text-2xl font-bold mt-4 text-center">
              🙏 SRI SHIRDI SAIBABA SANSTHAN OF TRISTATE 🙏
            </h2>
            <p
              className="py-2 text-xl mt-4 first-line:tracking-widest
    					first-letter:text-4xl first-letter:font-bold first-letter:text-slate-900
    						first-letter:mr-3 first-letter:float-left"
            >
              Thank you for visiting us today and joining the Sri Saidham
              community. If you have questions send us an email and we will get
              in touch with you as soon as we can.
            </p>
          </div>
        </div>

        <div className="mt-4 relative mx-auto w-full max-w-7xl bg-white text-gray-700">
          <div className="grid grid-cols-1 md:grid-cols-2">
            {/* :CONTACT FORM CONTAINER */}
            <div className="mt-4 col-span-full md:col-span-1 py-5 md:py-10 px-6 text-gray-900">
              <h1 className="px-6 text-gray-900 text-xl font-bold pb-5 text-center">
                HELP GROW OUR COMMUNITY 🫂{" "}
              </h1>
              <h2 className="text-base pb-5">
                Sri Shirdi Saibaba Sansthan of Tristate is a non-profit
                organization aimed at serving Sri Shirdi Saibaba with Shraddha (
                Faith) and Saboori (Devotion) as two pillars of excellence as
                designated by our Sadguru Sri Saibaba.
              </h2>
              <h2 className="text-base">
                Along with daily Arthi and Pooja service, community service as
                well as youth development service are other important activities
                carried out by the organization both in the temple premises as
                well as in the community.
              </h2>
            </div>

            {/* :CONTACT INFOS CONTAINER */}
            <div className="md:col-span-1 py-5 md:py-10 px-6">
              <div className="mx-auto max-w-xl flex flex-col space-y-5 justify-center items-center">
                <img
                  style={{ width: 300, height: 350 }}
                  // width={650}
                  // height={200}
                  src={lordParvathi}
                  alt="Parvathi"
                  // className="h-400 w-950 object-contain md:object-scale-down"
                  className="object-cover rounded-lg text-center"
                />
              </div>
            </div>
          </div>
        </div>
        {/*  */}
        <div className="mt-4 relative mx-auto w-full max-w-7xl bg-white text-gray-700">
          <div className="grid grid-cols-1 md:grid-cols-2">
            <div className="col-span-full md:col-span-1 py-5 md:py-10 px-6">
              <div className="mx-auto max-w-xl flex flex-col space-y-5 justify-center items-center">
                <img
                  style={{ width: 300, height: 350 }}
                  // width={650}
                  // height={200}
                  src={lordSrikrishna}
                  alt="Parvathi"
                  // className="h-400 w-950 object-contain md:object-scale-down"
                  className="object-cover rounded-lg"
                />
              </div>
            </div>

            <div className="mt-4 col-span-full md:col-span-1 py-5 md:py-10 px-6 text-gray-900">
              <h1 className="px-6 text-gray-900 text-xl font-bold pb-5 text-center">
                FIND US AT THE BELOW ADDRESS
              </h1>
              <h2 className="text-base pb-5">
                <span className="font-bold">Address:</span>6299 Oak Grove Rd,
                Newburgh, Indiana 47630
              </h2>
              <h2 className="text-base">
                <span className="font-bold">Telephone: </span> (812) 490 0021
                <p>
                  <span className="font-bold">Email:</span>{" "}
                  shirdisaisansthanoftristates@gmail.com{" "}
                </p>{" "}
                <span className="font-bold">Directions: </span> I-64 Exit 29-A;
                I-164 to Lloyd Express way Exit-7B East, After appx 3 miles,
                Turn left on SR 261, Right on Oak Grove Road, Temple will be on
                your right hand side in a half mile.
              </h2>
            </div>
          </div>
        </div>

        {/*  */}
      </div>
    </>
  );
}

export default About;
