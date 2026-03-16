// ─── App.jsx ─────────────────────────────────────────────────────────────────
// Root component of the Quiz App.
// Manages screen navigation (start → quiz → result) using a single state variable.
// This is a simple alternative to React Router for small apps.
// ─────────────────────────────────────────────────────────────────────────────

import { useState } from 'react'
import StartScreen from './components/StartScreen'
import Quiz from './components/Quiz'
import Result from './components/Result'

// ── Quiz Data ─────────────────────────────────────────────────────────────────
// Array of question objects. Each has: question (string), options (array), answer (string).
// The answer must exactly match one of the options strings.
const questions = [
  {
    question: 'What hook is used to manage state in React functional components?',
    options: ['useEffect', 'useContext', 'useState', 'useRef'],
    answer: 'useState',
  },
  {
    question: 'Which company created React?',
    options: ['Google', 'Microsoft', 'Facebook (Meta)', 'Twitter'],
    answer: 'Facebook (Meta)',
  },
  {
    question: 'What does JSX stand for?',
    options: ['Java Syntax Extension', 'JavaScript XML', 'JSON XML', 'JavaScript Extra'],
    answer: 'JavaScript XML',
  },
  {
    question: 'Which hook is used for side effects in React?',
    options: ['useState', 'useCallback', 'useEffect', 'useMemo'],
    answer: 'useEffect',
  },
  {
    question: 'What is the correct way to render a list in React?',
    options: ['.forEach()', '.map()', '.filter()', '.reduce()'],
    answer: '.map()',
  },
  {
    question: "What does Vite stand for?",
    options: ['Very Integrated Tool for Everyone', 'Virtual Interface Tool', "French for 'fast'", 'Variable Integrated Testing Environment'],
    answer: "French for 'fast'",
  },
  {
    question: 'In Tailwind CSS, which class adds flex display?',
    options: ['d-flex', 'display-flex', 'flex', 'flexbox'],
    answer: 'flex',
  },
  {
    question: 'What is the virtual DOM in React?',
    options: ['A server-side DOM', 'A lightweight copy of the real DOM', 'A CSS framework', 'A database'],
    answer: 'A lightweight copy of the real DOM',
  },
]

export default function App() {

  // ── Screen Navigation ──────────────────────────────────────────────────────
  // Instead of React Router, we use a single "screen" state.
  // Possible values: 'start' | 'quiz' | 'result'
  const [screen, setScreen] = useState('start')

  // Stores the final score to pass from Quiz → Result screen
  const [score, setScore] = useState(0)

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-600 to-pink-500 flex items-center justify-center p-4">

      {/* Show StartScreen when screen === 'start' */}
      {screen === 'start' && (
        <StartScreen
          total={questions.length}
          onStart={() => setScreen('quiz')}   // clicking Start switches to quiz screen
        />
      )}

      {/* Show Quiz when screen === 'quiz' */}
      {screen === 'quiz' && (
        <Quiz
          questions={questions}
          onFinish={(finalScore) => {
            setScore(finalScore)        // save the score
            setScreen('result')         // switch to result screen
          }}
        />
      )}

      {/* Show Result when screen === 'result' */}
      {screen === 'result' && (
        <Result
          score={score}
          total={questions.length}
          onRestart={() => { setScore(0); setScreen('start') }} // reset and go back to start
        />
      )}

    </div>
  )
}
