"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import PhotoFetcher from "./PhotoFetcher";

const Footer = () => {
  // Dinamikus értékek (környezetből vagy állandó értékekből)
  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL || "https://masterpiercing.hu";

  const [adat, setAdat] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_STRAPI_URL}/footer?populate=*`
        );

        if (response.data && response.data.data) {
          setAdat(response.data.data[0]); // Feltételezzük, hogy csak egy elem van
          console.log(setAdat(response.data.data));
        } else {
          console.error("Nincsenek adatok az API válaszban.");
        }
      } catch (error) {
        console.error("Hiba az adatok betöltésekor:", error);
      }
    };

    fetchData();
  }, []);

  if (!adat) {
    return null;
  }

  const { facebook, instagram } = adat;

  return (
    <footer className="border-t border-slate-200 py-12">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between gap-3">
          {/* Logo */}
          <a href={siteUrl}>
            <PhotoFetcher
              nev="Masterpiercing Logo"
              className="h-10 w-auto mr-2"
            />
          </a>

          {/* Social Links */}
          <div className="flex items-center gap-2">
            <nav></nav>
            <div className="flex items-center gap-2">
              <a href={instagram} target="_blank" rel="noopener noreferrer">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  className="w-5 h-5 text-slate-600"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M7.75 3h8.5A4.25 4.25 0 0 1 20.5 7.25v8.5A4.25 4.25 0 0 1 16.25 20h-8.5A4.25 4.25 0 0 1 3.5 15.75v-8.5A4.25 4.25 0 0 1 7.75 3z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 7.75a4.25 4.25 0 1 0 0 8.5 4.25 4.25 0 0 0 0-8.5zM17.25 6.75h.01"
                  />
                </svg>
              </a>
              <a href={facebook} target="_blank" rel="noopener noreferrer">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  className="w-5 h-5 text-slate-600"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M17 2h-3a5 5 0 0 0-5 5v3H7a1 1 0 0 0-1 1v4a1 1 0 0 0 1 1h2v5a1 1 0 0 0 1 1h4a1 1 0 0 0 1-1v-5h2a1 1 0 0 0 1-1v-4a1 1 0 0 0-1-1h-2V7a1 1 0 0 1 1-1h2a1 1 0 0 0 1-1V3a1 1 0 0 0-1-1z"
                  />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
