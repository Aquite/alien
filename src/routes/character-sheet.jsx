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

  const MetricInput = (name) => {
    const id = toCamelCase(name);
    return (
      <div style={{ textAlign: "center" }}>
        <label>{name}</label>
        <input
          type="number"
          label={name}
          min="0"
          style={{
            fontFamily: "TGO",
            backgroundColor: "transparent",
            color: "#ffb000",
            outline: "none",
            width: "100%",
            border: "none",
            textAlign: "center",
            fontSize: "8rem",
            marginTop: "-30px",
            marginBottom: "-10px",
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
          rows={5}
          style={{
            backgroundColor: "transparent",
            color: "#ffb000",
            marginLeft: "5px",
            outline: "none",
            width: "100%",
            border: "none",
            lineHeight: "0.8em",
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
          <Col>
            <Row className="subCol">{TextInput("Buddy", 78)}</Row>
            <Row className="subCol">{TextInput("Rival", 78)}</Row>
          </Col>
        </Row>
        <Row>
          <Col>{TextAreaInput("Talents")}</Col>
          <Col>{TextAreaInput("Critical Injuries")}</Col>
        </Row>
        <Row>
          <Col>{MetricInput("Stress")}</Col>
          <Col>{MetricInput("Health")}</Col>
          <Col>{MetricInput("Radiation")}</Col>
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
          <Col>
            <Container style={{ textAlign: "center" }}>
              <Row>
                <Col xs={10}>
                  <label>Gear Name</label>
                </Col>
                <Col xs={2}>
                  <label>WT</label>
                </Col>
                <hr style={{ color: "#33ff00", marginBlock: "0px" }} />
              </Row>

              {sheet.gear.map((gear, idx) => {
                return (
                  <>
                    <Row>
                      <Col xs={10}>
                        <input
                          label="Name"
                          value={gear.name}
                          style={{
                            backgroundColor: "transparent",
                            color: "#ffb000",
                            outline: "none",
                            width: "100%",
                            border: "none",
                            textAlign: "center",
                          }}
                          onChange={(e) =>
                            handleSheetArrayChange("gear", idx, "name", e)
                          }
                        />
                      </Col>
                      <Col xs={2}>
                        <input
                          label="Size"
                          type="number"
                          value={gear.size}
                          style={{
                            backgroundColor: "transparent",
                            color: "#ffb000",
                            outline: "none",
                            width: "100%",
                            border: "none",
                            textAlign: "center",
                          }}
                          onChange={(e) =>
                            handleSheetArrayChange("gear", idx, "size", e)
                          }
                        />
                      </Col>
                    </Row>
                    <hr style={{ color: "#33ff00", marginBlock: "0px" }} />
                  </>
                );
              })}
            </Container>
          </Col>
          <Col>
            <Row className="subCol">{TextAreaInput("Tiny Items")}</Row>
            <Row className="subCol">{TextInput("Signature Item")}</Row>
            <Row
              style={{
                textAlign: "center",
                display: "flex",
                alignItems: "center",
              }}
            >
              <span
                style={{
                  borderRadius: "15px",
                  fontFamily: "TGO",
                  fontSize: "5em",
                  textTransform: "uppercase",
                }}
                className="Tbutton"
                onClick={() => setState(sheet)}
              >
                Save
              </span>
            </Row>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default CharacterSheet;
