# moji-canvas

🎨 An interactive emoji-based sticker canvas.

<a href="https://moji.aniqa.dev"><img src="/public/og-img.png" alt="Moji Canvas Demo" /></a>

## Tech

- React
- React Router DOM
- Vite
- Tailwind
- Framer Motion
- Supabase

## Libraries

- [OpenMoji](https://openmoji.org/) - Emoji/sticker assets
- [Phosphor Icons](https://phosphoricons.com/) - Icon set
- [Radix UI](https://www.radix-ui.com/) - Custom select component
- [React-Share](https://github.com/nygardk/react-share) - Social media sharing
- [HTML-to-Image](https://github.com/bubkoo/html-to-image) - Canvas export functionality
- [Focus Lock](https://www.npmjs.com/package/react-focus-lock) - Lock focus to modals

## Features

- Choose from 4,000+ illustrations across 10 unique themes
- Add, remove, and freely arrange stickers on the canvas
- Customize background colors and patterns
- Animate stickers with floating, rotating, and scaling effects (_however, for performance reasons, animations are disabled if there are more than 40 stickers in the canvas_)
- Save your creations to browser storage for future editing (and a shareable link for collaborative edits)
- Download your canvas as a high-quality PNG image
- Share your creations directly to social media with a unique link (e.g. [https://moji.aniqa.dev/95a22e4c-9006-480c-bb15-7443b0d1a508](https://moji.aniqa.dev/95a22e4c-9006-480c-bb15-7443b0d1a508))
- Fully responsive design that works seamlessly across devices
- PWA support
- Dynamic designer credits that automatically update based on stickers in use
- Accessibility features including keyboard controls and ARIA labels for screen reader compatibility

## Key Concepts

- Utilizes custom hooks to aid in state management across the application (`useAnimation`, `useKey`, `useLocalStorage`, `useMetadata`, `useModal`)
- Implements reusable components (modals, buttons, sliders, notification and info button)
- Leverages React Router DOM to handle custom canvas URLs for sharing
- Manages complex user interactions through event handling and state tracking
- Conditional rendering of certain toolbar options (e.g. animations are disabled after 40 stickers are added or download button is disabled until stickers are added to the canvas)
- Implements prop drilling to pass data between different components
- Utilizes `useEffect` to fetch metadata (which is handled within the custom `useMetadata` hook)
- Integrates with Supabase for cloud storage and retrieval of canvas data
- Provides additional accessibility access for users using keyboard to navigate
- Uses Framer Motion for dragging and animations
- PWA functionality with service worker configured to cache all (4000+) stickers, allowing for offline usage

## Project Structure

- `App.jsx`: Main app logic
  - dynamically loads canvas data from database if canvasId is present, otherwise, localStorage and fallback values are used
  - handles user interactions
  - handle state management
  - displays relevant toast notifications
  - integrates components based on the states and user interactions
- `AppRouter.jsx`: Defines default route and dynamic canvas routes (based on canvasId param)

- `/assets`

  - SVG files, specifically for the heading and custom Radix UI select components

- `/components`

  - `heading/`: Logo, hint text, and tooltip components
  - `modals/`: Share modal for social media sharing and info modal for application details & credits
  - `reusable/`: Common UI components (modal, toolbar buttons, info button, range slider, and toast notification)
  - `toolbar/`: Canvas control components including:
    - Action buttons
    - Animation controls
    - Background customization
    - Size controls
    - Sticker management
    - Theme selector
  - `sticker/`: Handles individual sticker components; manages positions, animations, and metadata
  - `canvas/`: Manages background color, dot color, and provides reference for dragging mechanism provided by Framer Motion

- `/utils`

  - `download.js`: PNG export functionality using html-to-image
  - `stickers.js`: Utilities for sticker management, including random sticker generation and random position/size helper functions
  - `canvas.js`: Manages canvas interactions based on sticker mode (add/remove) and updates relevant states

- `/hooks`

  - `useAnimation.js`: Bundles all animation/transformation-related state variables and setter functions, in addition to helper functions (such as, resetting animation states)
  - `useLocalStorage.js`: Handles saving and retrieving items from localStorage
  - `useMetadata.js`: Performs the initial fetch for the JSON file that contains the stickers metadata
  - `useModal.js`: Provides modal open/close toggle functionality
  - `useKey.js`: Handles keypress events to trigger specific actions (e.g. add or remove stickers based on sticker mode, close modal with escape button, reset canvas with backspace)

- `/data`
  - `supabase.js`: Provides functions for fetching, updating and saving canvas content/metadata to the database

## Available Scripts

Built with [Vite](https://vite.dev/). Available scripts include:

- `npm start`: Start development server
- `npm run build`: Create production build
- `npm run preview`: Preview production build
- `npm run lint`: Run ESLint
- `npm run format`: Format code with Prettier
- `npm run serve:mobile`: Preview development server on mobile
