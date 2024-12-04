"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";

const HigieniasElirasok = () => {
  const [adat, setAdat] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_STRAPI_URL}/higenias?populate=*`
        );

        if (response.data && response.data.data) {
          setAdat(response.data.data[0]); // Feltételezzük, hogy csak egy elem van
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

  const { cim, desc_1, desc_2, okok_cim, cim_special, okok, esetek } = adat;

  return (
    <div className="mx-auto px-6 py-12 max-w-7xl text-center">
      <div className="pt-8 text-left">
        <div className="mt-12">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">{cim}</h2>
          <p className="text-lg text-gray-700 mb-4">{desc_1}</p>
          <p className="text-lg text-gray-700">{desc_2}</p>
        </div>

        <div className="mt-12">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            {okok_cim}
          </h2>
          <ul className="list-disc list-inside text-lg text-gray-700 space-y-2">
            {okok.map((item) => (
              <li key={item.id}>{item.okok_tipus}</li>
            ))}
          </ul>
        </div>

        <div className="mt-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">
            {cim_special}
          </h2>
          <ul className="list-disc list-inside text-lg text-gray-700 space-y-2">
            {esetek.map((item) => (
              <li key={item.id}>
                <strong>{item.esetek_cim}</strong>: {item.esetek_tipus}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default HigieniasElirasok;
