"use client";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { motion } from "framer-motion";
import PhotoFetcher from "./PhotoFetcher";

const Navbar = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);

  const toggleMobileDrawer = () => setMobileDrawerOpen(!mobileDrawerOpen);

  useEffect(() => {
    const fetchNavItems = async () => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_STRAPI_URL}/navigacios-menus?sort=order:asc`
      );
      const data = await res.json();
      setMenuItems(
        data.data.map((item) => ({
          Label: item.name,
          URL: item.slug,
          Sorszam: item.order,
        }))
      );
    };
    fetchNavItems();
  }, []);

  return (
    <nav className="sticky top-0 z-50 pt-6 pb-5 backdrop-blur-lg border-b border-slate-200 bg-nav_bg ">
      <div className="max-w-7xl px-4 mx-auto relative text-sm">
        <div className="flex justify-between items-center">
          <div className="flex items-center flex-shrink-0">
            <PhotoFetcher
              nev="Masterpiercing Logo"
              className="h-10 w-auto mr-2"
            />
          </div>
          <ul className="hidden lg:flex ml-14 space-x-12 list-none pt-3">
            {menuItems
              .sort((a, b) => a.Sorszam - b.Sorszam)
              .map((item) => (
                <li key={item.Sorszam}>
                  <a
                    href={item.URL}
                    className="block py-2 px-3 text-black rounded-md font-bold transition duration-300 group hover:opacity-100 hover:text-[#D0B05B] uppercase "
                  >
                    {item.Label}
                  </a>
                </li>
              ))}
          </ul>
          <div className="hidden lg:flex justify-center space-x-12 items-center">
            <a
              href="/kapcsolat"
              className="bg-gradient-to-r from-primary to-secondary py-2 px-3 rounded-md font-bold border-2 border-primary transition duration-300 group hover:shadow-lg"
            >
              Kapcsolatfelvétel
            </a>
          </div>
          <div className="lg:hidden md:flex flex-col justify-end">
            <button onClick={toggleMobileDrawer}>
              {mobileDrawerOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>

        {mobileDrawerOpen && (
          <motion.div
            id="navbar-default"
            initial={{ opacity: 0, height: 0 }}
            animate={{
              opacity: mobileDrawerOpen ? 1 : 0,
              height: mobileDrawerOpen ? "auto" : 0,
            }}
            transition={{ duration: 0.3 }}
            className={`${
              mobileDrawerOpen ? "fixed" : "hidden"
            }  right-0 z-20 backdrop-blur-lg border-b bg-background  w-full p-12 flex flex-col justify-center items-center lg:hidden`}
          >
            <ul className="text-center">
              {menuItems
                .sort((a, b) => a.Sorszam - b.Sorszam)
                .map((item) => (
                  <li key={item.Sorszam} className="py-4">
                    <a
                      href={item.URL}
                      className="block text-lg font-semibold text-neutral-800 py-2 px-4 rounded-md transition duration-300 ease-in-out hover:bg-primary hover:text-white"
                    >
                      {item.Label}
                    </a>
                  </li>
                ))}
            </ul>
            <div className="flex space-x-6">
              <a
                href="/kapcsolat"
                className="bg-gradient-to-r from-primary to-secondary py-2 px-3 rounded-md"
              >
                Kapcsolatfelvétel
              </a>
            </div>
          </motion.div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
