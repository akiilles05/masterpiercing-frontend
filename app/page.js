import Elonyok from "@/components/Elonyok";
import Gondoskodas from "@/components/Gondoskodas";
import Hero from "@/components/Hero";
import History from "@/components/History";
import Migren from "@/components/Migren";
import Image from "next/image";

export default function Home() {
  return (
    <div>
      <Hero />
      <History />
      <Elonyok />
      <Migren />
      <Gondoskodas />
    </div>
  );
}
