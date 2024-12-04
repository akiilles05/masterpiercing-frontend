"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";

const Folyamat = () => {
  const [folyamatok, setFolyamatok] = useState(null);
  const [fotoUrl, setFotoUrl] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_STRAPI_URL}/behelyezes?populate=*`
        );

        if (response.data && response.data.data) {
          const folyamat = response.data.data.folyamat || [];
          setFolyamatok(folyamat);

          const fotoData = response.data.data.foto.url;
          const fotoURL = `${process.env.NEXT_PUBLIC_URL}${fotoData}`;
          setFotoUrl(fotoURL);
        } else {
          console.error(
            "Nem található folyamat vagy foto mező az API válaszban."
          );
        }
      } catch (error) {
        console.error("Hiba az adatok betöltésekor:", error);
      }
    };

    fetchData();
  }, []);

  if (!folyamatok || !fotoUrl) {
    return null;
  }

  return (
    <div className="mx-auto px-6 py-12 max-w-7xl text-center">
      <h1 className="text-5xl font-extrabold text-gray-900 leading-tight mb-8">
        Piercing Behelyezés Folyamata
      </h1>
      <div className="flex flex-col md:flex-row items-center gap-8 text-left">
        <div className="image md:w-1/2 mt-8 md:mt-0 md:ml-12">
          <img
            src={fotoUrl}
            alt="Eszközök"
            width="450"
            height="500"
            className="rounded-lg shadow-lg w-[450px] h-auto"
          />
        </div>

        <div className="pt-8 md:w-1/2">
          <div className="space-y-6">
            {folyamatok.map((item, index) => (
              <div
                key={item.id}
                className="p-6 bg-gray-50 rounded-lg shadow-sm"
              >
                <h2 className="text-3xl font-bold text-black mb-2">
                  {index + 1}. {item.nev}
                </h2>
                <p className="text-lg text-gray-700">{item.leiras}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Folyamat;
