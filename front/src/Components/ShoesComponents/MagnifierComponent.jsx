import React from "react";
import ReactImageMagnify from "react-image-magnify";
import "./mag.css"
import img from "../../assets/wristwatch_687.jpg";
import img2 from "../../assets/wristwatch_1200.jpg";

export default function MagnifierComponent() {
  return (
    <div className="fluid">
      <div className="fluid__image-container">
        <ReactImageMagnify
          {...{
            smallImage: {
              alt: "Wristwatch by Ted Baker London",
              isFluidWidth: true,
              src: img,
            },
            largeImage: {
              src: img2,
              width: 800,
              height: 900,
            },
               enlargedImageContainerDimensions: {
                            width: '200%',
                            height: '100%'
                        }
          }}
        />
      </div>
      <div className="fluid__instructions">
        <h3>Basic Examp</h3>
        <p>Side by Side enlargement for mouse input.</p>
        <p>In place enlargement for touch input.</p>
        <p>Fluid between breakpoints.</p>
        <p>Please see for details.</p>
      </div>
      <div style={{ height: "500px" }} />
    </div>
  );
}
