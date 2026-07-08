import Box from "@mui/material/Box";
import { useNavigate } from "react-router";
import { Button } from "@mui/material";
import "../styles/BoxBasic.css";

export default function BoxBasic({ subName }) {
  const navigate = useNavigate();

  const handleRedirect = () => {
    navigate("/C12");
  };

  return (
    <Box
      className="box"
      component="section"
      sx={{
        p: 2,
        border: "1px dashed grey",
        width: "100%",
        maxWidth: "800px",
        mx: "auto",
        mt: 4,
        display: "flex",
        justifyContent: "center",
      }}
    >
      {subName === "Physics" ? (
        <Button className="chapName" onClick={handleRedirect}>
          Chapter 12: Semiconductors
        </Button>
      ) : (
        ""
      )}
      {subName === "Chemistry" ? (
        <Button className="chapName" onClick={handleRedirect}>
          Chemistry
        </Button>
      ) : (
        ""
      )}
      {subName === "Biology" ? (
        <Button className="chapName" onClick={handleRedirect}>
          Bio
        </Button>
      ) : (
        ""
      )}
    </Box>
  );
}
