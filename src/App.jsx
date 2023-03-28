import { lazy, Suspense, useState } from 'react'
import { Canvas } from '@react-three/fiber'
import './App.css'
import Overlay from './components/Overlay'

const Experience = lazy(() => import('./components/Experience'));

function App() {

    const [sceneLoaded, setSceneLoaded] = useState(false)


    return (
        <>
            <Canvas 
            onCreated={ () => { setSceneLoaded(true) } }
            shadows orthographic 
            camera={{ position: [10, 20, 20], zoom: 120 }} 
            gl={{ preserveDrawingBuffer: true }}>
                <Suspense>
                    <Experience />
                </Suspense>
            </Canvas>     

            {
                sceneLoaded && <>
                    <Suspense>
                        <Overlay />
                    </Suspense>
                </>
            }
        </>
    )
}

export default App
