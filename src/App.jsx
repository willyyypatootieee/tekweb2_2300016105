import { Canvas } from "@react-three/fiber";
import { Experience } from "./components/Experience";
import { UI } from "./components/UI";

function App() {
  return (
    <>
    <Canvas shadows camera={{ position: [4.2, 1.5, 7.5], fov: 30 }}>
      <color attach="background" args={["#ececec"]} />
      <Experience />
    </Canvas>
    <UI />
    </>
  );
}

export default App; 
