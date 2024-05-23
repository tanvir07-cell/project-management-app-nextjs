"use client";

import * as tf from "@tensorflow/tfjs";
import * as tmImage from "@teachablemachine/image";
import { useEffect } from "react";

let webcam, model;
let currentZoom = 1; // Initial zoom level
const zoomStep = 0.1; // Step value for zoom in/out

async function init() {
  const URL = "https://teachablemachine.withgoogle.com/models/_Gfg3pEyK/";
  const modelURL = URL + "model.json";
  const metadataURL = URL + "metadata.json";

  model = await tmImage.load(modelURL, metadataURL);
  webcam = new tmImage.Webcam(200, 200, true); // width, height, flip the webcam
  await webcam.setup(); // request access to the webcam
  await webcam.play();

  // Start the loop
  window.requestAnimationFrame(loop);
}

async function loop() {
  webcam.update(); // update the webcam frame
  await predict();
  window.requestAnimationFrame(loop);
}

async function predict() {
  // predict can take in an image, video, or canvas html element
  const predictions = await model.predict(webcam.canvas);

  const topPrediction = Math.max(...predictions.map((p) => p.probability));
  const topPredictionIndex = predictions.findIndex(
    (p) => p.probability === topPrediction
  );

  const label = predictions[topPredictionIndex].className;

  if (label === "zoom-in" && currentZoom < 2) {
    // Cap the max zoom level
    currentZoom += zoomStep;
    document.body.style.transform = `scale(${currentZoom})`;
    console.log(label);
  } else if (label === "zoom-out" && currentZoom > 0.5) {
    // Cap the min zoom level
    currentZoom -= zoomStep;
    document.body.style.transform = `scale(${currentZoom})`;
    console.log(label);
  }
}

const ML = () => {
  useEffect(() => {
    init();
  }, []);

  useEffect(() => {
    // Apply smooth transition effect to body
    document.body.style.transition = "transform .3s ease";
  }, []);

  return <div id="webcam-container"></div>;
};

export default ML;
