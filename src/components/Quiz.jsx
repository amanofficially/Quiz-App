// ─── Quiz.jsx ─────────────────────────────────────────────────────────────────
// Renders one question at a time with 4 answer buttons.
// Tracks current question index, score, and selected answer.
// Props:
//   questions — array of question objects
//   onFinish  — called with the final score when the last question is answered
// ─────────────────────────────────────────────────────────────────────────────

import { useState } from 'react'

export default function Quiz({ questions, onFinish }) {

  // ── State ──────────────────────────────────────────────────────────────────
  const [current, setCurrent]   = useState(0)     // index of current question
  const [score, setScore]       = useState(0)     // running correct answer count
  const [selected, setSelected] = useState(null)  // option the user clicked
  const [answered, setAnswered] = useState(false) // true once user selects an option

  const q = questions[current]   // shorthand for current question object

  // Progress bar width percentage (based on how many questions are answered)
  const progress = (current / questions.length) * 100

  // ── Handlers ───────────────────────────────────────────────────────────────

  // Called when user clicks an answer option
  const handleSelect = (option) => {
    if (answered) return           // ignore clicks after already answered
    setSelected(option)
    setAnswered(true)
    if (option === q.answer) setScore(s => s + 1)  // increment score if correct
  }

  // Called when user clicks "Next Question" or "See Results"
  const handleNext = () => {
    if (current + 1 >= questions.length) {
      // Last question — call onFinish with the final score
      onFinish(score + (selected === q.answer ? 0 : 0)) // score already updated above
      onFinish(score)
    } else {
      // Move to next question and reset answer state
      setCurrent(c => c + 1)
      setSelected(null)
      setAnswered(false)
    }
  }

  // ── Button Styling ─────────────────────────────────────────────────────────
  // Returns Tailwind classes for each option button based on answer state
  const getButtonClass = (opt) => {
    const base = 'w-full text-left px-5 py-4 rounded-2xl border-2 font-medium transition-all '
    if (!answered)           return base + 'border-gray-100 hover:border-violet-400 hover:bg-violet-50 text-gray-700'
    if (opt === q.answer)    return base + 'border-green-500 bg-green-50 text-green-700'   // correct
    if (opt === selected)    return base + 'border-red-400 bg-red-50 text-red-600'         // wrong selection
    return base + 'border-gray-100 text-gray-400'                                          // other options dimmed
  }

  return (
    <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-lg w-full">

      {/* Header: question counter + live score */}
      <div className="flex justify-between items-center mb-4">
        <span className="text-sm text-gray-500">{current + 1} / {questions.length}</span>
        <span className="text-sm font-semibold text-violet-600">Score: {score}</span>
      </div>

      {/* Progress bar (width controlled by inline style) */}
      <div className="w-full bg-gray-100 rounded-full h-2 mb-6">
        <div className="bg-violet-600 h-2 rounded-full transition-all" style={{ width: `${progress}%` }} />
      </div>

      {/* Question text */}
      <h2 className="text-xl font-bold text-gray-800 mb-6">{q.question}</h2>

      {/* Answer option buttons */}
      <div className="space-y-3">
        {q.options.map(opt => (
          <button key={opt} className={getButtonClass(opt)} onClick={() => handleSelect(opt)}>
            {opt}
          </button>
        ))}
      </div>

      {/* Next/Finish button — only shown after user answers */}
      {answered && (
        <button
          onClick={handleNext}
          className="mt-6 w-full bg-violet-600 text-white py-4 rounded-2xl font-bold hover:bg-violet-700 transition-colors"
        >
          {current + 1 >= questions.length ? 'See Results' : 'Next Question →'}
        </button>
      )}
    </div>
  )
}
