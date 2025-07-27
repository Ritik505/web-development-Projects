# Currency Converter (Next.js + TypeScript)

A modern, responsive currency converter web app built with Next.js 15, TypeScript, and Tailwind CSS. Instantly convert between 150+ currencies with real-time exchange rates and a beautiful animated UI.

## Features

- Real-time currency conversion using [ExchangeRate-API](https://www.exchangerate-api.com/)
- Custom dropdowns with country flags for currency selection
- Animated, moving gradient background
- Responsive design for mobile and desktop
- Dark/Light mode toggle (top right)
- Accessible, keyboard-friendly UI
- Modern glassmorphism and gradient styling

## Demo

Run locally and visit: [http://localhost:3000](http://localhost:3000)

## Getting Started

### 1. Clone the repository

```bash
git clone <your-repo-url>
cd currency-converter-nextjs
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up environment variables

Create a `.env.local` file in the root directory and add your ExchangeRate-API key:

```
NEXT_PUBLIC_EXCHANGE_API_KEY=your_api_key_here
```

You can get a free API key from [ExchangeRate-API](https://www.exchangerate-api.com/).

### 4. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the app.

## Tech Stack

- [Next.js 15 (App Router, Server/Client Components)](https://nextjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Font Awesome](https://fontawesome.com/)
- [Poppins Font](https://fonts.google.com/specimen/Poppins)

## Accessibility & UX

- Keyboard navigation and focus outlines
- High-contrast color schemes
- Responsive and mobile-friendly

## Credits

- Currency flag images: [flagsapi.com](https://flagsapi.com/)
- Exchange rates: [ExchangeRate-API](https://www.exchangerate-api.com/)
