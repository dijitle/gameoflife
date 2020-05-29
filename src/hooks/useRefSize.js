import { useState, useEffect } from "react";

function UseRefSize(ref) {
  const isClient = typeof window === "object";

  const getSize = () => {
    return {
      width: isClient ? ref.current?.clientWidth : undefined,
      height: isClient ? ref.current?.clientHeight : undefined,
    };
  };

  const [windowSize, setWindowSize] = useState(getSize);

  useEffect(() => {
    if (!isClient) {
      return false;
    }

    const handleResize = () => {
      setWindowSize(getSize());
    };

    handleResize();

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []); // Empty array ensures that effect is only run on mount and unmount

  return windowSize;
}

export default UseRefSize;
