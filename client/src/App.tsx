import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Button } from "@/components/ui/button"

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div className='text-red-500'>Aayush Yadav</div>
      <Button>Aayush Yadav</Button>
    </>
  )
}

export default App
