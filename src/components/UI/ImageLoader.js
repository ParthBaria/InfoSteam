import React, { useMemo } from "react";
import "./ImageLoader.css";

// Load image and return a promise
function loadImage(src) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.src = src;
    img.onload = () => resolve(src);
    img.onerror = () => reject(new Error("Failed to load image: " + src));
  });
}

// Wrap a promise to work with Suspense
function createResource(promise) {
  let status = "pending";
  let result;
  const suspender = promise.then(
    (r) => {
      status = "success";
      result = r;
    },
    (e) => {
      status = "error";
      result = e;
    }
  );
  return {
    read() {
      if (status === "pending") throw suspender;
      if (status === "error") throw result;
      return result;
    },
  };
}

const ImageLoader = (props) => {
  const resource = useMemo(() => createResource(loadImage(props.url)), [props.url]);
  
  const imageSrc = resource.read(); 
  
  return <img className="card_image" src={imageSrc} alt="Loaded" />;
};

export default ImageLoader;
