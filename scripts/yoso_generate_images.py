import base64
import pathlib
import time

from openai import OpenAI


client = OpenAI()
OUTPUT_DIR = pathlib.Path("public/images/yoso")
OUTPUT_DIR.mkdir(parents=True, exist_ok=True)
REFERENCE_LOGO = pathlib.Path("reference_logo.jpg")


LOCK_A = """
BRAND MARK - reproduce this exactly:
A minimalist mark composed of exactly two elements, both rendered as outlines only with identical stroke weight - no fills, no gradients, no shadows: (1) a single thin-stroked perfect circle as the outer boundary; (2) inside the circle, one centered teardrop outline shape, vertically symmetrical, rounded at the top and tapering to a point at the bottom. The inner teardrop height is about 40% of the circle's inner diameter, with generous empty space between the teardrop and the outer circle. The mark is always flat solid color: warm ivory or white on dark backgrounds; deep near-black ink on light backgrounds. Never replace the teardrop with letters, Chinese characters, leaves, cubes, dots, or decorative symbols.
"""

LOCK_B = """
BRAND TEXT - use only these exact words, spelled exactly as shown:
- Brand name (Latin): YŌSO  (capital letters, with macron on the O)
- Brand name (Chinese): 養素  (two characters only)
- Brand tagline: Botanical Patience.  (with period)
- Product names: Botanical Serum / Deep Moisture Cream / Botanical Mask / Cleansing Oil
- Volume: 30 ml / 50 ml / 100 ml
- Never use any other invented text, slogans, or placeholder words.
"""


