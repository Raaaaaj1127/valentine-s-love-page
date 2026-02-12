import { useState, useCallback } from "react";
import { motion } from "framer-motion";

type Player = "❤️" | "💕" | null;
type Board = Player[];

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

// AI that deliberately loses — picks the worst move for 💕
const getLosingMove = (board: Board): number => {
  const empty = board.map((c, i) => (c === null ? i : -1)).filter((i) => i !== -1);
  if (empty.length === 0) return -1;

  // 1. If ❤️ can win next turn, DON'T block (let them win)
  // 2. If 💕 can win, AVOID that move
  // 3. Pick a random non-strategic cell

  // Find moves that would let 💕 win (avoid these)
  const winningMoves = new Set<number>();
  for (const [a, b, c] of winPatterns) {
    const cells = [board[a], board[b], board[c]];
    const empties = [a, b, c].filter((idx) => board[idx] === null);
    if (cells.filter((c) => c === "💕").length === 2 && empties.length === 1) {
      winningMoves.add(empties[0]);
    }
  }

  // Find blocking moves (where ❤️ is about to win) — avoid blocking!
  const blockingMoves = new Set<number>();
  for (const [a, b, c] of winPatterns) {
    const cells = [board[a], board[b], board[c]];
    const empties = [a, b, c].filter((idx) => board[idx] === null);
    if (cells.filter((c) => c === "❤️").length === 2 && empties.length === 1) {
      blockingMoves.add(empties[0]);
    }
  }

  // Prefer moves that don't block ❤️ and don't win for 💕
  const badMoves = empty.filter((m) => !blockingMoves.has(m) && !winningMoves.has(m));
  if (badMoves.length > 0) return badMoves[Math.floor(Math.random() * badMoves.length)];

  // If all moves are strategic, just pick a non-winning one
  const nonWinning = empty.filter((m) => !winningMoves.has(m));
  if (nonWinning.length > 0) return nonWinning[Math.floor(Math.random() * nonWinning.length)];

  return empty[Math.floor(Math.random() * empty.length)];
};

const TicTacToe = () => {
  const [board, setBoard] = useState<Board>(Array(9).fill(null));
  const [winner, setWinner] = useState<string | null>(null);
  const [thinking, setThinking] = useState(false);

  const handleClick = useCallback((i: number) => {
    if (board[i] || winner || thinking) return;

    // Player 1 (❤️) move
    const newBoard = [...board];
    newBoard[i] = "❤️";
    const result = checkWinner(newBoard);
    setBoard(newBoard);
    if (result) { setWinner(result); return; }

    // AI (💕) responds after a short delay
    setThinking(true);
    setTimeout(() => {
      const aiMove = getLosingMove(newBoard);
      if (aiMove === -1) { setThinking(false); return; }
      const aiBoard = [...newBoard];
      aiBoard[aiMove] = "💕";
      setBoard(aiBoard);
      const aiResult = checkWinner(aiBoard);
      if (aiResult) setWinner(aiResult);
      setThinking(false);
    }, 600);
  }, [board, winner, thinking]);

  const reset = () => {
    setBoard(Array(9).fill(null));
    setWinner(null);
    setThinking(false);
  };

  return (
    <div className="text-center">
      <h3 className="text-4xl font-romantic text-foreground mb-2">Love Tic-Tac-Toe</h3>
      <p className="text-muted-foreground font-body mb-6">You're ❤️ — try to win! 💘</p>

      {winner && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="mb-4 text-2xl font-romantic text-foreground"
        >
          {winner === "draw" ? "It's a love tie! 🤝💕" : winner === "❤️" ? "You won! 🎉💖" : "💕 wins! Try again!"}
        </motion.div>
      )}

      <div className="grid grid-cols-3 gap-2 w-fit mx-auto mb-6">
        {board.map((cell, i) => (
          <motion.button
            key={i}
            whileHover={!cell && !winner && !thinking ? { scale: 1.05 } : {}}
            whileTap={!cell && !winner && !thinking ? { scale: 0.95 } : {}}
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

      {thinking && (
        <p className="text-sm text-muted-foreground mb-3 font-body animate-pulse">
          💕 is thinking...
        </p>
      )}

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
