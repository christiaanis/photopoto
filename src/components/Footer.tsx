export default function Footer() {
  return (
    <footer className="border-t border-neutral-200 py-8 text-center">
      <p className="text-xs tracking-widest text-neutral-400">
        &copy; {new Date().getFullYear()} CHRIS BURGER
      </p>
    </footer>
  );
}
