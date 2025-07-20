'use client'

import React, { useRef, useEffect } from 'react'
import { useGLTF, OrbitControls, Center } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import { GLTF } from 'three-stdlib'
import * as THREE from 'three'

type GLTFResult = GLTF & {
  nodes: {
    cube: THREE.Mesh
    cube_1: THREE.Mesh
  }
  materials: {
    [key: string]: THREE.Material
  }
}

export function Model() {
  const { nodes, materials } = useGLTF('/shop/3d.gltf') as unknown as GLTFResult
  return (
    <group dispose={null} scale={[1.5, 1.5, 1.5]}>
      <mesh geometry={nodes.cube.geometry} material={nodes.cube.material} position={[0, 0, 0]} />
      <mesh geometry={nodes.cube_1.geometry} material={nodes.cube_1.material} position={[0, 0, 0]} />
    </group>
  )
}

export default function Model3D() {
  const controlsRef = useRef<any>(null);
  
  useEffect(() => {
    if (controlsRef.current) {
      // Устанавливаем начальный азимут (горизонтальный угол)
      controlsRef.current.setAzimuthalAngle(Math.PI / 6);
      
      // Устанавливаем начальный полярный угол (вертикальный угол)
      controlsRef.current.setPolarAngle(Math.PI / 3);
      
      // Обновляем контролы
      controlsRef.current.update();
    }
  }, [controlsRef.current]);

  return (
    <Canvas
        camera={{
          fov: 13,
          position: [0, 0, 3],
        }}
      >
        <ambientLight intensity={1} />
        {/* <directionalLight position={[3, 3, 2]} intensity={1.5} /> */}
        <Center>
          <Model/>
        </Center>
        <OrbitControls 
          ref={controlsRef}
        />
      </Canvas>
  )
}

useGLTF.preload('/shop/3d.gltf')
