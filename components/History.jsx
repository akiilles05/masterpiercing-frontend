"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

const History = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_STRAPI_URL}/tortenet?populate=*`
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

  const { cim, leiras } = data;

  return (
    <div className="max-w-7xl mx-auto px-4 py-16">
      <h1 className="text-3xl lg:text-5xl font-extrabold text-gray-900 leading-tight mb-4">
        {cim}
      </h1>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          p: ({ node, ...props }) => <p className="mb-4 text-lg" {...props} />,
          ul: ({ node, ...props }) => (
            <ul className="list-disc pl-5" {...props} />
          ),
          ol: ({ node, ...props }) => (
            <ol className="list-decimal pl-5" {...props} />
          ),
          li: ({ node, ...props }) => <li className="mb-2" {...props} />,
        }}
      >
        {leiras}
      </ReactMarkdown>
    </div>
  );
};

export default History;
