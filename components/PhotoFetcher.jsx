"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";

const PhotoFetcher = ({
  nev,
  className = "",
  alt = "",
  loading = "lazy",
  width,
  height,
  sizes,
}) => {
  const [photoUrl, setPhotoUrl] = useState(null);

  useEffect(() => {
    const fetchPhoto = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_STRAPI_URL}/fotos?populate=*`
        );
        const fotos = response.data.data;

        const filteredFoto = fotos.find((foto) => foto.nev === nev)?.photos[0];

        if (filteredFoto) {
          setPhotoUrl(`${process.env.NEXT_PUBLIC_URL}${filteredFoto.url}`);
        }
      } catch (error) {
        console.error("Hiba a fotó lekérése közben:", error);
      }
    };

    fetchPhoto();
  }, [nev]);

  if (!photoUrl) return null;

  return (
    <img
      src={photoUrl}
      alt={alt}
      className={className}
      loading={loading}
      width={width}
      height={height}
      sizes={sizes}
    />
  );
};

export default PhotoFetcher;
