import { useState } from 'react'
import './App.css'
import Dogs from './components/Dogs'
import { DelayedDogQuery } from './components/Dog'

function App() {
  const [selectedDog, setSelectedDog] = useState<null | string>(null)

  function onDogSelected(e: React.ChangeEvent<HTMLSelectElement>) {
    setSelectedDog(e.target.value)
  }

  return (
    <div className="App">
      {/* {selectedDog && <DogPhoto breed={selectedDog} />} */}
      <DelayedDogQuery />
      <Dogs onDogSelected={onDogSelected} />
    </div>
  )
}

export default App
