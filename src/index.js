import React from "react";
import ReactDOM from "react-dom";
import Regions from "./components/Regions";

function App() {
  return <Regions />;
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
