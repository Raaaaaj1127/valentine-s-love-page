import { useState } from "react";
import { motion } from "framer-motion";

type Player = "❤️" | "💕" | null;
type Board = Player[];

const TicTacToe = () => {
  const [board, setBoard] = useState<Board>(Array(9).fill(null));
  const [isFirstPlayer, setIsFirstPlayer] = useState(true);
  const [winner, setWinner] = useState<string | null>(null);

  const winPatterns = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6],
  ];

  const checkWinner = (b: Board): string | null => {
    for (const [a, bIdx, c] of winPatterns) {
      if (b[a] && b[a] === b[bIdx] && b[a] === b[c]) return b[a]!;
    }
    if (b.every((cell) => cell !== null)) return "draw";
    return null;
  };

  const handleClick = (i: number) => {
    if (board[i] || winner) return;
    const newBoard = [...board];
    newBoard[i] = isFirstPlayer ? "❤️" : "💕";
    setBoard(newBoard);
    setIsFirstPlayer(!isFirstPlayer);
    const result = checkWinner(newBoard);
    if (result) setWinner(result);
  };

  const reset = () => {
    setBoard(Array(9).fill(null));
    setIsFirstPlayer(true);
    setWinner(null);
  };

  return (
    <div className="text-center">
      <h3 className="text-4xl font-romantic text-foreground mb-2">Love Tic-Tac-Toe</h3>
      <p className="text-muted-foreground font-body mb-6">Play together with hearts! 💘</p>

      {winner && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="mb-4 text-2xl font-romantic text-foreground"
        >
          {winner === "draw" ? "It's a love tie! 🤝💕" : `${winner} wins! 🎉`}
        </motion.div>
      )}

      <div className="grid grid-cols-3 gap-2 w-fit mx-auto mb-6">
        {board.map((cell, i) => (
          <motion.button
            key={i}
            whileHover={!cell && !winner ? { scale: 1.05 } : {}}
            whileTap={!cell && !winner ? { scale: 0.95 } : {}}
            onClick={() => handleClick(i)}
            className="w-20 h-20 md:w-24 md:h-24 bg-card rounded-xl shadow-soft border border-border flex items-center justify-center text-3xl md:text-4xl transition-colors hover:bg-secondary"
          >
            {cell && (
              <motion.span
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: "spring", stiffness: 200 }}
              >
                {cell}
              </motion.span>
            )}
          </motion.button>
        ))}
      </div>

      <p className="text-sm text-muted-foreground mb-3 font-body">
        Current: {isFirstPlayer ? "❤️" : "💕"}
      </p>

      <button
        onClick={reset}
        className="bg-gradient-romantic text-primary-foreground font-romantic text-lg px-6 py-2 rounded-full shadow-romantic hover:opacity-90 transition-opacity"
      >
        Play Again 💝
      </button>
    </div>
  );
};

export default TicTacToe;
