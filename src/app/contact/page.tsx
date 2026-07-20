import ContactForm from "@/components/ContactForm";

export const metadata = {
  title: "Contact | Chrispy Photos",
  description: "Get in touch to book a photography session.",
};

const INSTAGRAM_URL = "https://www.instagram.com/chrispyphotos___/";

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-4xl px-6 py-20">
      <div className="mb-14 text-center">
        <p className="mb-3 text-xs uppercase tracking-[0.35em] text-neutral-500">
          Contact
        </p>
        <h1 className="font-serif text-4xl text-white sm:text-5xl">
          Let&apos;s Create Something
        </h1>
        <p className="mx-auto mt-4 max-w-md text-neutral-400">
          Fill out the form below or reach out directly on Instagram &mdash;
          I usually reply within a day or two.
        </p>
      </div>

      <div className="grid gap-14 md:grid-cols-[1.3fr_1fr]">
        <ContactForm />

        <div className="space-y-8 border-t border-white/10 pt-8 md:border-l md:border-t-0 md:pl-14 md:pt-0">
          <div>
            <p className="text-xs uppercase tracking-widest text-neutral-500">
              Instagram
            </p>
            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 block text-lg text-white transition hover:text-neutral-300"
            >
              @chrispyphotos___
            </a>
          </div>
          <div>
            <p className="text-xs uppercase tracking-widest text-neutral-500">
              Email
            </p>
            <a
              href="mailto:hello@chrispyphotos.com"
              className="mt-2 block text-lg text-white transition hover:text-neutral-300"
            >
              hello@chrispyphotos.com
            </a>
          </div>
          <div>
            <p className="text-xs uppercase tracking-widest text-neutral-500">
              Based In
            </p>
            <p className="mt-2 text-lg text-white">
              Available for travel worldwide
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
