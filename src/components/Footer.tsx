export default function Footer() {
  return (
    <footer className="border-t border-white/10 py-8 text-center">
      <p className="text-xs tracking-widest text-neutral-600">
        &copy; {new Date().getFullYear()} CHRISTIAAN BURGER
      </p>
    </footer>
  );
}
