// ─── StartScreen.jsx ──────────────────────────────────────────────────────────
// The intro screen shown before the quiz begins.
// Props:
//   total   — number of questions (shown in the description)
//   onStart — function called when user clicks "Start Quiz"
// ─────────────────────────────────────────────────────────────────────────────

export default function StartScreen({ onStart, total }) {
  return (
    <div className="bg-white rounded-3xl shadow-2xl p-10 max-w-md w-full text-center">
      <div className="text-6xl mb-4">🧠</div>
      <h1 className="text-3xl font-bold text-gray-800 mb-2">React Quiz</h1>
      <p className="text-gray-500 mb-6">{total} questions about React, Vite &amp; Tailwind CSS</p>

      {/* Instructions box with soft violet background */}
      <div className="bg-violet-50 rounded-2xl p-4 mb-6 text-sm text-gray-600 text-left space-y-1">
        <p>✅ Choose the correct answer from 4 options</p>
        <p>🟢 Correct answer turns green, wrong turns red</p>
        <p>🎯 Your score is shown at the end</p>
      </div>

      {/* Start button — calls onStart prop when clicked */}
      <button
        onClick={onStart}
        className="w-full bg-violet-600 text-white py-4 rounded-2xl font-bold text-lg hover:bg-violet-700 transition-colors"
      >
        Start Quiz
      </button>
    </div>
  )
}
