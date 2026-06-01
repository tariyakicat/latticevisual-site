from pathlib import Path

from PIL import Image, ImageDraw


OUT = Path("public/images/atlan")
OUT.mkdir(parents=True, exist_ok=True)

BONE = (244, 239, 230)
CHARCOAL = (28, 28, 26)
BRASS = (184, 149, 106)
MIST = (230, 233, 228)
DUSK = (58, 56, 50)


def draw_plumb_mark(draw, cx, top, height, color):
    line_h = height * 0.6
    circle_d = height * 0.4
    stroke = max(3, int(height * 0.03))
    circle_r = circle_d / 2
    circle_cy = top + line_h + circle_r
    draw.line((cx, top, cx, top + line_h), fill=color, width=stroke)
    draw.ellipse(
        (cx - circle_r, circle_cy - circle_r, cx + circle_r, circle_cy + circle_r),
        fill=color,
    )


def save_logo(path, bg, mark):
    size = 1024
    image = Image.new("RGB", (size, size), bg)
    draw = ImageDraw.Draw(image)
    mark_h = int(size * 0.3)
    top = (size - mark_h) / 2
    draw_plumb_mark(draw, size / 2, top, mark_h, mark)
    image.save(OUT / path, quality=95)


def save_palette():
    width, height = 1792, 1024
    image = Image.new("RGB", (width, height), BONE)
    draw = ImageDraw.Draw(image)
    colors = [BONE, CHARCOAL, BRASS, MIST, DUSK]
    swatch_w = width // len(colors)
    for index, color in enumerate(colors):
        x0 = index * swatch_w
        x1 = width if index == len(colors) - 1 else (index + 1) * swatch_w
        draw.rectangle((x0, 0, x1, height), fill=color)
    image.save(OUT / "03-palette.jpg", quality=95)


if __name__ == "__main__":
    save_logo("01-logo-dark.jpg", CHARCOAL, BONE)
    save_logo("02-logo-light.jpg", BONE, CHARCOAL)
    save_palette()
    Path("reference_logo.png").write_bytes((OUT / "01-logo-dark.jpg").read_bytes())
    print("Created ATLAN brand assets in public/images/atlan")
