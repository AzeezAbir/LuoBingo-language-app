import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import CardActionArea from "@mui/material/CardActionArea";
import { CardMedia } from "@mui/material";
import "/src/styles/UI.css";

const cards = [
  {
    key: 1,
    id: 1,
    title: "Metals",
    description: "Plants are essential for all life.",
  },
  {
    key: 2,
    id: 2,
    title: "semiconductors",
    description: "Animals are a part of nature.",
  },
  {
    key: 3,
    id: 3,
    title: "Insulators",
    description: "Humans depend on plants and animals for survival.",
  },
];

function SelectActionCard() {
  const [selectedCard, setSelectedCard] = React.useState(0);
  return (
    <>
      <br />
      <br />
      <Box
        className="soc"
        sx={{
          width: "150vw",
          height: "300px",
          margin: "0 20px",
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fill, minmax(min(200px, 100%), 1fr))",
          gap: 2,
        }}
      >
        {cards.map((card, index) => (
          <>
            <Card
              key={cards.id}
              sx={{
                backgroundColor: "blue",
                width: "250px",
                // margin: "px",
              }}
            >
              <CardActionArea
                onClick={() => {
                  setSelectedCard(index);
                  console.log("index:", index);
                }}
                data-active={selectedCard === index ? "" : undefined}
                sx={{
                  backgroundColor: "green",
                  padding: "2px",
                  "&[data-active]": {
                    backgroundColor: "action.selected",
                    "&:hover": {
                      backgroundColor: "action.selectedHover",
                    },
                  },
                }}
              >
                <CardMedia
                  component="img"
                  //   height="350"
                  //   width="20"
                  image="/src/assets/Images/images.png"
                  alt="green iguana"
                />
                <CardContent sx={{ height: "300px" }}>
                  <Typography variant="h5" component="div">
                    {card.title}
                  </Typography>
                  {/* <Typography variant="body2" color="text.secondary">
                {card.description}
              </Typography> */}
                </CardContent>
              </CardActionArea>
            </Card>
          </>
        ))}
      </Box>
    </>
  );
}

export default SelectActionCard;
