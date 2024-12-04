"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import PhotoFetcher from "./PhotoFetcher";

const Piercingek = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_STRAPI_URL}/piercingek?populate=*`
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
    return <p>Betöltés...</p>;
  }

  const { title, image, description, lista, piercing_types } = data;

  return (
    <div className="safety sm:flex-col lg:flex-row justify-center items-center mx-auto px-6 py-12 max-w-7xl text-lg">
      <div className="flex flex-col md:flex-row items-center gap-14">
        {/* Poster Image */}
        <div>
          <img
            src={`${process.env.NEXT_PUBLIC_URL}${image.url}`}
            alt="Poster"
            className="mx-auto py-12 w-[24rem] max-w-[24rem]"
          />
        </div>

        {/* Content */}
        <div>
          <h1 className="text-5xl font-extrabold text-gray-900 leading-tight">
            {title}
          </h1>
          <div>
            <p className="text-row">{description}</p>
            <ul className="list-disc pl-4">
              {(lista || []).map((item) => (
                <li key={item.id}>{item.allapot}</li>
              ))}
            </ul>
          </div>

          {/* Piercing Types */}
          {piercing_types.map((type, index) => (
            <div key={index}>
              <h2 className="text-3xl font-extrabold text-gray-900 leading-tight mt-8">
                {type.name}
              </h2>
              <p className="text-lg">{type.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Logo */}
      <PhotoFetcher nev="Masterpiercing Logo" className="mx-auto py-12" />
    </div>
  );
};

export default Piercingek;
