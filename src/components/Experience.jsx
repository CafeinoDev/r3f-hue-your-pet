import { Environment, EnvironmentMap, Float, Instance, Instances, Lightformer, OrbitControls, PresentationControls, RandomizedLight } from "@react-three/drei";
import { useSnapshot } from 'valtio'
import DogModel from "../models/DogModel";
import DuckModel from "../models/DuckModel";
import { state } from '../store/store'

const Experience = () => {
    const snap = useSnapshot(state);
    

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
                    { 
                        snap.model === 'duck' && <DuckModel scale={ 2.3 } position-y={ -2 } />
                    }

                    {
                        snap.model === 'dog' && <DogModel scale={ 2.3 } position-y={ -2 } />
                    }
                </Float>
            </PresentationControls>
            
            
            <Grid />

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