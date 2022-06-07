import { makeStyles } from "@material-ui/core";

export default makeStyles({
  card: {
    borderRadius: 21,
    boxShadow: "0px 0px 6px rgba(0, 0, 0, 0.25)",
    padding: 30,
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: 35,
  },
  formGroup: {
    display: "flex",
    alignItems: "center",
    gap: 20,
    "& label": {
      fontWeight: 500,
      minWidth: "30%",
      maxWidth: "50%",
    },
  },
  formGroupColumn: {
    display: "flex",
    flexDirection: "column",
    gap: 20,
    "& label": {
      fontWeight: 500,
    },
  },
  options: {
    listStyle: "none",
    display: "flex",
    alignItems: "center",
    flexWrap: "wrap",
    gap: 15,
    "& li": {
      fontWeight: 500,
      background: "#F9E4CD",
      padding: "7px 15px",
      borderRadius: 38,
      "& label": {
        cursor: "pointer",
      },
      "& input": {
        display: "none",
      },
      "&.active": {
        background: "#F4C48F",
        border: "1px solid #EA963A",
      },
    },
  },
  smallInput: {
    maxWidth: "15%",
  },
  radio: {
    display: "flex",
    alignItems: "center",
    gap: 10,
    "& label": {
      marginLeft: 5,
    },
  },
  button: {
    color: "#fff",
    marginTop: 15,
    alignSelf: "center",
    padding: "7px 40px",
    borderRadius: 8,
  },
  errorMessage: {
    margin: "0 14px",
    color: "#f44336",
    fontSize: "0.75rem",
  }
});
