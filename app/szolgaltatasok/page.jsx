import Folyamat from "@/components/Folyamat";
import Gondoskodas from "@/components/Gondoskodas";
import Hero from "@/components/Hero";
import HigieniasElirasok from "@/components/Higenia";
import Piercingek from "@/components/Piercingek";
import React from "react";

const page = () => {
  return (
    <div>
      <Hero />
      <Piercingek />
      <Gondoskodas />
      <Folyamat />
      <HigieniasElirasok />
    </div>
  );
};

export default page;
