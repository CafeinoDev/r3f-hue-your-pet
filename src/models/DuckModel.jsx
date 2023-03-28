import { useRef } from 'react'
import { useGLTF } from '@react-three/drei'
import { useSnapshot } from 'valtio'
import { state } from '../store/store'
import { useFrame } from '@react-three/fiber'
import { easing } from 'maath'


const DuckModel = (props) => {
    const group = useRef()
    const snap = useSnapshot(state)

    const { nodes, materials } = useGLTF('https://vazxmixjsiawhamofees.supabase.co/storage/v1/object/public/models/duck/model.gltf');
    
    useFrame((state, delta) => easing.dampC(materials['White.026'].color, snap.color, 0.25, delta))

    return (
    <group ref={group} {...props} dispose={null}>
        <mesh geometry={nodes.character_duck.geometry} material={nodes.character_duck.material} rotation={[Math.PI / 2, 0, 0,]} >
        <mesh geometry={nodes.character_duckArmLeft.geometry} material={nodes.character_duckArmLeft.material} position={[0.2, 0, -0.63,]} />
        <mesh geometry={nodes.character_duckArmRight.geometry} material={nodes.character_duckArmRight.material} position={[-0.2, 0, -0.63,]} />
        <group position={[0, 0, -0.7,]} >
            <mesh geometry={nodes.Cube1338.geometry} material={nodes.Cube1338.material} />
            <mesh geometry={nodes.Cube1338_1.geometry} material={materials['Yellow.043']} />
            <mesh geometry={nodes.Cube1338_2.geometry} material={materials['Black.027']} />
        </group>
        </mesh>

    </group>
    )
}

export default DuckModel;

useGLTF.preload('https://vazxmixjsiawhamofees.supabase.co/storage/v1/object/public/models/duck/model.gltf')