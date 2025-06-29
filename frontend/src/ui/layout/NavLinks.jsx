import { useState } from "react";
import { Link } from "react-router-dom";

import { menuLinks } from "./MenuLinks";

function NavLinks() {
  const [heading, setHeading] = useState("");
  const [subHeading, setSubHeading] = useState("");

  return (
    <>
      {menuLinks.map((link) => (
        <div key={link.id}>
          <div className="px-3 text-left md:cursor-pointer group">
            <h2
              key={link.id}
              className="py-7 flex justify-between items-center md:pr-0 pr-5 group"
              onClick={() => {
                heading !== link.name ? setHeading(link.name) : setHeading("");
                setSubHeading("");
              }}
            >
              {link.name}
              <span className="text-xl md:hidden inline">
                <ion-icon
                  name={`${
                    heading === link.name ? "chevron-up" : "chevron-down"
                  }`}
                ></ion-icon>
              </span>
              <span className="text-xl md:mt-1 md:ml-2  md:block hidden group-hover:rotate-180 group-hover:-mt-2">
                <ion-icon name="chevron-down"></ion-icon>
              </span>
            </h2>
            {link.submenu && (
              <div>
                <div className="absolute top-25 hidden group-hover:md:block hover:md:block z-10">
                  <div className="py-1">
                    <div className="w-8 h-8 left-3 absolute bg-slate-900 rotate-45"></div>
                  </div>
                  <div className="bg-slate-900 p-7 grid grid-cols-2 gap-5 rounded-md ">
                    {link.sublinks.map((mysublinks) => (
                      <div key={mysublinks.id}>
                        <h1 className="text-lg text-orange-400 font-semibold">
                          {mysublinks.Head}
                        </h1>
                        {mysublinks.sublink.map((slink) => (
                          <li
                            key={slink.id}
                            className="text-sm text-white my-2.5"
                          >
                            <Link
                              to={slink.link}
                              className="hover:text-white hover:bg-gradient-to-r from-pink-500 to-yellow-500 hover:py-2 px-1"
                            >
                              {slink.name}
                            </Link>
                          </li>
                        ))}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
          {/* BELOW IS FOR Mobile menus */}
          <div
            className={`
            ${heading === link.name ? "md:hidden" : "hidden"}
          `}
          >
            {/* sublinks */}
            {link.sublinks.map((slinks) => (
              <div key={slinks.id}>
                <div>
                  <h1
                    onClick={() =>
                      subHeading !== slinks.Head
                        ? setSubHeading(slinks.Head)
                        : setSubHeading("")
                    }
                    className="py-4 pl-7 font-semibold md:pr-0 pr-5 flex justify-between items-center "
                  >
                    {slinks.Head}

                    <span className="text-base md:mt-1 md:ml-2 inline">
                      <ion-icon
                        name={`${
                          subHeading === slinks.Head
                            ? "chevron-up"
                            : "chevron-down"
                        }`}
                      ></ion-icon>
                    </span>
                  </h1>
                  <div
                    className={`${
                      subHeading === slinks.Head ? "md:hidden" : "hidden"
                    }`}
                  >
                    {slinks.sublink.map((slink) => (
                      <li key={slink.id} className="py-3 pl-14">
                        <Link to={slink.link}>{slink.name}</Link>
                      </li>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </>
  );
}

export default NavLinks;
