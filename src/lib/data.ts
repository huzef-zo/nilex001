/**
 * Nilex Fashion House — central data file.
 * All product, collection, and editorial data lives here so the page
 * components stay clean and data-driven.
 */

export type Product = {
  id: string;
  name: string;
  category: "Shoes" | "Pants" | "Jackets" | "T-shirt" | "Shirts";
  price: number;
  compareAt?: number;
  colorway: string;
  image: string;
  hoverImage?: string;
  badge?: "New" | "Bestseller" | "Limited" | "Editor's Pick";
  description: string;
  fabric: string;
  sizes: string[];
};

// Uploaded Nilex photos (local)
const NILEX_KNIT_BEIGE = "/images/products/nilex-knit-cardigan-beige.jpg";
const NILEX_KNIT_GRAY = "/images/products/nilex-quarter-zip-gray.jpg";
export const NILEX_SNEAKER_OLIVE = "/images/products/nilex-sneaker-olive.jpg";
const NILEX_SNEAKER_SUEDE = "/images/products/nilex-sneaker-suede.jpg";
const NILEX_SNEAKER_BLACK = "/images/products/nilex-sneaker-black.jpg";

// Stock photo URLs (OSS-hosted by ZAI image search)
const STOCK = {
  streetWwd: "",
  boutiqueDries: "",
  boutiqueYelp: "",
  boutiqueAlamy: "",
  boutiqueCali: "",
  accAlamy: "",
  accPopov: "",
  accTimeResistance: "",
  accLATimes: "",
  portraitDeposit1: "",
  portraitUnsplash: "",
  outerwearForbes: "",
  outerwearIsigny: "",
  outerwearHypebeast: "",
  outerwearSwitchback: "",
};

export const STOCK_IMAGES = STOCK;

export const products: Product[] = [
  {
    id: "nx-foot-01",
    name: "Drift Low Trainer",
    category: "Shoes",
    price: 245,
    colorway: "Olive Sage",
    image: NILEX_SNEAKER_OLIVE,
    badge: "Editor's Pick",
    description:
      "A low-profile trainer with a sage mesh upper, sculpted overlays and a ridged ivory sole. Cushioned heel and padded tongue for all-day wear. Subtle Nilex wordmark on the lateral side.",
    fabric: "Mesh, Suede overlays, Rubber sole",
    sizes: ["40", "41", "42", "43", "44", "45"],
  },
  {
    id: "nx-foot-02",
    name: "Court Suede Sneaker",
    category: "Shoes",
    price: 220,
    colorway: "Bone Suede",
    image: NILEX_SNEAKER_SUEDE,
    description:
      "A minimalist court silhouette in bone suede with embossed Nilex polo mark and tonal laces. A clean white rubber cupsole with subtle tread detailing. Quietly luxurious.",
    fabric: "Suede upper, Rubber cupsole",
    sizes: ["40", "41", "42", "43", "44", "45"],
  },
  {
    id: "nx-foot-03",
    name: "Stripe Runner",
    category: "Shoes",
    price: 199,
    compareAt: 230,
    colorway: "Black / Ivory",
    image: NILEX_SNEAKER_BLACK,
    badge: "Bestseller",
    description:
      "A bold runner with three signature ivory diagonals, a chunky platform sole and a padded collar. Synthetic upper with perforated toe box. Built for the street.",
    fabric: "Synthetic leather upper, Rubber sole",
    sizes: ["40", "41", "42", "43", "44", "45"],
  },
];

export type Collection = {
  id: string;
  name: string;
  cover: string | null;
};

export const collections: Collection[] = [
  { id: "shoes", name: "Shoes", cover: NILEX_SNEAKER_OLIVE },
  { id: "pants", name: "Pants", cover: null },
  { id: "jackets", name: "Jackets", cover: null },
  { id: "t-shirt", name: "T-shirt", cover: null },
  { id: "shirts", name: "Shirts", cover: null },
];

export const testimonials = [
  {
    quote:
      "Nilex is the only house that consistently delivers footwear and outerwear that feel both modern and timeless. My Drift Low Trainers have held up for two winters and still get compliments.",
    author: "Marcus Aldridge",
    role: "Creative Director, London",
  },
  {
    quote:
      "The knitwear is on another level. The Atelier quarter-zip has been my everyday layer for two winters now and it just keeps getting better.",
    author: "Daniel Okafor",
    role: "Architect, Lagos",
  },
  {
    quote:
      "I came for the sneakers, stayed for the outerwear. The house has a clear point of view and the quality is uncompromising.",
    author: "Idris Said",
    role: "Photographer, Dubai",
  },
];

export const navItems = [
  { key: "home", label: "Home" },
  { key: "shop", label: "Browse" },
  { key: "collections", label: "Collections" },
  { key: "about", label: "About" },
  { key: "contact", label: "Contact" },
] as const;

export type PageKey = (typeof navItems)[number]["key"];

export const stats = [
  { value: 2026, suffix: "", label: "Est." },
  { value: 12, suffix: "", label: "Pieces This Season" },
  { value: 1, suffix: "", label: "Flagship Atelier" },
  { value: 100, suffix: "%", label: "Italian Fabrics" },
];

export const brandValues = [
  {
    title: "Considered Design",
    body:
      "Every piece begins on the page. We sketch, drape and refine until a silhouette earns its place in the house — not before.",
  },
  {
    title: "Honest Materials",
    body:
      "Italian wools, full-grain leathers, extra-fine merino. We name our fabrics because we believe you should know what you're wearing.",
  },
  {
    title: "Made to Last",
    body:
      "Half-canvas construction, hand-finished seams, replaceable soles. Our pieces are built to be worn for years, not seasons.",
  },
  {
    title: "Quietly Modern",
    body:
      "We design for the man who doesn't need to announce himself. Subtle details, considered proportions, a clear point of view.",
  },
];
