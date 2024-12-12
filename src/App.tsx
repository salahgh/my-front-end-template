import { useState } from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import { Home } from "./Pages/Home.tsx";
import { About } from "./Pages/About.tsx";
import { ROUTS } from "./components/routs.ts";

function App() {
  const [count, setCount] = useState(0);

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path={ROUTS.about} element={<About />} />
    </Routes>
  );
}

export default App;
