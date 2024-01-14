import React, { useState, useEffect } from "react";

const InputField = ({ label, value, onChange }) => (
  <li>
    {label}: <input type="text" value={value} onChange={onChange} />
  </li>
);

const CharacterSheet = () => {
  const initialValues = {
    strength: localStorage.getItem("strength") || "",
    agility: localStorage.getItem("agility") || "",
    wits: localStorage.getItem("wits") || "",
    empathy: localStorage.getItem("empathy") || "",
    // More attributes here
  };
  const [attributes, setAttributes] = useState(initialValues);

  useEffect(() => {
    Object.entries(attributes).forEach(([key, value]) => {
      localStorage.setItem(key, value);
    });
  }, [attributes]);

  const handleAttributeChange = (attribute, e) => {
    setAttributes((prevAttributes) => ({
      ...prevAttributes,
      [attribute]: e.target.value,
    }));
  };
  return (
    <>
      <h1>Character Sheet</h1>
      <h2>Career</h2>
      <ul>
        <li>Marine</li>
        <li>Colonial Marhal</li>
        <li>Company Agent</li>
        <li>Medic</li>
        <li>Officer</li>
        <li>Pilot</li>
        <li>Roughneck</li>
        <li>Scientist</li>
      </ul>
      <h2>Attributes and Skills</h2>
      <ul>
        <li>
          <InputField
            label="Strength"
            value={attributes.strength}
            onChange={(e) => handleAttributeChange("strength", e)}
          />
          <ul>
            <li>Heavy Machinery</li>
            <li>Stamina</li>
            <li>Close Combat</li>
          </ul>
        </li>
        <li>
          Agility
          <ul>
            <li>Mobility</li>
            <li>Piloting</li>
            <li>Ranged Combat</li>
          </ul>
        </li>
        <li>
          Wits
          <ul>
            <li>Observation</li>
            <li>Comtech</li>
            <li>Survival</li>
          </ul>
        </li>
        <li>
          Empathy
          <ul>
            <li>Manipulation</li>
            <li>Medical Aid</li>
            <li>Command</li>
          </ul>
        </li>
      </ul>
    </>
  );
};

export default CharacterSheet;
