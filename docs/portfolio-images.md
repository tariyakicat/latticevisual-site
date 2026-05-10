# Portfolio Image Replacement Guide

Use this guide when replacing the temporary AI-generated images with real Lattice Visual work.

## Recommended Folder

Place real portfolio assets here:

```text
public/assets/portfolio/
```

Suggested file names:

```text
moa-receptor-animation-still.webp
scientific-graphical-abstract.webp
device-exploded-view.webp
motion-sequence-frames.webp
```

## Recommended Exports

- Format: `.webp` preferred, `.jpg` or `.png` also works
- Portfolio cards: 1600 x 1100 px or larger
- Wide hero / featured images: 2400 x 1350 px or larger
- Keep important subject matter away from the bottom edge because captions sit over the image
- Avoid screenshots with UI controls, watermarks, or tiny unreadable labels
- If a client project is confidential, crop, anonymise, or use a derivative still

## Where To Update The Site

Open:

```text
src/main.jsx
```

Update these arrays near the top of the file:

- `featuredWorks`
- `portfolioGroups`
- service `image` fields inside `services`

Example:

```js
image: "/assets/portfolio/moa-receptor-animation-still.webp"
```

## Suggested Portfolio Captions

Use short captions that describe the communication purpose, not just the software output.

Good:

```text
MOA animation still
Graphical abstract for receptor signalling
Exploded-view device launch render
Conference loop for platform technology
```

Avoid:

```text
Image 1
Render test
My work
3D design
```
