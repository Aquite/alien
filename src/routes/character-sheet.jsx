import React from "react";

const CharacterSheet = ({ sheet, setSheet, setState }) => {
  const toCamelCase = (value) => {
    return value.toLowerCase().replace(/\s+(.)/g, function (match, group1) {
      return group1.toUpperCase();
    });
  };

  const handleNumberChange = (field, e) => {
    setSheet((sheet) => ({
      ...sheet,
      [field]: Number(e.target.value),
    }));
  };

  const handleTextChange = (field, e) => {
    setSheet((sheet) => ({
      ...sheet,
      [field]: e.target.value,
    }));
  };

  const handleSheetArrayChange = (field, i, e) => {
    setSheet((sheet) => ({
      ...sheet,
      [field]: e.target.value,
    }));
  };

  const SkillInput = (name) => {
    const id = toCamelCase(name);
    return (
      <div>
        <label>{name}: </label>
        <input
          type="number"
          label={name}
          min="1"
          max="5"
          value={sheet[id]}
          onChange={(e) => handleNumberChange(id, e)}
        />
      </div>
    );
  };

  const AbilityInput = (name) => {
    const id = toCamelCase(name);
    return (
      <div>
        <label>{name}: </label>
        <input
          type="number"
          label={name}
          min="0"
          max="5"
          value={sheet[id]}
          onChange={(e) => handleNumberChange(id, e)}
        />
      </div>
    );
  };

  return (
    <div>
      <h1>Character Sheet</h1>
      <h2>Skills and Attributes</h2>
      {SkillInput("Strength")}
      <ul>
        <li>{AbilityInput("Close Combat")}</li>
        <li>{AbilityInput("Heavy Machinery")}</li>
        <li>{AbilityInput("Stamina")}</li>
      </ul>
      {SkillInput("Agility")}
      <ul>
        <li>{AbilityInput("Mobility")}</li>
        <li>{AbilityInput("Piloting")}</li>
        <li>{AbilityInput("Ranged Combat")}</li>
      </ul>
      {SkillInput("Wits")}
      <ul>
        <li>{AbilityInput("Comtech")}</li>
        <li>{AbilityInput("Observation")}</li>
        <li>{AbilityInput("Survival")}</li>
      </ul>
      {SkillInput("Empathy")}
      <ul>
        <li>{AbilityInput("Command")}</li>
        <li>{AbilityInput("Manipulation")}</li>
        <li>{AbilityInput("Medical Aid")}</li>
      </ul>
      <span className="Tbutton" onClick={() => setState(sheet)}>
        Save
      </span>
    </div>
  );
};

export default CharacterSheet;
