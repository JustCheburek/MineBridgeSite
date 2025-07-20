'use client'

import React, { useRef, useEffect, useState } from 'react'
import { useGLTF, OrbitControls, Center, useProgress } from '@react-three/drei'
import { Canvas, useThree, useFrame } from '@react-three/fiber'
import { GLTF } from 'three-stdlib'
import * as THREE from 'three'
import { ArrowsMoveSvg } from '@ui/SVGS'

type GLTFResult = GLTF & {
  nodes: {
    cube: THREE.Mesh
    cube_1: THREE.Mesh
  }
  materials: {
    [key: string]: THREE.Material
  }
}

export function Object() {
  const { nodes, materials } = useGLTF('/shop/3d.gltf') as unknown as GLTFResult
  return (
    <group dispose={null} scale={[1.5, 1.5, 1.5]}>
      <mesh geometry={nodes.cube.geometry} material={nodes.cube.material} position={[0, 0, 0]} />
      <mesh geometry={nodes.cube_1.geometry} material={nodes.cube_1.material} position={[0, 0, 0]} />
    </group>
  )
}

function CameraController() {
  const controlsRef = useRef<any>(null);
  const { scene } = useThree();
  const [initialized, setInitialized] = useState(false);
  
  // Отслеживание прогресса загрузки
  const { loaded } = useProgress();
  
  // Функция для установки угла обзора камеры
  const updateLook = () => {
    if (controlsRef.current) {
      controlsRef.current.setAzimuthalAngle(Math.PI / 6);
      controlsRef.current.setPolarAngle(Math.PI / 3);
      controlsRef.current.update();
    }
  };
  
  // Эффект, который срабатывает, когда все ресурсы загружены
  useEffect(() => {
    if (loaded && !initialized) {
      updateLook();
      setInitialized(true);
    }
  }, [loaded, initialized]);
  
  // Альтернативный подход - использование useFrame для проверки готовности сцены
  useFrame(() => {
    if (scene.children.length > 0 && !initialized) {
      // Даем небольшую задержку для полной инициализации
      setTimeout(updateLook, 100);
      setInitialized(true);
    }
  });
  
  return <OrbitControls ref={controlsRef} />;
}

export function CanvasModel() {
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
        <Object/>
      </Center>
      <CameraController />
    </Canvas>
  )
}

export default function Model3D() {
  return (
    <>
      <ArrowsMoveSvg className='absolute top-0 left-0 size-6 text-light-gray' />
      <CanvasModel/>
    </>
  )
}

useGLTF.preload('/shop/3d.gltf')
