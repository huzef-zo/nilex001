/**
 * Nilex Fashion House — central data file.
 * All product, collection, and editorial data lives here so the page
 * components stay clean and data-driven.
 */

export type Product = {
  id: string;
  name: string;
  category: "Knitwear" | "Footwear" | "Outerwear" | "Accessories";
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
  streetWwd: "https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/9f8439fcda9c.jpg",
  streetStyleRave: "https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/865bee2d1520.png",
  streetPinterest: "https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/437f1add67f5.jpg",
  streetMensFlair: "https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/434e47f6e486.jpg",
  boutiqueDries: "https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/aa0ec3a72999.jpg",
  boutiqueYelp: "https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/9f1700496bff.jpg",
  boutiqueAlamy: "https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/eb81c9568e8f.jpg",
  boutiqueCali: "https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/ea48ec008e4e.jpg",
  accAlamy: "https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/421277977f17.jpg",
  accPopov: "https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/d17b18940683.jpg",
  accTimeResistance: "https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/8c32cc2e45da.jpg",
  accLATimes: "https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/a3f0337ee542.jpg",
  portraitDeposit1: "https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/6f4d7cf64eb8.jpg",
  portraitDeposit2: "https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/0336fe60070d.jpg",
  portraitAlamy: "https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/e54216f6ec17.jpg",
  portraitUnsplash: "https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/5ffca29e8ccd.jpg",
  outerwearForbes: "https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/49f798b28167.jpg",
  outerwearIsigny: "https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/3c54954114e2.jpg",
  outerwearHypebeast: "https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/8d650c055fed.jpg",
  outerwearSwitchback: "https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/a6d84d81b167.jpeg",
};

export const STOCK_IMAGES = STOCK;

