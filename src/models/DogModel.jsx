import { useRef } from 'react'
import { useGLTF } from '@react-three/drei'
import { useSnapshot } from 'valtio'
import { state } from '../store/store'
import { useFrame } from '@react-three/fiber'
import { easing } from 'maath'


const DogModel = (props) => {
    const group = useRef()
    const snap = useSnapshot(state)

    const { nodes, materials } = useGLTF('./dog.gltf');
    
    useFrame((state, delta) => easing.dampC(materials['Beige.017'].color, snap.color, 0.25, delta))

    return (
        <group ref={group} {...props} dispose={null}>
            <mesh geometry={nodes.character_dog.geometry} material={nodes.character_dog.material} rotation={[Math.PI / 2, 0, 0,]} >
            <mesh geometry={nodes.character_dogArmLeft.geometry} material={nodes.character_dogArmLeft.material} position={[0.2, 0, -0.63,]} />
            <mesh geometry={nodes.character_dogArmRight.geometry} material={nodes.character_dogArmRight.material} position={[-0.2, 0, -0.63,]} />
            <group position={[0, 0, -0.7,]} >
                <mesh geometry={nodes.Cube1339.geometry} material={nodes.Cube1339.material} />
                <mesh geometry={nodes.Cube1339_1.geometry} material={materials['Red.034']} />
                <mesh geometry={nodes.Cube1339_2.geometry} material={materials['Black.026']} />
            </group>
            </mesh>
        </group>
    )
}

export default DogModel;

useGLTF.preload('./dog.gltf')