import Button from "./Button";

function Buttons({ onClick }) {
  // prettier-ignore
  const characters = [
    "(",")","%","C",
    7,8,9,"/",
    4,5,6,"*",
    1,2,3,"-",
    0,".","=","+",
  ];
  return (
    <>
      {characters.map((character) => {
        return (
          <Button key={character} onClick={onClick}>
            {character}
          </Button>
        );
      })}
    </>
  );
}

export default Buttons;
