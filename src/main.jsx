import React, { useEffect, useMemo, useState } from "react";
import { createRoot } from "react-dom/client";
import { motion } from "framer-motion";
import "./styles.css";

const navItems = [
  { label: "Work", path: "/work" },
  { label: "Services", path: "/services" },
  { label: "About", path: "/about" },
  { label: "News", path: "/news" },
  { label: "Contact", path: "/contact" },
];

const easeOut = [0.16, 1, 0.3, 1];
const viewportOnce = { once: true, amount: 0.08 };
const localVideoBase = "/videos";

const services = [
  {
    name: "Brand Identity",
    description: "Logo, colour, typography and visual systems for brands that need to look considered from day one.",
    engagement: "One-off + Retainer",
  },
  {
    name: "Brand Direction",
    description: "Naming, positioning, brand story and visual direction for new launches or brand resets.",
    engagement: "Strategy project",
  },
  {
    name: "Packaging & Product Visuals",
    description: "Packaging, labels, product cards, e-commerce shots and launch visuals for consumer products.",
    engagement: "One-off / New launch",
  },
  {
    name: "Campaign & Communication",
    description: "Social media graphics, ad creatives, event posters, website banners and seasonal visual systems.",
    engagement: "One-off / Monthly",
  },
  {
    name: "Ongoing Visual Support",
    description: "Monthly visual support across social, e-commerce, product drops and packaging extensions.",
    engagement: "Retainer",
  },
];

const disciplines = ["All", "Brand Identity", "Brand Direction", "Packaging & Product", "Campaign Design", "Ongoing Support"];
const sectors = ["All", "Beauty", "Food & Drink", "Lifestyle", "Interiors", "Retail", "Wellness"];

const projects = [
  {
    slug: "yoso",
    title: "YŌSO 養素",
    discipline: "Packaging & Product",
    sector: "Beauty",
    year: "2024",
    client: "YŌSO Skincare",
    ratio: "wide",
    visual: "art-yoso",
    intro:
      "Brand identity and packaging for a modern Chinese botanical skincare brand built around quiet ritual, precise formulation and a restrained product system.",
    quote: "Precision and patience became the central tension of the identity.",
  },
  {
    slug: "folk-solstice",
    title: "FOLK × SOLSTICE",
    discipline: "Packaging & Product",
    sector: "Food & Drink",
    year: "2025",
    client: "FOLK",
    ratio: "wide",
    visual: "art-folk-solstice",
    intro:
      "A complete launch visual suite for a limited-edition botanical sparkling water collection, spanning e-commerce, packaging, campaign and social assets.",
    quote: "Every image had a platform, a crop and a job to do.",
  },
  {
    slug: "fern-coal",
    title: "Fern & Coal",
    discipline: "Packaging & Product",
    sector: "Lifestyle",
    year: "2025",
    client: "Fern & Coal",
    ratio: "wide",
    visual: "art-fern-coal",
    intro:
      "Packaging, product and launch visuals for an East London candle brand built around dark luxury, botanical materiality and controlled flame.",
    quote: "Every image should feel like the moment just before you light it.",
  },
  {
    slug: "atlan",
    title: "ATLAN",
    discipline: "Brand Identity",
    sector: "Interiors",
    year: "2024",
    client: "ATLAN",
    ratio: "wide",
    visual: "art-atlan",
    intro:
      "Brand identity, product imagery and editorial photography for a Copenhagen lighting studio built around the geometry of light and absence.",
    quote: "The shade is a hypothesis. The shadow is the proof.",
  },
  {
    slug: "muru",
    title: "MURU",
    discipline: "Brand Identity",
    sector: "Lifestyle",
    year: "2024",
    client: "MURU",
    ratio: "wide",
    visual: "art-muru",
    intro:
      "Brand identity, product imagery and editorial photography for a Helsinki ceramics studio built around tactility, surface and hand-thrown imperfection.",
    quote: "Objects made by hand accumulate the intention of the maker.",
  },
  {
    slug: "brume",
    title: "BRUME",
    discipline: "Brand Identity",
    sector: "Beauty",
    year: "2024",
    client: "BRUME",
    ratio: "wide",
    visual: "art-brume",
    intro:
      "Brand identity, packaging imagery and editorial photography for a Grasse perfume house built around scent, absence and controlled darkness.",
    quote: "The scent of the invisible.",
  },
  {
    slug: "nova-skin-lab",
    title: "Nova Skin Lab",
    discipline: "Packaging & Product",
    sector: "Beauty",
    year: "2026",
    client: "Nova Skin Lab",
    ratio: "wide",
    visual: "art-nova",
    intro:
      "A refined packaging and product visual system for a skincare brand built around clinical calm, soft contrast and shelf-ready clarity.",
    quote: "The visual system needed to feel precise, but never cold.",
  },
  {
    slug: "morrow-coffee",
    title: "Morrow Coffee",
    discipline: "Brand Identity",
    sector: "Food & Drink",
    year: "2026",
    client: "Morrow Coffee",
    ratio: "tall",
    visual: "art-morrow",
    intro:
      "A warm identity system for a coffee brand balancing everyday familiarity with a stronger retail presence.",
    quote: "A quiet identity can still become instantly recognisable.",
  },
  {
    slug: "aurelia-gifting",
    title: "Aurelia Gifting",
    discipline: "Packaging & Product",
    sector: "Lifestyle",
    year: "2026",
    client: "Aurelia",
    ratio: "standard",
    visual: "art-aurelia",
    intro:
      "Gift packaging visuals and product cards designed to make a small brand feel polished across web, print and unboxing.",
    quote: "Every touchpoint should feel like part of the same gesture.",
  },
  {
    slug: "kiko-home",
    title: "Kiko Home",
    discipline: "Campaign Design",
    sector: "Retail",
    year: "2025",
    client: "Kiko Home",
    ratio: "ultra",
    visual: "art-kiko",
    intro:
      "A campaign and communication design system for a home goods retail launch, built around repeatable grid logic, restrained colour and the Slot Mark.",
    quote: "The challenge was not to add more decoration, but to make every repeated element work harder.",
  },
  {
    slug: "foundry-market",
    title: "Foundry Market",
    discipline: "Brand Direction",
    sector: "Retail",
    year: "2026",
    client: "Foundry Market",
    ratio: "standard",
    visual: "art-foundry",
    intro:
      "Brand story, positioning and art direction for an independent retail concept built around curated everyday objects.",
    quote: "The brand direction gave the visuals a point of view before design began.",
  },
  {
    slug: "luna-bakehouse",
    title: "Luna Bakehouse",
    discipline: "Ongoing Support",
    sector: "Food & Drink",
    year: "2026",
    client: "Luna Bakehouse",
    ratio: "tall",
    visual: "art-luna",
    intro:
      "Monthly visual support for social drops, seasonal menus, packaging extensions and e-commerce refreshes.",
    quote: "Consistency matters most when a brand is always making something new.",
  },
  {
    slug: "senka-campaign",
    title: "SENKA 鲜 — Campaign Design",
    discipline: "Campaign Design",
    sector: "Beauty",
    year: "2024",
    client: "SENKA 鲜",
    ratio: "wide",
    visual: "art-senka",
    intro:
      "Social and e-commerce campaign design for a seasonal skincare launch, built around freshness, product rhythm and digital retail clarity.",
    quote: "The campaign needed to feel immediate, seasonal and easy to scale across every launch asset.",
  },
];

