import axios from "axios";
import { useState, useEffect } from "react";
import "./App.css";
import { Box, Typography } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import Reset from "./components/Reset";
import Shuffle from "./components/Shuffle";
import Match from "./pages/match";

function App() {
  return (
    <div>
      <Match />
      <Shuffle />
    </div>
  );
}

export default App;
