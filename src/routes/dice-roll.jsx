const DiceRoll = () => {
  const attribute = 1;
  const skill = 2;
  const rolls = attribute + skill;

  let stress = 2;

  const roll = () => {
    return Math.floor(Math.random() * 6) + 1;
  };

  const norm = Array.from({ length: rolls }, () => roll());
  const notNorm = Array.from({ length: stress }, () => roll());

  const norm6 = norm.filter((result) => result === 6).length;
  const not6 = notNorm.filter((result) => result === 6).length;
  const not1 = notNorm.filter((result) => result === 1).length;

  const panic = roll() + stress;

  return (
    <div>
      <h1>Dice Roller</h1>
      <p>Rolls: {norm.join(", ")}</p>
      {<p>Sixes: {norm6 + not6}</p>}
      <p>Stress rolls: {notNorm.join(", ")}</p>
      {<p>Ones: {not1}</p>}
      {not1 > 0 && <p>Panic roll: {panic}</p>}
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
