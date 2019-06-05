import { createStyles } from "@material-ui/core";

export default createStyles( {
  homeWrapper: {
    position: "relative",
    height: "100vh",
    padding: "16px",
    overflowY: "scroll",
    overflowX: "hidden",
    display:"flex",
    justifyContent:"center",
    margin:"0px",
  },
  homeWrapperCollapsed: {
    maxHeight: "calc( 100vh - 56px )",
  },
  bottomNavigation: {
    position: "fixed",
    right: "0",
    bottom: "0",
    left: "0",
    boxShadow: "0 -2px 3px 2px rgba( 0, 0, 0, .18)",
    backgroundColor: "#060606" 
  }
} );
