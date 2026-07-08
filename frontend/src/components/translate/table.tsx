import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

export default function Table() {
  return (
    <Box sx={{ width: "100%", maxWidth: 400, margin: "0 auto", p: 2 }}>
      <Box
        sx={{
          minHeight: "80px",
          borderBottom: "2px solid #37464F",
          display: "flex",
          flexWrap: "wrap",
          gap: 1,
          alignContent: "center",
          mb: 4,
          paddingBottom: "8px",
        }}
      >
        <Typography variant="body2" color="gray">
          Tap tokens to build the sentence
        </Typography>
      </Box>

      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          gap: 1.5,
          justifyContent: "center",
        }}
      ></Box>
    </Box>
  );
}
