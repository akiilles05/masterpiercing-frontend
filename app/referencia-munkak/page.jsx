"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";

const Galeria = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_STRAPI_URL}/galeria?populate=*`
        );

        if (response.data && response.data.data) {
          setData(response.data.data);
        } else {
          console.error("Nincsenek adatok az API válaszban.");
        }
      } catch (error) {
        console.error("Hiba az adatok betöltésekor:", error);
      }
    };

    fetchData();
  }, []);

  if (!data) {
    return null;
  }

  const { title, images } = data;

  return (
    <div className="mx-auto px-6 py-12 max-w-7xl">
      <h1 className="text-4xl font-extrabold text-gray-900 text-center mb-8">
        {title || "Galéria"}
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {(images || []).map((image) => (
          <div
            key={image.id}
            className="overflow-hidden rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
          >
            <img
              src={`${process.env.NEXT_PUBLIC_URL}${image.url}`}
              alt={`Kép ${image.id}`}
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Galeria;
