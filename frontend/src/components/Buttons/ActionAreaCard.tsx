import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";

import Typography from "@mui/material/Typography";
import CardActionArea from "@mui/material/CardActionArea";

export default function ActionAreaCard({
  fast = "bruh",
  index,
  onCardSelect,
  isSelected,
  imageName = "images.png",
}) {
  // const [selectedCard, setSelectedCard] = React.useState(0);
  // const [index = 1, setIndex] = React.useState(0);
  return (
    <>
      <Card
        sx={{
          maxWidth: "400px",
          minHeight: "500px",
          // border: "3px solid green",
          display: "inline-block",
          margin: "10px",
          // backgroundColor: {isactive == true ? "#1CB0F6" : "#28343B"},
          backgroundColor: "#28343B",
          border: isSelected ? "2px solid #1cb0f6" : "",
        }}
        onClick={() => {
          onCardSelect(index);
        }}
        data-active={isSelected ? "" : undefined}
      >
        <CardActionArea
          sx={{
            minHeight: "500px",
            "&:hover": {
              color: "cyan",
            },
            //   border: "2px solid blue",
          }}
        >
          <CardMedia
            sx={{
              padding: "20px",
              width: "300px",
              height: "300px",
            }}
            component="img"
            height="140"
            image={`/src/assets/Images/${imageName}`}
            alt={fast}
          />
          <CardContent>
            <Typography
              sx={{ color: "white" }}
              gutterBottom
              variant="h5"
              component="div"
            >
              {fast}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </>
  );
}