const yosoCase = {
  slug: "yoso",
  title: "YŌSO 養素",
  tagline: "Brand identity and packaging for a modern Chinese botanical skincare brand.",
  services: ["Brand Identity", "Packaging & Product Visuals"],
  client: "YŌSO Skincare",
  sector: ["Consumer Brands", "Fashion & Beauty"],
  year: 2024,
  localVideo: "yoso-hero",
  heroVideo: "",
  heroImage: "/images/yoso/01-logo-dark.jpg",
  coverImage: "/images/yoso/07-packaging-set.jpg",
  coverVisual: "art-yoso",
  pullQuotes: [
    {
      id: 1,
      insertAfterGroup: 0,
      text:
        "Lattice Visual built YŌSO's identity around a single tension: the precision of modern formulation and the patience of traditional botanical knowledge.",
    },
    {
      id: 2,
      insertAfterGroup: 3,
      text:
        "The mark's inner drop holds its weight at 12mm on a jar label and at 3 metres on a retail banner — without becoming either timid or loud.",
    },
    {
      id: 3,
      insertAfterGroup: 6,
      text:
        "Deep ink, parchment, pale celery, and warm copper — chosen not as a palette but as four precise emotional coordinates for a brand that refuses to rush.",
    },
  ],
  imageGroups: [
    {
      id: 1,
      layout: "full",
      images: [{ src: "/images/yoso/01-logo-dark.jpg", alt: "YŌSO mark on deep ink background", aspectRatio: "16/9" }],
    },
    {
      id: 2,
      layout: "2col",
      images: [
        { src: "/images/yoso/02-logo-white.jpg", alt: "YŌSO mark on cream paper card", aspectRatio: "4/3" },
        { src: "/images/yoso/03-mark-detail.jpg", alt: "YŌSO mark — macro detail on uncoated paper", aspectRatio: "4/3" },
      ],
    },
    {
      id: 3,
      layout: "full",
      images: [{ src: "/images/yoso/04-color-type.jpg", alt: "YŌSO color palette and typeface specimen", aspectRatio: "16/9" }],
    },
    {
      id: 4,
      layout: "2col",
      images: [
        { src: "/images/yoso/05-packaging-serum.jpg", alt: "YŌSO Botanical Serum, pale grey stone", aspectRatio: "3/4" },
        { src: "/images/yoso/06-packaging-cream.jpg", alt: "YŌSO Deep Moisture Cream, travertine", aspectRatio: "3/4" },
      ],
    },
    {
      id: 5,
      layout: "full",
      images: [{ src: "/images/yoso/07-packaging-set.jpg", alt: "YŌSO full product line — morning light on limestone", aspectRatio: "16/9" }],
    },
    {
      id: 6,
      layout: "3col",
      images: [
        { src: "/images/yoso/08-render-01.jpg", alt: "CGI render — Botanical Serum dropper", aspectRatio: "1/1" },
        { src: "/images/yoso/09-render-02.jpg", alt: "CGI render — Deep Moisture Cream lid emboss", aspectRatio: "1/1" },
        { src: "/images/yoso/10-render-03.jpg", alt: "CGI render — Botanical Mask tube", aspectRatio: "1/1" },
      ],
    },
    {
      id: 7,
      layout: "full",
      images: [{ src: "/images/yoso/11-lifestyle-01.jpg", alt: "YŌSO products on travertine, strong morning directional light", aspectRatio: "21/9" }],
    },
    {
      id: 8,
      layout: "2col",
      images: [
        { src: "/images/yoso/12-label-detail.jpg", alt: "YŌSO cream jar — embossed mark in raking light", aspectRatio: "1/1" },
        { src: "/images/yoso/13-card.jpg", alt: "YŌSO brand card on white tissue", aspectRatio: "1/1" },
      ],
    },
    {
      id: 9,
      layout: "full",
      images: [{ src: "/images/yoso/14-giftbox.jpg", alt: "YŌSO gift packaging, sage green box, copper foil mark", aspectRatio: "16/9" }],
    },
    {
      id: 10,
      layout: "2col",
      images: [
        { src: "/images/yoso/15-ecom-01.jpg", alt: "YŌSO Botanical Serum — e-commerce main image", aspectRatio: "1/1" },
        { src: "/images/yoso/16-ecom-02.jpg", alt: "YŌSO serum texture — amber drop mid-fall", aspectRatio: "1/1" },
      ],
    },
    {
      id: 11,
      layout: "full",
      images: [{ src: "/images/yoso/17-brand-scale.jpg", alt: "YŌSO brand system — all touchpoints overhead flat-lay", aspectRatio: "16/9" }],
    },
  ],
  bodyText: [
    "YŌSO (養素) is a Chinese skincare brand founded on a single premise: that botanical patience and clinical precision are not opposites. Launched in 2024 with four core products — a botanical serum, a deep-moisture cream, a botanical mask, and a cleansing oil — each formula centres on a single hero ingredient, rigorously dosed and sourced from a specific growing region.",
    "Lattice Visual was engaged to build the brand from the ground up: identity, packaging design, and a complete suite of product visualisation assets for the digital launch. The brief was to carve out a distinct position in a skincare market crowded with either clinical-white minimalism or ornate heritage aesthetics. The challenge was to find a third register — quieter, more considered, and without precedent.",
    "The identity is anchored by a single mark: a thin circle enclosing a teardrop in outline form. It references the dropper — the precise instrument of botanical dosing — and the drop itself: the concentrated result of patient extraction. The mark scales without compromise from a 10mm jar emboss to a three-metre retail banner, and inverts cleanly between dark and light surfaces.",
    "Colour was developed from the raw materials of Chinese herbalism rather than from the skincare category itself. The primary palette — deep ink (深墨), parchment (宣), and pale celery (嫩) — draws from ink stone, mulberry paper, and fresh-cut fennel. A single warm copper appears only as embossed and foil-stamped finishes, used as punctuation rather than decoration, marking the handful of moments that earn emphasis.",
    "Packaging was designed to inhabit the territory between pharmacy restraint and luxury excess. The glass bottle and jar forms are round-shouldered and weighted at the base — stable, generous, unhurried. Labels are single-colour offset-printed on uncoated stock; the brand mark is blind-embossed on each lid. The shipper box, in natural kraft with an ink-stamped mark, extends the same sensibility to the unboxing moment without theatrical excess.",
    "For the digital launch on YŌSO's flagship and owned social channels, Lattice Visual produced a complete visual toolkit before any location photography was scheduled: white-background e-commerce renders for all four SKUs, atmospheric lifestyle renders on stone and linen surfaces, close-up formula texture shots, and a fifteen-second looping product animation. The resulting asset library gave the brand a consistent, high-quality visual presence from day one.",
  ],
  collaborators: [],
  nextProject: {
    title: "SENKA 鲜 — Campaign Design",
    slug: "senka-campaign",
    thumbnail: "/images/senka/cover.jpg",
    visual: "art-senka",
    tagline: "Social and e-commerce campaign for a seasonal skincare launch.",
  },
};

const folkSolsticeCase = {
  slug: "folk-solstice",
  title: "FOLK × SOLSTICE",
  tagline: "Botanically brewed. Seasonally limited.",
  serviceType: "packaging",
  services: ["Packaging & Product Visuals", "E-commerce Assets", "Launch Visuals"],
  client: "FOLK",
  sector: ["Food & Drink", "Premium Beverage", "Brooklyn"],
  year: 2025,
  heroImage: "/images/folk-solstice/C4-life-kv.jpg",
  coverImage: "/images/folk-solstice/C4-life-kv.jpg",
  coverVisual: "art-folk-solstice",
  subheadline:
    "Complete launch visual suite for FOLK's summer 2025 limited edition — 15 assets across e-commerce, packaging, lifestyle, social, and gifting.",
  launchCopy: {
    hero: "SOLSTICE. Botanically brewed. 12 weeks only.",
    listing: "FOLK SOLSTICE 02 — White Peach & Ginger Sparkling Water · 330ml",
    gift: "The SOLSTICE gift set. All four summer botanicals. A twelve-week season in a box.",
  },
  deliverables: [
    {
      category: "E-commerce",
      description: "Amazon-compliant white-background shots for listings and product pages.",
      count: 4,
      images: [
        { src: "/images/folk-solstice/A1-ec-hero-02.jpg", alt: "SOLSTICE 02 Amazon main image", aspect: "square", platform: "Amazon main image" },
        { src: "/images/folk-solstice/A2-ec-lineup.jpg", alt: "All four SOLSTICE flavors lineup", aspect: "wide", platform: "Amazon / Shopify" },
        { src: "/images/folk-solstice/A3-ec-pour-white.jpg", alt: "SOLSTICE 02 poured over ice on white", aspect: "square", platform: "Shopify secondary" },
        { src: "/images/folk-solstice/A4-ec-label-detail.jpg", alt: "SOLSTICE 02 label botanical illustration detail", aspect: "square", platform: "Amazon alt image" },
      ],
    },
    {
      category: "Packaging renders",
      description: "Dark studio and editorial renders for press decks, wholesale, and DTC packaging pages.",
      count: 4,
      images: [
        { src: "/images/folk-solstice/B1-pkg-hero-dark.jpg", alt: "SOLSTICE 02 dark studio hero", aspect: "portrait", platform: "PR kit / brand deck" },
        { src: "/images/folk-solstice/B2-pkg-collection.jpg", alt: "Full SOLSTICE collection on slate", aspect: "wide", platform: "Wholesale catalog" },
        { src: "/images/folk-solstice/B3-pkg-giftbox.jpg", alt: "SOLSTICE gift set box interior", aspect: "square", platform: "DTC gift page" },
        { src: "/images/folk-solstice/B4-pkg-label-art.jpg", alt: "All four label artworks as flat prints", aspect: "wide", platform: "Brand deck" },
      ],
    },
    {
      category: "Lifestyle & campaign",
      description: "Natural seasonal images for the homepage, PR story, ingredient narrative, and key visual.",
      count: 4,
      images: [
        { src: "/images/folk-solstice/C1-life-table.jpg", alt: "Summer table with FOLK SOLSTICE ice bucket", aspect: "wide", platform: "Website hero" },
        { src: "/images/folk-solstice/C2-life-pour.jpg", alt: "SOLSTICE 02 pour action in backlight", aspect: "square", platform: "Editorial / PR" },
        { src: "/images/folk-solstice/C3-life-ingredients.jpg", alt: "SOLSTICE bottles with botanical ingredients", aspect: "wide", platform: "Ingredient story" },
        { src: "/images/folk-solstice/C4-life-kv.jpg", alt: "Campaign key visual with four bottles in summer garden", aspect: "portrait", platform: "Campaign hub / OOH" },
      ],
    },
    {
      category: "Social & launch",
      description: "Pre-cropped launch assets for Instagram Story and Feed placements.",
      count: 2,
      images: [
        { src: "/images/folk-solstice/D1-social-story.jpg", alt: "SOLSTICE 02 Instagram Story format", aspect: "portrait", platform: "Instagram Story" },
        { src: "/images/folk-solstice/D2-social-feed.jpg", alt: "SOLSTICE launch Instagram feed post", aspect: "square", platform: "Instagram Feed" },
      ],
    },
    {
      category: "Retail & gift",
      description: "Gift set reveal for the direct-to-consumer gifting program.",
      count: 1,
      images: [
        { src: "/images/folk-solstice/E1-gift-unbox.jpg", alt: "SOLSTICE gift set overhead reveal", aspect: "square", platform: "DTC gift page" },
      ],
    },
  ],
  stats: {
    totalAssets: 15,
    sku: 4,
    formats: ["1:1", "16:9", "9:16", "4:5"],
    platforms: ["Amazon", "Shopify", "Instagram", "PR"],
  },
  nextProject: {
    title: "Fern & Coal",
    slug: "fern-coal",
    thumbnail: "/images/fern-coal/C4_key_visual_dark_garden.png",
    visual: "art-fern-coal",
    tagline: "Slow burn.",
  },
};

