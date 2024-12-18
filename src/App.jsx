import { useState } from 'react'
// import Calculator from './Calculator'

function App() {
  const [cal, setCal] = useState('')
  const [result, setResult] = useState('')

  const ops = ['+', '-', '*', '/', '.', '%']
  const clear = () => {
    setCal("")
    setResult("")
  }
  const deleteLast = () => {
    if (cal === '') return
    const value = cal.slice(0, -1)
    setCal(value);
  }
  const updateCal = (value) => {
    if ((ops.includes(value) && cal === '') || (ops.includes(value) && ops.includes(cal.slice(-1)))) return
    setCal(cal + value)

    if (!ops.includes(value)) {
      setResult(eval(cal + value).toString())
    }
  }
  const calculate = () => {
    setCal(eval(cal).toString());
  }
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      {/* <Calculator /> */}
      
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Calculator</h1>

      <div className="w-full max-w-[320px] bg-white rounded-2xl overflow-hidden shadow-2xl">
        {/* Display */}
        <div className="p-6 bg-gray-800 text-right">
          <div className="min-h-[60px] flex flex-col justify-end">
            {result && <span className="text-gray-400 text-sm mb-1">({result})</span>}
            <span className="text-white text-3xl font-light break-all">{cal || "0"}</span>
          </div>
        </div>

        {/* Operators */}
        <div className="grid grid-cols-4 gap-[1px] bg-gray-200">
          {["C", "DEL", "%", "/"].map((op) => (
            <button
              key={op}
              onClick={() => op === "DEL" ? deleteLast() : op === "C" ? clear() : updateCal(op)}
              className="p-4 bg-gray-100 hover:bg-gray-200 active:bg-gray-300 text-gray-600 font-medium text-lg transition-colors"
            >
              {op}
            </button>
          ))}
        </div>

        {/* Numbers and remaining operators */}
        <div className="grid grid-cols-4 gap-[1px] bg-gray-200">
          {[7, 8, 9, '*', 4, 5, 6, '-', 1, 2, 3, '+', 0, '.', '='].map((item) => (
            <button
              key={item}
              onClick={() => item === '=' ? calculate() : updateCal(item.toString())}
              className={`p-4 ${
                typeof item === 'number' || item === '.' 
                  ? 'bg-white hover:bg-gray-100 active:bg-gray-200 text-gray-800' 
                  : 'bg-gray-100 hover:bg-gray-200 active:bg-gray-300 text-gray-600 font-medium'
              } text-lg transition-colors`}
            >
              {item}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

export default App