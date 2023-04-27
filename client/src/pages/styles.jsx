const styles = (theme) => ({
  menuItem: {
    display: "flex",
    alignItems: "center",
    margin: "5px 0px",
    borderRadius: "6px",
    cursor: "pointer",
    "&:hover": {
      backgroundColor: "hsla(240,9%,59%,.1)",
    },
  },
  defaultQuestionItem: {
    display: "flex",
    alignItems: "center",
    margin: "8px 0px",
    borderRadius: "6px",
    cursor: "pointer",
    width: "-webkit-fill-available",
    "&:hover": {
      backgroundColor: "hsla(240,9%,59%,.1)",
    },
  },
  defaultMessageIcon: {
    "&:hover": {
      backgroundColor: "transparent",
    },
  },
});

export default styles;