const fernCoalCase = {
  slug: "fern-coal",
  title: "Fern & Coal",
  tagline: "Slow burn.",
  serviceType: "packaging",
  services: ["Packaging & Product Visuals", "Launch Visuals", "Retail Display"],
  client: "Fern & Coal",
  sector: ["Luxury Scented Candles", "Home Fragrance", "East London"],
  year: 2025,
  heroImage: "/images/fern-coal/C4_key_visual_dark_garden.png",
  coverImage: "/images/fern-coal/C4_key_visual_dark_garden.png",
  coverVisual: "art-fern-coal",
  subheadline: "Core collection launch for a three-vessel candle range, spanning DTC product imagery, dark studio packaging renders, campaign assets, retail displays, and exhibition mockups.",
  launchCopy: {
    hero: "Dark luxury, hand-poured.",
    listing: "Three vessels. Three materials. One slow burn.",
    gift: "Core collection gift set — matte black, concrete, ribbed glass.",
  },
  deliverables: [
    {
      category: "E-commerce",
      description: "White and near-white product images for Shopify, Google Shopping, and DTC product galleries.",
      count: 4,
      images: [
        { src: "/images/fern-coal/A1_hero_smoke_cedar_white.png", alt: "No. 01 SMOKE & CEDAR hero on pure white", aspect: "square", platform: "Shopify hero / Google Shopping" },
        { src: "/images/fern-coal/A2_three_vessel_lineup_white.png", alt: "All three Fern & Coal vessels lined up on white", aspect: "wide", platform: "Shopify collection / Press kit" },
        { src: "/images/fern-coal/A3_lit_candle_white_bg.png", alt: "No. 03 ASH & BLOOM lit on white background", aspect: "square", platform: "Product detail / DTC email" },
        { src: "/images/fern-coal/A4_label_detail_closeup.png", alt: "No. 03 ribbed glass and label close-up", aspect: "square", platform: "Product detail gallery" },
      ],
    },
    {
      category: "Packaging renders",
      description: "Dark studio images for gifting, press, material detail, and product-story pages.",
      count: 4,
      images: [
        { src: "/images/fern-coal/B1_gift_box_dark_studio.png", alt: "No. 01 candle in matte black gift box", aspect: "portrait", platform: "DTC gift page / Press kit" },
        { src: "/images/fern-coal/B2_three_vessels_concrete_moody.png", alt: "Three vessels on raw concrete in dark studio light", aspect: "wide", platform: "Brand story / Press kit" },
        { src: "/images/fern-coal/B3_exploded_gift_flatlay.png", alt: "Exploded gift set flatlay with vessel, box, tissue, ribbon, and matchbook", aspect: "wide", platform: "DTC gift page / PR editorial" },
        { src: "/images/fern-coal/B4_box_deboss_closeup.png", alt: "Black-on-black debossed Fern & Coal gift box lid", aspect: "square", platform: "Product detail / Press kit" },
      ],
    },
    {
      category: "Lifestyle / Campaign",
      description: "Environmental candlelight images for homepage, email, editorial, and campaign hero usage.",
      count: 4,
      images: [
        { src: "/images/fern-coal/C1_evening_interior_amber.png", alt: "Two Fern & Coal candles lit on a dark wooden sideboard", aspect: "wide", platform: "Homepage hero / Editorial" },
        { src: "/images/fern-coal/C2_bathroom_shelf_morning.png", alt: "No. 02 concrete vessel on bathroom tile shelf with fern", aspect: "portrait", platform: "Instagram feed / Editorial" },
        { src: "/images/fern-coal/C3_winter_table_setting.png", alt: "No. 03 ribbed glass candle lit on winter table with tea", aspect: "wide", platform: "Email campaign / DTC homepage" },
        { src: "/images/fern-coal/C4_key_visual_dark_garden.png", alt: "Campaign key visual with three lit candles in a dark garden", aspect: "wide", platform: "Campaign hero / Advertising" },
      ],
    },
    {
      category: "Social / Launch",
      description: "Pre-cropped social placements with safe zones for story UI and overlay text.",
      count: 2,
      images: [
        { src: "/images/fern-coal/D1_story_9x16_smoke_cedar.png", alt: "Instagram Story asset with No. 01 lit in darkness", aspect: "portrait", platform: "Instagram Story / Reel / TikTok" },
        { src: "/images/fern-coal/D2_feed_1x1_forest_floor.png", alt: "Overhead forest floor flatlay with No. 02 and ferns", aspect: "square", platform: "Instagram Feed / Pinterest" },
      ],
    },
    {
      category: "Press / Editorial",
      description: "Lookbook-style flatlay for gift guides, press kits, and seasonal editorial placements.",
      count: 1,
      images: [
        { src: "/images/fern-coal/E1_press_flatlay_linen.png", alt: "All three Fern & Coal vessels and gift components on ivory linen", aspect: "wide", platform: "Press kit / Gift guide" },
      ],
    },
    {
      category: "Social Mockups",
      description: "Deployment mockups for pitch decks, PR reporting, and social content planning.",
      count: 3,
      images: [
        { src: "/images/fern-coal/F1_instagram_grid_mockup.png", alt: "Nine-post Fern & Coal Instagram grid mockup", aspect: "square", platform: "Content planning / Pitch deck" },
        { src: "/images/fern-coal/F2_iphone_feed_mockup.png", alt: "iPhone showing Fern & Coal Instagram feed post", aspect: "portrait", platform: "Social media report" },
        { src: "/images/fern-coal/F3_iphone_story_in_hand.png", alt: "Hand holding iPhone with Fern & Coal Story active", aspect: "portrait", platform: "PR kit / Social report" },
      ],
    },
    {
      category: "Retail Display",
      description: "Retail shelf and point-of-sale visuals for wholesale presentations and stockist kits.",
      count: 2,
      images: [
        { src: "/images/fern-coal/G1_retail_shelf_display.png", alt: "Three Fern & Coal vessels on dark oak retail shelf", aspect: "wide", platform: "Retail pitch / Wholesale" },
        { src: "/images/fern-coal/G2_pos_tabletop_display.png", alt: "Tabletop POS setup with No. 01 candle and display card", aspect: "portrait", platform: "Stockist kit / Retail pitch" },
      ],
    },
    {
      category: "Exhibition / Display Boards",
      description: "Large-format campaign boards and in-situ display mockups for pop-up retail and launch events.",
      count: 3,
      images: [
        { src: "/images/fern-coal/H1_pullup_banner_artwork.png", alt: "Pull-up banner artwork with dark garden candle visual", aspect: "portrait", platform: "Pop-up / Trade events" },
        { src: "/images/fern-coal/H2_banner_in_situ.png", alt: "Pull-up banner in minimal pop-up space with product plinth", aspect: "portrait", platform: "Event documentation" },
        { src: "/images/fern-coal/H3_exhibition_wall_panel.png", alt: "Exhibition wall panel with Fern & Coal product plinths", aspect: "wide", platform: "Gallery launch / Press coverage" },
      ],
    },
  ],
  stats: {
    totalAssets: 23,
    sku: 3,
    formats: ["1:1", "2:3", "3:2", "9:16", "Print"],
    platforms: ["Shopify DTC", "Instagram", "Press", "Gift retail", "Pop-up"],
  },
  pullQuotes: [
    "The brief was singular: every image should feel like the moment just before you light it.",
    "Three vessels, three materials. The job is to let each surface speak for itself — the photography just gets out of the way.",
  ],
  bodyText: [
    "Fern & Coal came to us with three vessels and one sentence: slow burn. A matte black ceramic, a raw concrete cylinder, a ribbed clear glass. Same form, radically different materials. The challenge was never the individual SKU — it was making the three read as a coherent collection while keeping each material visually distinct.",
    "We built the visual system around material honesty. No artificial warmth layered in. The concrete photographs like concrete — fine-grain, grey, slightly cold. The ceramic absorbs light rather than returning it. The ribbed glass refracts the flame from within when lit. Each vessel behaves differently under the same light, and that difference is the whole story.",
    "The gift packaging presented a specific technical problem: a black-on-black debossed wordmark. The only way to read it is under a raking light. B4 is entirely that — one strip light at fifteen degrees, the letterforms catching just enough shadow to be legible. It is the most deliberately understated product shot in the set, and probably the most important for communicating the brand's positioning.",
    "For the campaign key visual, we moved entirely outdoors — three lit vessels on dark slate stepping stones in a garden at dusk. No artificial light introduced. The flames are the only illumination, and they barely reach the surrounding ferns. It is a difficult shot to control technically, but it is the one that communicates what the brand actually is: dark, botanical, unhurried.",
  ],
  nextProject: {
    title: "FOLK × SOLSTICE",
    slug: "folk-solstice",
    thumbnail: "/images/folk-solstice/C4-life-kv.jpg",
    visual: "art-folk-solstice",
    tagline: "Botanically brewed. Seasonally limited.",
  },
};

const atlanCase = {
  slug: "atlan",
  title: "ATLAN",
  tagline: "Craft the shadow.",
  services: ["Brand Identity", "Editorial Photography", "Product Visualization"],
  client: "ATLAN",
  sector: ["Architectural Lighting", "Home & Interiors", "Copenhagen"],
  year: 2024,
  heroImage: "/images/atlan/04-product-01-washi.jpg",
  coverImage: "/images/atlan/04-product-01-washi.jpg",
  coverVisual: "art-atlan",
  pullQuotes: [
    {
      id: 1,
      insertAfterGroup: 0,
      text: "The shade is a hypothesis. The shadow is the proof.",
      attribution: "Studio brief, ATLAN 07 CAST",
    },
    {
      id: 2,
      insertAfterGroup: 5,
      text:
        "The Plumb Mark takes two seconds to understand and a lifetime to forget. A line and a circle: the cord, the globe.",
      attribution: "Lattice Visual, brand identity rationale",
    },
  ],
  imageGroups: [
    {
      id: 1,
      layout: "2col",
      images: [
        { src: "/images/atlan/01-logo-dark.jpg", alt: "ATLAN Plumb Mark on charcoal", aspectRatio: "1/1" },
        { src: "/images/atlan/02-logo-light.jpg", alt: "ATLAN Plumb Mark on bone", aspectRatio: "1/1" },
      ],
    },
    {
      id: 2,
      layout: "full",
      images: [{ src: "/images/atlan/03-palette.jpg", alt: "ATLAN colour palette", aspectRatio: "16/9" }],
    },
    {
      id: 3,
      layout: "2col",
      images: [
        { src: "/images/atlan/04-product-01-washi.jpg", alt: "ATLAN 01 WASHI pendant", aspectRatio: "3/4" },
        { src: "/images/atlan/05-product-07-cast.jpg", alt: "ATLAN 07 CAST pendant", aspectRatio: "3/4" },
      ],
    },
    {
      id: 4,
      layout: "3col",
      images: [
        { src: "/images/atlan/06-detail-washi-light.jpg", alt: "Washi paper translucency detail", aspectRatio: "1/1" },
        { src: "/images/atlan/07-detail-brass-hardware.jpg", alt: "Aged brass fixture ring detail", aspectRatio: "1/1" },
        { src: "/images/atlan/08-detail-shadow-geometry.jpg", alt: "Shadow geometry on plaster", aspectRatio: "1/1" },
      ],
    },
    {
      id: 5,
      layout: "2col",
      images: [
        { src: "/images/atlan/09-detail-oak-arm.jpg", alt: "Oak arm joinery detail", aspectRatio: "1/1" },
        { src: "/images/atlan/13-brand-box.jpg", alt: "ATLAN packaging", aspectRatio: "1/1" },
      ],
    },
    {
      id: 6,
      layout: "full",
      images: [{ src: "/images/atlan/10-lifestyle-dining.jpg", alt: "ATLAN 01 WASHI over dining table", aspectRatio: "16/9" }],
    },
    {
      id: 7,
      layout: "2col",
      images: [
        { src: "/images/atlan/11-lifestyle-studio.jpg", alt: "ATLAN 07 CAST in an architect's studio", aspectRatio: "16/9" },
        { src: "/images/atlan/12-lifestyle-bedroom.jpg", alt: "ATLAN 04 ARCH in bedroom", aspectRatio: "16/9" },
      ],
    },
    {
      id: 8,
      layout: "2col",
      images: [
        { src: "/images/atlan/14-brand-card.jpg", alt: "ATLAN specification card", aspectRatio: "1/1" },
        { src: "/images/atlan/15-brand-collection.jpg", alt: "ATLAN full collection", aspectRatio: "16/9" },
      ],
    },
  ],
  bodyText: [
    "ATLAN came to Lattice Visual with a problem familiar to design-led hardware brands: the product spoke fluently in person and fell completely silent on screen. Their studio, a converted warehouse in Copenhagen's Refshaleøen district, produced four pendant lights that interior architects had waited months to get hold of. The website showed grey squares.",
    "The first decision was about the logo. ATLAN had been operating with a wordmark — the brand name set in a geometric sans-serif — which read clearly enough on paper but gave no visual anchor when a product photograph needed to carry branding. We needed a mark small enough to engrave into a 28mm brass ring, reproducible enough to blind-deboss into matte cardstock, and distinctive enough to read at scale on a trade fair banner. The Plumb Mark emerged from a single sketch session: the pendant reduced to its two irreducible components.",
    "The line is the cord. The circle is the globe. Together they describe every pendant light that has ever existed — from a bare Edison bulb in a warehouse loft to an ATLAN 01 WASHI at the center of a Michelin-starred dining room. The mark holds that full range without explanation. It carries the weight of the whole catalog in two strokes.",
    "Photography presented an unusual brief: the subject of every image is not the fixture but the light it produces. We built all fifteen images around this premise. The macro studies show washi paper backlit to near-transparency, brass oxidization catching raking light, an oak joint that you want to touch through the screen. The product heroes place each fixture alone against deep charcoal and let the glow do the work. The lifestyle shots are almost entirely dark — the fixture and its shadow pool define the space.",
    "The shadow is in every image. This was deliberate. ATLAN's studio brief for the 07 CAST read: \"The shade is a hypothesis. The shadow is the proof.\" The circular pool of warm light that the 07 CAST projects onto any surface below it is the product's essential feature — not the aluminum dome, which you see in the shop, but the perfect geometry it produces at 11pm on a concrete floor.",
    "The brand system uses two colors, two typefaces, and one mark. This is not minimalism as aesthetic choice; it is minimalism as faith in the product. When the product is strong enough, the identity does not compete with it.",
  ],
  collaborators: [],
  nextProject: {
    title: "YŌSO 養素",
    slug: "yoso",
    thumbnail: "/images/yoso/07-packaging-set.jpg",
    visual: "art-yoso",
    tagline: "Brand identity and packaging for a modern Chinese botanical skincare brand.",
  },
};

