// ─── Result.jsx ───────────────────────────────────────────────────────────────
// Final result screen shown after all questions are answered.
// Props:
//   score     — number of correct answers
//   total     — total number of questions
//   onRestart — function to go back to the start screen
// ─────────────────────────────────────────────────────────────────────────────

export default function Result({ score, total, onRestart }) {

  // Calculate percentage score
  const pct = Math.round((score / total) * 100)

  // Choose emoji and message based on score percentage
  const emoji = pct >= 80 ? '🏆' : pct >= 60 ? '😊' : pct >= 40 ? '😅' : '😢'
  const msg   = pct >= 80 ? 'Excellent!' : pct >= 60 ? 'Good Job!' : pct >= 40 ? 'Keep Practicing!' : 'Better Luck Next Time!'

  return (
    <div className="bg-white rounded-3xl shadow-2xl p-10 max-w-md w-full text-center">
      <div className="text-7xl mb-4">{emoji}</div>
      <h2 className="text-3xl font-bold text-gray-800 mb-2">{msg}</h2>
      <p className="text-gray-500 mb-6">You scored {score} out of {total}</p>

      {/* Circular progress ring using conic-gradient */}
      <div
        className="w-32 h-32 mx-auto rounded-full flex items-center justify-center mb-6"
        style={{ background: `conic-gradient(#7c3aed ${pct}%, #f3f4f6 0%)` }}
      >
        {/* White circle in center to create "donut" ring effect */}
        <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center">
          <span className="text-2xl font-bold text-violet-600">{pct}%</span>
        </div>
      </div>

      {/* Restart button — calls onRestart to go back to StartScreen */}
      <button
        onClick={onRestart}
        className="w-full bg-violet-600 text-white py-4 rounded-2xl font-bold text-lg hover:bg-violet-700 transition-colors"
      >
        Try Again
      </button>
    </div>
  )
}
