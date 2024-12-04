"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";

const Gondoskodas = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_STRAPI_URL}/gondoskodas?populate=*`
        );
        setData(response.data.data);
      } catch (error) {
        console.error("Hiba az adatok betöltésekor:", error);
      }
    };

    fetchData();
  }, []);

  if (!data) {
    return <p>Betöltés...</p>;
  }

  const {
    cim,
    description,
    jellemzo_1,
    jellemzo_2,
    jellemzo_desc,
    jellemzo_2_desc,
    image,
  } = data;
  const imageUrl = `${process.env.NEXT_PUBLIC_URL}${image.url}`;
  return (
    <div>
      <section className="flex md:flex-row flex-col mx-auto px-6 py-12 max-w-7xl items-center">
        <div className="flex flex-col md:w-1/2 gap-8">
          <h1 className="text-5xl font-extrabold text-gray-900 leading-tight">
            {cim}
          </h1>
          <p className="text-lg">{description}</p>
          <div className="flex flex-col xl:flex-row gap-3">
            <div>
              <h2 className="text-3xl font-extrabold text-gray-900 leading-tight">
                {jellemzo_1}
              </h2>
              <p className="text-lg">{jellemzo_desc}</p>
            </div>
            <div>
              <h2 className="text-3xl font-extrabold text-gray-900 leading-tight">
                {jellemzo_2}
              </h2>
              <p className="text-lg">{jellemzo_2_desc}</p>
            </div>
          </div>
        </div>
        <div className="image md:w-1/2 mt-8 md:mt-0 md:ml-12">
          <img
            src={imageUrl}
            alt={cim}
            className=" rounded-lg shadow-lg w-[450px] h-auto"
            width={450}
            height={500}
          />
        </div>
      </section>
    </div>
  );
};

export default Gondoskodas;
