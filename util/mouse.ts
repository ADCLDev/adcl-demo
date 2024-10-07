import { useEffect, useState } from "react";

interface MousePosition {
  x: number;
  y: number;
}

export function useMousePosition(): MousePosition {
  const [mousePosition, setMousePosition] = useState<MousePosition>({
    x: 0,
    y: 0,
  });

  useEffect(() => {
    // Function to handle mouse move events
    const handleMouseMove = (event: MouseEvent) => {
      setMousePosition({ x: event.clientX, y: event.clientY });
    };

    // Ensure window is defined before adding event listeners
    if (typeof window !== 'undefined') {
      window.addEventListener("mousemove", handleMouseMove);
      
      // Cleanup function to remove event listeners
      return () => {
        window.removeEventListener("mousemove", handleMouseMove);
      };
    }

    // Return a no-op cleanup function if window is not defined
    return () => {};
  }, []);

  return mousePosition;
}