const muruCase = {
  slug: "muru",
  title: "MURU",
  tagline: "Made with intention.",
  services: ["Brand Identity", "Editorial Photography", "Product Identity"],
  client: "MURU",
  sector: ["Studio Ceramics", "Tableware", "Helsinki"],
  year: 2024,
  heroImage: "/images/muru/04-product-bowl-28.jpg",
  coverImage: "/images/muru/04-product-bowl-28.jpg",
  coverVisual: "art-muru",
  pullQuotes: [
    {
      id: 1,
      insertAfterGroup: 0,
      text:
        "The glaze breaks at the rim because it should. That is not an error. That is where the object tells you it was made.",
      attribution: "MURU studio notes, 2023",
    },
    {
      id: 2,
      insertAfterGroup: 5,
      text:
        "The Muru Mark is two circles in conversation. The overlap is not a problem to solve — it is the point.",
      attribution: "Lattice Visual, brand identity rationale",
    },
  ],
  imageGroups: [
    {
      id: 1,
      layout: "2col",
      images: [
        { src: "/images/muru/01-logo-dark.jpg", alt: "MURU mark on iron dark background", aspectRatio: "1/1" },
        { src: "/images/muru/02-logo-light.jpg", alt: "MURU mark on ash light background", aspectRatio: "1/1" },
      ],
    },
    {
      id: 2,
      layout: "full",
      images: [{ src: "/images/muru/03-palette.jpg", alt: "MURU colour palette", aspectRatio: "16/9" }],
    },
    {
      id: 3,
      layout: "2col",
      images: [
        { src: "/images/muru/04-product-bowl-28.jpg", alt: "MURU BOWL 28 in fog glaze", aspectRatio: "3/4" },
        { src: "/images/muru/05-product-cup-08.jpg", alt: "MURU CUP 08 with morning steam", aspectRatio: "3/4" },
      ],
    },
    {
      id: 4,
      layout: "3col",
      images: [
        { src: "/images/muru/06-detail-glaze-break.jpg", alt: "Glaze breaking at rim edge", aspectRatio: "1/1" },
        { src: "/images/muru/07-detail-throwing-rings.jpg", alt: "Throwing rings on raw stoneware", aspectRatio: "1/1" },
        { src: "/images/muru/08-detail-clay-foot.jpg", alt: "Unglazed foot ring with Muru Mark", aspectRatio: "1/1" },
      ],
    },
    {
      id: 5,
      layout: "2col",
      images: [
        { src: "/images/muru/09-detail-iron-speck.jpg", alt: "Iron oxide speckling in glaze", aspectRatio: "1/1" },
        { src: "/images/muru/13-brand-wrap.jpg", alt: "MURU kraft paper wrapping", aspectRatio: "1/1" },
      ],
    },
    {
      id: 6,
      layout: "full",
      images: [{ src: "/images/muru/10-lifestyle-morning.jpg", alt: "MURU objects on morning table", aspectRatio: "16/9" }],
    },
    {
      id: 7,
      layout: "2col",
      images: [
        { src: "/images/muru/11-lifestyle-vessel.jpg", alt: "MURU VESSEL 15 on winter windowsill", aspectRatio: "16/9" },
        { src: "/images/muru/12-lifestyle-shelf.jpg", alt: "MURU objects on kitchen shelf", aspectRatio: "16/9" },
      ],
    },
    {
      id: 8,
      layout: "2col",
      images: [
        { src: "/images/muru/14-brand-tag.jpg", alt: "MURU linen hang tag", aspectRatio: "1/1" },
        { src: "/images/muru/15-brand-collection.jpg", alt: "MURU full collection on limestone", aspectRatio: "16/9" },
      ],
    },
  ],
  bodyText: [
    "MURU came to Lattice Visual with a brief that most product brands avoid stating plainly: their objects could not be understood from a photograph. The weight of a MURU BOWL 28 in both hands — the slight warmth retained from the dishwasher, the small irregularity in the rim where the clay compressed differently — none of this exists on a screen. The studio wanted us to try anyway.",
    "The logo brief was equally direct. MURU had no mark at all — only a wordmark set in a rounded sans-serif that read as pleasant and forgettable. They needed something that could be pressed into raw clay before a firing, stamped onto kraft paper with a rubber block, and embroidered onto a linen tag with a single needle pass. Three very different surfaces, one mark.",
    "The Muru Mark is two equal circles overlapping. The distance between their centers is exactly 65% of their shared diameter — enough overlap to create a clear lens-shaped intersection, not so much that either circle loses its independence. What happens in the intersection is nothing: the two outlines simply cross, and the inside of both circles remains empty. Two things touching without merging.",
    "Photography for MURU was built entirely around surface. The macro studies — glaze pooling at a rim, the throwing rings left by a finger, iron oxide specks fired into a glaze — are not supporting material. They are the primary argument for the brand. A customer who has seen the close-up of the fog glaze breaking at the bowl's rim has understood something about the object that a full product shot cannot convey. They have been shown the evidence of making.",
    "The lifestyle images follow the same logic: spare, close to the objects, organized around a single source of natural light. The morning table does not try to sell a lifestyle. It shows two MURU objects being used for what they are — a bowl holding food, a cup holding a hot drink — with the kind of stillness that comes from objects that are worth returning to each morning.",
    "The brand system uses five colors, all of them derived from the material: clay, ash, iron, fog, oxide. The typography is quiet enough to disappear. What remains is the mark — two circles in contact — and the objects themselves.",
  ],
  collaborators: [],
  nextProject: {
    title: "ATLAN",
    slug: "atlan",
    thumbnail: "/images/atlan/04-product-01-washi.jpg",
    visual: "art-atlan",
    tagline: "Craft the shadow.",
  },
};

