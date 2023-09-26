import { useState } from "react";

const Counter = () => {
  const [count, setCount] = useState(0);

  return (
    <>
      <p>
        <button type="button" onClick={() => setCount((count) => count + 1)}>
          count is: {count}
        </button>
      </p>
      {count > 0 ? (
        <p>
          <code>The count is now: {count}</code>
        </p>
      ) : null}
    </>
  );
};

export default Counter;
