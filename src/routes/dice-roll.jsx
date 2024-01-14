import React, { useState } from "react";
import { Dice, Dice2 } from "./DiceBox/dice-box";

Dice.init().then(() => {
  // clear dice on click anywhere on the screen
  document.addEventListener("mousedown", () => {
    const diceBoxCanvas = document.getElementById("dice-canvas");
    if (window.getComputedStyle(diceBoxCanvas).display !== "none") {
      Dice.hide().clear();
      Dice2.hide().clear();
    }
  });
});

Dice2.init();

const DiceRoll = () => {
  const [stressResult, setStressResult] = useState();
  const [normalResult, setNormalResult] = useState();
  // This method is triggered whenever dice are finished rolling
  Dice.onRollComplete = (results) => {
    setNormalResult(results[0].rolls);
  };

  Dice2.onRollComplete = (results) => {
    setStressResult(results[0].rolls);
  };

  // trigger dice roll
  const rollDice = (normal, stress) => {
    // trigger the dice roll using the parser
    Dice.show().roll(normal + "d6");
    Dice2.show().roll(stress + "d6");
  };

  const [reroll, setReroll] = useState(0);

  const [attribute, setAttribute] = useState(3);
  const [skill, setSkill] = useState(2);
  const [stress, setStress] = useState(Math.floor(Math.random() * 5) + 5);

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
  let not6;
  let not1;

  if (normalResult && stressResult) {
    norm6 = normalResult.filter((result) => result.value === 6).length;
    not6 = stressResult.filter((result) => result.value === 6).length;
    not1 = stressResult.filter((result) => result.value === 1).length;
  }

  return (
    <div>
      <h1>Dice Roller</h1>
      <button onClick={() => rollDice(skill + attribute, stress)}>Roll</button>
      <div>
        <label>
          Attribute:
          <input
            type="number"
            value={attribute}
            onChange={(e) => setAttribute(parseInt(e.target.value))}
          />
        </label>
      </div>
      <div>
        <label>
          Skill:
          <input
            type="number"
            value={skill}
            onChange={(e) => setSkill(parseInt(e.target.value))}
          />
        </label>
      </div>
      <div>
        <label>
          Stress:
          <input
            type="number"
            value={stress}
            onChange={(e) => setStress(parseInt(e.target.value))}
          />
        </label>
      </div>
      {normalResult && stressResult && (
        <>
          <p>Sixes: {norm6 + not6}</p>
          <p>Ones: {not1}</p>
          {not1 > 0 && <p>Panic roll: {panic}</p>}
          {not1 > 0 && <p>{panicResult()}</p>}
        </>
      )}
    </div>
  );
  <>
    {/* Dice rolling -
      # of d6 for skill dice
        - attribute level
        - skill level
      # of d6 for stress dice
        - stress level
    then we roll:
    any 6 = win
    # of six more than one = bonuses
    and 1 on a stress die = PANIC CHECK!!!!
      */}
  </>;
};

export default DiceRoll;
