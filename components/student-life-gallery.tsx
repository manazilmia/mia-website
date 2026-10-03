import {
  StudentLifeCarousel,
  type StudentLifeSlide,
} from "@/components/student-life-carousel";
import { getStudentLifeGallery } from "@/sanity/lib/data";
import { urlFor } from "@/sanity/lib/image";
import { getYouTubeEmbedUrl } from "@/sanity/lib/youtube";

const fallbackSlides: StudentLifeSlide[] = [
  {
    id: "lingkungan",
    kind: "image",
    image: "/figma/caro-1.png",
    alt: "Lingkungan hijau tempat santri belajar dan bertumbuh",
    position: "center 46%",
  },
  {
    id: "kelas-terbuka",
    kind: "image",
    image: "/figma/caro-2.jpg",
    alt: "Santri belajar bersama di ruang kelas terbuka",
  },
  {
    id: "asrama",
    kind: "image",
    image: "/figma/caro-3.jpg",
    alt: "Bangunan asrama Manazil Ibnu Abbas",
  },
  {
    id: "kebersamaan",
    kind: "image",
    image: "/figma/caro-4.jpg",
    alt: "Suasana keseharian santri di lingkungan Manazil Ibnu Abbas",
    position: "center 48%",
  },
];

export async function StudentLifeGallery() {
  const gallery = await getStudentLifeGallery();
  const configuredSlides: StudentLifeSlide[] =
    gallery?.slides?.flatMap<StudentLifeSlide>((slide) => {
      if (slide.mediaType === "video" && slide.youtubeUrl) {
        const embedUrl = getYouTubeEmbedUrl(slide.youtubeUrl);
        return embedUrl
          ? [{
              id: slide._key,
              kind: "video",
              embedUrl,
              title: slide.videoTitle || "Video kehidupan santri",
            }]
          : [];
      }

      if (slide.mediaType === "image" && slide.image?.asset?._id) {
        return [
          {
            id: slide._key,
            kind: "image",
            image: urlFor(slide.image).width(1800).auto("format").url(),
            alt: slide.imageAlt || "Kehidupan santri di Manazil Ibnu Abbas",
          },
        ];
      }

      return [];
    }) ?? [];

  return <StudentLifeCarousel slides={configuredSlides.length ? configuredSlides : fallbackSlides} />;
}
