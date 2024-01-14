import DiceBox from "@3d-dice/dice-box";

const Dice = new DiceBox(
  "#dice-box", // target DOM element to inject the canvas for rendering
  {
    id: "dice-canvas", // canvas element id
    assetPath: "/assets/",
    theme: "default",
    startingHeight: 8,
    throwForce: 6,
    spinForce: 5,
    lightIntensity: 0.9,
  }
);

const Dice2 = new DiceBox(
  "#dice-box", // target DOM element to inject the canvas for rendering
  {
    id: "dice-canvas", // canvas element id
    assetPath: "/assets/",
    theme: "rust",
    themeColor: "#491714",
    startingHeight: 8,
    throwForce: 6,
    spinForce: 5,
    lightIntensity: 0.9,
  }
);

export { Dice, Dice2 };
