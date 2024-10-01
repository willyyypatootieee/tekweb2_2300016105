import { useState } from "react"; // Import useState hook
import { myPlayer } from "playroomkit";
import { ANIMALS_MODELS } from "./Animals";

export const UI = () => {
  const me = myPlayer();
  
  // Add state for loadingSlide
  const [loadingSlide, setLoadingSlide] = useState(true);

  return (
    <>
      <div
        className={`fixed z-30 top-0 left-0 right-0 h-screen bg-white flex items-center justify-center gap-1 text-5xl pointer-events-none transition-transform duration-500
      ${loadingSlide ? "" : "translate-y-[100%]"}
      `}
      >
        {ANIMALS_MODELS.map((model, idx) => (
          <div
            key={model}
            className={`min-w-14 min-h-14 w-14 h-14 bg-white bg-opacity-50 backdrop-filter backdrop-blur-lg rounded-full shadow-md cursor-pointer
            ${
              me?.getState("Cat") === model ||
              (!me?.getState("Cat") && idx === 0)
                ? "ring-4 ring-blue-500"
                : ""
            }
            `}
            onClick={() => me?.setState("Cat", model)} // Fixed key name "Cat"
          >
            {/* Image or content inside */}
          </div>
        ))}
      </div>
    </>
  );
};
