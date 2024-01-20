import React, { useState } from "react";
import { Dice } from "./DiceBox/dice-box";

Dice.init().then(async (world) => {
  // clear dice on click anywhere on the screen
  document.addEventListener("mousedown", () => {
    const diceBoxCanvas = document.getElementById("dice-canvas");
    if (window.getComputedStyle(diceBoxCanvas).display !== "none") {
      Dice.hide().clear();
    }
  });
});

Dice.updateConfig({
  angularDamping: 0.4,
  delay: 10,
  enableShadows: true,
  friction: 0.8,
  gravity: 1,
  lightIntensity: 1,
  linearDamping: 0.5,
  mass: 1,
  restitution: 0,
  scale: 5,
  settleTimeout: 5000,
  shadowTransparency: 0.8,
  spinForce: 6,
  startingHeight: 8,
  suspendSimulation: false,
  theme: "rust",
  themeColor: "#aa4f4a",
  throwForce: 5,
});

const DiceRoll = () => {
  const [stressResult, setStressResult] = useState();
  const [normalResult, setNormalResult] = useState();
  // This method is triggered whenever dice are finished rolling
  Dice.onRollComplete = (results) => {
    console.log(results);
    setNormalResult(results[0].rolls);
    results[1] && setStressResult(results[1].rolls);
  };

  // onClick handler for dice roll
  const handleRoll = (e, normal, stress) => {
    e.preventDefault();
    rollDice(normal, stress);
  };

  // trigger dice roll
  const rollDice = (normal, stress) => {
    // clear last roll
    setStressResult();
    setNormalResult();
    // trigger the dice roll using the parser
    Dice.show().roll(normal + "d6", {
      theme: "default",
      themeColor: "#000000",
    });
    if (stress > 0) {
      Dice.show().add(stress + "d6", { theme: "rust", themeColor: "#fcd114" });
    }
  };

  const [attribute, setAttribute] = useState(3);
  const [skill, setSkill] = useState(2);
  const [stress, setStress] = useState(Math.floor(Math.random() * 5) + 5);
  const [mod, setMod] = useState(0);

  const roll = () => {
    return Math.floor(Math.random() * 6) + 1;
  };
  const panic = roll() + stress;

  const panicResult = () => {
    if (panic >= 1 && panic <= 6) {
      return "KEEPING IT TOGETHER. You manage to keep your nerves in check. Barely.";
    }

    switch (panic) {
      case 7:
        return "NERVOUS TWITCH. Your STRESS LEVEL, and the STRESS LEVEL of all friendly PCs in SHORT range of you, increases by one.";
      case 8:
        return "TREMBLE. You start to tremble uncontrollably. All skill rolls using AGILITY suffer a -2 modification until your panic stops.";
      case 9:
        return "DROP ITEM. Whether by stress, confusion, or the realization that you're all going to die anyway, you drop a weapon or other important item—the GM decides which one. Your STRESS LEVEL increases by one.";
      case 10:
        return "FREEZE. You're frozen by fear or stress for one Round, losing your next slow action. Your STRESS LEVEL, and the STRESS LEVEL of all friendly PCs in SHORT range of you, increases by one.";
      case 11:
        return "SEEK COVER. You must use your next action to move away from danger and find a safe spot if possible. You are allowed to make a retreat roll (see page 93) if you have an enemy at ENGAGED range. Your STRESS LEVEL is decreased by one, but the STRESS LEVEL of all friendly PCs in SHORT range increases by one. After one Round, you can act normally.";
      case 12:
        return "SCREAM. You scream your lungs out for one Round, losing your next slow action. Your STRESS LEVEL is decreased by one, but every friendly character who hears your scream must make an immediate Panic Roll.";
      case 13:
        return "FLEE. You just can't take it anymore. You must flee to a safe place and refuse to leave it. You won't attack anyone and won't attempt anything dangerous. You are not allowed to make a retreat roll (see page 93) if you have an enemy at ENGAGED range when you flee. Your STRESS LEVEL is decreased by one, but every friendly character who sees you run must make an immediate Panic Roll.";
      case 14:
        return "BERSERK. You must immediately attack the nearest person or creature, friendly or not. You won't stop until you or the target is Broken. Every friendly character who witnesses your rampage must make an immediate Panic Roll.";
      default:
        return "CATATONIC. You collapse to the floor and can't talk or move, staring blankly into oblivion.";
    }
  };

  let norm6;
  let not6 = 0;
  let not1 = 0;

  if (normalResult) {
    norm6 = normalResult.filter((result) => result.value === 6).length;
  }

  if (stressResult) {
    not6 = stressResult.filter((result) => result.value === 6).length;
    not1 = stressResult.filter((result) => result.value === 1).length;
  }

  return (
    <div className="dice" style={{ minHeight: "160vh" }}>
      <h1>Dice Roller</h1>
      <p>
        You need at least one <Icon type="success" /> (six) to succeed on your
        roll.
      </p>
      <p>
        If any of your stress dice land on <Icon type="fail" />, then you must
        make a Panic roll and could risk panicking.
      </p>

      <div>
        <label>Attribute:</label>
        <input
          type="number"
          min="1"
          max="5"
          value={attribute}
          onChange={(e) => setAttribute(parseInt(e.target.value))}
        />
      </div>
      <div>
        <label>Skill:</label>
        <input
          type="number"
          min="0"
          max="5"
          value={skill}
          onChange={(e) => setSkill(parseInt(e.target.value))}
        />
      </div>
      <div>
        <label>Stress:</label>
        <input
          type="number"
          min="0"
          value={stress}
          onChange={(e) => setStress(parseInt(e.target.value))}
        />
      </div>
      <div>
        <label>Modifier:</label>
        <input
          type="number"
          min="-10"
          max="10"
          value={mod}
          onChange={(e) => setMod(parseInt(e.target.value))}
        />
      </div>
      <div style={{ marginTop: "40px", textAlign: "center" }}>
        <span
          className="Tbutton"
          onClick={(e) => handleRoll(e, skill + attribute + mod, stress)}
        >
          Roll
        </span>
      </div>

      {normalResult && (
        <>
          <h1 style={{ fontSize: "10rem", marginBlock: "0px" }}>
            {[...Array(norm6 + not6)].map(() => {
              return <Icon type="success" />;
            })}
            {[...Array(not1)].map(() => {
              return <Icon type="fail" />;
            })}
          </h1>
          {not1 > 0 && <p>Panic roll: {panic}</p>}
          {not1 > 0 && <p>{panicResult()}</p>}
        </>
      )}
    </div>
  );
};

const Icon = ({ type }) => {
  return <img className="icon" src={type + ".png"} alt={type} />;
};

export default DiceRoll;
