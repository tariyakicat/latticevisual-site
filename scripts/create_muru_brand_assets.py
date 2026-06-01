from pathlib import Path

from PIL import Image, ImageDraw


OUT = Path("public/images/muru")
OUT.mkdir(parents=True, exist_ok=True)

CLAY = (196, 168, 130)
ASH = (240, 237, 232)
IRON = (44, 41, 38)
FOG = (184, 186, 181)
OXIDE = (107, 90, 78)


def draw_muru_mark(draw, cx, cy, diameter, color):
    stroke = max(2, int(diameter * 0.028))
    radius = diameter / 2
    distance = diameter * 0.65
    left_cx = cx - distance / 2
    right_cx = cx + distance / 2
    for circle_cx in (left_cx, right_cx):
        draw.ellipse(
            (circle_cx - radius, cy - radius, circle_cx + radius, cy + radius),
            outline=color,
            width=stroke,
        )


def save_logo(path, bg, mark):
    size = 1024
    image = Image.new("RGB", (size, size), bg)
    draw = ImageDraw.Draw(image)
    mark_width = size * 0.32
    diameter = mark_width / 1.65
    draw_muru_mark(draw, size / 2, size / 2, diameter, mark)
    image.save(OUT / path, quality=95)


def save_palette():
    width, height = 1792, 1024
    image = Image.new("RGB", (width, height), ASH)
    draw = ImageDraw.Draw(image)
    colors = [CLAY, ASH, IRON, FOG, OXIDE]
    swatch_w = width // len(colors)
    for index, color in enumerate(colors):
        x0 = index * swatch_w
        x1 = width if index == len(colors) - 1 else (index + 1) * swatch_w
        draw.rectangle((x0, 0, x1, height), fill=color)
    image.save(OUT / "03-palette.jpg", quality=95)


if __name__ == "__main__":
    save_logo("01-logo-dark.jpg", IRON, ASH)
    save_logo("02-logo-light.jpg", ASH, IRON)
    save_palette()
    print("Created MURU brand assets in public/images/muru")
