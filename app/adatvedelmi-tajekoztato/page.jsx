"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";

const AdatvedelmiNyilatkozat = () => {
  const [content, setContent] = useState(null);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_STRAPI_URL}/adatvedelmi-tajekoztato?populate=*`
        );
        setContent(response.data.data.content);
      } catch (error) {
        console.error("Error fetching Adatvédelmi Nyilatkozat content:", error);
      }
    };

    fetchContent();
  }, []);

  if (!content) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6 flex items-center justify-center">
      <div className="w-full max-w-4xl bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-3xl font-semibold mb-6 text-center">
          Adatvédelmi Nyilatkozat
        </h1>
        {content ? (
          <div
            className="prose"
            dangerouslySetInnerHTML={{ __html: content }}
          ></div>
        ) : (
          <p className="text-center">Töltés...</p>
        )}
      </div>
    </div>
  );
};

export default AdatvedelmiNyilatkozat;
