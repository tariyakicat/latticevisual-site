from pathlib import Path

from PIL import Image, ImageDraw


OUT = Path("public/images/brume")
OUT.mkdir(parents=True, exist_ok=True)

FUMEE = (26, 25, 23)
IVOIRE = (245, 242, 236)
CUIVRE = (168, 128, 90)
BRUME = (200, 201, 196)
ENCRE = (45, 48, 51)


def draw_void_mark(draw, cx, cy, height, fill, void_fill):
    half = height / 2
    points = [(cx, cy - half), (cx + half, cy), (cx, cy + half), (cx - half, cy)]
    draw.polygon(points, fill=fill)
    radius = height * 0.42 / 2
    draw.ellipse((cx - radius, cy - radius, cx + radius, cy + radius), fill=void_fill)


def save_logo(path, bg, mark):
    size = 1024
    image = Image.new("RGB", (size, size), bg)
    draw = ImageDraw.Draw(image)
    mark_h = size * 0.3
    draw_void_mark(draw, size / 2, size / 2, mark_h, mark, bg)
    image.save(OUT / path, quality=95)


def save_palette():
    width, height = 1792, 1024
    image = Image.new("RGB", (width, height), IVOIRE)
    draw = ImageDraw.Draw(image)
    colors = [FUMEE, IVOIRE, CUIVRE, BRUME, ENCRE]
    swatch_w = width // len(colors)
    for index, color in enumerate(colors):
        x0 = index * swatch_w
        x1 = width if index == len(colors) - 1 else (index + 1) * swatch_w
        draw.rectangle((x0, 0, x1, height), fill=color)
    image.save(OUT / "03-palette.jpg", quality=95)


if __name__ == "__main__":
    save_logo("01-logo-dark.jpg", FUMEE, IVOIRE)
    save_logo("02-logo-light.jpg", IVOIRE, FUMEE)
    save_palette()
    print("Created BRUME brand assets in public/images/brume")
