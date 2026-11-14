# F1 GRIDLE — Open-Source Repositories & UI Design Systems

This document catalogs every open-source Git repository, animation library, component design system, and icon asset suite integrated into **F1 GRIDLE**, corresponding directly to the curated bookmarks and design libraries specified for this project.

---

## 1. Motion & Animation Engines

### [DavidHDev/react-bits](https://github.com/DavidHDev/react-bits)
- **Repository**: [https://github.com/DavidHDev/react-bits](https://github.com/DavidHDev/react-bits)
- **Website**: [https://reactbits.dev](https://reactbits.dev)
- **Role in App**:
  - `DecryptedText` ([src/components/reactbits/DecryptedText.tsx](file:///c:/Users/jaina_2j2vl9z/Desktop/Code/game/src/components/reactbits/DecryptedText.tsx)): Tactical cipher scrambling effect used on Pit Wall Radio audio transcripts and progressive sector telemetry hints.
  - `ShinyText` ([src/components/reactbits/ShinyText.tsx](file:///c:/Users/jaina_2j2vl9z/Desktop/Code/game/src/components/reactbits/ShinyText.tsx)): Metallic chrome luster reflections across the F1 GRIDLE brand mark and trophy titles.
  - `SpotlightCard` ([src/components/reactbits/SpotlightCard.tsx](file:///c:/Users/jaina_2j2vl9z/Desktop/Code/game/src/components/reactbits/SpotlightCard.tsx)): Dynamic cursor-following radial spotlight illumination on telemetry cards.

### [ibelick/motion-primitives](https://github.com/ibelick/motion-primitives)
- **Repository**: [https://github.com/ibelick/motion-primitives](https://github.com/ibelick/motion-primitives)
- **Website**: [https://motion-primitives.com](https://motion-primitives.com)
- **Role in App**:
  - `GlowEffect` ([src/components/motion-primitives/GlowEffect.tsx](file:///c:/Users/jaina_2j2vl9z/Desktop/Code/game/src/components/motion-primitives/GlowEffect.tsx)): Pulsing aerodynamic ambient border luminescence adapting to the active team livery color.

### [juliangarnier/anime](https://github.com/juliangarnier/anime) (Anime.js)
- **Repository**: [https://github.com/juliangarnier/anime](https://github.com/juliangarnier/anime)
- **Website**: [https://animejs.com](https://animejs.com)
- **Role in App**:
  - `TachometerSweep` ([src/components/anime/TachometerSweep.tsx](file:///c:/Users/jaina_2j2vl9z/Desktop/Code/game/src/components/anime/TachometerSweep.tsx)): High-frame-rate analog RPM needle physics, gear shift transitions, and tachometer sweeps.

### [motiondivision/motion](https://github.com/motiondivision/motion) (Framer Motion)
- **Repository**: [https://github.com/motiondivision/motion](https://github.com/motiondivision/motion)
- **Website**: [https://motion.dev](https://motion.dev)
- **Role in App**:
  - Powers staggered row entries in `FeedbackGrid`, 3D card flips on driver comparison tiles, modal spring physics, and animated layout transitions (`layoutId="main-nav-pill"`).

---

## 2. Arts, Icons & Illustrations

### [realvjy/3dicons](https://github.com/realvjy/3dicons)
- **Repository**: [https://github.com/realvjy/3dicons](https://github.com/realvjy/3dicons)
- **Website**: [https://3dicons.co](https://3dicons.co)
- **Role in App**:
  - `Icon3D` ([src/components/icons3d/Icon3D.tsx](file:///c:/Users/jaina_2j2vl9z/Desktop/Code/game/src/components/icons3d/Icon3D.tsx)): Custom 3D isometric shaded vector assets representing:
    - Drivers' Helmets
    - Grand Prix Cars
    - Pirelli Tire Compounds (Soft Red, Medium Yellow, Hard White)
    - FIA Stopwatches, Radio Transmitters, Chequered Flags, and Golden Championship Cups.

### [PabloStanley/Open-Peeps](https://github.com/PabloStanley/Open-Peeps)
- **Repository**: [https://github.com/PabloStanley/Open-Peeps](https://github.com/PabloStanley/Open-Peeps)
- **Website**: [https://openpeeps.com](https://openpeeps.com)
- **Role in App**:
  - `DriverAvatar` ([src/components/avatars/DriverAvatar.tsx](file:///c:/Users/jaina_2j2vl9z/Desktop/Code/game/src/components/avatars/DriverAvatar.tsx)): Procedural driver illustration system combining nationality flags, headshot representations, and team color borders.

### [KaterinaLimpitsouni/undraw](https://undraw.co)
- **Website**: [https://undraw.co](https://undraw.co)
- **Role in App**:
  - Clean SVG illustrations for empty telemetry states, post-race trophy room showcases, and help modal guides.

---

## 3. UI Component Libraries & Landing Page Systems

### [magicuidesign/magicui](https://github.com/magicuidesign/magicui)
- **Repository**: [https://github.com/magicuidesign/magicui](https://github.com/magicuidesign/magicui)
- **Website**: [https://magicui.design](https://magicui.design)
- **Role in App**:
  - `Marquee` ([src/components/magicui/Marquee.tsx](file:///c:/Users/jaina_2j2vl9z/Desktop/Code/game/src/components/magicui/Marquee.tsx)): Infinite scrolling broadcast telemetry ticker displaying track flags, weather, and speed traps.
  - `RetroGrid` ([src/components/magicui/RetroGrid.tsx](file:///c:/Users/jaina_2j2vl9z/Desktop/Code/game/src/components/magicui/RetroGrid.tsx)): Perspective grid backdrop evoking retro telemetry simulators.
  - `NumberTicker` ([src/components/magicui/NumberTicker.tsx](file:///c:/Users/jaina_2j2vl9z/Desktop/Code/game/src/components/magicui/NumberTicker.tsx)): Fast rolling counter for stats (GP wins, podiums, championship counts).
  - `BorderBeam` ([src/components/magicui/BorderBeam.tsx](file:///c:/Users/jaina_2j2vl9z/Desktop/Code/game/src/components/magicui/BorderBeam.tsx)): Moving laser border beams on active Grand Prix winners.

### [aceternity/aceternity-ui](https://github.com/aceternity/aceternity-ui)
- **Repository**: [https://github.com/aceternity/aceternity-ui](https://github.com/aceternity/aceternity-ui)
- **Website**: [https://ui.aceternity.com](https://ui.aceternity.com)
- **Role in App**:
  - `SparklesCore` ([src/components/aceternity/SparklesCore.tsx](file:///c:/Users/jaina_2j2vl9z/Desktop/Code/game/src/components/aceternity/SparklesCore.tsx)): Dynamic ambient particle system celebrating Grand Prix victories and podium results.
  - `TracingBeam` ([src/components/aceternity/TracingBeam.tsx](file:///c:/Users/jaina_2j2vl9z/Desktop/Code/game/src/components/aceternity/TracingBeam.tsx)): Glowing scroll tracer on Career Timeline paths.

### [21st.dev / Watermelon UI](https://21st.dev)
- **Website**: [https://21st.dev](https://21st.dev)
- **Role in App**:
  - `AnimatedTabs` ([src/components/watermelon/AnimatedTabs.tsx](file:///c:/Users/jaina_2j2vl9z/Desktop/Code/game/src/components/watermelon/AnimatedTabs.tsx)): Floating pill tabs with spring physics for main cockpit modes.
  - `MotionButton` ([src/components/watermelon/MotionButton.tsx](file:///c:/Users/jaina_2j2vl9z/Desktop/Code/game/src/components/watermelon/MotionButton.tsx)): Tactile press-down buttons with sound triggers for retire, replay, and results.

### [shadcn-ui/ui](https://github.com/shadcn-ui/ui)
- **Repository**: [https://github.com/shadcn-ui/ui](https://github.com/shadcn-ui/ui)
- **Website**: [https://ui.shadcn.com](https://ui.shadcn.com)
- **Role in App**:
  - Foundation UI primitives ([src/components/ui/](file:///c:/Users/jaina_2j2vl9z/Desktop/Code/game/src/components/ui/)): Radix UI accessible Dialogs, Tooltips, Tabs, Badges, and Inputs.

---

## 4. Main Project Repository

### [Anshuljain22/Gridle](https://github.com/Anshuljain22/Gridle)
- **GitHub**: [https://github.com/Anshuljain22/Gridle](https://github.com/Anshuljain22/Gridle)
- **Primary Branch**: `main`
- **Deployment Platform**: Vercel
