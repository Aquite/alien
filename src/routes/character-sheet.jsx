import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

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

  const handleSheetArrayChange = (field, i, attr, e) => {
    setSheet((sheet) => ({
      ...sheet,
      [field]: sheet[field].map((item, index) => {
        if (index === i) {
          return { ...item, [attr]: e.target.value };
        } else {
          return item;
        }
      }),
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

  const TextInput = (name, width) => {
    const id = toCamelCase(name);
    return (
      <div>
        <label>{name}: </label>
        <input
          type="text"
          label={name}
          value={sheet[id]}
          style={{
            backgroundColor: "transparent",
            color: "#ffb000",
            marginLeft: "5px",
            outline: "none",
            width: "100%",
            border: "none",
          }}
          onChange={(e) => handleTextChange(id, e)}
        />
      </div>
    );
  };

  const TextAreaInput = (name) => {
    const id = toCamelCase(name);
    return (
      <div>
        <label>{name}: </label>
        <textarea
          label={name}
          value={sheet[id]}
          style={{
            backgroundColor: "transparent",
            color: "#ffb000",
            marginLeft: "5px",
            outline: "none",
            width: "100%",
            border: "none",
          }}
          onChange={(e) => handleTextChange(id, e)}
        />
      </div>
    );
  };

  return (
    <div>
      <h1>Character Sheet</h1>
      <Container className="sheet">
        <Row>
          <Col>{TextInput("Name", 86)}</Col>
          <Col>{TextInput("Career", 62)}</Col>
        </Row>
        <Row>
          <Col>{TextAreaInput("Appearance")}</Col>
          <Col>{TextAreaInput("Personality")}</Col>
        </Row>
        <Row>
          <Col>{TextAreaInput("Personal Agenda")}</Col>
          <Col className="rowHolder">
            <Row>
              <Col>{TextInput("Buddy", 78)}</Col>
            </Row>
            <Row>
              <Col>{TextInput("Rival", 78)}</Col>
            </Row>
          </Col>
        </Row>
        <Row>
          <Col>Attributes</Col>
        </Row>
        <Row>
          <Col>Strength</Col>
          <Col>Agility</Col>
          <Col>Wits</Col>
          <Col>Empathy</Col>
        </Row>
      </Container>

      <h2>Background</h2>
      {TextInput("Name")}
      {TextInput("Rank")}
      {TextInput("Career")}

      {TextInput("Rival")}
      {TextAreaInput("Talents")}
      <h2>Health and Wellness</h2>
      <div>
        <label>Stress: </label>
        <input
          type="number"
          label="Stress"
          min="0"
          value={sheet.stress}
          onChange={(e) => handleNumberChange("stress", e)}
        />
      </div>
      <div>
        <label>Health: </label>
        <input
          type="number"
          label="Health"
          min="0"
          value={sheet.health}
          onChange={(e) => handleNumberChange("health", e)}
        />
      </div>
      <div>
        <label>Radiation: </label>
        <input
          type="number"
          label="Radiation"
          min="0"
          value={sheet.radiation}
          onChange={(e) => handleNumberChange("radiation", e)}
        />
      </div>
      {TextAreaInput("Critical Injuries")}
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
      <h2>Weapons</h2>
      <div>
        {sheet.weapons.map((weapon, idx) => {
          return (
            <div>
              <div>
                <label>Name: </label>
                <input
                  label="Name"
                  value={weapon.name}
                  onChange={(e) =>
                    handleSheetArrayChange("weapons", idx, "name", e)
                  }
                />
              </div>
              <div>
                <label>Bonus: </label>
                <input
                  label="Bonus"
                  value={weapon.bonus}
                  onChange={(e) =>
                    handleSheetArrayChange("weapons", idx, "bonus", e)
                  }
                />
              </div>
              <div>
                <label>Damage: </label>
                <input
                  label="Damage"
                  value={weapon.damage}
                  onChange={(e) =>
                    handleSheetArrayChange("weapons", idx, "damage", e)
                  }
                />
              </div>
              <div>
                <label>Range: </label>
                <input
                  label="Range"
                  value={weapon.range}
                  onChange={(e) =>
                    handleSheetArrayChange("weapons", idx, "range", e)
                  }
                />
              </div>
              <div>
                <label>Reloads: </label>
                <input
                  label="Reloads"
                  value={weapon.reloads}
                  onChange={(e) =>
                    handleSheetArrayChange("weapons", idx, "reloads", e)
                  }
                />
              </div>
              <div>
                <label>Notes: </label>
                <input
                  label="Notes"
                  value={weapon.notes}
                  onChange={(e) =>
                    handleSheetArrayChange("weapons", idx, "notes", e)
                  }
                />
              </div>
              <div>
                <label>Weight: </label>
                <input
                  label="Weight"
                  value={weapon.weight}
                  onChange={(e) =>
                    handleSheetArrayChange("weapons", idx, "weight", e)
                  }
                />
              </div>
            </div>
          );
        })}
      </div>
      <h2>Gear</h2>
      <div>
        {sheet.gear.map((gear, idx) => {
          return (
            <div>
              <div>
                <label>Name: </label>
                <input
                  label="Name"
                  value={gear.name}
                  onChange={(e) =>
                    handleSheetArrayChange("gear", idx, "name", e)
                  }
                />
              </div>
              <div>
                <label>Size: </label>
                <input
                  label="Size"
                  value={gear.size}
                  onChange={(e) =>
                    handleSheetArrayChange("gear", idx, "size", e)
                  }
                />
              </div>
            </div>
          );
        })}
        {TextAreaInput("Tiny Items")}
        {TextInput("Signature Item")}
      </div>
      <span className="Tbutton" onClick={() => setState(sheet)}>
        Save
      </span>
    </div>
  );
};

export default CharacterSheet;
