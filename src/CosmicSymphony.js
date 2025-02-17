import React, { useState, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import * as THREE from "three";
import axios from "axios";
import * as Tone from "tone";

const CosmicSymphony = () => {
    const [image, setImage] = useState(null);
  const [audio, setAudio] = useState(null);

  useEffect(() => {
    // Fetch JWST Image from NASA API
    const fetchImage = async () => {
      const response = await axios.get(
        "https://images-api.nasa.gov/search?q=James%20Webb&media_type=image"
      );
      const imageUrl = response.data.collection.items[1].links[0].href;
      setImage(imageUrl);
    };

    fetchImage();
  }, []);

  // Generate space sounds using Tone.js
  const playMusic = () => {
    const synth = new Tone.PolySynth(Tone.Synth).toDestination();
    const notes = ["C4", "E4", "G4", "B4", "D5"];
    let index = 0;

    Tone.Transport.scheduleRepeat(() => {
      synth.triggerAttackRelease(notes[index % notes.length], "8n");
      index++;
    }, "0.5");

    Tone.Transport.start();
    setAudio(synth);
  };
  return (
    <div className="w-screen h-screen flex flex-col items-center justify-center bg-black text-white">
      <h1 className="text-2xl font-bold my-7">Cosmic Symphony</h1>
      
      {image && (
        <img src={image} alt="JWST" className="w-1/2 md:w-1/4 rounded-lg shadow-lg" />
      )}

      <button
        onClick={playMusic}
        className="mt-4 px-4 py-2 bg-purple-600 rounded-md"
      >
        Generate Space Music
      </button>

      {/* 3D Space Scene */}
      <Canvas className="w-full h-96 mt-8">
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        <mesh>
          <sphereGeometry args={[1, 32, 32]} />
          <meshStandardMaterial color="blue" wireframe />
        </mesh>
      </Canvas>
    </div>
  )
}

export default CosmicSymphony