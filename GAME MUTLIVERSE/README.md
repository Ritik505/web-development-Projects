# Game Multiverse

A premium gaming platform that brings together HTML5 and Web3 games in one place.

## Features

- Modern, responsive UI with dark theme and neon accents
- Parallax scrolling and smooth animations
- Support for both HTML5 and Web3 games
- Easy game integration system

## Tech Stack

- React 18
- React Router v6
- Tailwind CSS
- Framer Motion
- Vite

## Project Structure

```
game-multiverse/
├── public/
│   ├── assets/
│   │   ├── logo.png
│   │   └── bg.jpg
│   └── games/
│       ├── car-game/
│       ├── quiz-game/
│       └── ...
├── src/
│   ├── components/
│   │   └── GameFrame.jsx
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── About.jsx
│   │   └── Contact.jsx
│   ├── web3/
│   │   ├── Web3Game1.jsx
│   │   └── Web3Game2.jsx
│   ├── App.jsx
│   └── main.jsx
└── package.json
```

## Getting Started

1. Clone the repository:
```bash
git clone https://github.com/yourusername/game-multiverse.git
cd game-multiverse
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Build for production:
```bash
npm run build
```

## Adding New Games

### HTML5 Games
1. Create a new folder in `public/games/` with your game files
2. Add the game to the `games` array in `src/pages/Home.jsx`

### Web3 Games
1. Create a new component in `src/web3/`
2. Add the route in `src/App.jsx`
3. Add the game to the `games` array in `src/pages/Home.jsx`

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details. 