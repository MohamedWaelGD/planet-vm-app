export default function Footer() {
  return (
    <footer className="border-t border-white/[0.04] bg-[#0b0b0b]">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 px-6 py-10 sm:flex-row lg:px-12">
        <div className="flex flex-col items-center gap-1 sm:items-start">
          <p className="text-[0.85rem] font-semibold tracking-tight text-white/70">
            Planet<span className="text-white/30">VM</span>
          </p>
          <p className="text-[0.7rem] font-light tracking-wide text-white/20">
            &copy; {new Date().getFullYear()} All rights reserved.
          </p>
        </div>

        <div className="flex gap-8">
          {["Twitter", "GitHub", "Discord"].map((link) => (
            <a
              key={link}
              href="#"
              className="text-[0.7rem] font-light tracking-wide text-white/25 transition-colors hover:text-white/60"
            >
              {link}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
