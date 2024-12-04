import Elonyok from "@/components/Elonyok";
import Folyamat from "@/components/Folyamat";
import Gondoskodas from "@/components/Gondoskodas";
import Hero from "@/components/Hero";
import Higenia from "@/components/Higenia";
import History from "@/components/History";
import Migren from "@/components/Migren";
import BeavatkozasUtan from "@/components/Utan";
import Image from "next/image";

export default function Home() {
  return (
    <div>
      <Hero />
      <History />
      <Elonyok />
      <Migren />
      <Gondoskodas />
      <Folyamat />
      <Higenia />
      <BeavatkozasUtan />
    </div>
  );
}
