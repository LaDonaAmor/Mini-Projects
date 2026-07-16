---
name: Craft & Ink
colors:
  surface: "#fcf9f8"
  surface-dim: "#dcd9d9"
  surface-bright: "#fcf9f8"
  surface-container-lowest: "#ffffff"
  surface-container-low: "#f6f3f2"
  surface-container: "#f0eded"
  surface-container-high: "#eae7e7"
  surface-container-highest: "#e5e2e1"
  on-surface: "#1b1b1b"
  on-surface-variant: "#56423c"
  inverse-surface: "#313030"
  inverse-on-surface: "#f3f0ef"
  outline: "#8a726b"
  outline-variant: "#ddc0b8"
  surface-tint: "#9f4021"
  primary: "#9c3e1f"
  on-primary: "#ffffff"
  primary-container: "#bc5634"
  on-primary-container: "#fffbff"
  inverse-primary: "#ffb59e"
  secondary: "#835418"
  on-secondary: "#ffffff"
  secondary-container: "#fdbd77"
  on-secondary-container: "#784a0d"
  tertiary: "#51613f"
  on-tertiary: "#ffffff"
  tertiary-container: "#6a7a56"
  on-tertiary-container: "#f9ffeb"
  error: "#ba1a1a"
  on-error: "#ffffff"
  error-container: "#ffdad6"
  on-error-container: "#93000a"
  primary-fixed: "#ffdbd0"
  primary-fixed-dim: "#ffb59e"
  on-primary-fixed: "#3a0b00"
  on-primary-fixed-variant: "#802a0b"
  secondary-fixed: "#ffdcbb"
  secondary-fixed-dim: "#faba75"
  on-secondary-fixed: "#2b1700"
  on-secondary-fixed-variant: "#673d00"
  tertiary-fixed: "#d7e9bd"
  tertiary-fixed-dim: "#bbcda3"
  on-tertiary-fixed: "#121f05"
  on-tertiary-fixed-variant: "#3d4b2b"
  background: "#fcf9f8"
  on-background: "#1b1b1b"
  surface-variant: "#e5e2e1"
typography:
  headline-xl:
    fontFamily: Bricolage Grotesque
    fontSize: 4rem
    fontWeight: "800"
    lineHeight: "1.1"
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Bricolage Grotesque
    fontSize: 2.5rem
    fontWeight: "800"
    lineHeight: "1.2"
  headline-lg-mobile:
    fontFamily: Bricolage Grotesque
    fontSize: 2rem
    fontWeight: "800"
    lineHeight: "1.2"
  body-lg:
    fontFamily: Work Sans
    fontSize: 1.25rem
    fontWeight: "400"
    lineHeight: "1.6"
  body-md:
    fontFamily: Work Sans
    fontSize: 1rem
    fontWeight: "400"
    lineHeight: "1.6"
  label-md:
    fontFamily: Space Mono
    fontSize: 0.875rem
    fontWeight: "700"
    lineHeight: "1.4"
  label-sm:
    fontFamily: Space Mono
    fontSize: 0.75rem
    fontWeight: "400"
    lineHeight: "1.4"
spacing:
  unit: 0.25rem
  gutter: 1.5rem
  margin-mobile: 1rem
  margin-desktop: 3rem
  border-width: 0.1875rem
  shadow-offset: 0.375rem
---

## Brand & Style

The design system adopts a **Neo-Brutalist Craft** aesthetic, blending the raw, structural honesty of brutalism with the tactile, organic warmth of a physical workshop. The target audience consists of creators and makers who value intentionality and "analog-digital" hybrids.

The visual narrative is "Zine-meets-Desktop." It prioritizes high-contrast layouts, raw edges, and a "stamped" physical presence. By utilizing heavy ink borders and a strictly warm, earth-toned palette, the UI evokes a sense of permanence and handmade quality, intentionally distancing itself from the ephemeral, translucent nature of modern SaaS interfaces.

## Colors

The palette is rooted in natural pigments and heavy ink.

- **Surface**: The background uses a warm cream (#F5EFE3) to mimic premium cardstock or unbleached paper.
- **Accents**: Terracotta serves as the primary action color, Mustard for secondary highlights, and Forest Green for specialized status or tertiary accents.
- **Ink**: All structural elements, text, and borders use Near-black Ink (#1B1B1B) to ensure maximum legibility and a "printed" feel.
- **Constraint**: Blue and purple tones are strictly prohibited to maintain the earthy, craft-focused atmosphere.

## Typography

The typography system relies on extreme contrast between roles.

- **Headings**: Use Bricolage Grotesque (as a characterful alternative to Fraunces) at heavy weights. It provides a chunky, expressive foundation that feels both modern and hand-carved.
- **Body**: Work Sans provides a grounded, legible secondary layer for longer descriptions.
- **Metadata**: Space Mono is used for labels, dates, and tags to reinforce the "technical craft" or "typewritten" aesthetic.

## Layout & Spacing

The layout follows a **Fixed Grid** philosophy on desktop with generous outer margins to simulate a document resting on a desk.

- **Grid**: A 12-column grid for desktop, collapsing to a single column on mobile.
- **Rhythm**: Spacing is strictly based on 0.25rem increments, but components should favor large, "breathable" internal padding (typically 1.5rem or 2rem) to maintain the bold, chunky feel.
- **Alignment**: Elements should feel locked to the grid, but individual items (like chips or stickers) can have a slight 1-2 degree rotation to break the digital perfection.

## Elevation & Depth

This design system rejects shadows with blur. Depth is communicated through **Hard Offset Shadows**:

- **Technique**: A solid fill of the Ink color (#1B1B1B) offset to the bottom-right.
- **Card Depth**: Standard cards use a 0.375rem offset.
- **Interaction**: On "hover," the shadow offset increases (e.g., to 0.625rem) as the element moves slightly up-left. On "active/press," the shadow disappears, and the element translates down-right to the shadow's origin, simulating a physical button press.

## Shapes

The shape language is **Sharp (0)**. Everything is defined by 90-degree angles and heavy 0.1875rem ink strokes. This geometric rigidity provides the necessary "Brutalist" structure to balance the warmth of the color palette. Rounding is only permitted for specific functional metaphors, like a circular "stamp" icon.

## Components

- **Buttons**: Thick 0.1875rem borders, square corners, and solid background fills (Terracotta or Mustard). Text must be uppercase Space Mono. The hover state should trigger a +2 degree rotation to mimic a hand-placed sticker.
- **Cards**: Large containers with a cream background and a 0.1875rem ink border. Every card must have a hard 0.375rem offset shadow.
- **Chips/Tags**: Small rectangular blocks with solid Forest Green or Mustard fills. No shadows on tags to keep them visually subordinate to cards.
- **Input Fields**: Thick bottom-border only (0.3125rem) or a full 0.1875rem box. Use Space Mono for placeholder text to maintain the "form-filler" aesthetic.
- **Lists**: Items separated by heavy horizontal 0.1875rem lines. Bullet points should be replaced with solid squares or custom "X" marks in the Ink color.
- **Checkboxes**: Square boxes with a thick border. When checked, they should be filled with a solid Ink "X" or a solid Terracotta fill.
