"use client";

import { useState, type FormEvent } from "react";

const CONTACT_EMAIL = "hello@chrispyphotos.com";

export default function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const subject = encodeURIComponent(`Inquiry from ${name || "website"}`);
    const body = encodeURIComponent(`${message}\n\n— ${name} (${email})`);
    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`;
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="name" className="mb-2 block text-xs uppercase tracking-widest text-neutral-500">
          Name
        </label>
        <input
          id="name"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full border-b border-neutral-700 bg-transparent py-2 text-white outline-none transition focus:border-white"
          placeholder="Your name"
        />
      </div>
      <div>
        <label htmlFor="email" className="mb-2 block text-xs uppercase tracking-widest text-neutral-500">
          Email
        </label>
        <input
          id="email"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border-b border-neutral-700 bg-transparent py-2 text-white outline-none transition focus:border-white"
          placeholder="you@example.com"
        />
      </div>
      <div>
        <label htmlFor="message" className="mb-2 block text-xs uppercase tracking-widest text-neutral-500">
          Tell me about your project
        </label>
        <textarea
          id="message"
          required
          rows={5}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="w-full resize-none border-b border-neutral-700 bg-transparent py-2 text-white outline-none transition focus:border-white"
          placeholder="Date, location, type of shoot..."
        />
      </div>
      <button
        type="submit"
        className="rounded-full bg-white px-7 py-3 text-sm uppercase tracking-widest text-black transition hover:bg-neutral-200"
      >
        Send Inquiry
      </button>
    </form>
  );
}
