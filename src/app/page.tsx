import EditorialGallery from "@/components/EditorialGallery";
import Hero from "@/components/Hero";
import Outro from "@/components/Outro";
import { heroPhoto } from "@/lib/photos";

export default function Home() {
  return (
    <div>
      <Hero photo={heroPhoto} />
      <div className="py-20 sm:py-32">
        <EditorialGallery />
      </div>
      <Outro />
    </div>
  );
}
