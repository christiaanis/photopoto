import Gallery from "@/components/Gallery";
import Logo from "@/components/Logo";

export default function Home() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-16">
      <div className="mb-14 flex flex-col items-center gap-4 text-center">
        <Logo className="text-white [&_svg]:h-9 [&_svg]:w-9 [&_span]:text-3xl sm:[&_svg]:h-11 sm:[&_svg]:w-11 sm:[&_span]:text-4xl" />
        <p className="max-w-md text-neutral-400">
          Portrait, street, nature &amp; travel photography.
        </p>
      </div>
      <Gallery />
    </div>
  );
}
