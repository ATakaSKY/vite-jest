import { useState } from 'react'

const Counter = () => {
  const [count, setCount] = useState(0)

  const counterClicked = () => {
    fetch('/login', { method: 'POST' })
      .then((res) => res.json())
      .then((data) => console.log(data))

    setCount((count) => count + 1)
  }

  console.log('testing branch name 2')

  return (
    <>
      <p>
        <button type="button" onClick={counterClicked}>
          count is: {count}
        </button>
      </p>
      {count > 0 ? (
        <p>
          <code>The count is now: {count}</code>
        </p>
      ) : null}
    </>
  )
}

export default Counter
