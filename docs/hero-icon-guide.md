# Hero Background Icons (HeroSection)

Quick notes for swapping the rotating rectangles in the hero background with your own icons and keeping the same motion.

## Where to edit
- File: `src/components/HeroSection.tsx`
- Replace the geometric shape map near the comment `Geometric shapes - only render if motion enabled`.

## Steps for WebP (current assets)
1. Import your icon(s) near the top of `HeroSection.tsx`, e.g. `import StarIcon from '../assets/star.webp';`
2. In the `geometricShapes` map, replace the `motion.div` rectangles with `motion.img`:
   ```tsx
   <motion.img
     key={i}
     src={StarIcon} // or shape.icon if you assign different ones
     alt=""
     className="absolute pointer-events-none"
     style={{
       top: shape.top,
       left: shape.left,
       width: `${shape.width}px`,
       height: `${shape.height}px`,
       opacity: 0.25,
       rotate: `${shape.rotate}deg`,
       willChange: 'transform',
     }}
     animate={{ rotate: [0, 360], scale: [1, 1.2, 1] }}
     transition={{ duration: shape.duration, repeat: Infinity, ease: 'linear' }}
   />
   ```
3. Keep the existing random layout (`top/left/width/height/rotate/duration`) so the motion and spread stay the same.
4. If you want multiple icons, add an `icon` property in the `geometricShapes` memo (cycle through an array of imports) and set `src={shape.icon}`.

## If you switch to SVG later
- Wrap your React SVG in `motion`: `const MotionLogo = motion(LogoIcon);`
- Use `<MotionLogo ... animate={{ rotate: [0, 360], scale: [1, 1.2, 1] }} transition={{ duration: shape.duration, repeat: Infinity, ease: 'linear' }} />`.
- Set `style` for `top/left/width/height/rotate` the same way as above.

## Image format choices (pros/cons)
- **WebP**: small file sizes and supports transparency; good for photos and flat art. Slightly less universal than PNG/JPEG but fine for modern browsers.
- **PNG**: sharp edges and alpha; heavier than WebP; great for UI glyphs if SVG is not available.
- **SVG**: vector crisp at any size; smallest for simple shapes; easy to tint via CSS; best if you want stroke/fill control. Not ideal for photo-like art.

## Quick checklist
- Keep `pointer-events: none` so icons do not block clicks.
- Match opacity and optional `mixBlendMode: 'screen'` if you want them to blend like the current outlines.
- Leave the motion props (`rotate` loop + `scale` loop, `repeat: Infinity`) unchanged to preserve the existing vibe.
