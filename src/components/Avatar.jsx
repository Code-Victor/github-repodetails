import React, { useContext, useEffect, useRef, useState } from "react";
import { useInViewport } from "react-in-viewport";
import { ViewContext } from "../context/viewContext";

function Avatar({ src, className = "",name, main = false }) {
  const { inView: item, setInView } = useContext(ViewContext);
  const ref = useRef();
  const { inViewport: inView } = useInViewport(ref);
  if (main) {
    setInView(inView);
  }
  useEffect(() => {
    if (ref) {
      console.log("view", ref.current);
    }
  });
  return (
    <img
      src={src}
      className={className + " w-20 h-20 rounded-full "}
      alt={name}
      ref={ref}
    />
  );
}

export default Avatar;
