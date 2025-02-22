import { useEffect } from "react";

// No type bc I'm on a plane w/o the interwebs
const onClickOutside = (ref: any, callback: () => void) => {
  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (ref.current && !ref.current.contains(event.target)) {
        callback();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref]);
};

export { onClickOutside };
