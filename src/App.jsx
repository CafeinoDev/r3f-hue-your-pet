import { Canvas } from '@react-three/fiber'
import './App.css'
import Experience from './components/Experience'
import Overlay from './components/Overlay'

function App() {

  return (
    <>
        <Canvas shadows orthographic 
        camera={{ position: [10, 20, 20], zoom: 120 }} 
        gl={{ preserveDrawingBuffer: true }}>
            <Experience />
        </Canvas>
        <Overlay />
    </>
  )
}

export default App
