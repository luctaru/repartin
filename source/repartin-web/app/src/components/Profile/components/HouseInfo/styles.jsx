import { createStyles } from "@material-ui/core";

export default ( theme ) => {

  return createStyles( {
    root: {
      textAlign: "center",
      display:"flex",
      flexDirection:"column",
      justifyContent:"center"
    },
    name: {
      paddingLeft: "40px"
    },
    editButton: {
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      width: "40px",
      height: "40px",
      minWidth: "initial",
      padding: "0",
      marginLeft: ".4rem",
      borderRadius: "50%"
    },
    editButtonIcon: {
      fontSize: "1.6em"
    },
    address: {
    },
    id: {
      marginTop: ".32rem",
      alignItems:"center",
      padding:"auto"
    },
    copyIcon: {
      margin: ".4rem",
      fontSize: "1em",
      transform: "translateY( -.4rem )"
    }
  } );
};