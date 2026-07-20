export type Category = "Portraits" | "Street" | "Nature" | "Travel";

export interface Photo {
  slug: string;
  category: Category;
  alt: string;
  aspect: "portrait" | "landscape" | "square";
  featured?: boolean;
}

export const categories: Category[] = ["Portraits", "Street", "Nature", "Travel"];

export const photos: Photo[] = [
  { slug: "portrait-01", category: "Portraits", alt: "Studio portrait with soft window light", aspect: "portrait", featured: true },
  { slug: "portrait-02", category: "Portraits", alt: "Candid portrait, golden hour backlight", aspect: "portrait" },
  { slug: "portrait-03", category: "Portraits", alt: "Black and white close-up portrait", aspect: "square" },
  { slug: "portrait-04", category: "Portraits", alt: "Editorial portrait on location", aspect: "portrait" },
  { slug: "street-01", category: "Street", alt: "City street at dusk, neon reflections", aspect: "landscape", featured: true },
  { slug: "street-02", category: "Street", alt: "Commuters crossing a rain-slicked intersection", aspect: "square" },
  { slug: "street-03", category: "Street", alt: "Alleyway light and shadow study", aspect: "portrait" },
  { slug: "street-04", category: "Street", alt: "Market scene, candid moment", aspect: "landscape" },
  { slug: "nature-01", category: "Nature", alt: "Misty mountain ridge at sunrise", aspect: "landscape", featured: true },
  { slug: "nature-02", category: "Nature", alt: "Forest canopy, soft diffused light", aspect: "portrait" },
  { slug: "nature-03", category: "Nature", alt: "Coastal cliffs and breaking waves", aspect: "landscape" },
  { slug: "nature-04", category: "Nature", alt: "Macro detail of frost on leaves", aspect: "square" },
  { slug: "travel-01", category: "Travel", alt: "Narrow lanes of a hillside old town", aspect: "portrait", featured: true },
  { slug: "travel-02", category: "Travel", alt: "Harbor at blue hour", aspect: "landscape" },
  { slug: "travel-03", category: "Travel", alt: "Desert road stretching to the horizon", aspect: "landscape" },
  { slug: "travel-04", category: "Travel", alt: "Local market stall, vivid color", aspect: "square" },
];

export const featuredPhotos = photos.filter((p) => p.featured);
