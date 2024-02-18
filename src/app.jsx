import React, { useState } from "react";
import { createHashRouter, RouterProvider } from "react-router-dom";
import Root from "./routes/root";
import ErrorPage from "./error-page";
import DiceRoll from "./routes/dice-roll";
import Rules from "./routes/rules";
import CharacterSheet from "./routes/character-sheet";

const defaultSheet = {
  name: "",
  rank: "",
  career: "",
  appearance: "",
  personality: "",
  personalAgenda: "",
  buddy: "",
  rival: "",
  stress: 0,
  health: 0,
  radiation: 0,
  criticalInjuries: "",
  talents: "",
  strength: 1,
  agility: 1,
  wits: 1,
  empathy: 1,
  closeCombat: 0,
  heavyMachinery: 0,
  stamina: 0,
  mobility: 0,
  piloting: 0,
  rangedCombat: 0,
  comtech: 0,
  observation: 0,
  survival: 0,
  command: 0,
  manipulation: 0,
  medicalAid: 0,
  weapons: [
    {
      name: "M4A3 Service Pistol",
      bonus: "+1",
      damage: 1,
      range: "Medium",
      notes: "",
      weight: 0.5,
    },
    ...Array(3).fill({
      name: "",
      bonus: null,
      damage: null,
      range: "",
      notes: "",
      weight: null,
    }),
  ],
  gear: [
    { name: "Hi-beam flashlight", size: 0.5 },
    ...Array(9).fill({ name: "", size: null }),
  ],
  tinyItems: "",
  signatureItem: "",
  starving: false,
  dehydrated: false,
  exhausted: false,
  freezing: false,
  experiencePoints: 0,
  storyPoints: 0,
};

const getState = () => {
  console.log(JSON.parse(localStorage.getItem("sheet")));
  return JSON.parse(localStorage.getItem("sheet"));
};

const setState = (sheet) => {
  localStorage.setItem("sheet", JSON.stringify(sheet));
};

const App = () => {
  const [sheet, setSheet] = useState(getState() || defaultSheet);

  const router = createHashRouter([
    {
      path: "/",
      element: <Root />,
      errorElement: <ErrorPage />,
      children: [
        {
          path: "diceroll",
          element: <DiceRoll />,
        },
        {
          path: "charsheet",
          element: (
            <CharacterSheet
              sheet={sheet}
              setSheet={setSheet}
              setState={setState}
            />
          ),
        },
        {
          path: "rules",
          element: <Rules />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
};

export default App;
