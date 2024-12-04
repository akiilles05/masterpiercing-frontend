"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

const Hero = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_STRAPI_URL}/hero?populate=*`
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

  const { welcome, welcome_description, hero_image } = data;
  const imageUrl = `${process.env.NEXT_PUBLIC_URL}${hero_image.url}`;

  return (
    <div className="max-w-7xl mx-auto px-4 py-16">
      <div className="flex flex-row items-center justify-between">
        {/* text */}
        <div className="text md:w-1/2 space-y-6 text-center md:text-left">
          <h1 className="text-5xl font-extrabold text-gray-900 leading-tight min-h-[6rem]">
            {welcome}
          </h1>
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={{
              p: ({ node, ...props }) => (
                <p className="mb-4 text-lg" {...props} />
              ),
              ul: ({ node, ...props }) => (
                <ul className="list-disc pl-5" {...props} />
              ),
              ol: ({ node, ...props }) => (
                <ol className="list-decimal pl-5" {...props} />
              ),
              li: ({ node, ...props }) => <li className="mb-2" {...props} />,
            }}
          >
            {welcome_description}
          </ReactMarkdown>
        </div>
        {/* image */}
        <div className="image md:w-1/2 mt-8 md:mt-0 md:ml-12">
          <img
            src={imageUrl}
            alt="Expert Care"
            className="rounded-lg shadow-lg w-full h-auto"
            loading="lazy"
            width="200"
            height="100"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 1920px"
          />
        </div>
      </div>
    </div>
  );
};

export default Hero;
