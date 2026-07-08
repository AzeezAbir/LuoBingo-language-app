import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
export default function Ul() {
  return (
    <>
      <List dense={dense}>
        {generate(
          <ListItem>
            <ListItemText
              primary="Single-line item"
              secondary={secondary ? "Secondary text" : null}
            />
          </ListItem>,
        )}
      </List>
    </>
  );
}