const brumeCase = {
  slug: "brume",
  title: "BRUME",
  tagline: "The scent of the invisible.",
  services: ["Brand Identity", "Editorial Photography", "Packaging Identity"],
  client: "BRUME",
  sector: ["Niche Perfumery", "Luxury Goods", "Grasse"],
  year: 2024,
  heroImage: "/images/brume/04-product-bottle-01.jpg",
  coverImage: "/images/brume/04-product-bottle-01.jpg",
  coverVisual: "art-brume",
  pullQuotes: [
    {
      id: 1,
      insertAfterGroup: 0,
      text:
        "We are not selling a smell. We are selling the specific way air felt in a specific place.",
      attribution: "BRUME founder brief, 2023",
    },
    {
      id: 2,
      insertAfterGroup: 5,
      text:
        "The Void Mark is a diamond with a hole through it. The hole is the point.",
      attribution: "Lattice Visual, brand identity rationale",
    },
  ],
  imageGroups: [
    {
      id: 1,
      layout: "2col",
      images: [
        { src: "/images/brume/01-logo-dark.jpg", alt: "BRUME Void Mark on fumee dark background", aspectRatio: "1/1" },
        { src: "/images/brume/02-logo-light.jpg", alt: "BRUME Void Mark on ivoire background", aspectRatio: "1/1" },
      ],
    },
    {
      id: 2,
      layout: "full",
      images: [{ src: "/images/brume/03-palette.jpg", alt: "BRUME colour palette", aspectRatio: "16/9" }],
    },
    {
      id: 3,
      layout: "2col",
      images: [
        { src: "/images/brume/04-product-bottle-01.jpg", alt: "BRUME 01 PLUIE bottle", aspectRatio: "3/4" },
        { src: "/images/brume/05-product-group.jpg", alt: "All four BRUME fragrances", aspectRatio: "16/9" },
      ],
    },
    {
      id: 4,
      layout: "3col",
      images: [
        { src: "/images/brume/06-detail-bottle-glass.jpg", alt: "Matte black glass refraction at corner", aspectRatio: "1/1" },
        { src: "/images/brume/07-detail-brass-cap.jpg", alt: "Machined brass cap close-up", aspectRatio: "1/1" },
        { src: "/images/brume/08-detail-kraft-label.jpg", alt: "Void Mark blind-debossed on kraft", aspectRatio: "1/1" },
      ],
    },
    {
      id: 5,
      layout: "2col",
      images: [
        { src: "/images/brume/09-detail-ingredient.jpg", alt: "Vetiver roots and grey amber resin", aspectRatio: "1/1" },
        { src: "/images/brume/13-brand-box.jpg", alt: "BRUME black rigid box interior", aspectRatio: "1/1" },
      ],
    },
    {
      id: 6,
      layout: "full",
      images: [{ src: "/images/brume/10-lifestyle-vanity.jpg", alt: "BRUME bottle on marble shelf in morning light", aspectRatio: "16/9" }],
    },
    {
      id: 7,
      layout: "2col",
      images: [
        { src: "/images/brume/11-lifestyle-fog.jpg", alt: "BRUME bottle on coastal rock in morning fog", aspectRatio: "16/9" },
        { src: "/images/brume/12-lifestyle-interior.jpg", alt: "BRUME bottle by candlelight at a dark desk", aspectRatio: "16/9" },
      ],
    },
    {
      id: 8,
      layout: "2col",
      images: [
        { src: "/images/brume/14-brand-card.jpg", alt: "BRUME formula card with Void Mark", aspectRatio: "1/1" },
        { src: "/images/brume/15-brand-collection.jpg", alt: "All four BRUME bottles in perspective line", aspectRatio: "16/9" },
      ],
    },
  ],
  bodyText: [
    "BRUME came to Lattice Visual with a problem that is not a problem most brands would admit to having: the product is invisible. A perfume house cannot photograph what it sells. It can photograph the bottle, the box, the materials, the landscape where the raw ingredients grow — but the thing itself, the scent, exists only in air and in memory. The studio wanted their visual identity to acknowledge this directly, rather than perform the aspirational imagery the category usually demands.",
    "The Void Mark emerged from exactly this admission. The brief for the logo was one sentence: show the absence. The resulting mark is a solid diamond — bold, heavy, monumental — with a perfect circle removed from its center. The diamond is mass. The circle is nothing. Together they describe the brand's central fact: there is something here, and at the center of it there is something you cannot see.",
    "The mark breaks from every convention of the niche fragrance category, where logos are typically either calligraphic wordmarks or fine-line emblems suggesting old-world herbaria. The Void Mark is geometric, industrial in its precision, closer to a Bauhaus exercise than a fragrance bottle. This is deliberate. BRUME's fragrances are not romantic. They are precise atmospheric descriptions, numbered not named, formulated with the same discipline a chemist brings to a composition.",
    "Photography followed the same logic of controlled restraint. All fifteen images are single-source lit — a window, a candle, a controlled studio spot. No fill, no bounce, no softening. The shadows are part of the image, not accidents to be corrected. The bottle's matte black surface absorbs rather than reflects light, which means the image is largely composed of what the light misses — the dark mass of the object, and one or two surfaces where the source lands.",
    "The fog landscape image was the most contested in the review process. The studio's instinct was to avoid cliched product-in-nature photography. The argument for it: BRUME 01 PLUIE exists as an attempt to recreate the specific quality of air that precedes rain on coastal stone. A photograph of the bottle in actual coastal fog is not an advertisement — it is a proof of origin. The fog is the source material. The bottle contains a version of it.",
    "The brand system is two colors and one mark. No pattern. No secondary graphic language. No supporting illustration. The identity earns its confidence by what it removes — which is, in the end, the only logic available to a house that makes things you cannot see.",
  ],
  collaborators: [],
  nextProject: {
    title: "MURU",
    slug: "muru",
    thumbnail: "/images/muru/04-product-bowl-28.jpg",
    visual: "art-muru",
    tagline: "Made with intention.",
  },
};

const kikoHomeCase = {
  slug: "kiko-home",
  title: "Kiko Home",
  tagline: "Made for the home you're building.",
  serviceType: "campaign",
  services: ["Campaign & Communication Design", "Retail Communication", "Social Templates"],
  client: "Kiko Home",
  sector: ["Home Goods Retail", "Communication Design", "Retail"],
  year: 2025,
  heroImage: "/images/kiko-home/F1_storefront_exterior.png",
  coverImage: "/images/kiko-home/F1_storefront_exterior.png",
  coverVisual: "art-kiko",
  subheadline: "Campaign and communication design system for launch, spanning visual direction, retail touchpoints, product communication, social templates, and environmental applications.",
  launchHighlights: [
    {
      label: "System",
      value: "The Slot Mark, geometric type, and a three-colour palette built for repetition without noise.",
    },
    {
      label: "Launch",
      value: "A complete family of campaign posters, digital key visuals, store vinyl, and outdoor placements.",
    },
    {
      label: "Rollout",
      value: "Retail, e-commerce, Instagram, OOH, and print formats sharing the same margin and zone logic.",
    },
  ],
  deliverables: [
    {
      category: "Visual System Display",
      description: "Guideline-style assets documenting the Slot Mark, colour system, typography, and layout anatomy.",
      count: 3,
      images: [
        { src: "/images/kiko-home/A1_slot_mark_three_grounds.png", alt: "Kiko Home Slot Mark on Ink, Paper, and Clay grounds", aspect: "square", platform: "Brand guidelines" },
        { src: "/images/kiko-home/A2_colour_type_specimen.png", alt: "Kiko Home colour and type specimen sheet", aspect: "wide", platform: "Case study documentation" },
        { src: "/images/kiko-home/A3_grid_anatomy_diagram.png", alt: "Kiko Home layout grid anatomy diagrams", aspect: "wide", platform: "Brand guidelines" },
      ],
    },
    {
      category: "Campaign & Launch Formats",
      description: "Launch-facing formats for retail interiors, storefront activation, digital key visuals, and outdoor media.",
      count: 4,
      images: [
        { src: "/images/kiko-home/B1_campaign_launch_poster.png", alt: "Kiko Home campaign launch poster on Ink ground", aspect: "portrait", platform: "Retail / Print advertising" },
        { src: "/images/kiko-home/B2_store_window_vinyl.png", alt: "Kiko Home store window vinyl graphic", aspect: "portrait", platform: "Retail exterior" },
        { src: "/images/kiko-home/B3_horizontal_key_visual.png", alt: "Kiko Home horizontal digital key visual", aspect: "wide", platform: "Website / Email / Social ad" },
        { src: "/images/kiko-home/B4_ooh_transit_format.png", alt: "Kiko Home transit shelter advertising panel", aspect: "wide", platform: "OOH / Outdoor" },
      ],
    },
    {
      category: "Retail Communication",
      description: "In-store physical communication pieces designed to carry the same mark, type, and colour behaviour at different scales.",
      count: 3,
      images: [
        { src: "/images/kiko-home/C1_shopping_bag.png", alt: "Kiko Home branded Ink paper shopping bag", aspect: "portrait", platform: "Retail in-store" },
        { src: "/images/kiko-home/C2_hang_tag_family.png", alt: "Kiko Home hang tag and price tag family", aspect: "square", platform: "Product tags" },
        { src: "/images/kiko-home/C3_aframe_pos_signage.png", alt: "Kiko Home A-frame POS signage in retail interior", aspect: "portrait", platform: "Point of sale" },
      ],
    },
    {
      category: "Product Communication",
      description: "Reusable communication frames for product pages, folded insert cards, and lookbook spreads.",
      count: 3,
      images: [
        { src: "/images/kiko-home/D1_ecommerce_composition_template.png", alt: "Kiko Home e-commerce composition template", aspect: "wide", platform: "Shopify / Website" },
        { src: "/images/kiko-home/D2_product_card_folded.png", alt: "Kiko Home folded product card closed and open", aspect: "wide", platform: "Product insert / Gift card" },
        { src: "/images/kiko-home/D3_lookbook_spread.png", alt: "Kiko Home open lookbook spread", aspect: "wide", platform: "Print lookbook / PDF" },
      ],
    },
    {
      category: "Social Templates",
      description: "Reusable Instagram feed, story, and grid systems designed around fixed image and type zones.",
      count: 3,
      images: [
        { src: "/images/kiko-home/E1_instagram_feed_template.png", alt: "Kiko Home Instagram Feed post template", aspect: "square", platform: "Instagram Feed" },
        { src: "/images/kiko-home/E2_instagram_story_template.png", alt: "Kiko Home Instagram Story template on phone screen", aspect: "portrait", platform: "Instagram Story / Reel cover" },
        { src: "/images/kiko-home/E3_instagram_grid_preview.png", alt: "Kiko Home six-post Instagram grid preview", aspect: "square", platform: "Social planning" },
      ],
    },
    {
      category: "Environmental In Situ",
      description: "Storefront and interior views showing the campaign system deployed as a retail environment, not only a set of flat assets.",
      count: 2,
      images: [
        { src: "/images/kiko-home/F1_storefront_exterior.png", alt: "Kiko Home storefront exterior with window graphics and fascia sign", aspect: "wide", platform: "Case study / Press" },
        { src: "/images/kiko-home/F2_retail_interior_brand_family.png", alt: "Kiko Home retail interior with full brand material family", aspect: "wide", platform: "Brand presentation / Press" },
      ],
    },
  ],
  stats: {
    totalAssets: 18,
    categories: 6,
    formats: ["1:1", "2:3", "3:2", "9:16"],
    platforms: ["Retail", "E-commerce", "Instagram", "OOH", "Print"],
  },
  pullQuotes: [
    "The challenge was not to add more decoration, but to make every repeated element work harder: mark, type, color, image crop and layout rhythm.",
    "Applications were designed as a family. Each format has enough independence to feel intentional, while still returning to the same core behaviour.",
  ],
  bodyText: [
    "Kiko Home is a retail brand in a market where visual memory is built quickly and lost just as quickly. The identity had to feel confident enough for launch and restrained enough to grow. The brief was not about scale — it was about repeatability.",
    "The identity work began with proportion. The Slot Mark was treated as an anchor rather than a badge: a geometric solid with a single through-void, designed to sit quietly on product tags and expand with authority across a full-height store window. The mark never decorates — it occupies.",
    "Colour was developed from the brand's own materials and audience cues. Ink, Paper and Clay: three colours with enough contrast to carry any format without relying on a single fashionable shade. The palette makes room for photography without competing with it.",
    "For rollout, the assets were prepared as a working toolkit rather than a static presentation. Every template is grid-faithful. Every format shares the same margin logic, the same zone behaviour, the same mark placement conventions. The result is a system that a team can operate, not just a deck that an agency presents.",
  ],
  nextProject: {
    title: "Foundry Market",
    slug: "foundry-market",
    thumbnail: "",
    visual: "art-foundry",
    tagline: "Brand story, positioning and art direction for an independent retail concept.",
  },
};

const sectorLabels = {
  Beauty: ["Consumer Brands", "Fashion & Beauty"],
  "Food & Drink": ["Hospitality", "Food & Drink"],
  Lifestyle: ["Consumer Brands", "Lifestyle"],
  Retail: ["Retail", "Consumer Goods"],
  Wellness: ["Health", "Wellness"],
  Interiors: ["Architectural Lighting", "Home & Interiors"],
};

