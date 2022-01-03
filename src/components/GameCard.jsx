import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Collapse,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useState } from "react";

export default function GameCard({ game }) {
  const [showDescription, setShowDescription] = useState(false);

  const onCardClick = ({ gameName, onSelectGame }) => {
    if (!!gameName) onSelectGame(gameName);
    else return;
  };

  const handleExpandClick = (e) => {
    e.stopPropagation();
    setShowDescription((v) => !v);
  };
  return (
    <Card
      sx={{ position: "absolute", width: "100%" }}
      onClick={() => onCardClick(game.nameEvent)}
    >
      <CardMedia
        sx={{ paddingTop: "1rem", paddingBottom: "1rem" }}
        component="div"
      >
        {game.animation}
      </CardMedia>
      <Typography sx={{ paddingTop: "1rem", paddingBottom: "1rem" }}>
        {game.name}
      </Typography>
      <CardActions>
        <ExpandMoreIcon
          sx={{
            marginLeft: "auto",
            transform: `${showDescription ? "rotate(180deg)" : "rotate(0deg)"}`,
          }}
          onClick={handleExpandClick}
        />
      </CardActions>
      <Collapse in={showDescription} timeout="auto">
        <CardContent>
          <Typography>{game.description}</Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
}
