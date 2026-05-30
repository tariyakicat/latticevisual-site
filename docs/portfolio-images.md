# Portfolio Image Replacement Guide

The current website uses CSS-built visual placeholders so the layout can be reviewed before real work is added. Replace them with your own portfolio images when ready.

## Recommended Folder

Place real work assets here:

```text
public/assets/portfolio/
```

Suggested file names:

```text
nova-skin-lab-packaging.webp
morrow-coffee-identity.webp
aurelia-gifting-packaging.webp
kiko-home-campaign.webp
foundry-market-direction.webp
luna-bakehouse-support.webp
```

## Recommended Exports

- Format: `.webp` preferred, `.jpg` or `.png` also works
- Work grid images: 1600 px wide or larger
- Case study hero images: 2400 px wide or larger
- Keep important product or packaging details away from the bottom-left because hover captions appear there
- Use clean mockups, campaign images, packaging closeups, product cards, posters, e-commerce visuals or brand guideline spreads

## Where To Update

Open:

```text
src/main.jsx
```

Update the `projects` array near the top of the file.

For now each project has a CSS placeholder:

```js
visual: "art-nova"
```

When real images are ready, change each project to include an image path, for example:

```js
image: "/assets/portfolio/nova-skin-lab-packaging.webp"
```

Then update the `ProjectVisual` component to render the image for projects with an `image` field. If you send me the final images, I can do this replacement directly.

## Case Study Assets

The new case study template uses a richer folder structure. For the first full placeholder case, add files here:

```text
public/images/yoso/
```

Recommended YŌSO file names:

```text
hero.jpg
cover.jpg
01-logo-dark.jpg
02-logo-white.jpg
03-mark-detail.jpg
04-color-type.jpg
05-packaging-serum.jpg
06-packaging-cream.jpg
07-packaging-set.jpg
08-render-01.jpg
09-render-02.jpg
10-render-03.jpg
11-lifestyle-01.jpg
12-label-detail.jpg
13-card.jpg
14-giftbox.jpg
15-ecom-01.jpg
16-ecom-02.jpg
17-brand-scale.jpg
```

Other case studies follow the same pattern under:

```text
public/images/[project-slug]/
```

Until these files exist, the site shows quiet ratio-accurate placeholders instead of broken image text.

## Good Portfolio Captions

Use captions that describe the project type and business purpose:

```text
Skincare packaging system
Coffee brand identity
Gift packaging and product cards
Retail campaign launch visuals
Monthly visual support
```