const serviceLabels = {
  "Brand Identity": ["Brand Identity", "Brand Direction"],
  "Brand Direction": ["Brand Direction", "Campaign & Communication Design"],
  "Packaging & Product": ["Packaging & Product Visuals", "Brand Identity"],
  "Campaign Design": ["Campaign & Communication Design", "Product Visuals"],
  "Ongoing Support": ["Ongoing Visual Support", "Campaign & Communication Design"],
};

function createCaseStudy(project, index) {
  const nextProject = projects[(index + 1) % projects.length];
  const imageRoot = `/images/${project.slug}`;
  const servicesForCase = serviceLabels[project.discipline] || [project.discipline];
  const sectorForCase = sectorLabels[project.sector] || [project.sector];

  return {
    slug: project.slug,
    title: project.title,
    tagline: project.intro,
    services: servicesForCase,
    client: project.client,
    sector: sectorForCase,
    year: Number(project.year) || 2026,
    heroImage: `${imageRoot}/hero.jpg`,
    coverImage: `${imageRoot}/cover.jpg`,
    coverVisual: project.visual,
    pullQuotes: [
      {
        id: 1,
        insertAfterGroup: 0,
        text: `Lattice Visual shaped ${project.title}'s visual language around a clear tension: commercial clarity and a more memorable emotional register.`,
      },
      {
        id: 2,
        insertAfterGroup: 2,
        text: `The system was designed to hold its character across scales, from the smallest digital crop to the most visible launch asset.`,
      },
      {
        id: 3,
        insertAfterGroup: 4,
        text: `Color, spacing and material cues were treated as working tools, giving every touchpoint a recognisable but flexible rhythm.`,
      },
    ],
    imageGroups: [
      {
        id: 1,
        layout: "full",
        images: [{ src: `${imageRoot}/01-identity-dark.jpg`, alt: `${project.title} identity on dark background`, aspectRatio: "16/9" }],
      },
      {
        id: 2,
        layout: "2col",
        images: [
          { src: `${imageRoot}/02-identity-light.jpg`, alt: `${project.title} identity on light background`, aspectRatio: "4/3" },
          { src: `${imageRoot}/03-mark-detail.jpg`, alt: `${project.title} mark and detail study`, aspectRatio: "4/3" },
        ],
      },
      {
        id: 3,
        layout: "full",
        images: [{ src: `${imageRoot}/04-system.jpg`, alt: `${project.title} visual system overview`, aspectRatio: "16/9" }],
      },
      {
        id: 4,
        layout: "portrait-right",
        images: [
          { src: `${imageRoot}/05-primary-application.jpg`, alt: `${project.title} primary application`, aspectRatio: "16/9" },
          { src: `${imageRoot}/06-secondary-application.jpg`, alt: `${project.title} secondary application`, aspectRatio: "3/4" },
        ],
      },
      {
        id: 5,
        layout: "3col",
        images: [
          { src: `${imageRoot}/07-detail-01.jpg`, alt: `${project.title} detail image one`, aspectRatio: "1/1" },
          { src: `${imageRoot}/08-detail-02.jpg`, alt: `${project.title} detail image two`, aspectRatio: "1/1" },
          { src: `${imageRoot}/09-detail-03.jpg`, alt: `${project.title} detail image three`, aspectRatio: "1/1" },
        ],
      },
      {
        id: 6,
        layout: "full",
        images: [{ src: `${imageRoot}/10-scale.jpg`, alt: `${project.title} system at scale`, aspectRatio: "21/9" }],
      },
      {
        id: 7,
        layout: "asymmetric",
        images: [
          { src: `${imageRoot}/11-context.jpg`, alt: `${project.title} contextual brand image`, aspectRatio: "4/3" },
          { src: `${imageRoot}/12-material.jpg`, alt: `${project.title} material or product detail`, aspectRatio: "3/4" },
        ],
      },
      {
        id: 8,
        layout: "full",
        images: [{ src: `${imageRoot}/13-rollout.jpg`, alt: `${project.title} rollout image`, aspectRatio: "16/9" }],
      },
    ],
    bodyText: [
      `${project.client} is a ${project.sector.toLowerCase()} brand working in a market where visual memory is built quickly and lost just as quickly. The brand needed an identity that could carry product, campaign and retail communication without feeling inflated. Its visual presence had to feel confident enough for launch and restrained enough to grow.`,
      `Lattice Visual was asked to define the visual direction and translate it into a practical design system. The challenge was not to add more decoration, but to make every repeated element work harder: mark, type, color, image crop and layout rhythm. The brief called for a visual language that could move between founder-led storytelling and polished commercial presentation.`,
      `The identity work began with proportion. The mark was treated as an anchor rather than a badge, designed to sit quietly on product surfaces and expand with authority across larger campaign formats. Typography was set with a geometric sans for clarity, paired with more generous spacing to keep the system calm under dense information.`,
      `Color was developed from the brand's own materials and audience cues. Instead of relying on a single fashionable shade, the palette combines black ink, warm paper and one sharper accent tone. This gives the system contrast without turning every touchpoint into a poster.`,
      `Applications were designed as a family: launch visuals, product cards, e-commerce compositions, campaign frames and social templates all share the same grid logic. Each format has enough independence to feel intentional, while still returning to the same core behaviour of type, image and negative space.`,
      `For rollout, Lattice Visual prepared the assets as a working toolkit rather than a static presentation. The result is a case study structure ready for final photography, motion work and product imagery, allowing the brand to replace placeholder material with real launch assets as they are produced.`,
    ],
    collaborators: [],
    nextProject: {
      title: nextProject.title,
      slug: nextProject.slug,
      thumbnail: `/images/${nextProject.slug}/cover.jpg`,
      visual: nextProject.visual,
      tagline: nextProject.intro,
    },
  };
}

const caseStudies = projects.map((project, index) => {
  if (project.slug === "yoso") return yosoCase;
  if (project.slug === "folk-solstice") return folkSolsticeCase;
  if (project.slug === "fern-coal") return fernCoalCase;
  if (project.slug === "atlan") return atlanCase;
  if (project.slug === "muru") return muruCase;
  if (project.slug === "brume") return brumeCase;
  if (project.slug === "kiko-home") return kikoHomeCase;
  return createCaseStudy(project, index);
});

const newsPosts = [
  {
    title: "How visual consistency helps small brands look larger",
    category: "Brand Systems",
    date: "May 2026",
    excerpt:
      "A practical note on why colour, type, packaging and campaign assets should be designed as one connected system.",
  },
  {
    title: "What makes packaging feel premium without over-designing it",
    category: "Packaging",
    date: "May 2026",
    excerpt:
      "Material cues, spacing, restraint and product hierarchy often matter more than decorative complexity.",
  },
  {
    title: "Building launch visuals before a product photoshoot",
    category: "Product Visuals",
    date: "May 2026",
    excerpt:
      "How renders, mockups and structured art direction can help a brand prepare its campaign before final production assets arrive.",
  },
];

