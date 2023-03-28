import { Suspense, lazy } from "react";
import { Environment, EnvironmentMap, Float, Instance, Instances, PresentationControls } from "@react-three/drei";
import { useSnapshot } from 'valtio'
import { state } from '../store/store'

const DogModel = lazy(() => import('../models/DogModel'))
const DuckModel = lazy(() => import('../models/DuckModel'))
const BearModel = lazy(() => import('../models/BearModel'))

const Experience = () => {
    const snap = useSnapshot(state);
    
    const modelsProps = {
        "scale": 2.2,
        "position-y": -2,
        "rotation": [ -.25,.2,0 ],
        "position-x": -0.25
    }

    return (
        <>
            <color attach="background" args={['#f2f2f5']}/>
            
            <EnvironmentMap preset="city" />
            {/* <directionalLight position={ [1, 2, 3 ] } /> */}
            <Environment preset="city" />
            <ambientLight intensity={0.4} />

            <PresentationControls
                global
                speed={ 2 }
                polar={ [-0.4, 0.2] }
                azimuth={ [ -1, 0.75 ] }
                config={
                    {
                        mass: 2,
                        tension: 400
                    }
                }
                snap={{
                    mass: 4,
                    tension: 400
                }}
            >
                <Float
                    rotationIntensity={ 0.5 }
                >
                    <Suspense>
                        { 
                            snap.model === 'duck' && <DuckModel { ...modelsProps } />
                        }
                        {
                            snap.model === 'dog' && <DogModel { ...modelsProps } />
                        }
                        {
                            snap.model === 'bear' && <BearModel { ...modelsProps } />
                        }
                    </Suspense>
                </Float>
            </PresentationControls>
            
            <Suspense>
                <Grid />
            </Suspense>            

        </>
    )
}

const Grid = ({ number = 20, lineWidth = 0.05, height = .50 }) => (
    // Renders a grid and crosses as instances
    <Instances position={[0, -2.05, 0]} receiveShadow>
      <planeGeometry args={[lineWidth, height]} />
      <meshBasicMaterial color="#888" />
      {Array.from({ length: number }, (_, y) =>
        Array.from({ length: number }, (_, x) => (
          <group key={x + ':' + y} position={[x * 2 - Math.floor(number / 2) * 2, -0.01, y * 2 - Math.floor(number / 2) * 2]}>
            <Instance rotation={[-Math.PI / 2, 0, 0]} />
            <Instance rotation={[-Math.PI / 2, 0, Math.PI / 2]} />
          </group>
        ))
      )}
      <gridHelper args={[100, 100, '#bbb', '#bbb']} position={[0, -0.01, 0]} />
    </Instances>
  )

export default Experience;