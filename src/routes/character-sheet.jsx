import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "./character-sheet.css";

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
          style={{
            fontFamily: "TGO",
            backgroundColor: "transparent",
            color: "#ffb000",
            outline: "none",
            width: "100%",
            border: "none",
            textAlign: "center",
            fontSize: "6rem",
            marginBlock: "-30px",
          }}
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
          style={{
            fontFamily: "TGO",
            backgroundColor: "transparent",
            color: "#ffb000",
            outline: "none",
            width: "100%",
            border: "none",
            textAlign: "center",
            fontSize: "6rem",
            marginBlock: "-30px",
          }}
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
          <Col className="orange">{SkillInput("Strength")}</Col>
          <Col className="purple">{SkillInput("Agility")}</Col>
          <Col className="blue">{SkillInput("Wits")}</Col>
          <Col className="pink">{SkillInput("Empathy")}</Col>
        </Row>
        <Row>
          <Col className="orange">
            <Container>
              <Row>{AbilityInput("Close Combat")}</Row>
              <Row>{AbilityInput("Heavy Machinery")}</Row>
              <Row>{AbilityInput("Stamina")}</Row>
            </Container>
          </Col>
          <Col className="purple">
            <Container>
              <Row>{AbilityInput("Mobility")}</Row>
              <Row>{AbilityInput("Piloting")}</Row>
              <Row>{AbilityInput("Ranged Combat")}</Row>
            </Container>
          </Col>
          <Col className="blue">
            <Container>
              <Row>{AbilityInput("Comtech")}</Row>
              <Row>{AbilityInput("Observation")}</Row>
              <Row>{AbilityInput("Survival")}</Row>
            </Container>
          </Col>
          <Col className="pink">
            <Container>
              <Row>{AbilityInput("Command")}</Row>
              <Row>{AbilityInput("Manipulation")}</Row>
              <Row>{AbilityInput("Medical Aid")}</Row>
            </Container>
          </Col>
        </Row>
        <Row>
          <Container className="weapons" style={{ textAlign: "center" }}>
            <label>Weapons</label>
            <Row className="weaponsLabels" style={{ marginBottom: "15px" }}>
              <Col xs={3}>
                <label>Name</label>
              </Col>
              <Col xs={1}>
                <label>Bonus</label>
              </Col>
              <Col xs={1}>
                <label>DMG</label>
              </Col>
              <Col xs={2}>
                <label>Range</label>
              </Col>
              <Col xs={4}>
                <label>Notes</label>
              </Col>
              <Col xs={1}>
                <label>WT</label>
              </Col>
            </Row>
            {sheet.weapons.map((weapon, idx) => {
              return (
                <>
                  <Row>
                    <Col xs={3}>
                      <input
                        label="Name"
                        value={weapon.name}
                        style={{
                          backgroundColor: "transparent",
                          color: "#ffb000",
                          outline: "none",
                          width: "100%",
                          border: "none",
                          textAlign: "center",
                        }}
                        onChange={(e) =>
                          handleSheetArrayChange("weapons", idx, "name", e)
                        }
                      />
                    </Col>
                    <Col xs={1}>
                      <input
                        label="Bonus"
                        value={weapon.bonus}
                        style={{
                          backgroundColor: "transparent",
                          color: "#ffb000",
                          outline: "none",
                          width: "100%",
                          border: "none",
                          textAlign: "center",
                        }}
                        onChange={(e) =>
                          handleSheetArrayChange("weapons", idx, "bonus", e)
                        }
                      />
                    </Col>
                    <Col xs={1}>
                      <input
                        type="number"
                        label="Damage"
                        value={weapon.damage}
                        style={{
                          backgroundColor: "transparent",
                          color: "#ffb000",
                          outline: "none",
                          width: "100%",
                          border: "none",
                          textAlign: "center",
                        }}
                        onChange={(e) =>
                          handleSheetArrayChange("weapons", idx, "damage", e)
                        }
                      />
                    </Col>
                    <Col xs={2}>
                      <input
                        label="Range"
                        value={weapon.range}
                        style={{
                          backgroundColor: "transparent",
                          color: "#ffb000",
                          outline: "none",
                          width: "100%",
                          border: "none",
                          textAlign: "center",
                        }}
                        onChange={(e) =>
                          handleSheetArrayChange("weapons", idx, "range", e)
                        }
                      />
                    </Col>
                    <Col xs={4}>
                      <input
                        label="Notes"
                        value={weapon.notes}
                        style={{
                          backgroundColor: "transparent",
                          color: "#ffb000",
                          outline: "none",
                          width: "100%",
                          border: "none",
                          textAlign: "center",
                        }}
                        onChange={(e) =>
                          handleSheetArrayChange("weapons", idx, "notes", e)
                        }
                      />
                    </Col>
                    <Col xs={1}>
                      <input
                        label="Weight"
                        type="number"
                        value={weapon.weight}
                        style={{
                          backgroundColor: "transparent",
                          color: "#ffb000",
                          outline: "none",
                          width: "100%",
                          border: "none",
                          textAlign: "center",
                        }}
                        onChange={(e) =>
                          handleSheetArrayChange("weapons", idx, "weight", e)
                        }
                      />
                    </Col>
                  </Row>
                  <hr style={{ color: "#33ff00" }} />
                </>
              );
            })}
          </Container>
        </Row>
        <Row>
          <Col>Gear</Col>
          <Col className="rowHolder">
            <Row>
              <Col>Tiny Items</Col>
            </Row>
            <Row>
              <Col>Signature Item</Col>
            </Row>
          </Col>
        </Row>
      </Container>

      <h2>Background</h2>
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
