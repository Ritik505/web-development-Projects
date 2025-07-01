import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import GameFrame from './components/GameFrame';
import LotteryGame from './web3/LotteryGame/App';
import AVAXCarGame from './web3/AVAXCar/index';
import './App.css';

const gamePaths = [
  '/games/car-game',
  '/games/quiz-game',
  '/games/rock-paper-scissor',
  '/games/snake',
  '/games/space-war',
  '/games/tic-tac-toe',
  '/games/guess-number',
  '/games/lottery',
  '/games/avax-racing',
];

const AppContent = () => {
  const location = useLocation();

  const isGamePage = location.pathname.startsWith('/games/');

  return (
    <div className="App"> 
      {!isGamePage && <Navbar />}
      
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/games/car-game" element={<GameFrame gamePath="/games/car-game/CarGame.html" title="Car Game" />} />
        <Route path="/games/quiz-game" element={<GameFrame gamePath="/games/quiz-game/Quiz.html" title="Quiz Game" />} />
        <Route path="/games/rock-paper-scissor" element={<GameFrame gamePath="/games/rock-paper-scissor/RockPaperScissor.html" title="Rock Paper Scissors" />} />
        <Route path="/games/snake" element={<GameFrame gamePath="/games/snake/Snake.html" title="Snake Game" />} />
        <Route path="/games/space-war" element={<GameFrame gamePath="/games/space-war/SpaceWar.html" title="Space War" />} />
        <Route path="/games/tic-tac-toe" element={<GameFrame gamePath="/games/tic-tac-toe/TicTacToe.html" title="Tic Tac Toe" />} />
        <Route path="/games/guess-number" element={<GameFrame gamePath="/games/guess-number/GuessNumber.html" title="Guess Number" />} />
        <Route path="/games/lottery" element={<LotteryGame />} />
        <Route path="/games/avax-racing" element={<AVAXCarGame />} />
      </Routes>
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;