import PhotoFrame from "@/components/PhotoFrame";
import { photos } from "@/lib/photos";

export const metadata = {
  title: "About | Chrispy Photos",
  description: "Learn more about Chris and the story behind Chrispy Photos.",
};

const portrait = photos.find((p) => p.aspect === "portrait") ?? photos[0];

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-20">
      <div className="grid gap-12 md:grid-cols-2 md:items-center md:gap-16">
        <div className="mx-auto w-full max-w-sm md:mx-0">
          <PhotoFrame photo={portrait} />
        </div>
        <div>
          <p className="mb-3 text-xs uppercase tracking-[0.35em] text-neutral-500">
            About
          </p>
          <h1 className="font-serif text-4xl text-white sm:text-5xl">
            Hi, I&apos;m Chris.
          </h1>
          <div className="mt-6 space-y-5 text-neutral-400">
            <p>
              I&apos;m a photographer focused on portraits, street life, nature,
              and travel &mdash; chasing natural light and honest moments over
              staged perfection. My work blends candid documentary instincts
              with an editorial eye for composition and color.
            </p>
            <p>
              Every shoot starts with listening: what you want the photos to
              feel like, where they&apos;ll live, and what story they need to
              tell. From there I plan locations, light, and pacing so the
              session feels natural rather than rehearsed.
            </p>
            <p>
              When I&apos;m not shooting for clients, you&apos;ll find me exploring
              new cities and trails with a camera close at hand &mdash; that
              body of personal work is what shapes the style clients hire me
              for.
            </p>
          </div>

          <div className="mt-10 grid grid-cols-2 gap-6 border-t border-white/10 pt-8 sm:grid-cols-4">
            {[
              ["8+", "Years shooting"],
              ["150+", "Sessions"],
              ["4", "Specialties"],
              ["1", "Camera bag, always ready"],
            ].map(([stat, label]) => (
              <div key={label}>
                <p className="font-serif text-2xl text-white">{stat}</p>
                <p className="mt-1 text-xs uppercase tracking-wide text-neutral-500">
                  {label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
