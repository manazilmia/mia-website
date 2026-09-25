import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const registrationSteps = [
  {
    label: "Periode Pendaftaran",
    value: "20 September–20 Desember 2026",
    description: "Pendaftaran dilakukan secara online atau offline.",
  },
  {
    label: "Tes & Wawancara",
    value: "27 Desember 2026",
    description: "Seleksi calon santri dan wawancara bersama wali santri.",
  },
  {
    label: "Kuota Santri",
    value: "15 Santri",
    description: "Penerimaan santri baru dengan kuota terbatas.",
  },
];

const registrationContacts = [
  {
    name: "Ust. Zaid",
    phone: "0812 1764 4902",
    phoneHref: "tel:+6281217644902",
    whatsappHref: "https://wa.me/6281217644902",
  },
  {
    name: "Ust. Zaki",
    phone: "0853 5082 1751",
    phoneHref: "tel:+6285350821751",
    whatsappHref: "https://wa.me/6285350821751",
  },
];

export function RegistrationCta() {
  return (
    <section id="pendaftaran" className="bg-[#f1ece9]">
      <div className="mx-auto grid w-full max-w-[1200px] grid-cols-1 items-center gap-12 border-x-0 border-[#dbd7d3] px-6 py-16 md:border-x md:px-10 md:py-20 lg:min-h-[680px] lg:grid-cols-[0.9fr_1.1fr] lg:gap-[72px] lg:px-[60px]">
        <div>
          <p className="text-sm font-medium uppercase leading-[22px] tracking-[0.7px] text-[#048f51]">
            Pendaftaran Santri Baru MIA
          </p>
          <h2 className="font-display mt-2 text-[32px] font-semibold leading-[1.3] text-[#1e150c] sm:text-[36px] lg:text-[40px] lg:leading-[1.38]">
            Siapkan Langkah Pendidikan Putra Anda Bersama Al-Qur’an
          </h2>
          <p className="mt-5 max-w-[470px] text-sm leading-[22px] text-[#4C4238]">
            Pendaftaran calon santri baru Ma’had Manazil Ibnu Abbas Tahun Ajaran
            2027–2028 dibuka secara online maupun offline dengan kuota terbatas.
          </p>
          <div className="mt-8 flex flex-wrap gap-3 sm:gap-4">
            <Button
              href={registrationContacts[0].whatsappHref}
              target="_blank"
              rel="noreferrer"
            >
              Daftar via WhatsApp
            </Button>
            <Button href={registrationContacts[1].phoneHref} variant="outline">
              Hubungi Panitia
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
          {registrationSteps.map((step, index) => (
            <Card
              key={step.label}
              className={`min-h-[166px] bg-white/75 p-6 ${index === 2 ? "md:col-span-2" : ""}`}
            >
              <p className="text-xs font-semibold uppercase tracking-[0.6px] text-[#855f38]">
                {step.label}
              </p>
              <h3 className="font-display mt-3 text-xl font-semibold leading-7 text-[#1e150c]">
                {step.value}
              </h3>
              <p className="mt-2 text-[13px] leading-5 text-[#4C4238]">{step.description}</p>
            </Card>
          ))}

          {/* <Card className="col-span-2 bg-[#855f38] p-6 text-[#f1ece9]">
            <p className="text-xs font-semibold uppercase tracking-[0.6px] text-[#e4dbd3]">
              Informasi Pendaftaran
            </p>
            <div className="mt-4 grid grid-cols-2 gap-6">
              {registrationContacts.map((contact) => (
                <div key={contact.name}>
                  <p className="font-display text-base font-semibold text-white">{contact.name}</p>
                  <a
                    href={contact.phoneHref}
                    className="mt-1 inline-block text-sm text-[#f1ece9] transition-colors hover:text-white"
                  >
                    {contact.phone}
                  </a>
                  <a
                    href={contact.whatsappHref}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-3 block w-fit text-xs font-medium text-[#e4dbd3] underline decoration-[#e4dbd3]/50 underline-offset-4 transition-colors hover:text-white"
                  >
                    Konsultasi via WhatsApp
                  </a>
                </div>
              ))}
            </div>
          </Card> */}
        </div>
      </div>
    </section>
  );
}
