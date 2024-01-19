import { Outlet } from "react-router-dom";
import Starscape from "./starscape/starscape";
import Tab from "../components/tab";
import React from "react";

// header ?
// Cool looking background?
// links to different pages:
/* - roll dice
   - character sheet ?
   - rules ?
*/

export default function Root() {
  return (
    <div id="app">
      <header>
        <Tab name="Dice" link="diceroll" />
        <Tab name="Character Sheet" link="charsheet" />
        <Tab name="Rules" link="rules" />
      </header>
      <div>
        <Starscape />
        <Outlet />
      </div>
    </div>
  );
}
