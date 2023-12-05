import { useEffect, useRef } from "react";

export default (callback, dependencies) => {
  const firstRenderRef = useRef(true);

  useEffect(() => {
    if (firstRenderRef.current) {
      firstRenderRef.current = false;
    } else {
      callback();
    }
  }, [callback, ...dependencies]);
};
