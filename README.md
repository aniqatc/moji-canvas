# moji-canvas

🎨 An interactive emoji-based sticker canvas.

<a href="https://moji.aniqa.dev"><img src="/public/og-img.png" alt="Moji Canvas Demo" /></a>

## Tech

- React
- Vite
- Tailwind
- Framer Motion

## Libraries

- [OpenMoji](https://openmoji.org/) - Emoji/sticker assets
- [Phosphor Icons](https://phosphoricons.com/) - Icon set
- [Radix UI](https://www.radix-ui.com/) - Custom select component
- [React-Share](https://github.com/nygardk/react-share) - Social media sharing
- [HTML-to-Image](https://github.com/bubkoo/html-to-image) - Canvas export functionality

## Features

- Choose from 4,000+ illustrations across 10 unique themes
- Add, remove, and freely arrange stickers on the canvas
- Customize background colors and patterns
- Animate stickers with floating, rotating, and scaling effects (*however, for performance reasons, animations are disabled if there are more than 40 stickers in the canvas*)
- Save your creations to browser storage for future editing
- Download your canvas as a high-quality PNG image
- Share your creations directly to social media
- Fully responsive design that works seamlessly across devices
- PWA support
- Dynamic designer credits that automatically update based on stickers in use

## Project Structure

- `/assets`
    - SVG files for heading and custom Radix UI select component

- `/components`
    - `heading/`: Logo, hint text, and tooltip components
    - `modals/`: Share modal for social media integration and info modal for application details & credits
    - `reusable/`: Common UI components (modal, toolbar buttons, info button, range slider)
    - `toolbar/`: Canvas control components including:
        - Action buttons
        - Animation controls
        - Background customization
        - Size controls
        - Sticker management
        - Theme selector

- `/utils`
    - `download.js`: Canvas-to-PNG export functionality using html-to-image
    - `stickers.js`: Sticker management utilities including random sticker generation and helper functions

## Available Scripts

Built with [Vite](https://vite.dev/). Available scripts include:

- `npm start`: Start development server
- `npm run build`: Create production build
- `npm run preview`: Preview production build
- `npm run lint`: Run ESLint
- `npm run format`: Format code with Prettier
- `npm run serve:mobile`: Preview development server on mobile