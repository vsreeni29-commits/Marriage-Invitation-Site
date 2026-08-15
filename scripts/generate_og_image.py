"""Render the 1200×630 WhatsApp/Open Graph image without external services."""

from __future__ import annotations

from pathlib import Path

from PIL import Image, ImageDraw, ImageFont


WIDTH, HEIGHT = 1200, 630
SERIF = "/usr/share/fonts/truetype/dejavu/DejaVuSerif.ttf"
SERIF_ITALIC = "/usr/share/fonts/truetype/dejavu/DejaVuSerif.ttf"
SANS_BOLD = "/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf"


def centered_text(
    draw: ImageDraw.ImageDraw,
    y: int,
    value: str,
    font: ImageFont.FreeTypeFont,
    fill: str,
) -> None:
    bounds = draw.textbbox((0, 0), value, font=font)
    x = (WIDTH - (bounds[2] - bounds[0])) / 2
    draw.text((x, y), value, font=font, fill=fill)


def main() -> None:
    image = Image.new("RGB", (WIDTH, HEIGHT), "#fbf6ed")
    pixels = image.load()
    start = (251, 246, 237)
    end = (238, 226, 207)
    for y in range(HEIGHT):
        ratio = y / (HEIGHT - 1)
        color = tuple(round(start[index] * (1 - ratio) + end[index] * ratio) for index in range(3))
        for x in range(WIDTH):
            pixels[x, y] = color

    draw = ImageDraw.Draw(image, "RGBA")
    for offset in range(-HEIGHT, WIDTH + HEIGHT, 28):
        draw.line((offset, HEIGHT, offset + HEIGHT, 0), fill=(185, 154, 94, 17), width=1)

    draw.rounded_rectangle((32, 32, 1168, 598), radius=8, outline=(185, 154, 94, 122), width=2)
    draw.rounded_rectangle((48, 48, 1152, 582), radius=6, outline=(185, 154, 94, 48), width=1)

    for radius, alpha in ((278, 15), (220, 18), (160, 20)):
        draw.ellipse(
            (600 - radius, 290 - radius, 600 + radius, 290 + radius),
            fill=(213, 186, 125, alpha),
        )

    # Left: kolam circles. Right: arch/geometric frame.
    for x, y in ((130, 219), (72, 277), (188, 277), (72, 335), (188, 335), (130, 393)):
        draw.ellipse((x - 58, y - 58, x + 58, y + 58), outline=(49, 89, 74, 80), width=3)
    draw.polygon(
        ((1070, 173), (1162, 226), (1162, 404), (1070, 457), (978, 404), (978, 226)),
        outline=(97, 47, 53, 62),
        width=3,
    )
    draw.polygon(
        ((1070, 219), (1128, 252), (1128, 378), (1070, 411), (1012, 378), (1012, 252)),
        outline=(97, 47, 53, 55),
        width=2,
    )

    # Central fusion mark.
    for x, y in ((600, 80), (572, 108), (628, 108), (600, 136)):
        draw.ellipse((x - 28, y - 28, x + 28, y + 28), outline=(185, 154, 94, 210), width=2)
    draw.polygon(
        ((600, 80), (648, 108), (648, 164), (600, 192), (552, 164), (552, 108)),
        outline=(185, 154, 94, 190),
        width=2,
    )
    draw.ellipse((594, 102, 606, 114), fill=(185, 154, 94, 230))

    centered_text(draw, 177, "TWO ROOTS  ·  ONE STORY", ImageFont.truetype(SANS_BOLD, 18), "#a8664d")
    centered_text(draw, 241, "Rinsha & Sreeni", ImageFont.truetype(SERIF, 90), "#183d33")
    draw.line((430, 362, 560, 362), fill="#b99a5e", width=2)
    draw.line((640, 362, 770, 362), fill="#b99a5e", width=2)
    draw.polygon(((600, 355), (607, 362), (600, 369), (593, 362)), outline="#b99a5e", width=2)
    centered_text(draw, 398, "17 SEPTEMBER 2026", ImageFont.truetype(SANS_BOLD, 25), "#282b28")
    centered_text(draw, 447, "Chennai", ImageFont.truetype(SERIF_ITALIC, 29), "#612f35")
    centered_text(
        draw,
        523,
        "TWO TRADITIONS  ·  TWO CULTURES  ·  ONE BEAUTIFUL BEGINNING",
        ImageFont.truetype(SANS_BOLD, 16),
        "#5d5b54",
    )

    output = Path("public/og-image.png")
    image.save(output, optimize=True)
    print("Created " + str(output) + " (" + str(round(output.stat().st_size / 1024)) + " KiB)")


if __name__ == "__main__":
    main()
