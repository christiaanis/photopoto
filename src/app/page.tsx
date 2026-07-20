import Gallery from "@/components/Gallery";
import Hero from "@/components/Hero";
import { heroPhoto } from "@/lib/photos";

export default function Home() {
  return (
    <div>
      <Hero photo={heroPhoto} />
      <div className="mx-auto max-w-6xl px-6 py-20">
        <Gallery />
      </div>
    </div>
  );
}
