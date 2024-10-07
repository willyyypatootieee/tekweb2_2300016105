import { Canvas } from "@react-three/fiber";
import { Experience } from "./components/Experience";
import { UI } from "./components/UI";
import Tabs from './Tabs'; // Adjusted import path

function App() {
  return (
    <>
      <Canvas
        shadows
        camera={{ position: [4.2, 1.5, 7.5], fov: 30 }}
        style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0 }} // Ensure it takes full space
      >
        <color attach="background" args={["#ececec"]} />
        <Experience />
      </Canvas>
      <Tabs />
      <UI />
    </>
  );
}

export default App;
