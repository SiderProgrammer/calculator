import Button from "./Button";
import Draggable from "react-draggable";
import "./ButtonWrapper.css";
import { useEffect, useState } from "react";

function Buttons({ onClick }) {
  // prettier-ignore
  const characters = [
    "(",")","%","C",
    7,8,9,"/",
    4,5,6,"*",
    1,2,3,"-",
    0,".","=","+",
  ];

  const calculateDimensions = () => {
    return {
      width: window.innerWidth * 0.25,
      height: window.innerHeight * 0.16,
    };
  };

  const [dimensions, recalculateDimensions] = useState(calculateDimensions());
  //useEffect(recalculateDimensions(calculateDimensions()));
  function updateDimensions() {
    recalculateDimensions(calculateDimensions());
  }
  useEffect(() => {
    window.addEventListener("resize", updateDimensions);

    return () => window.removeEventListener("resize", updateDimensions);
  });

  return (
    <>
      {characters.map((character) => {
        return (
          <Draggable
            grid={[dimensions.width, dimensions.height]}
            key={character + 1}
          >
            <div className="button-wrapper">
              <Button key={character} onClick={onClick}>
                {character}
              </Button>
            </div>
          </Draggable>
        );
      })}
    </>
  );
}

export default Buttons;
