import { createStyles } from "@material-ui/core/";

export default ( theme ) => {

  return createStyles( {
    root:{
      backgroundColor: "#eeeeee",
      marginBottom: ".8rem"
    },
    status: {
      color: "#FFB300"
    },
    statusConcluded: {
      color: "#2CF700"
    },
    actions: {
      display: "flex",
      justifyContent: "space-between",
      padding: "4px",
      backgroundColor: "#cccccc"
    },
    edit: {
      color: "#333"
    },
    delete: {
      color: "#888"
    },
    finish: {
      color: "#fff",
      backgroundColor: "#66BB6A"
    },
    user: {
      display: "flex",
      alignItems: "center",
      justifyContent: "flex-end"
    },
    userIcon: {
      fontSize: "1.32em",
      marginRight: ".2rem"
    }
  } );
}