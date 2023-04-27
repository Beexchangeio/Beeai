import { Box } from "@mui/material";

const Sidebar = (props) => {
  return (
    <Box
      sx={{
        width: 300,
        height: "100%",
        bgcolor: "#000",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        borderRight: "1px solid #2c2c2c",
      }}
    >
      {props.children}
    </Box>
  );
};

export default Sidebar;