IMAGES = [
    {
        "filename": "01-logo-dark.jpg",
        "size": "1536x1024",
        "use_reference": False,
        "prompt": LOCK_A
        + """
A minimalist brand identity presentation photograph. Against a very dark near-black navy background - perfectly flat, matte, non-reflective - the YŌSO brand mark is precisely centered. The mark is rendered in soft warm ivory. One extremely subtle overhead ambient light makes the mark emerge gently without any harsh shadows or reflections. Generous empty space surrounding the mark. No text, no other graphic elements. Shot straight-on. Meditative, precise, quietly luxurious.
""",
    },
    {
        "filename": "02-logo-white.jpg",
        "size": "1536x1024",
        "use_reference": True,
        "prompt": LOCK_A
        + LOCK_B
        + """
A brand identity photograph. A thick square card in warm cream uncoated paper, photographed straight-on and centered. On the card, centered: the YŌSO brand mark (as in LOCK A) in deep near-black ink, then "YŌSO" in spaced uppercase geometric sans-serif, then "養素" in refined characters. These are the only elements. Faint paper tooth texture. Diffused natural light upper left. Background: slightly blurred warm cream. No harsh shadows.
""",
    },
    {
        "filename": "03-mark-detail.jpg",
        "size": "1536x1024",
        "use_reference": True,
        "prompt": LOCK_A
        + """
Extreme macro photograph of the YŌSO brand mark (as in LOCK A) printed on uncoated cream paper. The mark fills 70% of the frame. Paper fibers visible. Dense dark ink against cream paper. Warm raking light from the left. Focus sharpest at center, edges soft bokeh. No text in frame, only the mark.
""",
    },
    {
        "filename": "04-color-type.jpg",
        "size": "1536x1024",
        "use_reference": True,
        "prompt": LOCK_A
        + LOCK_B
        + """
Brand design documentation, shot from directly overhead on smooth warm grey concrete: (1) four color swatch cards: very dark near-black, warm parchment cream, pale sage green, muted warm copper-bronze; (2) one A4 sheet showing "YŌSO" large in geometric sans-serif, "養素" below, "Botanical Patience." lighter weight, then full alphabet specimen, then Chinese character set sample; (3) one small card with only the YŌSO brand mark. All on uncoated matte stock. Soft even overhead light.
""",
    },
    {
        "filename": "05-packaging-serum.jpg",
        "size": "1024x1536",
        "use_reference": True,
        "prompt": LOCK_A
        + LOCK_B
        + """
Luxury skincare product photograph. Tall slender glass dropper bottle on pale grey stone. Clear glass, amber-warm liquid. Label on off-white uncoated paper shows - top to bottom: YŌSO brand mark (small), "YŌSO" in spaced uppercase geometric sans-serif, "養素", "Botanical Serum  30 ml". No other text. Matte dark bronze dropper cap. Soft key light upper left. Warm light grey background, slightly blurred.
""",
    },
    {
        "filename": "06-packaging-cream.jpg",
        "size": "1024x1536",
        "use_reference": True,
        "prompt": LOCK_A
        + LOCK_B
        + """
Luxury skincare product photograph. Low wide glass jar on rough pale travertine. Matte cream-toned lid has YŌSO brand mark (as in LOCK A) embossed on top. Jar body label shows - top to bottom: "YŌSO", "養素", "Deep Moisture Cream", "50 ml". No other text. Soft natural window light from the side. Warm cream-white background, softly blurred.
""",
    },
    {
        "filename": "07-packaging-set.jpg",
        "size": "1536x1024",
        "use_reference": True,
        "prompt": LOCK_A
        + LOCK_B
        + """
Luxury skincare editorial. Four YŌSO products on aged pale limestone: tall glass dropper bottle (label: "YŌSO / 養素 / Botanical Serum"), wide glass jar ("YŌSO / 養素 / Deep Moisture Cream"), flat sachet ("YŌSO / 養素 / Botanical Mask"), small pump bottle ("YŌSO / 養素 / Cleansing Oil"). All labels identical in design: off-white paper, same geometric sans-serif. No other words. Small dried botanical sprig and grey pebble nearby. Strong morning light from far left, long warm shadows. Products spaced apart.
""",
    },
    {
        "filename": "08-render-01.jpg",
        "size": "1024x1024",
        "use_reference": True,
        "prompt": LOCK_A
        + LOCK_B
        + """
Photorealistic CGI product render. Glass serum dropper bottle, 30-degree elevated front angle. Clear glass with amber liquid, realistic caustics. Single drop hanging from dropper tip, sharp. Label shows: YŌSO brand mark, "YŌSO", "養素", "Botanical Serum  30 ml" - no other text. Pure white background. Soft overhead area light. Drop shadow soft and precise.
""",
    },
    {
        "filename": "09-render-02.jpg",
        "size": "1024x1024",
        "use_reference": True,
        "prompt": LOCK_A
        + LOCK_B
        + """
Photorealistic CGI render, top-down view. Glass cream jar, lid tilted open 45 degrees showing smooth white cream inside. Lid top has YŌSO brand mark (as in LOCK A) embossed, catching overhead light. Jar body label partially visible: "YŌSO" and "養素". No other text. Pure white background. Single soft overhead light.
""",
    },
    {
        "filename": "10-render-03.jpg",
        "size": "1024x1024",
        "use_reference": True,
        "prompt": LOCK_A
        + LOCK_B
        + """
Photorealistic CGI render. Slim flat skincare sachet standing upright. Matte cream-white finish. Label shows exactly: YŌSO brand mark at top, "YŌSO", "養素", "Botanical Mask". No other text. Matte dark seal. Pure white background. Even studio lighting.
""",
    },
    {
        "filename": "11-lifestyle-01.jpg",
        "size": "1536x1024",
        "use_reference": True,
        "prompt": LOCK_A
        + LOCK_B
        + """
Luxury skincare lifestyle editorial, wide format. Three YŌSO products on weathered white travertine marble: tall dropper bottle, cream jar, pump bottle. All labels show "YŌSO" as primary visible text - finer text may be too small to read at this distance, which is realistic. Very strong directional morning light from far left, long warm horizontal shadows. Camera slightly above eye level. No props. Completely still and unhurried.
""",
    },
    {
        "filename": "12-label-detail.jpg",
        "size": "1024x1024",
        "use_reference": True,
        "prompt": LOCK_A
        + """
Extreme macro of YŌSO cream jar lid surface. YŌSO brand mark (as in LOCK A) embossed on matte cream-toned lid. Raking side light at very low angle reveals emboss relief. Emboss is shallow - only visible in precise light. One dried sage-green botanical petal nearby, out of focus. No text in frame, only the embossed mark.
""",
    },
    {
        "filename": "13-card.jpg",
        "size": "1024x1024",
        "use_reference": True,
        "prompt": LOCK_A
        + LOCK_B
        + """
Brand identity flatlay, directly overhead. Thick square premium cream card on softly crinkled white tissue paper. Card shows, centered and stacked: YŌSO brand mark (as in LOCK A) at top, "YŌSO", "養素", "Botanical Patience." - these are the only words. Two or three small dried botanical petals nearby. Soft diffused even overhead light. No directional shadows.
""",
    },
    {
        "filename": "14-giftbox.jpg",
        "size": "1536x1024",
        "use_reference": True,
        "prompt": LOCK_A
        + LOCK_B
        + """
Luxury gift packaging. Rigid pale sage green matte gift box, partially open, lid resting beside it. Inside: two YŌSO skincare products in white tissue paper, labels each showing "YŌSO". On the gift box lid exterior, centered: only "YŌSO" foil-stamped in warm copper - no other text on box exterior. Thin natural twine ribbon loosely draped. Warm grey linen surface. Small fresh herb sprig. Soft natural window light upper left.
""",
    },
    {
        "filename": "15-ecom-01.jpg",
        "size": "1024x1024",
        "use_reference": True,
        "prompt": LOCK_A
        + LOCK_B
        + """
E-commerce product photograph, pure white background. Single YŌSO glass serum dropper bottle, three-quarter front angle, centered. Label clearly legible: YŌSO brand mark at top, "YŌSO", "養素", "Botanical Serum  30 ml". These are the only words on the label. Pure white background. Only a very faint reflection beneath. Sharp, color-accurate e-commerce lighting.
""",
    },
    {
        "filename": "16-ecom-02.jpg",
        "size": "1024x1024",
        "use_reference": False,
        "prompt": """
Close-up detail photograph for skincare e-commerce. A small pool of amber-gold face serum on a clean frosted glass surface. Slightly viscous liquid with rich translucent inner glow. A clean glass dropper positioned above, a single drop of amber liquid suspended mid-air in sharp focus. Beautiful light refraction and caustics. Clean warm light grey background. Soft even studio lighting. No packaging, no brand marks, no text of any kind.
""",
    },
    {
        "filename": "17-brand-scale.jpg",
        "size": "1536x1024",
        "use_reference": True,
        "prompt": LOCK_A
        + LOCK_B
        + """
Brand identity system flat-lay, directly overhead, on warm cream linen fabric. All items show only "YŌSO" or "養素" - no other words. Items: (1) four skincare products with consistent "YŌSO / 養素 / [product name]" labels; (2) one cream business card "YŌSO / 養素 / Botanical Patience." centered; (3) one closed natural kraft shipping box with "YŌSO" ink-stamped on top face; (4) one folded white tissue paper with YŌSO circular mark repeated as light watermark; (5) one small product card showing "YŌSO" at top. Soft perfectly even overhead light. No harsh shadows. Deliberate but lived-in composition.
""",
    },
]


