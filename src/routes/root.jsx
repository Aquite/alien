import { Outlet, Link } from "react-router-dom";

// sidebar ?
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
      <div id="sidebar">
        <h1>I'm a sidebar!</h1>
        <p>
          <Link to={"diceroll"}>Roll the dice</Link>
        </p>
        <p>
          <Link to={"charsheet"}>Character Sheet</Link>
        </p>
      </div>
      <div
        id="main"
        style={{
          color: "white",
          backgroundColor: "black",
          display: "flex",
          flexFlow: "column",
          height: "100%",
        }}
      >
        <Outlet />
      </div>
    </div>
  );
}
