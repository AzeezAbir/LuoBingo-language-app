import { Button, Link } from "@mui/material";
import Clear from "../Buttons/Close";

import "../../styles/UI.css";
export default function Homebtn() {
  return (
    <>
      <Link
        href="/"
        className="cross"
        sx={{ "&:hover": { color: "red" } }}
        color="error"
      >
        <Clear />
      </Link>
    </>
  );
}
