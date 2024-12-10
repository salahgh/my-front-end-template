import { useState } from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import { Container, Typography } from "@mui/material";

function Home() {
  return (
    <Container>
      <Typography variant="h2" gutterBottom>
        Home Page
      </Typography>
      <Typography variant="body1"> Welcome to the Home Page! </Typography>{" "}
    </Container>
  );
}

function About() {
  return (
    <Container>
      <Typography variant="h2" gutterBottom>
        About Page
      </Typography>
      <Typography variant="body1"> Welcome to the About Page! </Typography>{" "}
    </Container>
  );
}

function App() {
  const [count, setCount] = useState(0);

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
    </Routes>
  );
}

export default App;
