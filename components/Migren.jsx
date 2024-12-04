"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

const Migren = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_STRAPI_URL}/migren?populate=*`
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

  const { cim, leiras, logo } = data;
  const imageUrl = `${process.env.NEXT_PUBLIC_URL}${logo.url}`;

  return (
    <div className="max-w-7xl mx-auto px-4 py-16">
      <h1 className="text-4xl lg:text-5xl font-extrabold mb-8 text-center">
        {cim}
      </h1>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          p: ({ node, ...props }) => <p className="mb-4 text-lg" {...props} />,
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
        className="flex flex-col gap-4"
      >
        {leiras}
      </ReactMarkdown>
      <img
        className="mx-auto py-12"
        src={imageUrl}
        alt={cim}
        width={400}
        height={20}
      />
    </div>
  );
};

export default Migren;
