import { useState, useEffect } from "react";
import React from "react";
import Shop from "./Shop";
import DisplayModel from "./DisplayModel";
import img01 from "../../assets/01.jpg";
import img02 from "../../assets/02.jpg";
import img03 from "../../assets/03.jpg";
import img04 from "../../assets/04.png";
import img05 from "../../assets/05.jpg";

export default function Carousel() {
  const images = [
      { src: img05, fit: "object-inherit" },
      { src: img04, fit: "object-inherit" },
      { src: img01, fit: "object-inherit" },
    // { src: img02, fit: "object-inherit" },
      { src: img03, fit: "object-inherit" },
 
  ];

  const [index, setIndex] = useState(0);

  const next = () => {
    setIndex((prev) => (prev + 1) % images.length);
  };

  useEffect(() => {
    const interval = setInterval(next, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
    <div className=" ">
      {/* Image */}
      <img
        src={images[index].src}
        className={`w-full h-[535px] transition-all duration-700 ${images[index].fit}`}
        alt="carousel"
      />

      {/* Left button */}
      <button
        onClick={() =>
          setIndex((prev) => (prev - 1 + images.length) % images.length)
        }
        className="absolute top-1/2 left-4 -translate-y-1/2 bg-white/60 p-3 rounded-full text-xl"
      >
        ◀
      </button>

      {/* Right button */}
      <button
        onClick={next}
        className="absolute top-1/2 right-4 -translate-y-1/2 bg-white/60 p-3 rounded-full text-xl"
      >
        ▶
      </button>

      {/* Dots */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-3">
        {images.map((_, i) => (
          <div
            key={i}
            onClick={() => setIndex(i)}
            className={`w-4 h-4 rounded-full cursor-pointer transition-all ${
              i === index ? "bg-white" : "bg-white/40"
            }`}
          ></div>
        ))}
      </div>
    </div>
    <Shop/>
    <DisplayModel/>
    </>
  );
}
