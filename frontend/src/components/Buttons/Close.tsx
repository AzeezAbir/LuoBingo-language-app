import ClearIcon from "@mui/icons-material/Clear";
export default function Close() {
  return (
    <>
      <ClearIcon
        sx={{
          marginX: 40,
          // alignContent: "end", doesnt' work
        }}
      />
    </>
  );
}
