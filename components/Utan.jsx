"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";

const BeavatkozasUtan = () => {
  const [adat, setAdat] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_STRAPI_URL}/beavatkoz-utan?populate=*`
        );

        if (response.data && response.data.data) {
          setAdat(response.data.data);
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

  const { cim, beavatkozas_utan, fizetesi_modok } = adat;

  return (
    <section className="flex flex-col mx-auto px-6 py-12 max-w-7xl">
      {/* Title Section */}
      <h1 className="text-5xl font-extrabold text-gray-900 leading-tight mb-8 text-center">
        {cim}
      </h1>

      {/* Beavatkozás Után Sections */}
      {beavatkozas_utan.map((item) => (
        <div key={item.id} className="p-6 bg-gray-50 rounded-lg shadow-md mb-8">
          <h2 className="text-3xl font-bold text-black mb-4">{item.cim}</h2>
          <p className="text-lg text-gray-700">{item.leiras}</p>
        </div>
      ))}

      {/* Payment Methods Section */}
      {fizetesi_modok.map((mod) => (
        <div key={mod.id} className="p-6 bg-gray-50 rounded-lg shadow-md mb-8">
          <h2 className="text-3xl font-bold text-black mb-4">
            {mod.cim || "Lehetséges Fizetési Módok:"}
          </h2>
          <ul className="list-disc list-inside text-lg text-gray-700 space-y-2">
            <li>{mod.tipus}</li>
            {mod.tipus_1 && <li>{mod.tipus_1}</li>}
          </ul>
        </div>
      ))}
    </section>
  );
};

export default BeavatkozasUtan;
