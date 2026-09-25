import Image from "next/image";

const footerMenu = [
  { label: "Tentang kami", href: "#tentang" },
  { label: "Program", href: "#program" },
  { label: "Kurikulum", href: "#kurikulum" },
  { label: "Kehidupan Santri", href: "#kehidupan" },
  { label: "Fasilitas", href: "#fasilitas" },
  { label: "Info pendaftaran", href: "#pendaftaran" },
];

// Replace these placeholder anchors with the official social-media URLs.
const socialLinks = [
  { label: "Instagram", icon: "instagram", href: "#footer" },
  { label: "YouTube", icon: "youtube", href: "#footer" },
  { label: "Facebook", icon: "facebook", href: "#footer" },
];

function SocialIcon({ name }: { name: string }) {
  if (name === "instagram") {
    return (
      <svg viewBox="0 0 24 24" className="size-[18px]" fill="none" aria-hidden>
        <rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" strokeWidth="1.8" />
        <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.8" />
        <circle cx="17.4" cy="6.7" r="1" fill="currentColor" />
      </svg>
    );
  }

  if (name === "youtube") {
    return (
      <svg viewBox="0 0 24 24" className="size-5" fill="none" aria-hidden>
        <path
          d="M21.15 7.15a2.72 2.72 0 0 0-1.91-1.93C17.55 4.75 12 4.75 12 4.75s-5.55 0-7.24.47a2.72 2.72 0 0 0-1.91 1.93A28.5 28.5 0 0 0 2.38 12c0 1.63.16 3.25.47 4.85a2.72 2.72 0 0 0 1.91 1.93c1.69.47 7.24.47 7.24.47s5.55 0 7.24-.47a2.72 2.72 0 0 0 1.91-1.93c.31-1.6.47-3.22.47-4.85 0-1.63-.16-3.25-.47-4.85Z"
          stroke="currentColor"
          strokeWidth="1.7"
        />
        <path d="m10 15.2 5-3.2-5-3.2v6.4Z" fill="currentColor" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" className="size-[18px]" fill="currentColor" aria-hidden>
      <path d="M13.75 21v-8h2.75l.41-3.2h-3.16V7.76c0-.93.26-1.56 1.59-1.56H17V3.34a22.3 22.3 0 0 0-2.42-.13c-2.4 0-4.04 1.46-4.04 4.15V9.8H7.83V13h2.71v8h3.21Z" />
    </svg>
  );
}

export function SiteFooter() {
  return (
    <footer id="footer" className="bg-[#1e150c] text-[#f1ece9]">
      <div className="mx-auto w-full max-w-[1200px] border-x-0 border-white/10 px-6 pb-8 pt-14 md:border-x md:px-10 md:pt-16 lg:px-[60px]">
        <div className="grid grid-cols-1 gap-12 pb-14 md:grid-cols-2 md:gap-x-16 lg:grid-cols-[2fr_1fr_1.25fr] lg:gap-20 lg:pb-16">
          <div className="max-w-[430px] md:col-span-2 lg:col-span-1">
            <a href="#tentang" className="inline-flex items-center gap-4" aria-label="Manazil Ibnu Abbas">
              <span className="flex h-14 w-[70px] items-center justify-center rounded-xl bg-[#f1ece9]">
                <Image
                  src="/figma/logo.png"
                  alt="Logo Manazil Ibnu Abbas"
                  width={56}
                  height={45}
                  className="h-[45px] w-14 object-contain"
                />
              </span>
              <span className="font-display text-lg font-semibold">Manazil Ibnu Abbas</span>
            </a>
            <p className="mt-6 text-sm leading-6 text-[#c9bfb5]">
              Ma’had Tahfizh Al-Qur’an setingkat SMP putra di Kota Batu yang memadukan
              Tahfizh Al-Qur’an, Bahasa Arab, ilmu syar’i, dan pendidikan formal dalam
              lingkungan yang mendukung tumbuhnya ilmu, adab, dan kemandirian.
            </p>
          </div>

          <nav aria-label="Navigasi footer">
            <h2 className="font-display text-base font-semibold text-white">Menu</h2>
            <ul className="mt-6 space-y-4 text-sm text-[#c9bfb5]">
              {footerMenu.map((item) => (
                <li key={item.label}>
                  <a className="transition-colors hover:text-white" href={item.href}>
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className="font-display text-base font-semibold text-white">Ikuti Kami</h2>
            <p className="mt-3 text-sm leading-6 text-[#c9bfb5]">
              Ikuti kabar kegiatan, program, dan keseharian santri melalui media sosial kami.
            </p>
            <div className="mt-6 flex flex-col gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  className="group flex w-fit items-center gap-3 text-sm text-[#c9bfb5] transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c9aa87] focus-visible:ring-offset-4 focus-visible:ring-offset-[#1e150c]"
                  aria-label={social.label}
                >
                  <span className="flex size-9 items-center justify-center rounded-full border border-white/20 bg-white/5 text-[#f1ece9] transition-colors group-hover:border-[#c9aa87] group-hover:bg-[#855f38]">
                    <SocialIcon name={social.icon} />
                  </span>
                  {social.label}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-3 border-t border-white/10 pt-8 text-xs text-[#9f9388] sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Manazil Ibnu Abbas. Seluruh hak cipta dilindungi.</p>
          <p>Kota Batu, Jawa Timur</p>
        </div>
      </div>
    </footer>
  );
}