def call_api(item: dict) -> bytes:
    prompt = item["prompt"]

    if item["use_reference"] and REFERENCE_LOGO.exists():
        with open(REFERENCE_LOGO, "rb") as ref:
            result = client.images.edit(
                model="gpt-image-1",
                image=ref,
                prompt=(
                    "The uploaded image is the approved reference YŌSO brand mark. "
                    "Maintain the exact same thin circle plus centered teardrop outline mark "
                    "in every branding placement shown in the new scene. Do not reinterpret the mark, "
                    "do not replace the teardrop with a character, leaf, cube, dot, or decorative symbol, "
                    "and do not simplify it into a filled icon.\n\n"
                    + prompt
                ),
                size=item["size"],
                quality="high",
            )
    else:
        result = client.images.generate(
            model="gpt-image-1",
            prompt=prompt,
            size=item["size"],
            quality="high",
        )

    return base64.b64decode(result.data[0].b64_json)


def generate(item: dict) -> None:
    out = OUTPUT_DIR / item["filename"]
    img_bytes = call_api(item)
    out.write_bytes(img_bytes)
    print(f"  OK {item['filename']}")
    time.sleep(3)


if __name__ == "__main__":
    print("=" * 50)
    print("  YŌSO 養素 - Phase 1: Batch image generation")
    print("  17 images total, generated in sequence")
    print("=" * 50)

    print("\n> [01/17] Generating reference logo image...")
    generate(IMAGES[0])

    logo_src = OUTPUT_DIR / "01-logo-dark.jpg"
    REFERENCE_LOGO.write_bytes(logo_src.read_bytes())
    print(f"  Reference logo saved to {REFERENCE_LOGO}")

    for i, item in enumerate(IMAGES[1:], start=2):
        print(f"\n> [{i:02d}/17] {item['filename']}")
        generate(item)
        time.sleep(2)

    print("\n" + "=" * 50)
    print("  All 17 images complete.")
    print(f"  Images saved to: {OUTPUT_DIR}")
    print("=" * 50)
