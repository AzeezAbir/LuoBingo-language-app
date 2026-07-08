import { Box } from "@mui/material";

interface ProgBarProps {
  progressValue?: number;
}

export default function ProgBar({ progressValue = 50 }: ProgBarProps) {
  return (
    <Box
      sx={{
        marginX: 1,
        width: "100%",
        height: 16,
        backgroundColor: "#d4d4d4",
        borderRadius: 10,
        overflow: "hidden",
      }}
    >
      <Box
        sx={{
          width: `${progressValue}%`,
          height: "100%",
          backgroundColor: "#58cc02",
          borderRadius: 10,
          transition: "width 0.4s ease-in-out",
        }}
      />
    </Box>
  );
}
