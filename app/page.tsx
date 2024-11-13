import Header from "@/components/Nav";
import { BackgroundBeams } from "@/components/ui/background-beams";
import Image from "next/image";
import { TypewriterEffectDemo } from "@/components/TypeWriter";
import Main from "@/components/ui/Main";

export default function Home() {
  return (
    <div>
      <Header/>
      {<div className="relative w-full flex items-center justify-center h-[400px] bg-[#0d152a]">
        
        <BackgroundBeams/>
        <TypewriterEffectDemo/>

      </div>}

      <Main/>
    </div>
  );
}
