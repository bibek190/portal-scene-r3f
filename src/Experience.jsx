import {
  Center,
  OrbitControls,
  Sparkles,
  useGLTF,
  useTexture,
  shaderMaterial,
  PresentationControls,
  MeshDistortMaterial,
  MeshDiscardMaterial,
  MeshReflectorMaterial,
} from "@react-three/drei";
import portalVertexShader from "./shaders/portal/Vertex.glsl";
import portalFragmentShader from "./shaders/portal/fragment.glsl";
import * as THREE from "three";
import { extend, useFrame } from "@react-three/fiber";
import { useRef } from "react";

const PortalMaterial = shaderMaterial(
  {
    uTime: 0,
    uColorStart: new THREE.Color("lightgreen"),
    uColorEnd: new THREE.Color("#000000"),
  },
  portalVertexShader,
  portalFragmentShader
);

extend({ PortalMaterial: PortalMaterial });

export default function Experience() {
  const { nodes } = useGLTF("./model/portal.glb");
  //   Texture
  const bakedTexture = useTexture("./model/baked.jpg");
  bakedTexture.flipY = false;

  //   useRef
  const portalMaterial = useRef();
  // UseFrame
  useFrame((state, delta) => {
    portalMaterial.current.uTime += delta * 5;
  });

  return (
    <>
      <color args={["#030202"]} attach="background" />

      <OrbitControls makeDefault />
      <Center>
        >
        <mesh geometry={nodes.baked.geometry}>
          <meshBasicMaterial map={bakedTexture} />
        </mesh>
        {/* Poles and light */}
        <mesh
          geometry={nodes.poleLightA.geometry}
          position={nodes.poleLightA.position}
          rotation={nodes.poleLightA.rotation}
        >
          <meshBasicMaterial color="#ffffe5" />
        </mesh>
        <mesh
          geometry={nodes.poleLightB.geometry}
          position={nodes.poleLightB.position}
          rotation={nodes.poleLightA.rotation}
        >
          <meshBasicMaterial color="#ffffe5" />
        </mesh>
        {/* Poles  */}
        <mesh
          geometry={nodes.portalLight.geometry}
          position={nodes.portalLight.position}
          rotation={nodes.portalLight.rotation}
        >
          <portalMaterial ref={portalMaterial} side={THREE.DoubleSide} />
        </mesh>
        <Sparkles scale={[4, 2, 4]} size={6} position-y={1} speed={0.2} />
      </Center>
    </>
  );
}
