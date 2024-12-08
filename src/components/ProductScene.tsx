import { Canvas } from '@react-three/fiber';
import { OrbitControls, PresentationControls, Environment } from '@react-three/drei';
import { ProductModel } from './ProductCard';

export const ProductScene = ({ modelPath }) => {
  return (
    <div className="h-[400px] w-full">
      <Canvas>
        <Environment preset="city" />
        <PresentationControls
          global
          rotation={[0.13, 0.1, 0]}
          polar={[-0.4, 0.2]}
          azimuth={[-1, 0.75]}
          config={{ mass: 2, tension: 400 }}
          snap={{ mass: 4, tension: 400 }}
        >
          <ProductModel path={modelPath} scale={1.5} />
        </PresentationControls>
        <OrbitControls enableZoom={false} />
      </Canvas>
    </div>
  );
};