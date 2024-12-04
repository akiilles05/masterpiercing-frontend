"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

const Elonyok = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_STRAPI_URL}/elonyok?populate=*`
        );
        setData(response.data.data);
      } catch (error) {
        console.error("Hiba az adatok betöltésekor:", error);
      }
    };

    fetchData();
  }, []);

  if (!data) {
    return null;
  }

  const { cim, leiras } = data;
  return (
    <div className="max-w-7xl mx-auto px-4 py-16">
      <div className="flex flex-col md:flex-row items-center">
        <h1 className="text-3xl lg:text-5xl font-extrabold text-gray-900 leading-tight md:w-1/2">
          {cim}
        </h1>
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          components={{
            p: ({ node, ...props }) => (
              <p className="mb-4 text-lg" {...props} />
            ),
            ul: ({ node, ...props }) => (
              <ul
                className="list-disc grid grid-cols-1 md:grid-cols-2 gap-y-2 pl-6"
                {...props}
              />
            ),
            ol: ({ node, ...props }) => (
              <ol className="list-decimal pl-5" {...props} />
            ),
            li: ({ node, ...props }) => <li className="mb-2" {...props} />,
          }}
          className="md:w-1/2 flex flex-col gap-4"
        >
          {leiras}
        </ReactMarkdown>
      </div>
    </div>
  );
};

export default Elonyok;