function App() {
  const [path, setPath] = useState(window.location.pathname);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  useEffect(() => {
    const onPopState = () => setPath(window.location.pathname);
    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, []);

  useEffect(() => {
    document.title = getPageTitle(path);
    document
      .querySelector("meta[name='description']")
      ?.setAttribute("content", "Lattice Visual is a brand visualization studio for identity, packaging, product visuals and campaign design.");
  }, [path]);

  const navigate = (target) => {
    window.history.pushState({}, "", target);
    setPath(window.location.pathname);
    setMenuOpen(false);
    setSearchOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <main className="site-shell">
      <Navbar
        path={path}
        menuOpen={menuOpen}
        onMenuToggle={() => setMenuOpen((value) => !value)}
        onNavigate={navigate}
        onSearchOpen={() => setSearchOpen(true)}
      />
      <div className="page-fade" key={path}>
        {renderRoute(path, navigate)}
      </div>
      <Footer onNavigate={navigate} />
      {searchOpen && <SearchOverlay onClose={() => setSearchOpen(false)} onNavigate={navigate} />}
    </main>
  );
}

function renderRoute(path, navigate) {
  if (path === "/work") return <WorkPage onNavigate={navigate} />;
  if (path.startsWith("/work/")) return <CaseStudyPage slug={path.replace("/work/", "")} onNavigate={navigate} />;
  if (path === "/services") return <ServicesPage />;
  if (path === "/about") return <AboutPage />;
  if (path === "/news" || path === "/blog") return <NewsPage />;
  if (path === "/contact") return <ContactPage />;
  return <HomePage onNavigate={navigate} />;
}

function getPageTitle(path) {
  if (path === "/work") return "Work | Lattice Visual";
  if (path.startsWith("/work/")) {
    const slug = path.replace("/work/", "");
    const caseStudy = caseStudies.find((item) => item.slug === slug);
    return `${caseStudy?.title || "Case Study"} | Lattice Visual`;
  }
  if (path === "/services") return "Services | Lattice Visual";
  if (path === "/about") return "About | Lattice Visual";
  if (path === "/news" || path === "/blog") return "News | Lattice Visual";
  if (path === "/contact") return "Contact | Lattice Visual";
  return "Lattice Visual | Brand Visualization Studio";
}

function Navbar({ path, menuOpen, onMenuToggle, onNavigate, onSearchOpen }) {
  const isActive = (target) => path === target || (target === "/work" && path.startsWith("/work/"));

  return (
    <header className="navbar">
      <button className="wordmark" type="button" onClick={() => onNavigate("/")}>
        Lattice Visual
      </button>
      <nav className="desktop-nav" aria-label="Primary navigation">
        {navItems.map((item) => (
          <button className={isActive(item.path) ? "active" : ""} type="button" key={item.path} onClick={() => onNavigate(item.path)}>
            {item.label}
          </button>
        ))}
        <button type="button" onClick={onSearchOpen}>
          Search
        </button>
      </nav>
      <button className="menu-toggle" type="button" onClick={onMenuToggle} aria-expanded={menuOpen}>
        <span />
        <span />
      </button>
      {menuOpen && (
        <div className="mobile-menu">
          {navItems.map((item) => (
            <button type="button" key={item.path} onClick={() => onNavigate(item.path)}>
              {item.label}
            </button>
          ))}
          <button type="button" onClick={onSearchOpen}>
            Search
          </button>
        </div>
      )}
    </header>
  );
}

function HomePage({ onNavigate }) {
  return (
    <>
      <Hero onNavigate={onNavigate} />
      <HomeServices />
      <FeaturedWork onNavigate={onNavigate} />
      <ProcessStrip />
      <HomeCTA onNavigate={onNavigate} />
    </>
  );
}

function Hero({ onNavigate }) {
  return (
    <section className="hero">
      <div className="hero-reel" aria-hidden="true">
        {projects.slice(0, 4).map((project) => (
          <ProjectVisual key={project.slug} visual={project.visual} />
        ))}
      </div>
      <div className="hero-content">
        <p className="eyebrow">Brand Visualization Studio</p>
        <h1>
          We make brands
          <br />
          visually unforgettable.
        </h1>
        <p className="hero-subline">Brand identity · Packaging · Product visuals · Campaign design</p>
        <button className="outline-cta" type="button" onClick={() => onNavigate("/work")}>
          View Our Work
        </button>
      </div>
      <button className="scroll-indicator" type="button" onClick={() => document.querySelector(".services-overview")?.scrollIntoView({ behavior: "smooth" })}>
        Scroll
      </button>
    </section>
  );
}

function HomeServices() {
  return (
    <section className="section services-overview">
      <SectionLabel label="Services" />
      <div className="service-grid">
        {services.map((service, index) => (
          <article className="service-card" key={service.name}>
            <span className="service-number">{String(index + 1).padStart(2, "0")}</span>
            <h2>{service.name}</h2>
            <p>{service.description}</p>
            <span className="service-tag">{service.engagement}</span>
          </article>
        ))}
      </div>
    </section>
  );
}

function FeaturedWork({ onNavigate }) {
  return (
    <section className="section featured-work">
      <div className="section-row">
        <SectionLabel label="Featured Work" />
        <button className="text-link" type="button" onClick={() => onNavigate("/work")}>
          All Work →
        </button>
      </div>
      <div className="featured-grid">
        {projects.slice(0, 4).map((project, index) => (
          <ProjectCard key={project.slug} project={project} featured={index === 0 || index === 3} onNavigate={onNavigate} />
        ))}
      </div>
    </section>
  );
}

function ProcessStrip() {
  const steps = ["Direction", "Design", "Production", "Rollout"];
  return (
    <section className="section process-strip">
      <SectionLabel label="Process" />
      <div className="process-line">
        {steps.map((step, index) => (
          <article key={step}>
            <span>{String(index + 1).padStart(2, "0")}</span>
            <h2>{step}</h2>
            <p>{getProcessCopy(step)}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

function getProcessCopy(step) {
  const copy = {
    Direction: "Define the audience, market position and visual ambition before design begins.",
    Design: "Develop the identity, packaging or campaign language across the right touchpoints.",
    Production: "Create polished assets for print, digital, e-commerce and launch communication.",
    Rollout: "Prepare files, guidance and extensions so the system can keep working after delivery.",
  };
  return copy[step];
}

function HomeCTA({ onNavigate }) {
  return (
    <section className="home-cta">
      <h2>Ready to make your brand easier to recognise, remember and trust?</h2>
      <button className="outline-cta" type="button" onClick={() => onNavigate("/contact")}>
        Start a Project
      </button>
    </section>
  );
}

function WorkPage({ onNavigate }) {
  const [discipline, setDiscipline] = useState("All");
  const [sector, setSector] = useState("All");

  const filteredProjects = useMemo(
    () =>
      projects.filter((project) => {
        const disciplineMatch = discipline === "All" || project.discipline === discipline;
        const sectorMatch = sector === "All" || project.sector === sector;
        return disciplineMatch && sectorMatch;
      }),
    [discipline, sector],
  );

  return (
    <section className="page-section">
      <PageHeader eyebrow="Work" title="Our Work" intro="A portfolio structure for brand identities, packaging systems, campaign visuals and ongoing design support." />
      <FilterGroup title="Discipline" options={disciplines} active={discipline} onChange={setDiscipline} />
      <FilterGroup title="Sector" options={sectors} active={sector} onChange={setSector} />
      <div className="work-columns">
        {filteredProjects.map((project) => (
          <ProjectCard key={project.slug} project={project} onNavigate={onNavigate} />
        ))}
      </div>
      <button className="load-more" type="button">
        Load more
      </button>
    </section>
  );
}

function FilterGroup({ title, options, active, onChange }) {
  return (
    <div className="filter-group" aria-label={title}>
      <span>{title}</span>
      <div>
        {options.map((option) => (
          <button className={active === option ? "active" : ""} type="button" key={option} onClick={() => onChange(option)}>
            {option}
          </button>
        ))}
      </div>
    </div>
  );
}

function ServicesPage() {
  return (
    <section className="page-section">
      <PageHeader eyebrow="Services" title="Visual systems for brands that need to look ready." intro="Work can begin with strategy, identity, packaging, campaign assets or an ongoing support model." />
      <div className="service-detail-list">
        {services.map((service, index) => (
          <article key={service.name}>
            <span>{String(index + 1).padStart(2, "0")}</span>
            <h2>{service.name}</h2>
            <p>{service.description}</p>
            <small>{service.engagement}</small>
          </article>
        ))}
      </div>
    </section>
  );
}

function AboutPage() {
  return (
    <section className="page-section about-page">
      <PageHeader eyebrow="About" title="兰格视觉 / Lattice Visual" intro="A brand visualization studio helping emerging consumer brands build sharper visual identities, packaging and campaign systems." />
      <div className="about-grid">
        <p>
          Lattice Visual works with founders and small teams who need design that feels structured, polished and commercially useful. The focus is not on decoration, but on building a visual language that can hold together across every touchpoint.
        </p>
        <p>
          From a first logo system to packaging extensions, e-commerce visuals and launch campaigns, the work is designed to make brands easier to recognise, remember and trust.
        </p>
      </div>
    </section>
  );
}

function NewsPage() {
  return (
    <section className="page-section">
      <PageHeader eyebrow="News" title="Notes on brand visualization" intro="Short articles and observations on identity, packaging, product visuals and communication design." />
      <div className="news-grid">
        {newsPosts.map((post) => (
          <article className="news-card" key={post.title}>
            <span>{post.category}</span>
            <h2>{post.title}</h2>
            <p>{post.excerpt}</p>
            <small>{post.date}</small>
          </article>
        ))}
      </div>
    </section>
  );
}

function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <section className="page-section contact-page">
      <div className="contact-grid">
        <div>
          <p className="eyebrow">Contact</p>
          <h1>
            Let's build
            <br />
            something
            <br />
            unforgettable.
          </h1>
          <p>Tell us about your project and we will get back within 24 hours.</p>
          <a href="mailto:latticevisualltd@gmail.com">latticevisualltd@gmail.com</a>
          <span>Instagram: @latticevisual</span>
          <span>WeChat: latticevisual</span>
        </div>
        <form
          onSubmit={(event) => {
            event.preventDefault();
            setSubmitted(true);
          }}
        >
          {submitted ? (
            <div className="form-success">We'll be in touch soon.</div>
          ) : (
            <>
              <FormField label="Name" name="name" />
              <FormField label="Company" name="company" />
              <FormSelect label="Service needed" name="service" options={["Brand Identity", "Brand Direction", "Packaging & Product", "Campaign Design", "Ongoing Support", "Not sure yet"]} />
              <FormSelect label="Project stage" name="stage" options={["New brand", "Rebrand", "New product launch", "Campaign launch", "Ongoing support"]} />
              <label>
                <span>Project brief</span>
                <textarea name="brief" rows="5" />
              </label>
              <button type="submit">Submit Enquiry</button>
            </>
          )}
        </form>
      </div>
    </section>
  );
}

function FormField({ label, name }) {
  return (
    <label>
      <span>{label}</span>
      <input name={name} type="text" />
    </label>
  );
}

function FormSelect({ label, name, options }) {
  return (
    <label>
      <span>{label}</span>
      <select name={name} defaultValue="">
        <option value="" disabled>
          Select
        </option>
        {options.map((option) => (
          <option key={option}>{option}</option>
        ))}
      </select>
    </label>
  );
}

function CaseStudyPage({ slug, onNavigate }) {
  const caseStudy = caseStudies.find((item) => item.slug === slug) || yosoCase;

  if (caseStudy.serviceType === "packaging") {
    return <PackagingSuitePage caseStudy={caseStudy} onNavigate={onNavigate} />;
  }

  if (caseStudy.serviceType === "campaign") {
    return <CampaignSuitePage caseStudy={caseStudy} onNavigate={onNavigate} />;
  }

  return (
    <article className="case-study">
      <CaseHeader caseStudy={caseStudy} />
      <CaseHero caseStudy={caseStudy} />
      <CaseBody caseStudy={caseStudy} />
      <CaseText bodyText={caseStudy.bodyText} />
      <CaseMetadata caseStudy={caseStudy} />
      <NextProject nextProject={caseStudy.nextProject} onNavigate={onNavigate} />
    </article>
  );
}

function CampaignSuitePage({ caseStudy, onNavigate }) {
  return (
    <article className="case-study packaging-suite campaign-suite">
      <CaseHeader caseStudy={caseStudy} />
      <CaseHero caseStudy={caseStudy} />
      <PackagingSuiteIntro caseStudy={caseStudy} />
      <PackagingDeliverables deliverables={caseStudy.deliverables} />
      {caseStudy.bodyText ? <PackagingNarrative caseStudy={caseStudy} /> : null}
      <PackagingStats stats={caseStudy.stats} />
      <NextProject nextProject={caseStudy.nextProject} onNavigate={onNavigate} />
    </article>
  );
}

function PackagingSuitePage({ caseStudy, onNavigate }) {
  return (
    <article className="case-study packaging-suite">
      <CaseHeader caseStudy={caseStudy} />
      <CaseHero caseStudy={caseStudy} />
      <PackagingSuiteIntro caseStudy={caseStudy} />
      <PackagingDeliverables deliverables={caseStudy.deliverables} />
      {caseStudy.bodyText ? <PackagingNarrative caseStudy={caseStudy} /> : null}
      <PackagingStats stats={caseStudy.stats} />
      <NextProject nextProject={caseStudy.nextProject} onNavigate={onNavigate} />
    </article>
  );
}

function PackagingSuiteIntro({ caseStudy }) {
  const highlights =
    caseStudy.launchHighlights ||
    [
      { label: "Key Visual", value: caseStudy.launchCopy.hero },
      { label: "E-commerce", value: caseStudy.launchCopy.listing },
      { label: "Gift Set", value: caseStudy.launchCopy.gift },
    ];

  return (
    <section className="packaging-intro">
      <p>{caseStudy.subheadline}</p>
      <div className="launch-copy-grid">
        {highlights.map((item) => (
          <article key={item.label}>
            <span>{item.label}</span>
            <strong>{item.value}</strong>
          </article>
        ))}
      </div>
    </section>
  );
}

function PackagingDeliverables({ deliverables }) {
  return (
    <section className="deliverable-suite">
      {deliverables.map((group) => (
        <motion.article
          className="deliverable-group"
          key={group.category}
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportOnce}
          transition={{ duration: 0.6, ease: easeOut }}
        >
          <header>
            <div>
              <span>{String(group.count).padStart(2, "0")} assets</span>
              <h2>{group.category}</h2>
            </div>
            <p>{group.description}</p>
          </header>
          <div className="deliverable-grid">
            {group.images.map((image) => (
              <PackagingImage image={image} key={image.src} />
            ))}
          </div>
        </motion.article>
      ))}
    </section>
  );
}

function PackagingImage({ image }) {
  const [failed, setFailed] = useState(!image.src);

  return (
    <figure className={`deliverable-image aspect-${image.aspect}`}>
      {failed ? (
        <div className="case-image-placeholder" aria-label={image.alt}>
          <span />
          <span />
          <span />
          <span />
        </div>
      ) : (
        <img src={image.src} alt={image.alt} loading="lazy" onError={() => setFailed(true)} />
      )}
      <figcaption>
        <span>{image.platform}</span>
        {image.alt}
      </figcaption>
    </figure>
  );
}

function PackagingNarrative({ caseStudy }) {
  return (
    <section className="packaging-narrative">
      {caseStudy.pullQuotes ? (
        <div className="packaging-quote-grid">
          {caseStudy.pullQuotes.map((quote) => (
            <blockquote key={quote}>{quote}</blockquote>
          ))}
        </div>
      ) : null}
      <div className="packaging-narrative-text">
        {caseStudy.bodyText.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </div>
    </section>
  );
}

function PackagingStats({ stats }) {
  const items = [
    { label: "Total Assets", value: stats.totalAssets },
    stats.sku ? { label: "SKUs", value: stats.sku } : null,
    stats.categories ? { label: "Categories", value: stats.categories } : null,
    { label: "Formats", value: stats.formats.join(" · ") },
    { label: "Platforms", value: stats.platforms.join(" · ") },
  ].filter(Boolean);

  return (
    <section className="packaging-stats">
      {items.map((item) => (
        <article key={item.label}>
          <span>{item.label}</span>
          <strong>{item.value}</strong>
        </article>
      ))}
    </section>
  );
}

function CaseHeader({ caseStudy }) {
  return (
    <header className="case-header">
      <motion.div className="case-tags" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1, duration: 0.6, ease: easeOut }}>
        {caseStudy.services.map((service) => (
          <span key={service}>{service}</span>
        ))}
      </motion.div>
      <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25, duration: 0.6, ease: easeOut }}>
        {caseStudy.title}
      </motion.h1>
      <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4, duration: 0.6, ease: easeOut }}>
        {caseStudy.tagline}
      </motion.p>
    </header>
  );
}

