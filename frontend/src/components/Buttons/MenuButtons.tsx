import { ButtonGroup, Button } from "@mui/material";
import { useState } from "react";

export default function Btn({ text }) {
  const [clicked, setClicked] = useState(false);
  const [newContent, setNewContent] = useState(true);

  setClicked(!clicked);
  return <button className="subbtn" /* onClick={} */>{text}</button>;
}
