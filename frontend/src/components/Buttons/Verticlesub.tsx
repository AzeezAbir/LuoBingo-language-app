import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import Box from "@mui/material/Box";

const buttons = [
  <Button key="one">Physics</Button>,
  <Button key="two">Chemistry</Button>,
  <Button key="three">Biology</Button>,
];

export default function GroupSubjects() {
  return (
    <Box
      sx={{
        display: "flex",
        "& > *": {
          m: 1,
          // paddingLeft: 15,
          // paddingTop: 5,
        },
      }}
    >
      <ButtonGroup
        orientation="vertical"
        aria-label="Vertical button group"
        variant="text"
      >
        {buttons}
      </ButtonGroup>
    </Box>
  );
}
