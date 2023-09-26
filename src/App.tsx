import "./App.css";
import Counter from "./Counter";

function App() {
  const getUser = () => {
    fetch("/user")
      .then((res) => res.json())
      .then((data) => console.log(data));
  };

  return (
    <div className="App">
      <header className="App-header">
        <p>Hello Vite + React!</p>

        <Counter />

        <button onClick={getUser}>Get user</button>
        <p>
          Edit <code>App.tsx</code> and save to test HMR updates.
        </p>
        <p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
          {" | "}
          <a
            className="App-link"
            href="https://vitejs.dev/guide/features.html"
            target="_blank"
            rel="noopener noreferrer"
          >
            Vite Docs
          </a>
        </p>
      </header>
    </div>
  );
}

export default App;
