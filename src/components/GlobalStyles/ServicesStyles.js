import { makeStyles } from "@material-ui/core";

export default makeStyles({
  card: {
    borderRadius: 21,
    boxShadow: "0px 0px 6px rgba(0, 0, 0, 0.25)",
    padding: 30
  },
  right: {
    display: "flex",
    flexDirection: "column",
    gap: 10,
    "& h1": {
      alignSelf: "flex-end"
    },
    "& .sell": {
      fontWeight: 500
    }
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: 30
  },
  formGroup: {
    display: "flex",
    flexDirection: "column",
    gap: 10,
    "& label": {
      fontWeight: 500
    },
    "& span": {
      color: "#AAAAAA",
      fontWeight: 600
    }
  },
  formGroupRow: {
    display: "flex",
    alignItems: "center",
    gap: 15,
    "& label": {
      fontWeight: 500,
      minWidth: "30%",
      maxWidth: "30%"
    },
    "& span": {
      color: "#AAAAAA",
      fontWeight: 600
    }
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
        cursor: "pointer"
      },
      "& input": {
        display: "none"
      },
      "&.active": {
        background: "#F4C48F",
        border: "1px solid #EA963A"
      }
    }
  },
  photos: {
    display: "flex",
    gap: 20,
    flexWrap: "wrap",
    "& .photo": {
      width: 100,
      height: 100,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      borderRadius: 10,
      fontSize: "3rem",
      fontWeight: 400,
      cursor: "pointer",
      color: "#AAAAAA",
      background: "#F7F7F7"
    }
  },
  bigLabel: {
    fontSize: "1.2rem",
    fontWeight: 600
  },
  button: {
    color: "#fff",
    marginTop: 15,
    alignSelf: "center",
    padding: "7px 40px",
    borderRadius: 8
  }
});