function CaseHero({ caseStudy }) {
  return (
    <section className="case-hero-video" aria-label={`${caseStudy.title} hero`}>
      {caseStudy.localVideo ? (
        <CaseLocalVideo caseStudy={caseStudy} />
      ) : caseStudy.heroVideo ? (
        <iframe
          title={`${caseStudy.title} hero video`}
          src={`https://player.vimeo.com/video/${caseStudy.heroVideo}?autoplay=1&muted=1&loop=1&background=1`}
          allow="autoplay; fullscreen; picture-in-picture"
          loading="lazy"
        />
      ) : (
        <CaseHeroImage src={caseStudy.heroImage} alt={`${caseStudy.title} hero image`} visual={caseStudy.coverVisual} />
      )}
    </section>
  );
}

function CaseLocalVideo({ caseStudy }) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return <CaseHeroImage src={caseStudy.heroImage} alt={`${caseStudy.title} hero image`} visual={caseStudy.coverVisual} />;
  }

  return (
    <video key={caseStudy.slug} autoPlay muted loop playsInline poster={caseStudy.heroImage} onError={() => setFailed(true)}>
      <source src={`${localVideoBase}/${caseStudy.slug}/${caseStudy.localVideo}.webm`} type="video/webm" />
      <source src={`${localVideoBase}/${caseStudy.slug}/${caseStudy.localVideo}.mp4`} type="video/mp4" />
    </video>
  );
}

function CaseHeroImage({ src, alt, visual }) {
  const [failed, setFailed] = useState(!src);

  if (failed) {
    return (
      <div className="case-hero-fallback">
        <ProjectVisual visual={visual || "art-yoso"} />
      </div>
    );
  }

  return <img src={src} alt={alt} onError={() => setFailed(true)} />;
}

function CaseBody({ caseStudy }) {
  return (
    <section className="case-body">
      {caseStudy.imageGroups.map((group) => (
        <React.Fragment key={group.id}>
          {caseStudy.pullQuotes
            .filter((quote) => quote.insertAfterGroup === group.id - 1)
            .map((quote) => (
              <PullQuote key={quote.id} quote={quote} />
            ))}
          <CaseImageGroup group={group} />
        </React.Fragment>
      ))}
    </section>
  );
}

function PullQuote({ quote }) {
  return (
    <motion.blockquote
      className="case-pullquote"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={viewportOnce}
      transition={{ duration: 0.7, ease: easeOut }}
    >
      <p>{quote.text}</p>
      {quote.attribution && <cite>{quote.attribution}</cite>}
    </motion.blockquote>
  );
}

function CaseImageGroup({ group }) {
  return (
    <motion.section
      className={`case-image-group layout-${group.layout}`}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={viewportOnce}
      transition={{ duration: 0.6, ease: easeOut }}
    >
      {group.images.map((image, index) => (
        <CaseImage image={image} key={`${group.id}-${image.src}`} index={index} />
      ))}
    </motion.section>
  );
}

function CaseImage({ image, index }) {
  const [failed, setFailed] = useState(!image.src);
  const ratioClass = `ratio-${image.aspectRatio.replace("/", "-")}`;

  return (
    <figure className={`case-image ${ratioClass} image-${index + 1}`}>
      {failed ? (
        <div className="case-image-placeholder" aria-label={image.alt}>
          <span />
          <span />
          <span />
          <span />
        </div>
      ) : (
        <img src={image.src} alt={image.alt} loading="lazy" onError={() => setFailed(true)} />
      )}
      {image.caption && <figcaption>{image.caption}</figcaption>}
    </figure>
  );
}

function CaseText({ bodyText }) {
  return (
    <section className="case-longform">
      <div className="case-longform-separator" />
      <div className="case-longform-inner">
        {bodyText.map((paragraph, index) => (
          <motion.p
            key={paragraph}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportOnce}
            transition={{ delay: index * 0.08, duration: 0.6, ease: easeOut }}
          >
            {paragraph}
          </motion.p>
        ))}
      </div>
    </section>
  );
}

function CaseMetadata({ caseStudy }) {
  const items = [
    { label: "Client", values: [caseStudy.client] },
    { label: "Sector", values: caseStudy.sector },
    { label: "Services", values: caseStudy.services },
    { label: "Year", values: [String(caseStudy.year)] },
    { label: "Studio", values: ["Lattice Visual"] },
  ];

  return (
    <section className="case-metadata">
      <div>
        {items.map((item) => (
          <article key={item.label}>
            <span>{item.label}</span>
            {item.values.map((value) => (
              <strong key={value}>{value}</strong>
            ))}
          </article>
        ))}
      </div>
    </section>
  );
}

function NextProject({ nextProject, onNavigate }) {
  return (
    <button className="next-project" type="button" onClick={() => onNavigate(`/work/${nextProject.slug}`)}>
      <CaseNextVisual nextProject={nextProject} />
      <span className="next-overlay" />
      <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={viewportOnce} transition={{ duration: 0.6, ease: easeOut }}>
        <span>Next Project</span>
        <strong>{nextProject.title}</strong>
        <p>{nextProject.tagline}</p>
      </motion.div>
    </button>
  );
}

function CaseNextVisual({ nextProject }) {
  const [failed, setFailed] = useState(!nextProject.thumbnail);

  if (failed) {
    return <ProjectVisual visual={nextProject.visual || "art-yoso"} />;
  }

  return <img src={nextProject.thumbnail} alt="" loading="lazy" onError={() => setFailed(true)} />;
}

function ProjectCard({ project, featured = false, onNavigate }) {
  return (
    <article className={`project-card ${featured ? "featured" : ""}`} onClick={() => onNavigate(`/work/${project.slug}`)}>
      <ProjectVisual visual={project.visual} />
      <div className="project-overlay">
        <h2>{project.title}</h2>
        <p>{project.discipline}</p>
      </div>
      <div className="project-caption">
        <h2>{project.title}</h2>
        <p>{project.discipline} · {project.sector}</p>
      </div>
    </article>
  );
}

function ProjectVisual({ visual }) {
  return (
    <div className={`project-visual ${visual}`} aria-hidden="true">
      <span />
      <span />
      <span />
    </div>
  );
}

function PageHeader({ eyebrow, title, intro }) {
  return (
    <header className="page-header">
      <p className="eyebrow">{eyebrow}</p>
      <h1>{title}</h1>
      <p>{intro}</p>
    </header>
  );
}

function SectionLabel({ label }) {
  return <p className="section-label">{label}</p>;
}

function SearchOverlay({ onClose, onNavigate }) {
  const [query, setQuery] = useState("");
  const results = projects.filter((project) => `${project.title} ${project.discipline} ${project.sector}`.toLowerCase().includes(query.toLowerCase()));

  return (
    <section className="search-overlay">
      <button type="button" onClick={onClose}>
        Close
      </button>
      <label>
        <span>Search work, services or sectors</span>
        <input autoFocus value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Try packaging, beauty or campaign" />
      </label>
      <div>
        {(query ? results : projects.slice(0, 4)).map((project) => (
          <button type="button" key={project.slug} onClick={() => onNavigate(`/work/${project.slug}`)}>
            <strong>{project.title}</strong>
            <span>{project.discipline} · {project.sector}</span>
          </button>
        ))}
      </div>
    </section>
  );
}

function Footer({ onNavigate }) {
  return (
    <footer className="footer">
      <div>
        <strong>Lattice Visual</strong>
        <p>Brand Visualization Studio</p>
        <small>© 2026 Lattice Visual. All rights reserved.</small>
      </div>
      <div className="footer-links">
        <div>
          <span>Services</span>
          {services.map((service) => (
            <button type="button" key={service.name} onClick={() => onNavigate("/services")}>
              {service.name}
            </button>
          ))}
        </div>
        <div>
          <span>Company</span>
          {navItems.map((item) => (
            <button type="button" key={item.path} onClick={() => onNavigate(item.path)}>
              {item.label}
            </button>
          ))}
        </div>
      </div>
      <div className="footer-contact">
        <a href="mailto:latticevisualltd@gmail.com">latticevisualltd@gmail.com</a>
        <button type="button" onClick={() => onNavigate("/contact")}>
          Start a project →
        </button>
      </div>
    </footer>
  );
}

createRoot(document.getElementById("root")).render(<App />);
