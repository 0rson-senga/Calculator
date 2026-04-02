import { useState } from 'react'
import './App.css'

function App() {
  const [display, setDisplay] = useState('0')
  const [previousValue, setPreviousValue] = useState(null)
  const [operation, setOperation] = useState(null)
  const [waitingForNewValue, setWaitingForNewValue] = useState(false)

  const handleNumber = (num) => {
    if (waitingForNewValue) {
      setDisplay(String(num))
      setWaitingForNewValue(false)
    } else {
      setDisplay(display === '0' ? String(num) : display + num)
    }
  }

  const handleDecimal = () => {
    if (waitingForNewValue) {
      setDisplay('0.')
      setWaitingForNewValue(false)
    } else if (!display.includes('.')) {
      setDisplay(display + '.')
    }
  }

  const handleOperation = (op) => {
    const currentValue = parseFloat(display)

    if (previousValue === null) {
      setPreviousValue(currentValue)
    } else if (operation) {
      const result = calculate(previousValue, currentValue, operation)
      setDisplay(String(result))
      setPreviousValue(result)
    }

    setOperation(op)
    setDisplay(prev => prev + ' ' + op) // SHOW OPERATOR
    setWaitingForNewValue(true)
  }

  const calculate = (prev, current, op) => {
    switch (op) {
      case '+':
        return prev + current
      case '-':
        return prev - current
      case '*':
        return prev * current
      case '/':
        return prev / current
      default:
        return current
    }
  }

  const handleEquals = () => {
    if (operation && previousValue !== null) {
      const currentValue = parseFloat(display)
      const result = calculate(previousValue, currentValue, operation)
      setDisplay(String(result))
      setPreviousValue(null)
      setOperation(null)
      setWaitingForNewValue(true)
    }
  }

  const handleClear = () => {
    setDisplay('0')
    setPreviousValue(null)
    setOperation(null)
    setWaitingForNewValue(false)
  }

  return (
    <div className="calculator-container">
      <div className="calculator">
        <h1>Calculator</h1>
        <div className="display" title='View input and output'>{display}</div>
        <div className="buttons">
          <button className="clear-btn" onClick={handleClear} title='Reset' >AC</button>
          <button className="op-btn" onClick={() => handleOperation('/')} title='Divide' >÷</button>
          <button className="op-btn" onClick={() => handleOperation('*')} title='Multiply' >×</button>
          <button title='Delete' className="del-btn" onClick={() => setDisplay(display.slice(0, -1) || '0')}>DEL</button>

          <button className='nums' onClick={() => handleNumber(7)} title='seven' >7</button>
          <button className='nums' onClick={() => handleNumber(8)} title='eight' >8</button>
          <button className='nums' onClick={() => handleNumber(9)} title='nine' >9</button>
          <button className="op-btn" onClick={() => handleOperation('-')} title='Minus' >-</button>

          <button className='nums' onClick={() => handleNumber(4)} title='four' >4</button>
          <button className='nums' onClick={() => handleNumber(5)} title='five' >5</button>
          <button className='nums' onClick={() => handleNumber(6)} title='six' >6</button>
          <button className="op-btn" onClick={() => handleOperation('+')} title='Add' >+</button>

          <button className='nums' onClick={() => handleNumber(1)} title='one' >1</button>
          <button className='nums' onClick={() => handleNumber(2)} title='two' >2</button>
          <button className='nums' onClick={() => handleNumber(3)} title='three' >3</button>
          <button className="equals-btn " onClick={handleEquals}  title='equal to' >=</button>

          <button className="zero-btn" onClick={() => handleNumber(0)} title='zero' >0</button>
          <button onClick={handleDecimal} className='decimal' title='Float' >.</button>
        </div>
      </div>
    </div>
  )
}

export default App