export const products: Product[] = [
  {
    id: "nx-knit-01",
    name: "Maison Knit Cardigan",
    category: "Knitwear",
    price: 189,
    compareAt: 240,
    colorway: "Sand Beige",
    image: NILEX_KNIT_BEIGE,
    badge: "New",
    description:
      "An open-knit cardigan in soft sand beige with a textured vertical weave. Collared polo placket with bone buttons and ribbed cuffs. Cut for a relaxed silhouette that layers cleanly over a tee or shirt.",
    fabric: "60% Cotton, 30% Viscose, 10% Linen",
    sizes: ["S", "M", "L", "XL"],
  },
  {
    id: "nx-knit-02",
    name: "Atelier Quarter-Zip",
    category: "Knitwear",
    price: 165,
    colorway: "Heather Grey",
    image: NILEX_KNIT_GRAY,
    badge: "Bestseller",
    description:
      "A heathered quarter-zip polo in marled grey with a fine metal zipper and ribbed trims. Embroidered Nilex mark at the chest. A wardrobe staple that bridges casual and tailored.",
    fabric: "100% Extra-fine Merino Wool",
    sizes: ["S", "M", "L", "XL", "XXL"],
  },
  {
    id: "nx-foot-01",
    name: "Drift Low Trainer",
    category: "Footwear",
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
    category: "Footwear",
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
    category: "Footwear",
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
  {
    id: "nx-outer-01",
    name: "Field Overcoat",
    category: "Outerwear",
    price: 745,
    colorway: "Stone",
    image: STOCK.outerwearForbes,
    hoverImage: STOCK.outerwearSwitchback,
    badge: "New",
    description:
      "A long-line overcoat in a stone melton with a clean button stance and angled pockets. Structured body with a relaxed shoulder. Built to layer over outerwear or knitwear.",
    fabric: "80% Wool, 20% Cashmere",
    sizes: ["S", "M", "L", "XL"],
  },
  {
    id: "nx-outer-02",
    name: "Technical Parka",
    category: "Outerwear",
    price: 580,
    colorway: "Slate",
    image: STOCK.outerwearHypebeast,
    hoverImage: STOCK.outerwearIsigny,
    description:
      "A weatherproof parka with taped seams, a hidden two-way zip and a generous hood. Insulated but lightweight. Engineered for the city winter.",
    fabric: "Recycled nylon shell, Primaloft fill",
    sizes: ["S", "M", "L", "XL"],
  },
  {
    id: "nx-acc-01",
    name: "Heritage Leather Wallet",
    category: "Accessories",
    price: 145,
    colorway: "Tan",
    image: STOCK.accPopov,
    badge: "Bestseller",
    description:
      "A full-grain tan leather wallet with hand-burnished edges and eight card slots. Slim profile that patinas beautifully with wear. Made in a small atelier.",
    fabric: "Full-grain vegetable-tanned leather",
    sizes: ["One Size"],
  },
  {
    id: "nx-acc-02",
    name: " Automatic Watch",
    category: "Accessories",
    price: 410,
    colorway: "Silver / Onyx",
    image: STOCK.accAlamy,
    badge: "Limited",
    description:
      "A 40mm automatic watch with a brushed steel case, onyx dial and sapphire crystal. Exhibition caseback. Quiet, considered, and built to last.",
    fabric: "316L Steel, Sapphire crystal",
    sizes: ["One Size"],
  },
  {
    id: "nx-acc-03",
    name: "Acetate Sunglasses",
    category: "Accessories",
    price: 195,
    colorway: "Tortoise",
    image: STOCK.accLATimes,
    description:
      "A classic keyhole-frame sunglass in tortoise acetate with green mineral lenses. UV400 protection and a hand-polished finish. A timeless silhouette.",
    fabric: "Italian acetate, Mineral lens",
    sizes: ["One Size"],
  },
];

export type Collection = {
  id: string;
  name: string;
  season: string;
  tagline: string;
  description: string;
  cover: string;
  alt?: string;
  productCount: number;
};

export const collections: Collection[] = [
  {
    id: "atelier-essentials",
    name: "Atelier Essentials",
    season: "AW26 — Volume I",
    tagline: "The foundation pieces, reimagined each season.",
    description:
      "A capsule of the wardrobe staples every man returns to — fine-gauge knitwear, clean tees, and the perfect pant. Quietly luxurious, endlessly wearable.",
    cover: NILEX_KNIT_BEIGE,
    alt: STOCK.boutiqueDries,
    productCount: 14,
  },
  {
    id: "sole-craft",
    name: "Sole Craft",
    season: "AW26 — Volume II",
    tagline: "Every step, considered.",
    description:
      "Nilex footwear is built with the same rigor our ateliers have always applied — sculpted lasts, full-grain leathers and suedes, and soles engineered to be resoled rather than replaced. Paired with lightweight technical outerwear designed to move as fast as the city does.",
    cover: NILEX_SNEAKER_SUEDE,
    alt: STOCK.outerwearForbes,
    productCount: 16,
  },
  {
    id: "street-luxe",
    name: "Street Luxe",
    season: "AW26 — Volume III",
    tagline: "Where the street meets the atelier.",
    description:
      "Premium sneakers, technical outerwear and elevated essentials with a streetwear sensibility. Engineered fabrics, sculpted silhouettes, considered details.",
    cover: NILEX_SNEAKER_BLACK,
    alt: STOCK.streetWwd,
    productCount: 18,
  },
  {
    id: "house-signatures",
    name: "House Signatures",
    season: "Permanent Collection",
    tagline: "The icons that define the house.",
    description:
      "The pieces that built Nilex — our most-loved silhouettes in the fabrics and colorways that have come to define the house. Re-stocked, never re-imagined.",
    cover: NILEX_KNIT_GRAY,
    alt: STOCK.boutiqueCali,
    productCount: 9,
  },
];

export const editorial = [
  { image: STOCK.portraitUnsplash, title: "The Quiet Confidence", caption: "AW26 Campaign — Look 04" },
  { image: STOCK.portraitDeposit2, title: "Built to Last, Made to Move", caption: "AW26 Campaign — Look 11" },
  { image: STOCK.streetMensFlair, title: "Layers, Light, Shadow", caption: "AW26 Campaign — Look 07" },
  { image: STOCK.outerwearForbes, title: "The Long Line", caption: "AW26 Campaign — Look 02" },
];

export const lookbook = [
  { image: STOCK.portraitUnsplash, label: "Look 01 — The Coat" },
  { image: STOCK.streetWwd, label: "Look 02 — The Knit" },
  { image: NILEX_SNEAKER_OLIVE, label: "Look 03 — The Footwear" },
  { image: STOCK.streetMensFlair, label: "Look 04 — The Street" },
  { image: STOCK.outerwearSwitchback, label: "Look 05 — The Field" },
  { image: STOCK.portraitDeposit2, label: "Look 06 — The Portrait" },
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
  { key: "about", label: "Atelier" },
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
