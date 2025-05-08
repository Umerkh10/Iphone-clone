import type React from "react"
import { OrbitControls, PerspectiveCamera, View } from "@react-three/drei"
import * as THREE from "three"
import Lights from "./Lights"
import { Suspense } from "react"
import Iphone from "./Iphone"
import Loader from "./Loader"

interface ModelViewProps {
  index: number
  groupRef: React.RefObject<THREE.Group>
  gsapType: string
  controlRef: React.RefObject<any>
  setRotationState: React.Dispatch<React.SetStateAction<number>>
  item: any
  size: any
}

function ModelView({ index, groupRef, gsapType, controlRef, setRotationState, item, size }: ModelViewProps) {
  return (
    <View index={index} id={gsapType} className={`w-full h-full ${index === 2 ? "right-[-100%]" : ""}`}>
      {/* Ambient Lighting */}
      <ambientLight intensity={0.3} />
      <PerspectiveCamera makeDefault position={[0, 0, 4]} />

      <Lights />

      <OrbitControls
        makeDefault
        ref={controlRef}
        enableZoom={false}
        enablePan={false}
        rotateSpeed={0.5}
        target={new THREE.Vector3(0, 0, 0)}
        onEnd={() => {
          if (controlRef.current) {
            setRotationState(controlRef.current.getAzimuthalAngle())
          }
        }}
      />

      <group ref={groupRef} name={index === 1 ? "small" : "large"} position={[0, 0, 0]}>
        <Suspense fallback={<Loader/>}>
          <Iphone  scale={index === 1 ? [15, 15, 15] : [17, 17, 17]} item={item} size={size} />
        </Suspense>
      </group>
    </View>
  )
}

export default ModelView
