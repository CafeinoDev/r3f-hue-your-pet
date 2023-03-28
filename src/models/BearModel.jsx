import { useRef } from 'react'
import { useGLTF } from '@react-three/drei'
import { useSnapshot } from 'valtio'
import { state } from '../store/store'
import { useFrame } from '@react-three/fiber'
import { easing } from 'maath'


const BearModel = (props) => {
    const group = useRef()
    const snap = useSnapshot(state)

    const { nodes, materials } = useGLTF('./bear.gltf');
    
    useFrame((state, delta) => easing.dampC(materials['BrownDark.036'].color, snap.color, 0.25, delta))


    return (
        <group ref={group} {...props} dispose={null}>
            <mesh geometry={nodes.character_bear.geometry} material={nodes.character_bear.material} rotation={[Math.PI / 2, 0, 0,]} >
            <mesh geometry={nodes.character_bearArmLeft.geometry} material={nodes.character_bearArmLeft.material} position={[0.2, 0, -0.63,]} />
            <mesh geometry={nodes.character_bearArmRight.geometry} material={nodes.character_bearArmRight.material} position={[-0.2, 0, -0.63,]} />
            <group position={[0, 0, -0.7,]} >
                <mesh geometry={nodes.Cube1337.geometry} material={materials['Black.025']} />
                <mesh geometry={nodes.Cube1337_1.geometry} material={nodes.Cube1337_1.material} />
            </group>
            </mesh>
        </group>
      )
}

export default BearModel;

useGLTF.preload('./bear.gltf')